document.addEventListener('DOMContentLoaded', function () {
    const quantityInput = document.getElementById('quantity');
    const serviceTypeRadios = document.querySelectorAll('input[name="serviceType"]');
    const optionSelect = document.getElementById('optionSelect');
    const propertyCheckbox = document.getElementById('propertyCheckbox');
    const optionsDiv = document.getElementById('options');
    const propertyDiv = document.getElementById('property');
    const resultDiv = document.getElementById('result');

    const servicePrices = {
        type1: 109,
        type2: 519,
        type3: 629
    };

    function calculateTotal() {
        const quantity = parseInt(quantityInput.value);
        if (isNaN(quantity) || quantity <= 0) {
            resultDiv.innerHTML = '<span style="color: red;">Ошибка: введите корректное количество.</span>';
            return;
        }

        const selectedServiceType = document.querySelector('input[name="serviceType"]:checked').value;
        let totalPrice = servicePrices[selectedServiceType] * quantity;

        if (selectedServiceType === 'type2') {
            totalPrice += parseInt(optionSelect.value) * quantity;
        } else if (selectedServiceType === 'type3' && propertyCheckbox.checked) {
            totalPrice += 100 * quantity;
        }

        resultDiv.innerHTML = `Итоговая стоимость: ${totalPrice} руб.`;
    }

    serviceTypeRadios.forEach(radio => {
        radio.addEventListener('change', function () {
            if (radio.value === 'type2') {
                optionsDiv.style.display = 'block';
                propertyDiv.style.display = 'none';
            } else if (radio.value === 'type3') {
                optionsDiv.style.display = 'none';
                propertyDiv.style.display = 'block';
            } else {
                optionsDiv.style.display = 'none';
                propertyDiv.style.display = 'none';
            }
            calculateTotal();
        });
    });

    quantityInput.addEventListener('input', calculateTotal);
    optionSelect.addEventListener('change', calculateTotal);
    propertyCheckbox.addEventListener('change', calculateTotal);
});
