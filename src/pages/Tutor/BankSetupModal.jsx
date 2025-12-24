// components/tutor/BankSetupModal.jsx
import React, { useState, useEffect } from 'react';
import { X, Search, Check, AlertCircle } from 'lucide-react';
import axios from 'axios';

const BankSetupModal = ({ isOpen, onClose, onSuccess }) => {
  const [step, setStep] = useState(1); // 1: Form, 2: Verification, 3: Success
  const [formData, setFormData] = useState({
    accountNumber: '',
    bankName: ''
  });
  
  const [banks, setBanks] = useState([]);
  const [bankSearch, setBankSearch] = useState('');
  const [filteredBanks, setFilteredBanks] = useState([]);
  const [showBankList, setShowBankList] = useState(false);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState('');
  const [verifiedAccount, setVerifiedAccount] = useState(null);

  // Fetch banks on mount
  useEffect(() => {
    if (isOpen) {
      fetchBanks();
    }
  }, [isOpen]);

  // Filter banks as user types
  useEffect(() => {
    if (bankSearch.length >= 2) {
      const filtered = banks.filter(bank =>
        bank.name.toLowerCase().includes(bankSearch.toLowerCase())
      );
      setFilteredBanks(filtered);
      setShowBankList(true);
    } else {
      setFilteredBanks([]);
      setShowBankList(false);
    }
  }, [bankSearch, banks]);

  const fetchBanks = async () => {
    try {
      const response = await axios.get('/api/v1/tutors/banks', {
        headers: {
          'Authorization': `Bearer ${localStorage.getItem('token')}`
        }
      });
      setBanks(response.data.data);
    } catch (err) {
      console.error('Failed to fetch banks:', err);
    }
  };

  const handleBankSelect = (bank) => {
    setFormData({ ...formData, bankName: bank.name });
    setBankSearch(bank.name);
    setShowBankList(false);
  };

  const handleVerify = async () => {
    try {
      setLoading(true);
      setError('');

      // Validate account number
      if (!/^\d{10}$/.test(formData.accountNumber)) {
        setError('Account number must be exactly 10 digits');
        setLoading(false);
        return;
      }

      if (!formData.bankName) {
        setError('Please select a bank');
        setLoading(false);
        return;
      }

      // Add bank details
      const response = await axios.post(
        '/api/v1/tutors/bank-details',
        formData,
        {
          headers: {
            'Authorization': `Bearer ${localStorage.getItem('token')}`
          }
        }
      );

      if (response.data.success) {
        setVerifiedAccount(response.data.data);
        setStep(3);
        
        // Call success callback after 2 seconds
        setTimeout(() => {
          if (onSuccess) onSuccess();
          onClose();
        }, 2000);
      }

    } catch (err) {
      console.error('Verification error:', err);
      setError(err.response?.data?.message || 'Failed to verify account');
    } finally {
      setLoading(false);
    }
  };

  if (!isOpen) return null;

  return (
    <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50 p-4">
      <div className="bg-white rounded-2xl max-w-md w-full max-h-[90vh] overflow-y-auto">
        {/* Header */}
        <div className="sticky top-0 bg-white border-b border-gray-200 p-6 flex items-center justify-between rounded-t-2xl">
          <h2 className="text-2xl font-bold text-gray-800">
            {step === 1 && 'Add Bank Details'}
            {step === 2 && 'Verifying...'}
            {step === 3 && 'Verified!'}
          </h2>
          <button 
            onClick={onClose}
            className="w-8 h-8 rounded-full hover:bg-gray-100 flex items-center justify-center"
          >
            <X size={20} />
          </button>
        </div>

        {/* Content */}
        <div className="p-6">
          {/* Step 1: Form */}
          {step === 1 && (
            <div className="space-y-6">
              <div className="bg-blue-50 border border-blue-200 rounded-lg p-4">
                <p className="text-sm text-blue-800">
                  💡 <strong>No bank code needed!</strong> Just type your bank name and account number. We'll verify everything automatically.
                </p>
              </div>

              {/* Bank Name (with search) */}
              <div className="relative">
                <label className="block text-sm font-semibold text-gray-700 mb-2">
                  Bank Name
                </label>
                <div className="relative">
                  <Search size={20} className="absolute left-3 top-1/2 -translate-y-1/2 text-gray-400" />
                  <input
                    type="text"
                    value={bankSearch}
                    onChange={(e) => {
                      setBankSearch(e.target.value);
                      setFormData({ ...formData, bankName: '' });
                    }}
                    placeholder="Search for your bank..."
                    className="w-full pl-10 pr-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                  />
                </div>

                {/* Bank Dropdown */}
                {showBankList && filteredBanks.length > 0 && (
                  <div className="absolute z-10 w-full mt-2 bg-white border border-gray-300 rounded-lg shadow-lg max-h-60 overflow-y-auto">
                    {filteredBanks.map((bank) => (
                      <button
                        key={bank.code}
                        onClick={() => handleBankSelect(bank)}
                        className="w-full text-left px-4 py-3 hover:bg-blue-50 transition-colors border-b border-gray-100 last:border-b-0"
                      >
                        <span className="font-medium text-gray-800">{bank.name}</span>
                      </button>
                    ))}
                  </div>
                )}

                {/* Selected Bank */}
                {formData.bankName && (
                  <div className="mt-2 flex items-center gap-2 text-sm text-green-600">
                    <Check size={16} />
                    <span>{formData.bankName} selected</span>
                  </div>
                )}
              </div>

              {/* Account Number */}
              <div>
                <label className="block text-sm font-semibold text-gray-700 mb-2">
                  Account Number
                </label>
                <input
                  type="text"
                  value={formData.accountNumber}
                  onChange={(e) => {
                    // Only allow numbers, max 10 digits
                    const value = e.target.value.replace(/\D/g, '').slice(0, 10);
                    setFormData({ ...formData, accountNumber: value });
                  }}
                  placeholder="0123456789"
                  maxLength={10}
                  className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                />
                <p className="text-xs text-gray-500 mt-1">
                  {formData.accountNumber.length}/10 digits
                </p>
              </div>

              {error && (
                <div className="p-4 bg-red-50 border border-red-200 rounded-lg flex items-start gap-2">
                  <AlertCircle size={20} className="text-red-600 flex-shrink-0 mt-0.5" />
                  <p className="text-sm text-red-600">{error}</p>
                </div>
              )}

              <button
                onClick={handleVerify}
                disabled={loading || !formData.bankName || formData.accountNumber.length !== 10}
                className="w-full py-4 bg-blue-600 text-white font-semibold rounded-lg hover:bg-blue-700 disabled:bg-gray-300 disabled:cursor-not-allowed transition-colors"
              >
                {loading ? 'Verifying...' : 'Verify Account'}
              </button>
            </div>
          )}

          {/* Step 3: Success */}
          {step === 3 && verifiedAccount && (
            <div className="text-center py-8">
              <div className="w-16 h-16 bg-green-100 rounded-full flex items-center justify-center mx-auto mb-4">
                <Check size={32} className="text-green-600" />
              </div>
              
              <h3 className="text-2xl font-bold text-gray-800 mb-2">
                Account Verified!
              </h3>
              
              <div className="bg-gray-50 rounded-lg p-4 mb-6 text-left">
                <div className="space-y-2 text-sm">
                  <div className="flex justify-between">
                    <span className="text-gray-600">Account Name:</span>
                    <span className="font-semibold">{verifiedAccount.accountName}</span>
                  </div>
                  <div className="flex justify-between">
                    <span className="text-gray-600">Account Number:</span>
                    <span className="font-semibold">{verifiedAccount.accountNumber}</span>
                  </div>
                  <div className="flex justify-between">
                    <span className="text-gray-600">Bank:</span>
                    <span className="font-semibold">{verifiedAccount.bankName}</span>
                  </div>
                </div>
              </div>

              <p className="text-gray-600">
                You'll receive payments directly to this account after each completed session.
              </p>
            </div>
          )}
        </div>
      </div>
    </div>
  );
};

export default BankSetupModal;