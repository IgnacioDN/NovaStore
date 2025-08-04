import React from 'react';
import '../styles/SizeSelectionModal.css';

const SizeSelectionModal = ({ isOpen, onClose }) => {
  if (!isOpen) return null;

  const handleOverlayClick = (e) => {
    if (e.target === e.currentTarget) {
      onClose();
    }
  };

  return (
    <div className="size-modal-overlay" onClick={handleOverlayClick}>
      <div className="size-modal">
        <div className="size-modal-header">
          <h3>Size Required</h3>
          <button 
            className="size-modal-close" 
            onClick={onClose}
            aria-label="Close modal"
          >
            ×
          </button>
        </div>
        
        <div className="size-modal-content">
          <div className="size-modal-icon">
            👕
          </div>
          <p>Please select a size before adding this item to your cart.</p>
          <p className="size-modal-hint">Choose from the available sizes above.</p>
        </div>
        
        <div className="size-modal-actions">
          <button 
            className="size-modal-btn size-modal-btn-primary" 
            onClick={onClose}
          >
            Got it
          </button>
        </div>
      </div>
    </div>
  );
};

export default SizeSelectionModal;
