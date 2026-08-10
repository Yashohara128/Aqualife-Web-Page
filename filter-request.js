// Modal popup එක ඕපන් වෙන ෆන්ක්ෂන් එක
function openRequestModal(productName, price) {
    document.getElementById('selectedProduct').value = productName + " (" + price + ")";
    var requestModal = new bootstrap.Modal(document.getElementById('requestModal'));
    requestModal.show();
}

// Form Submit කළාම වැඩ කරන කෝඩ් එක
document.getElementById('filterForm').addEventListener('submit', function(e) {
    e.preventDefault();
    
    alert('Thank you! Your filter request has been submitted successfully. Our team will contact you shortly.');
    
    // Modal එක Close කිරීම
    var modalElement = document.getElementById('requestModal');
    var modal = bootstrap.Modal.getInstance(modalElement);
    modal.hide();
    
    // Form එක Reset කිරීම
    this.reset();
});