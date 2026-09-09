import { useState } from 'react';
import { createClient } from '@supabase/supabase-js';

const supabase = createClient(
  process.env.NEXT_PUBLIC_SUPABASE_URL || '',
  process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY || ''
);

// High-End Feather / Lucide SVG Vector Icons (No cheap emojis)
const Icons = {
  Shield: () => (
    <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="#4F46E5" strokeWidth="2.2" strokeLinecap="round" strokeLinejoin="round">
      <path d="M12 22s8-4 8-10V5l-8-3-8 3v7c0 6 8 10 8 10z"/>
    </svg>
  ),
  Lock: () => (
    <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="#10B981" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
      <rect x="3" y="11" width="18" height="11" rx="2" ry="2"/>
      <path d="M7 11V7a5 5 0 0 1 10 0v4"/>
    </svg>
  ),
  Box: () => (
    <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="#94A3B8" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
      <path d="M21 16V8a2 2 0 0 0-1-1.73l-7-4a2 2 0 0 0-2 0l-7 4A2 2 0 0 0 3 8v8a2 2 0 0 0 1 1.73l7 4a2 2 0 0 0 2 0l7-4A2 2 0 0 0 21 16z"/>
      <polyline points="3.27 6.96 12 12.01 20.73 6.96"/>
      <line x1="12" y1="22.08" x2="12" y2="12"/>
    </svg>
  ),
  Zap: () => (
    <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="#F59E0B" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
      <polygon points="13 2 3 14 12 14 11 22 21 10 12 10 13 2"/>
    </svg>
  ),
  Check: () => (
    <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="#10B981" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round">
      <polyline points="20 6 9 17 4 12"/>
    </svg>
  ),
  Close: () => (
    <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="#64748B" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
      <line x1="18" y1="6" x2="6" y2="18"/><line x1="6" y1="6" x2="18" y2="18"/>
    </svg>
  )
};

