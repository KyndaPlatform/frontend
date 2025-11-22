import React, { useState } from 'react';
import { HelpCircle } from 'lucide-react';
import { Link } from 'react-router-dom';

const ConnectWallet = () => {
  const [selectedCard, setSelectedCard] = useState(null);

  const onboardingStates = {
    initial: {
      title: "Connect Your Wallet with KYNDA!!!",
      subtitle: "Withdraw your earnings and convert bonuses to coins",
    },
    learn: {
      title: "Connect Your Wallet with KYNDA!!!",
      subtitle: "Withdraw your earnings and convert bonuses to coins",
    },
    parent: {
      title: "Connect Your Wallet with KYNDA!!!",
      subtitle: "Withdraw your earnings and convert bonuses to coins",
    },
    teach: {
      title: "Connect Your Wallet with KYNDA!!!",
      subtitle: "Withdraw your earnings and convert bonuses to coins.",
    }
  };

  const cards = [
    {
      id: 'learn',
      title: "Connect Binance",
      image: "../images/token-branded (5).png",
    },
    {
      id: 'parent',
      title: "Connect Metamask",
      image: "../images/Vector (2).png",
    },
    {
      id: 'teach',
      title: "Connect Phantom",
      image: "../images/token-branded (6).png",
    }
  ];

  const currentState = selectedCard ? onboardingStates[selectedCard] : onboardingStates.initial;
  const isButtonActive = selectedCard !== null;

  const handleCardClick = (cardId) => {
    setSelectedCard(cardId);
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-gray-50 to-gray-100 flex flex-col">
      {/* Header */}
      <header className="flex justify-between items-center p-6">
        <div className="flex items-center gap-2">
          <div className="w-8 h-8 flex items-center justify-center">
            <img
              src="../images/Vector (1).png"
              alt="Kynda Logo"
              className="w-10 h-10"
            />
          </div>
          <span className="text-2xl font-bold text-gray-800">KYNDA</span>
        </div>
        <button className="flex items-center gap-2 text-gray-600 hover:text-gray-800">
          <HelpCircle size={20} />
          <span>Help</span>
        </button>
      </header>

      {/* Main Content */}
      <main className="flex-1 flex flex-col items-center justify-center px-6 py-12">
        <div className="max-w-4xl w-full">
          {/* Title Section */}
          <div className="text-center mb-12">
            <h1 className="text-4xl md:text-4xl font-bold text-[#1E2382] mb-4">
              {currentState.title.split('KYNDA').map((part, index, array) => (
                <React.Fragment key={index}>
                  {part}
                  {index < array.length - 1 && (
                    <span className="text-orange-500">KYNDA</span>
                  )}
                </React.Fragment>
              ))}
            </h1>
            <p className="text-[#344256] text-lg max-w-3xl mx-auto">
              {currentState.subtitle}
            </p>
          </div>

          {/* Cards Section */}
          <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mb-8">
            {cards.map((card) => {
              const isSelected = selectedCard === card.id;
              
              return (
                <button
                  key={card.id}
                  onClick={() => handleCardClick(card.id)}
                  className={`
                    relative p-8 rounded-2xl transition-all duration-300 transform hover:scale-105 hover:bg-[#F1F5F9]
                    ${isSelected 
                      ? 'bg-gradient-to-br from-blue-50 to-white shadow-xl ring-4 ring-blue-400 ring-opacity-50' 
                      : 'bg-white shadow-lg hover:shadow-xl'
                    }
                  `}
                >
                  <div className="flex flex-col items-center gap-4">
                    {/* Illustration Image */}
                    <div className="w-32 h-32 flex items-center justify-center">
                      <img 
                        src={card.image} 
                        alt={card.title}
                        className="w-full h-full object-contain"
                      />
                    </div>
                    
                    {/* Title */}
                    <h3 className={`
                      text-lg font-semibold text-center
                      ${isSelected ? 'text-[#1E2382]' : 'text-gray-800'}
                    `}>
                      {card.title}
                    </h3>
                  </div>
                </button>
              );
            })}
          </div>

          {/* Get Started Button */}
          <div className="flex justify-center mb-4">
            <button
              disabled={!isButtonActive}
              className={`
                px-32 py-4 rounded-lg text-white font-semibold text-lg
                transition-all duration-300 transform
                ${isButtonActive
                  ? 'bg-gradient-to-r from-blue-700 to-blue-800 hover:from-blue-800 hover:to-blue-900 hover:scale-105 shadow-lg'
                  : 'bg-gray-300 cursor-not-allowed'
                }
              `}
            >
              Continue
            </button>
          </div>
          
          {/* Alternative Link */}
          <div className="flex items-center justify-center text-gray-700">
            <span>Connect with Fiat Instead ?</span>
            <Link to="/bank-setup" className="ml-2 text-blue-600 hover:text-blue-800 underline font-semibold">
              Connect Bank
            </Link>
          </div>
        </div>
      </main>
    </div>
  );
};

export default ConnectWallet;