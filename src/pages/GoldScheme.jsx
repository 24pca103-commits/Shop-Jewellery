import { useState } from 'react';
import { Calculator, Shield, Gift, Clock, CreditCard, ChevronRight } from 'lucide-react';
import './GoldScheme.css';

export default function GoldScheme() {
  const [monthlyAmount, setMonthlyAmount] = useState(5000);
  const tenure = 11;
  const totalPaid = monthlyAmount * tenure;
  const bonus = monthlyAmount * 0.75; // Example 75% of one month installment as bonus
  const maturityValue = totalPaid + bonus;

  return (
    <main className="scheme-page page-enter">
      <div className="scheme-hero">
        <div className="container text-center">
          <span className="eyebrow" style={{color: 'var(--gold-light)'}}>Smart Investment</span>
          <h1 className="scheme-title">Swarna Nidhi Plan</h1>
          <p className="scheme-subtitle">Plan your future jewellery purchases with easy monthly installments and get a generous bonus on maturity.</p>
        </div>
      </div>

      <div className="container">
        <div className="scheme-content">
          <div className="scheme-info">
            <h2>How It Works</h2>
            <div className="steps">
              <div className="step">
                <div className="step-num">1</div>
                <div>
                  <h4>Choose Amount</h4>
                  <p>Start with a minimum of ₹1,000 per month.</p>
                </div>
              </div>
              <div className="step">
                <div className="step-num">2</div>
                <div>
                  <h4>Pay for 11 Months</h4>
                  <p>Pay your installments regularly for 11 months.</p>
                </div>
              </div>
              <div className="step">
                <div className="step-num">3</div>
                <div>
                  <h4>Get Bonus</h4>
                  <p>We add up to 75% of one month's installment as a bonus.</p>
                </div>
              </div>
              <div className="step">
                <div className="step-num">4</div>
                <div>
                  <h4>Buy Jewellery</h4>
                  <p>Purchase your favorite gold or diamond jewellery at maturity.</p>
                </div>
              </div>
            </div>

            <h2 style={{marginTop: 'var(--space-2xl)'}}>Benefits</h2>
            <div className="benefits-grid">
              {[
                { icon: Shield, title: 'Secure & Trusted', desc: 'Your money is safe with India\'s most trusted jeweller.' },
                { icon: Gift, title: 'Attractive Bonus', desc: 'Get more value than what you save.' },
                { icon: Clock, title: 'Flexible Payments', desc: 'Pay online via UPI, Card, or Net Banking.' },
                { icon: CreditCard, title: 'Zero Making Charges', desc: 'On select collections at maturity.' }
              ].map(b => (
                <div key={b.title} className="benefit-card">
                  <b.icon size={24} color="var(--gold)" />
                  <h4>{b.title}</h4>
                  <p>{b.desc}</p>
                </div>
              ))}
            </div>
          </div>

          <div className="scheme-calculator-wrap">
            <div className="scheme-calculator">
              <div className="calc-header">
                <Calculator size={20} />
                <h3>Plan Calculator</h3>
              </div>
              <div className="calc-body">
                <div className="form-group">
                  <label>Monthly Installment (₹)</label>
                  <input 
                    type="range" 
                    min="1000" max="50000" step="1000" 
                    value={monthlyAmount} 
                    onChange={e => setMonthlyAmount(Number(e.target.value))} 
                    className="slider"
                  />
                  <div className="slider-val">₹{monthlyAmount.toLocaleString('en-IN')}</div>
                </div>

                <div className="calc-results">
                  <div className="result-row">
                    <span>Tenure</span>
                    <span>{tenure} Months</span>
                  </div>
                  <div className="result-row">
                    <span>Total Amount Paid</span>
                    <span>₹{totalPaid.toLocaleString('en-IN')}</span>
                  </div>
                  <div className="result-row bonus-row">
                    <span>Vaibhav Bonus</span>
                    <span>+ ₹{bonus.toLocaleString('en-IN')}</span>
                  </div>
                  <div className="result-row total-row">
                    <span>Maturity Value</span>
                    <span>₹{maturityValue.toLocaleString('en-IN')}</span>
                  </div>
                </div>

                <button className="btn btn-gold w-full mt-lg">
                  Start Plan Now <ChevronRight size={16} />
                </button>
                <p className="terms-note">*Terms and conditions apply. Calculations are indicative.</p>
              </div>
            </div>
          </div>
        </div>
      </div>
    </main>
  );
}
