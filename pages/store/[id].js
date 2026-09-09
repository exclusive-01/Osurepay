import { useRouter } from 'next/router';
import { useEffect, useState } from 'react';
import { createClient } from '@supabase/supabase-js';

const supabase = createClient(
  process.env.NEXT_PUBLIC_SUPABASE_URL || '',
  process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY || ''
);

export default function StoreCheckout() {
  const router = useRouter();
  const { id } = router.query;
  const [merchant, setMerchant] = useState(null);
  const [item, setItem] = useState('');
  const [amount, setAmount] = useState('');
  const [buyerPhone, setBuyerPhone] = useState('');
  const [lockedDeal, setLockedDeal] = useState(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    if (!id) return;
    supabase.from('merchants').select('*').eq('handle', id).single().then(({ data }) => {
      setMerchant(data);
      setLoading(false);
    });
  }, [id]);

  const handleDeposit = async (e) => {
    e.preventDefault();
    if (!buyerPhone || buyerPhone.length < 10) return alert('Enter valid WhatsApp Number');

    const { data } = await supabase.from('deals').insert([{
      merchant_id: merchant.id,
      item_name: item,
      amount: Number(amount),
      buyer_phone: buyerPhone,
      status: 'VAULT_HOLD'
    }]).select().single();

    setLockedDeal(data);
  };

  if (loading) return <div style={{ minHeight: '100vh', background: '#090D16', color: '#fff', display: 'flex', alignItems: 'center', justifyContent: 'center', fontFamily: 'system-ui' }}>Connecting Escrow Rails...</div>;
  if (!merchant) return <div style={{ minHeight: '100vh', background: '#090D16', color: '#EF4444', display: 'flex', alignItems: 'center', justifyContent: 'center', fontFamily: 'system-ui' }}>Merchant Node Not Found</div>;

  const upiIntent = `upi://pay?pa=${merchant.payout_upi}&pn=${encodeURIComponent(merchant.business_name)}&am=${amount}&cu=INR&tn=Osurepay_Vault_${lockedDeal?.id ? lockedDeal.id.slice(0,6) : 'ESCROW'}`;
  const dynamicQR = `https://api.qrserver.com/v1/create-qr-code/?size=220x220&data=${encodeURIComponent(upiIntent)}`;

  return (
    <div style={{ minHeight: '100vh', background: '#090D16', color: '#F8FAFC', fontFamily: 'system-ui, -apple-system, sans-serif', padding: '20px 16px' }}>
      
      <header style={{ maxWidth: '420px', margin: '0 auto 20px', display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
        <img src="/logo.png" alt="Osurepay" style={{ height: '28px', width: 'auto' }} />
        <span style={{ fontSize: '11px', background: '#131D2E', color: '#10B981', padding: '4px 10px', borderRadius: '100px', fontWeight: '700', border: '1px solid #1E293B' }}>
          VAULT SHIELD ON
        </span>
      </header>

      <main style={{ maxWidth: '420px', margin: '0 auto', background: '#0F172A', border: '1px solid #1E293B', borderRadius: '24px', padding: '24px' }}>
        
        <div style={{ display: 'flex', alignItems: 'center', gap: '12px', borderBottom: '1px solid #1E293B', paddingBottom: '16px', marginBottom: '20px' }}>
          <div style={{ width: '42px', height: '42px', borderRadius: '50%', background: '#4338CA', display: 'flex', alignItems: 'center', justifyContent: 'center', fontWeight: '800', fontSize: '18px' }}>
            {merchant.business_name[0]}
          </div>
          <div>
            <h3 style={{ margin: 0, fontSize: '16px', fontWeight: '800' }}>{merchant.business_name}</h3>
            <span style={{ fontSize: '11px', color: '#38BDF8', fontWeight: '600' }}>@{merchant.handle}</span>
          </div>
        </div>

        {!lockedDeal ? (
          <form onSubmit={handleDeposit} style={{ display: 'flex', flexDirection: 'column', gap: '14px' }}>
            <div>
              <label style={{ fontSize: '11px', color: '#94A3B8', fontWeight: '700', textTransform: 'uppercase' }}>Item Name / Description</label>
              <input required placeholder="e.g. Nike Dunk Low (UK 8)" value={item} onChange={e => setItem(e.target.value)}
                style={{ width: '100%', boxSizing: 'border-box', background: '#090D16', border: '1px solid #1E293B', padding: '12px', borderRadius: '10px', color: '#fff', marginTop: '6px', outline: 'none' }} />
            </div>

            <div>
              <label style={{ fontSize: '11px', color: '#94A3B8', fontWeight: '700', textTransform: 'uppercase' }}>Agreed Price (₹)</label>
              <input required type="number" placeholder="1500" value={amount} onChange={e => setAmount(e.target.value)}
                style={{ width: '100%', boxSizing: 'border-box', background: '#090D16', border: '1px solid #1E293B', padding: '12px', borderRadius: '10px', color: '#fff', marginTop: '6px', outline: 'none' }} />
            </div>

            <div>
              <label style={{ fontSize: '11px', color: '#94A3B8', fontWeight: '700', textTransform: 'uppercase' }}>Your WhatsApp Number</label>
              <input required type="tel" placeholder="9876543210" value={buyerPhone} onChange={e => setBuyerPhone(e.target.value)}
                style={{ width: '100%', boxSizing: 'border-box', background: '#090D16', border: '1px solid #1E293B', padding: '12px', borderRadius: '10px', color: '#fff', marginTop: '6px', outline: 'none' }} />
            </div>

            <button type="submit"
              style={{ background: 'linear-gradient(135deg, #4338CA, #3730A3)', color: '#fff', padding: '15px', borderRadius: '12px', border: 'none', fontWeight: '700', fontSize: '14px', cursor: 'pointer', marginTop: '10px' }}>
              Proceed to Lock Funds
            </button>
          </form>
        ) : (
          <div style={{ textAlign: 'center' }}>
            <div style={{ background: '#FFFFFF', padding: '16px', borderRadius: '16px', display: 'inline-block', marginBottom: '16px' }}>
              <img src={dynamicQR} alt="Pay UPI" style={{ width: '190px', height: '190px', display: 'block' }} />
              <p style={{ color: '#0F172A', fontSize: '11px', fontWeight: '800', margin: '8px 0 0' }}>Scan to Lock ₹{amount} in Vault</p>
            </div>

            <a href={upiIntent}
              style={{ display: 'block', background: '#4338CA', color: '#fff', padding: '14px', borderRadius: '10px', textDecoration: 'none', fontWeight: '700', fontSize: '14px', marginBottom: '12px' }}>
              Pay via Installed UPI App
            </a>

            <div style={{ background: '#131D2E', border: '1px solid #1E293B', padding: '12px', borderRadius: '10px', fontSize: '11px', color: '#94A3B8', lineHeight: 1.4 }}>
              🔒 <strong>Vault Safe:</strong> Funds will NOT be released to {merchant.business_name} until you receive the package and complete the 60-minute inspection window.
            </div>
          </div>
        )}
      </main>
    </div>
  );
    }