export default function Home() {
  const [form, setForm] = useState({ item: '', amount: '', upi: '', phone: '' });
  const [deal, setDeal] = useState(null);
  const [loading, setLoading] = useState(false);
  const [activePolicy, setActivePolicy] = useState(null); // 'terms' | 'privacy' | 'refund' | 'dispute'

  const handleCreate = async (e) => {
    e.preventDefault();
    setLoading(true);
    const { data } = await supabase.from('deals').insert([{
      item_name: form.item,
      amount: Number(form.amount),
      seller_upi: form.upi,
      seller_phone: form.phone
    }]).select().single();

    setLoading(false);
    if (data) setDeal(data);
  };

  return (
    <div style={{ minHeight: '100vh', background: '#090D16', color: '#F1F5F9', fontFamily: 'system-ui, -apple-system, sans-serif' }}>
      
      {/* App Navigation Bar */}
      <header style={{ borderBottom: '1px solid #1E293B', background: '#0F172A80', backdropFilter: 'blur(12px)', position: 'sticky', top: 0, zIndex: 10 }}>
        <div style={{ maxWidth: '480px', margin: '0 auto', padding: '14px 20px', display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
          <div style={{ display: 'flex', alignItems: 'center', gap: '10px' }}>
            <img src="/logo.png" alt="Osurepay" style={{ height: '32px', width: 'auto', display: 'block' }} />
          </div>
          <div style={{ display: 'flex', alignItems: 'center', gap: '6px', background: '#1E293B', padding: '4px 10px', borderRadius: '100px', border: '1px solid #334155' }}>
            <span style={{ width: '6px', height: '6px', borderRadius: '50%', background: '#10B981' }} />
            <span style={{ fontSize: '11px', color: '#94A3B8', fontWeight: '600', letterSpacing: '0.3px' }}>RBI NODAL RAILS</span>
          </div>
        </div>
      </header>

      {/* Main Form Container */}
      <main style={{ maxWidth: '480px', margin: '0 auto', padding: '24px 20px' }}>
        
        {/* Value Proposition */}
        <div style={{ textAlign: 'center', marginBottom: '28px' }}>
          <h1 style={{ fontSize: '24px', fontWeight: '800', margin: '0 0 8px', color: '#FFFFFF', letterSpacing: '-0.5px' }}>
            Safe P2P Escrow Links
          </h1>
          <p style={{ fontSize: '13px', color: '#94A3B8', margin: 0, lineHeight: 1.5 }}>
            Zero advance scams for buyers. Zero RTO courier loss for sellers. Funds lock until delivery.
          </p>
        </div>

        {/* Dynamic Architectural Stepper */}
        <div style={{ background: '#0F172A', border: '1px solid #1E293B', borderRadius: '14px', padding: '16px', marginBottom: '24px' }}>
          <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
            <div style={{ display: 'flex', alignItems: 'center', gap: '8px' }}>
              <div style={{ background: '#1E293B', padding: '8px', borderRadius: '8px', display: 'flex' }}><Icons.Lock /></div>
              <div>
                <div style={{ fontSize: '12px', fontWeight: '700', color: '#F1F5F9' }}>Vault Locked</div>
                <div style={{ fontSize: '10px', color: '#64748B' }}>Buyer deposits UPI</div>
              </div>
            </div>
            <span style={{ color: '#334155' }}>→</span>
            <div style={{ display: 'flex', alignItems: 'center', gap: '8px' }}>
              <div style={{ background: '#1E293B', padding: '8px', borderRadius: '8px', display: 'flex' }}><Icons.Box /></div>
              <div>
                <div style={{ fontSize: '12px', fontWeight: '700', color: '#F1F5F9' }}>Courier Sync</div>
                <div style={{ fontSize: '10px', color: '#64748B' }}>Real-time transit</div>
              </div>
            </div>
            <span style={{ color: '#334155' }}>→</span>
            <div style={{ display: 'flex', alignItems: 'center', gap: '8px' }}>
              <div style={{ background: '#1E293B', padding: '8px', borderRadius: '8px', display: 'flex' }}><Icons.Zap /></div>
              <div>
                <div style={{ fontSize: '12px', fontWeight: '700', color: '#F1F5F9' }}>1-Hr Release</div>
                <div style={{ fontSize: '10px', color: '#64748B' }}>Auto-settlement</div>
              </div>
            </div>
          </div>
        </div>

        {/* Card Component */}
        <div style={{ background: '#0F172A', border: '1px solid #1E293B', borderRadius: '20px', padding: '24px', boxShadow: '0 20px 40px -15px rgba(0,0,0,0.5)' }}>
          {!deal ? (
            <form onSubmit={handleCreate} style={{ display: 'flex', flexDirection: 'column', gap: '16px' }}>
              <div>
                <label style={{ fontSize: '11px', color: '#94A3B8', fontWeight: '600', textTransform: 'uppercase', letterSpacing: '0.6px' }}>Item Specification</label>
                <input required placeholder="e.g. Vintage Leather Jacket (Size L)"
                  style={{ width: '100%', boxSizing: 'border-box', background: '#090D16', border: '1px solid #1E293B', padding: '14px', borderRadius: '10px', color: '#fff', fontSize: '14px', marginTop: '6px', outline: 'none' }}
                  onChange={e => setForm({...form, item: e.target.value})} />
              </div>

              <div>
                <label style={{ fontSize: '11px', color: '#94A3B8', fontWeight: '600', textTransform: 'uppercase', letterSpacing: '0.6px' }}>Settlement Amount (₹)</label>
                <input required type="number" placeholder="2500"
                  style={{ width: '100%', boxSizing: 'border-box', background: '#090D16', border: '1px solid #1E293B', padding: '14px', borderRadius: '10px', color: '#fff', fontSize: '14px', marginTop: '6px', outline: 'none' }}
                  onChange={e => setForm({...form, amount: e.target.value})} />
              </div>

              <div>
                <label style={{ fontSize: '11px', color: '#94A3B8', fontWeight: '600', textTransform: 'uppercase', letterSpacing: '0.6px' }}>Seller UPI Address (For Payout)</label>
                <input required placeholder="merchant@okaxis"
                  style={{ width: '100%', boxSizing: 'border-box', background: '#090D16', border: '1px solid #1E293B', padding: '14px', borderRadius: '10px', color: '#fff', fontSize: '14px', marginTop: '6px', outline: 'none' }}
                  onChange={e => setForm({...form, upi: e.target.value})} />
              </div>

              <div>
                <label style={{ fontSize: '11px', color: '#94A3B8', fontWeight: '600', textTransform: 'uppercase', letterSpacing: '0.6px' }}>Registered Contact (WhatsApp)</label>
                <input required type="tel" placeholder="9876543210"
                  style={{ width: '100%', boxSizing: 'border-box', background: '#090D16', border: '1px solid #1E293B', padding: '14px', borderRadius: '10px', color: '#fff', fontSize: '14px', marginTop: '6px', outline: 'none' }}
                  onChange={e => setForm({...form, phone: e.target.value})} />
              </div>

              <button type="submit" disabled={loading}
                style={{ background: 'linear-gradient(135deg, #4338CA, #3730A3)', color: '#fff', padding: '16px', borderRadius: '12px', border: 'none', fontWeight: '700', fontSize: '14px', cursor: 'pointer', marginTop: '10px', boxShadow: '0 8px 24px rgba(67, 56, 202, 0.35)' }}>
                {loading ? 'Initializing Smart Vault...' : 'Create Escrow Protection Link'}
              </button>
            </form>
          ) : (
            <div style={{ textAlign: 'center', padding: '12px 0' }}>
              <div style={{ width: '52px', height: '52px', borderRadius: '50%', background: '#064E3B', border: '1px solid #10B981', display: 'flex', alignItems: 'center', justifyContent: 'center', margin: '0 auto 16px' }}>
                <Icons.Check />
              </div>
              <h3 style={{ margin: '0 0 6px', fontSize: '18px', fontWeight: '700' }}>Protection Link Active</h3>
              <p style={{ fontSize: '12px', color: '#94A3B8', margin: '0 0 16px' }}>Share this unique vault checkout link with your customer.</p>
              
              <div style={{ background: '#090D16', border: '1px solid #1E293B', padding: '12px', borderRadius: '10px', fontSize: '12px', color: '#818CF8', wordBreak: 'break-all', marginBottom: '14px', fontWeight: '500' }}>
                {typeof window !== 'undefined' ? `${window.location.origin}/pay/${deal.id}` : deal.id}
              </div>

              <button onClick={() => navigator.clipboard.writeText(`${window.location.origin}/pay/${deal.id}`)}
                style={{ background: '#4338CA', color: '#FFFFFF', padding: '14px', borderRadius: '10px', border: 'none', fontWeight: '700', fontSize: '13px', width: '100%', cursor: 'pointer' }}>
                Copy Direct Buyer Link
              </button>
            </div>
          )}
        </div>

        {/* Banking Infrastructure Compliance Badges */}
        <div style={{ marginTop: '28px', display: 'grid', gridTemplateColumns: 'repeat(3, 1fr)', gap: '12px', textAlign: 'center' }}>
          <div style={{ background: '#0F172A', border: '1px solid #1E293B', padding: '12px 8px', borderRadius: '10px' }}>
            <div style={{ fontSize: '11px', fontWeight: '700', color: '#F1F5F9' }}>Vault Protected</div>
            <div style={{ fontSize: '10px', color: '#64748B', marginTop: '2px' }}>RBI Compliant</div>
          </div>
          <div style={{ background: '#0F172A', border: '1px solid #1E293B', padding: '12px 8px', borderRadius: '10px' }}>
            <div style={{ fontSize: '11px', fontWeight: '700', color: '#F1F5F9' }}>60-Min Window</div>
            <div style={{ fontSize: '10px', color: '#64748B', marginTop: '2px' }}>Open-Box Check</div>
          </div>
          <div style={{ background: '#0F172A', border: '1px solid #1E293B', padding: '12px 8px', borderRadius: '10px' }}>
            <div style={{ fontSize: '11px', fontWeight: '700', color: '#F1F5F9' }}>0% RTO Loss</div>
            <div style={{ fontSize: '10px', color: '#64748B', marginTop: '2px' }}>Guaranteed Pay</div>
          </div>
        </div>
      </main>

      {/* Trust & Legal Compliance Footer (Essential for Razorpay/Cashfree Approval) */}
      <footer style={{ borderTop: '1px solid #1E293B', padding: '24px 20px', marginTop: '40px', background: '#0B0F17' }}>
        <div style={{ maxWidth: '480px', margin: '0 auto', textAlign: 'center' }}>
          <div style={{ display: 'flex', justifyContent: 'center', gap: '16px', flexWrap: 'wrap', marginBottom: '16px' }}>
            <button onClick={() => setActivePolicy('terms')} style={{ background: 'none', border: 'none', color: '#94A3B8', fontSize: '11px', cursor: 'pointer', textDecoration: 'underline' }}>Terms of Service</button>
            <button onClick={() => setActivePolicy('privacy')} style={{ background: 'none', border: 'none', color: '#94A3B8', fontSize: '11px', cursor: 'pointer', textDecoration: 'underline' }}>Privacy Policy</button>
            <button onClick={() => setActivePolicy('refund')} style={{ background: 'none', border: 'none', color: '#94A3B8', fontSize: '11px', cursor: 'pointer', textDecoration: 'underline' }}>Refund & Inspection Policy</button>
            <button onClick={() => setActivePolicy('dispute')} style={{ background: 'none', border: 'none', color: '#94A3B8', fontSize: '11px', cursor: 'pointer', textDecoration: 'underline' }}>Dispute Resolution</button>
          </div>
          <p style={{ fontSize: '11px', color: '#475569', margin: 0 }}>
            © {new Date().getFullYear()} Osurepay Technologies. Escrow mediation infrastructure for social commerce.
          </p>
        </div>
      </footer>

      {/* Interactive Compliance Policy Modal */}
      {activePolicy && (
        <div style={{ position: 'fixed', inset: 0, background: 'rgba(0,0,0,0.85)', backdropFilter: 'blur(8px)', display: 'flex', alignItems: 'center', justifyContent: 'center', padding: '16px', zIndex: 100 }}>
          <div style={{ background: '#0F172A', border: '1px solid #334155', borderRadius: '16px', width: '100%', maxWidth: '480px', maxHeight: '80vh', display: 'flex', flexDirection: 'column' }}>
            <div style={{ padding: '16px 20px', borderBottom: '1px solid #1E293B', display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
              <span style={{ fontWeight: '700', fontSize: '14px', textTransform: 'capitalize' }}>{activePolicy} Protocol</span>
              <button onClick={() => setActivePolicy(null)} style={{ background: 'none', border: 'none', cursor: 'pointer', display: 'flex' }}><Icons.Close /></button>
            </div>
            
            <div style={{ padding: '20px', overflowY: 'auto', fontSize: '12px', color: '#94A3B8', lineHeight: 1.6 }}>
              {activePolicy === 'terms' && (
                <div>
                  <h4 style={{ color: '#fff', margin: '0 0 6px' }}>1. Escrow Facility Mediation</h4>
                  <p>Osurepay acts strictly as a neutral digital mediator. Funds deposited by the buyer remain securely locked in regulated nodal bank accounts until logistics confirmation is registered.</p>
                  <h4 style={{ color: '#fff', margin: '14px 0 6px' }}>2. Automatic Release Trigger</h4>
                  <p>Upon verified delivery confirmation from logistics carriers, a 60-minute window begins. Absence of dispute submission initiates unconditional automated seller settlement.</p>
                </div>
              )}
              {activePolicy === 'privacy' && (
                <div>
                  <h4 style={{ color: '#fff', margin: '0 0 6px' }}>Data Protection Standards</h4>
                  <p>Osurepay collects phone numbers and UPI addresses purely to execute transactional escrow settlement and order transit notifications. Data is strictly never sold to third-party ad networks.</p>
                </div>
              )}
              {activePolicy === 'refund' && (
                <div>
                  <h4 style={{ color: '#fff', margin: '0 0 6px' }}>60-Minute Inspection Window</h4>
                  <p>Buyers hold an unconditional right to inspect delivered parcels. If counterfeit, damaged, or mismatched goods are received, submission of unboxing proof immediately freezes payouts for neutral manual arbitration.</p>
                </div>
              )}
              {activePolicy === 'dispute' && (
                <div>
                  <h4 style={{ color: '#fff', margin: '0 0 6px' }}>Neutral Resolution Framework</h4>
                  <p>Disputed funds are held in reserve. Osurepay reviews courier dispatch logs and customer video unboxing evidence to process an immediate reversal or seller clearance within 24 business hours.</p>
                </div>
              )}
            </div>

            <div style={{ padding: '12px 20px', borderTop: '1px solid #1E293B', textAlign: 'right' }}>
              <button onClick={() => setActivePolicy(null)} style={{ background: '#1E293B', color: '#fff', border: 'none', padding: '8px 16px', borderRadius: '8px', fontSize: '12px', fontWeight: '600', cursor: 'pointer' }}>Close</button>
            </div>
          </div>
        </div>
      )}

    </div>
  );
  }
  
