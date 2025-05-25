document.addEventListener('DOMContentLoaded', function () {
    let bmrChart = null;
    const form = document.getElementById('bmrForm');
    form.addEventListener('submit', function (e) {
        e.preventDefault();
        if (validateForm()) {
            calculateBMR();
        }
    });

    function validateForm() {
        const age = document.getElementById('age').value;
        const weight = document.getElementById('weight').value;
        const height = document.getElementById('height').value;
        let valid = true;
        let message = '';
        if (age < 15 || age > 120) {
            message += 'Idade deve ser entre 15 e 120 anos.\n';
            valid = false;
        }
        if (weight < 30 || weight > 200) {
            message += 'Peso deve ser entre 30kg e 200kg.\n';
            valid = false;
        }
        if (height < 100 || height > 250) {
            message += 'Altura deve ser entre 100cm e 250cm.\n';
            valid = false;
        }
        if (!valid) {
            alert(message);
        }
        return valid;
    }

    function calculateBMR() {
        const gender = document.getElementById('gender').value;
        const age = parseInt(document.getElementById('age').value);
        const weight = parseFloat(document.getElementById('weight').value);
        const height = parseFloat(document.getElementById('height').value);
        let bmr;
        if (gender === 'male') {
            bmr = 88.362 + (13.397 * weight) + (4.799 * height) - (5.677 * age);
        } else {
            bmr = 447.593 + (9.247 * weight) + (3.098 * height) - (4.330 * age);
        }
        bmr = Math.round(bmr);
        const sedentary = Math.round(bmr * 1.2);
        const light = Math.round(bmr * 1.375);
        const moderate = Math.round(bmr * 1.55);
        const active = Math.round(bmr * 1.725);
        const veryActive = Math.round(bmr * 1.9);
        document.getElementById('calories').textContent = bmr + ' kcal/dia';
        document.getElementById('result').style.display = 'block';
        document.getElementById('sedentary').textContent = sedentary + ' kcal';
        document.getElementById('light').textContent = light + ' kcal';
        document.getElementById('moderate').textContent = moderate + ' kcal';
        document.getElementById('active').textContent = active + ' kcal';
        document.getElementById('veryActive').textContent = veryActive + ' kcal';
        document.getElementById('activityLevels').style.display = 'block';
        updateChart(bmr, sedentary, light, moderate, active, veryActive);
    }

    function updateChart(bmr, sedentary, light, moderate, active, veryActive) {
        const ctx = document.getElementById('bmrChart').getContext('2d');
        if (bmrChart) {
            bmrChart.destroy();
        }
        bmrChart = new Chart(ctx, {
            type: 'bar',
            data: {
                labels: ['Basal', 'Sedentário', 'Leve', 'Moderado', 'Ativo', 'Muito Ativo'],
                datasets: [{
                    label: 'Calorias por dia',
                    data: [bmr, sedentary, light, moderate, active, veryActive],
                    backgroundColor: [
                        'rgba(231, 76, 60, 0.7)',
                        'rgba(52, 152, 219, 0.7)',
                        'rgba(155, 89, 182, 0.7)',
                        'rgba(26, 188, 156, 0.7)',
                        'rgba(241, 196, 15, 0.7)',
                        'rgba(45, 95, 37, 0.7)'
                    ],
                    borderColor: [
                        'rgba(231, 76, 60, 1)',
                        'rgba(52, 152, 219, 1)',
                        'rgba(155, 89, 182, 1)',
                        'rgba(26, 188, 156, 1)',
                        'rgba(241, 196, 15, 1)',
                        'rgba(45, 95, 37, 1)'
                    ],
                    borderWidth: 1
                }]
            },
            options: {
                responsive: true,
                maintainAspectRatio: false,
                scales: {
                    y: {
                        beginAtZero: true,
                        title: {
                            display: true,
                            text: 'Calorias (kcal/dia)'
                        }
                    }
                },
                plugins: {
                    title: {
                        display: true,
                        text: 'Gasto Calórico por Nível de Atividade',
                        font: {
                            size: 16
                        }
                    },
                    tooltip: {
                        callbacks: {
                            label: function (context) {
                                return context.parsed.y + ' kcal/dia';
                            }
                        }
                    }
                }
            }
        });
        document.querySelector('.chart-container').style.display = 'block';
    }
});
