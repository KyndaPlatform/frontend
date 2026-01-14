// src/services/payment/conversion.service.js
const axios = require('axios');

class ConversionService {
  constructor() {
    // Cache exchange rates (refresh every 5 minutes)
    this.cachedRate = null;
    this.cacheTimestamp = null;
    this.CACHE_DURATION = 5 * 60 * 1000; // 5 minutes
  }

  /**
   * Get current Naira to USD exchange rate
   */
  async getExchangeRate() {
    try {
      // Check cache first
      if (this.cachedRate && this.cacheTimestamp) {
        const now = Date.now();
        if (now - this.cacheTimestamp < this.CACHE_DURATION) {
          console.log('Using cached exchange rate:', this.cachedRate);
          return this.cachedRate;
        }
      }

      // Fetch fresh rate from multiple sources
      const rates = await Promise.all([
        this.getAbokiFxRate(),
        this.getExchangeRateAPIRate(),
        this.getBackupRate()
      ]);

      // Filter out failed requests
      const validRates = rates.filter(rate => rate !== null);

      if (validRates.length === 0) {
        throw new Error('All exchange rate sources failed');
      }

      // Use average of all valid rates
      const averageRate = validRates.reduce((a, b) => a + b, 0) / validRates.length;

      // Cache the rate
      this.cachedRate = Math.round(averageRate);
      this.cacheTimestamp = Date.now();

      console.log('Fresh exchange rate:', this.cachedRate);
      return this.cachedRate;

    } catch (error) {
      console.error('Exchange rate fetch error:', error);
      
      // Fallback to cached rate if available
      if (this.cachedRate) {
        console.log('Using stale cached rate:', this.cachedRate);
        return this.cachedRate;
      }

      // Last resort: hardcoded fallback
      console.warn('Using hardcoded fallback rate: 750');
      return 750;
    }
  }

  /**
   * Get rate from AbokiFX (parallel market)
   */
  async getAbokiFxRate() {
    try {
      // AbokiFX API (if available)
      const response = await axios.get('https://abokifx.com/api/v1/rates/usd', {
        timeout: 5000
      });
      return response.data.rate;
    } catch (error) {
      console.error('AbokiFX fetch failed:', error.message);
      return null;
    }
  }

  /**
   * Get rate from ExchangeRate-API
   */
  async getExchangeRateAPIRate() {
    try {
      const response = await axios.get('https://api.exchangerate-api.com/v4/latest/USD', {
        timeout: 5000
      });
      return response.data.rates.NGN;
    } catch (error) {
      console.error('ExchangeRate-API fetch failed:', error.message);
      return null;
    }
  }

  /**
   * Get backup rate
   */
  async getBackupRate() {
    try {
      // Use Open Exchange Rates API or similar
      const response = await axios.get('https://open.er-api.com/v6/latest/USD', {
        timeout: 5000
      });
      return response.data.rates.NGN;
    } catch (error) {
      console.error('Backup rate fetch failed:', error.message);
      return null;
    }
  }

  /**
   * Convert Naira to USDT
   */
  async convertNairaToUSDT(nairaAmount) {
    try {
      const exchangeRate = await this.getExchangeRate();
      const usdtAmount = nairaAmount / exchangeRate;

      return {
        success: true,
        nairaAmount: nairaAmount,
        usdtAmount: parseFloat(usdtAmount.toFixed(6)), // USDT has 6 decimals
        exchangeRate: exchangeRate,
        timestamp: new Date()
      };
    } catch (error) {
      console.error('Naira to USDT conversion error:', error);
      throw new Error('Currency conversion failed');
    }
  }

  /**
   * Convert USDT to Naira
   */
  async convertUSDTToNaira(usdtAmount) {
    try {
      const exchangeRate = await this.getExchangeRate();
      const nairaAmount = usdtAmount * exchangeRate;

      return {
        success: true,
        usdtAmount: usdtAmount,
        nairaAmount: Math.round(nairaAmount), // Round to nearest Naira
        exchangeRate: exchangeRate,
        timestamp: new Date()
      };
    } catch (error) {
      console.error('USDT to Naira conversion error:', error);
      throw new Error('Currency conversion failed');
    }
  }

  /**
   * Calculate payment split
   */
  calculateSplit(totalAmount, kyndaPercentage = 25) {
    const kyndaAmount = (totalAmount * kyndaPercentage) / 100;
    const tutorAmount = totalAmount - kyndaAmount;

    return {
      total: totalAmount,
      tutorAmount: parseFloat(tutorAmount.toFixed(6)),
      kyndaAmount: parseFloat(kyndaAmount.toFixed(6)),
      tutorPercentage: 100 - kyndaPercentage,
      kyndaPercentage: kyndaPercentage
    };
  }
}

module.exports = new ConversionService();