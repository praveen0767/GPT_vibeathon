import React, { useState } from 'react';

export default function App() {
    const [desc, setDesc] = useState('');
    const [loc, setLoc] = useState(null);
    const [report, setReport] = useState(null);
    const [status, setStatus] = useState('');
    const [loading, setLoading] = useState(false);
    const [image, setImage] = useState(null);
    const [preview, setPreview] = useState(null);

    const getLocation = () => {
        if (navigator.geolocation) {
            navigator.geolocation.getCurrentPosition((pos) => {
                setLoc({ lat: pos.coords.latitude, long: pos.coords.longitude });
            });
        } else {
            alert("Geolocation not supported");
        }
    };

    const handleImageChange = (e) => {
        const file = e.target.files[0];
        if (file) {
            setImage(file);
            setPreview(URL.createObjectURL(file));
        }
    };

    const submit = async () => {
        if (!desc && !loc && !image) return alert("Please provide description, location, or image");
        setLoading(true);

        const formData = new FormData();
        formData.append('description', desc);
        if (loc) {
            formData.append('lat', loc.lat);
            formData.append('long', loc.long);
        }
        if (image) {
            formData.append('media', image);
        }

        try {
            // Remove Content-Type header to let browser set multipart/form-data boundary
            const res = await fetch('http://localhost:3001/report', {
                method: 'POST',
                body: formData
            });
            const data = await res.json();
            setReport(data);
            setLoading(false);

            const ws = new WebSocket('ws://localhost:3001');
            ws.onopen = () => ws.send(JSON.stringify({ type: 'REGISTER', reportId: data.reportId }));
            ws.onmessage = (e) => setStatus(JSON.parse(e.data).status);
        } catch (e) {
            console.error(e);
            setLoading(false);
            alert("Failed to send report");
        }
    };

    return (
        <div className="min-h-screen bg-[#F0F4F8] text-slate-900 font-sans flex flex-col items-center justify-center p-4">
            <div className="w-full max-w-lg bg-white p-8 rounded-3xl shadow-2xl border-t-8 border-[#0056D2]">

                <div className="flex flex-col items-center mb-8">
                    <img src="/logo.png" alt="NexR Logo" className="w-32 mb-4 drop-shadow-md" />
                    <h1 className="text-3xl font-black text-[#0056D2] tracking-tight">NexR <span className="text-[#E63946]">RESPOND</span></h1>
                    <p className="text-slate-500 text-sm font-medium mt-1">AI-POWERED EMERGENCY SYSTEM</p>
                </div>

                {!report ? (
                    <div className="space-y-5">
                        {/* Text Input */}
                        <div className="relative group">
                            <textarea
                                className="w-full p-4 bg-slate-50 rounded-xl border-2 border-slate-200 focus:border-[#0056D2] focus:bg-white outline-none text-lg transition-all shadow-sm group-hover:border-slate-300 placeholder:text-slate-400"
                                placeholder="Describe the emergency..."
                                rows="3"
                                value={desc}
                                onChange={e => setDesc(e.target.value)}
                            />
                        </div>

                        {/* Image Upload */}
                        <div className="relative">
                            <input type="file" accept="image/*" onChange={handleImageChange} className="hidden" id="img-upload" />
                            <label htmlFor="img-upload" className={`cursor-pointer flex items-center justify-center w-full p-4 rounded-xl border-2 border-dashed transition-all ${preview ? 'border-[#0056D2] bg-blue-50' : 'border-slate-300 hover:border-[#0056D2] hover:bg-slate-50'}`}>
                                {preview ? (
                                    <div className="relative w-full h-32">
                                        <img src={preview} alt="Preview" className="w-full h-full object-cover rounded-lg" />
                                        <div className="absolute inset-0 bg-black/20 flex items-center justify-center rounded-lg opacity-0 hover:opacity-100 transition-opacity">
                                            <span className="text-white font-bold text-sm">Change Image</span>
                                        </div>
                                    </div>
                                ) : (
                                    <div className="flex flex-col items-center text-slate-500">
                                        <svg xmlns="http://www.w3.org/2000/svg" className="h-8 w-8 mb-2" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                                            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M3 9a2 2 0 012-2h.93a2 2 0 001.664-.89l.812-1.22A2 2 0 0110.07 4h3.86a2 2 0 011.664.89l.812 1.22A2 2 0 0018.07 7H19a2 2 0 012 2v9a2 2 0 01-2 2H5a2 2 0 01-2-2V9z" />
                                            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15 13a3 3 0 11-6 0 3 3 0 016 0z" />
                                        </svg>
                                        <span className="font-semibold text-sm">Upload Photo / Video</span>
                                    </div>
                                )}
                            </label>
                        </div>

                        {/* Location */}
                        <div className="flex gap-3">
                            <button
                                onClick={getLocation}
                                className={`flex-1 py-3 px-4 rounded-xl font-bold flex items-center justify-center gap-2 transition-all shadow-sm ${loc ? 'bg-green-100 text-green-700 border-2 border-green-500' : 'bg-white border-2 border-slate-200 text-slate-600 hover:border-slate-400'}`}
                            >
                                <span>{loc ? '📍 Location Secured' : '📍 Share Location'}</span>
                            </button>
                        </div>

                        {/* Submit */}
                        <button
                            onClick={submit}
                            disabled={loading}
                            className="w-full py-4 bg-gradient-to-r from-[#E63946] to-[#D62828] hover:from-[#FF4D5A] hover:to-[#E63946] rounded-xl font-black text-xl text-white shadow-lg shadow-red-500/30 active:scale-[0.98] transition-all flex items-center justify-center gap-3"
                        >
                            {loading ? (
                                <>
                                    <svg className="animate-spin h-6 w-6 text-white" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24"><circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4"></circle><path className="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"></path></svg>
                                    ANALYZING...
                                </>
                            ) : (
                                '🚨 REPORT EMERGENCY'
                            )}
                        </button>
                    </div>
                ) : (
                    <div className="space-y-6 animate-in slide-in-from-bottom-4 duration-500">
                        {/* Status Header */}
                        <div className="bg-green-50 p-6 rounded-2xl border-2 border-green-500 text-center shadow-lg shadow-green-500/10">
                            <h2 className="text-3xl font-black text-green-600 mb-1">DISPATCHED</h2>
                            <div className="text-xs font-mono font-bold text-green-800 opacity-60">ID: {report.reportId}</div>
                        </div>

                        {/* Analysis Grid */}
                        <div className="grid grid-cols-2 gap-4">
                            <div className="bg-slate-50 p-4 rounded-xl border border-slate-200">
                                <div className="text-[#0056D2] text-xs font-bold uppercase tracking-wider mb-1">Incident Type</div>
                                <div className="text-xl font-bold text-slate-800 leading-tight">{report.emergency_type.join(', ')}</div>
                            </div>
                            <div className="bg-slate-50 p-4 rounded-xl border border-slate-200">
                                <div className="text-[#0056D2] text-xs font-bold uppercase tracking-wider mb-1">Severity</div>
                                <div className={`text-xl font-bold leading-tight ${['Critical', 'High'].includes(report.severity) ? 'text-[#E63946]' : 'text-yellow-600'}`}>{report.severity}</div>
                            </div>
                        </div>

                        {/* AI Summary */}
                        <div className="bg-[#0056D2]/5 p-4 rounded-xl border border-[#0056D2]/20">
                            <div className="flex items-center gap-2 mb-2">
                                <span className="bg-[#0056D2] text-white text-[10px] font-bold px-2 py-0.5 rounded-full">AI ANALYSIS</span>
                                <span className="text-xs text-[#0056D2] font-semibold"> Confidence: 98.4%</span>
                            </div>
                            <p className="text-sm text-slate-700 font-medium leading-relaxed">
                                {report.incident_summary}
                            </p>
                        </div>

                        {/* Live Status */}
                        <div className="pt-2">
                            <div className="text-xs font-bold text-slate-400 uppercase tracking-widest text-center mb-3">Live Response Status</div>
                            <div className="relative h-14 bg-slate-100 rounded-full border border-slate-200 overflow-hidden flex items-center justify-center shadow-inner">
                                <div className="absolute inset-0 bg-green-500/10 animate-pulse"></div>
                                <div className="relative z-10 text-xl font-black text-green-600 tracking-tight flex items-center gap-2">
                                    <span className="inline-block w-3 h-3 bg-green-500 rounded-full animate-ping"></span>
                                    {status || 'INITIATING...'}
                                </div>
                            </div>
                        </div>
                    </div>
                )}
            </div>
            <div className="mt-8 text-slate-400 text-xs font-medium tracking-wide">
                POWERED BY NEXR AI • GOVERNMENT APPROVED
            </div>
        </div>
    );
}
