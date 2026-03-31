import React, { useState } from 'react'

function App() {
  const [step, setStep] = useState(1)
  const [isGenerating, setIsGenerating] = useState(false)
  const [formData, setFormData] = useState({
    city: '',
    state: '',
    address: '',
    carpetArea: '',
    parking: 0,
    inventory: []
  })

  const nextStep = () => setStep(s => s + 1)
  const prevStep = () => setStep(s => s - 1)

  const handleGenerate = async () => {
    setIsGenerating(true);
    setStep(5);
    try {
      const response = await fetch('http://localhost:5000/api/generate-agreement', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ formData })
      });
      
      if (!response.ok) throw new Error('Generation failed');
      
      const blob = await response.blob();
      const url = window.URL.createObjectURL(blob);
      const a = document.createElement('a');
      a.href = url;
      a.download = `Rental_Agreement_${formData.city}.pdf`;
      document.body.appendChild(a);
      a.click();
      a.remove();
    } catch (err) {
      console.error(err);
      alert("Error generating PDF. Please ensure the backend is running.");
    } finally {
      setIsGenerating(false);
    }
  };

  return (
    <div className="app-container">
      <header style={{ marginBottom: '3rem', textAlign: 'center' }}>
        <h1 style={{ fontSize: '2.5rem', color: 'var(--primary)', marginBottom: '0.5rem' }}>SEBRI</h1>
        <p style={{ color: 'var(--text-muted)' }}>Evidence-Backed Rental Infrastructure</p>
      </header>

      <div className="card">
        {step === 1 && (
          <div className="fade-in">
            <h2 style={{ marginBottom: '1.5rem' }}>1. Property Onboarding</h2>
            <div className="input-group">
              <label>City</label>
              <input 
                type="text" 
                placeholder="e.g. Bangalore"
                value={formData.city}
                onChange={(e) => setFormData({...formData, city: e.target.value})}
              />
            </div>
            <div className="input-group">
              <label>State</label>
              <input 
                type="text" 
                placeholder="e.g. Karnataka"
                value={formData.state}
                onChange={(e) => setFormData({...formData, state: e.target.value})}
              />
            </div>
            <div className="input-group">
              <label>Address</label>
              <textarea 
                rows="3"
                placeholder="Full address of the scheduled premises"
                value={formData.address}
                onChange={(e) => setFormData({...formData, address: e.target.value})}
              />
            </div>
            <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: '1rem' }}>
              <div className="input-group">
                <label>Carpet Area (sq.ft)</label>
                <input 
                  type="number" 
                  value={formData.carpetArea}
                  onChange={(e) => setFormData({...formData, carpetArea: e.target.value})}
                />
              </div>
              <div className="input-group">
                <label>Parking Slots</label>
                <input 
                  type="number" 
                  value={formData.parking}
                  onChange={(e) => setFormData({...formData, parking: e.target.value})}
                />
              </div>
            </div>
            <button className="btn btn-primary" onClick={nextStep} style={{ width: '100%', marginTop: '1rem' }}>
              Next: Financial Terms
            </button>
          </div>
        )}

        {step === 2 && (
          <div className="fade-in">
            <h2 style={{ marginBottom: '1.5rem' }}>2. Financial Terms</h2>
            <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: '1rem' }}>
              <div className="input-group">
                <label>Monthly Rent (Rs)</label>
                <input 
                  type="number" 
                  value={formData.rent}
                  onChange={(e) => setFormData({...formData, rent: e.target.value})}
                />
              </div>
              <div className="input-group">
                <label>Security Deposit (Rs)</label>
                <input 
                  type="number" 
                  value={formData.deposit}
                  onChange={(e) => setFormData({...formData, deposit: e.target.value})}
                />
              </div>
            </div>
            <div className="input-group">
              <label>Annual Increase (%)</label>
              <input 
                type="number" 
                value={formData.increase}
                onChange={(e) => setFormData({...formData, increase: e.target.value})}
              />
            </div>
            <div style={{ display: 'flex', gap: '1rem' }}>
               <button className="btn" onClick={prevStep} style={{ flex: 1, backgroundColor: 'var(--border)' }}>Back</button>
               <button className="btn btn-primary" onClick={nextStep} style={{ flex: 2 }}>Next: Party Details</button>
            </div>
          </div>
        )}

        {step === 3 && (
          <div className="fade-in">
            <h2 style={{ marginBottom: '1.5rem' }}>3. Party Details</h2>
            <div style={{ padding: '1rem', background: 'var(--secondary)', borderRadius: 'var(--radius-md)', marginBottom: '1rem' }}>
              <h4 style={{ marginBottom: '0.5rem' }}>Lessor (Landlord)</h4>
              <div className="input-group">
                <label>Full Name</label>
                <input type="text" placeholder="Owner Name" />
              </div>
            </div>
            <div style={{ padding: '1rem', border: '1px solid var(--border)', borderRadius: 'var(--radius-md)', marginBottom: '1rem' }}>
              <h4 style={{ marginBottom: '0.5rem' }}>Lessee (Tenant)</h4>
              <div className="input-group">
                <label>Primary Tenant Name</label>
                <input type="text" placeholder="Tenant Name" />
              </div>
            </div>
            <div style={{ display: 'flex', gap: '1rem' }}>
               <button className="btn" onClick={prevStep} style={{ flex: 1, backgroundColor: 'var(--border)' }}>Back</button>
               <button className="btn btn-primary" onClick={nextStep} style={{ flex: 2 }}>Next: Inventory & Keys</button>
            </div>
          </div>
        )}

        {step === 4 && (
          <div className="fade-in">
            <h2 style={{ marginBottom: '1.5rem' }}>4. Inventory Tracking</h2>
            <p style={{ color: 'var(--text-muted)', marginBottom: '1.5rem' }}>Take photos of each item to preserve evidence.</p>
            
            <div style={{ marginBottom: '2rem' }}>
              {formData.inventory.map((item, idx) => (
                <div key={idx} style={{ padding: '0.75rem', border: '1px solid var(--border)', borderRadius: 'var(--radius-sm)', marginBottom: '0.5rem', display: 'flex', justifyContent: 'space-between' }}>
                  <span>{item.name} ({item.condition})</span>
                  <span>📸</span>
                </div>
              ))}
              <button className="btn" onClick={() => setFormData({...formData, inventory: [...formData.inventory, { name: 'AC', condition: 'Excellent' }]})} style={{ width: '100%', border: '1px dashed var(--primary)', color: 'var(--primary)', background: 'transparent' }}>
                + Add Item
              </button>
            </div>

            <div style={{ display: 'flex', gap: '1rem' }}>
               <button className="btn" onClick={prevStep} style={{ flex: 1, backgroundColor: 'var(--border)' }}>Back</button>
               <button className="btn btn-primary" onClick={handleGenerate} style={{ flex: 2, background: 'var(--accent)' }}>Finalize & Generate Agreement</button>
            </div>
          </div>
        )}

        {step === 5 && (
          <div className="fade-in" style={{ textAlign: 'center' }}>
            {isGenerating ? (
              <div style={{ padding: '3rem' }}>
                <div className="spinner" style={{ width: '40px', height: '40px', border: '3px solid var(--border)', borderTop: '3px solid var(--primary)', borderRadius: '50%', margin: '0 auto 1.5rem', animation: 'spin 1s linear infinite' }}></div>
                <h2>Gemini AI is crafting your agreement...</h2>
                <p style={{ color: 'var(--text-muted)' }}>Using the Gold Standard Reference model.</p>
              </div>
            ) : (
              <div style={{ padding: '2rem' }}>
                <div style={{ fontSize: '4rem', marginBottom: '1rem' }}>📄</div>
                <h2 style={{ marginBottom: '1.5rem' }}>Agreement Ready!</h2>
                <p style={{ marginBottom: '2rem' }}>Your customized, evidence-backed rental agreement has been generated as a court-ready PDF.</p>
                <button className="btn btn-primary" style={{ width: '100%', marginBottom: '1rem' }}>
                  Download PDF
                </button>
                <button className="btn" onClick={() => setStep(1)} style={{ width: '100%', border: '1px solid var(--border)' }}>
                  Start New Agreement
                </button>
              </div>
            )}
          </div>
        )}
      </div>

      <style>{`
        @keyframes spin { 0% { transform: rotate(0deg); } 100% { transform: rotate(360deg); } }
        .fade-in { animation: fadeIn 0.4s ease-out; }
        @keyframes fadeIn { from { opacity: 0; transform: translateY(10px); } to { opacity: 1; transform: translateY(0); } }
      `}</style>
    </div>
  )
}

export default App
