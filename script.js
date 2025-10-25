// Payment method selection
document.querySelectorAll('.payment-method').forEach(method => {
    method.addEventListener('click', function() {
        // Remove active class from all payment methods
        document.querySelectorAll('.payment-method').forEach(m => {
            m.classList.remove('active');
        });
        
        // Add active class to clicked payment method
        this.classList.add('active');
    });
});

// Form validation and submission
document.getElementById('payment-form').addEventListener('submit', function(e) {
    e.preventDefault();
    
    // Get form values
    const cardholder = document.getElementById('cardholder').value;
    const cardnumber = document.getElementById('cardnumber').value;
    const expiry = document.getElementById('expiry').value;
    const cvv = document.getElementById('cvv').value;
    const plan = document.getElementById('plan').value;
    
    // Simple validation
    if (!cardholder || !cardnumber || !expiry || !cvv || !plan) {
        alert('Please fill in all fields');
        return;
    }
    
    // Card number validation (simple version)
    if (cardnumber.replace(/\s/g, '').length !== 16) {
        alert('Please enter a valid 16-digit card number');
        return;
    }
    
    // CVV validation
    if (cvv.length !== 3) {
        alert('Please enter a valid 3-digit CVV');
        return;
    }
    
    // Show loading state
    const submitBtn = document.querySelector('.btn-pay');
    const originalText = submitBtn.textContent;
    submitBtn.textContent = 'Processing...';
    submitBtn.disabled = true;
    
    // Simulate payment processing
    setTimeout(() => {
        // Reset button
        submitBtn.textContent = originalText;
        submitBtn.disabled = false;
        
        // Show success message
        alert('Payment successful! Your insurance is now active.');
        
        // Reset form
        document.getElementById('payment-form').reset();
        
        // Reset payment method selection
        document.querySelectorAll('.payment-method').forEach(m => {
            m.classList.remove('active');
        });
        document.querySelector('.payment-method[data-method="visa"]').classList.add('active');
    }, 2000);
});

// Format card number input
document.getElementById('cardnumber').addEventListener('input', function(e) {
    let value = e.target.value.replace(/\s+/g, '').replace(/[^0-9]/gi, '');
    let formattedValue = '';
    
    for (let i = 0; i < value.length; i++) {
        if (i > 0 && i % 4 === 0) {
            formattedValue += ' ';
        }
        formattedValue += value[i];
    }
    
    e.target.value = formattedValue;
});

// Format expiry date input
document.getElementById('expiry').addEventListener('input', function(e) {
    let value = e.target.value.replace(/\D/g, '');
    
    if (value.length >= 2) {
        e.target.value = value.substring(0, 2) + '/' + value.substring(2, 4);
    } else {
        e.target.value = value;
    }
});

// Only allow numbers in CVV field
document.getElementById('cvv').addEventListener('input', function(e) {
    e.target.value = e.target.value.replace(/\D/g, '');
});
