'use client'

import { useState } from 'react'
import initialData from '../../data/content.json'
import { Save, LogIn, Lock, Database, Trash2, Plus, Upload } from 'lucide-react'

export default function AdminPage() {
  const [passcode, setPasscode] = useState('')
    const [isAuthenticated, setIsAuthenticated] = useState(false)
  
  const [data, setData] = useState<any>(initialData)
  const [activeTab, setActiveTab] = useState('fleet')
  const [status, setStatus] = useState({ type: '', message: '' })
  const [isSaving, setIsSaving] = useState(false)
  const [pendingUploads, setPendingUploads] = useState<any[]>([])

  const handleLogin = (e: React.FormEvent) => {
    e.preventDefault()
    if (passcode === '0315') {
      setIsAuthenticated(true)
    } else {
      setStatus({ type: 'error', message: 'Incorrect passcode' })
    }
  }

  const handleSave = async () => {
    setIsSaving(true)
    setStatus({ type: 'info', message: 'Committing changes to GitHub...' })

    try {
      const res = await fetch('/api/admin/data', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ data, uploads: pendingUploads })
      })

      const result = await res.json()
      
      if (res.ok) {
        setStatus({ type: 'success', message: result.message })
        setPendingUploads([]) // clear uploads after successful save
      } else {
        setStatus({ type: 'error', message: result.error || 'Failed to save changes' })
      }
    } catch (err: any) {
      setStatus({ type: 'error', message: err.message })
    }
    
    setIsSaving(false)
  }

  const handleItemChange = (tab: string, index: number, field: string, value: string) => {
    const newData = { ...data }
    newData[tab][index][field] = value
    setData(newData)
  }

  const handleArrayChange = (tab: string, itemIndex: number, field: string, arrayIndex: number, value: string) => {
    const newData = { ...data }
    newData[tab][itemIndex][field][arrayIndex] = value
    setData(newData)
  }

  const handleImageUpload = (e: React.ChangeEvent<HTMLInputElement>, tab: string, index: number, field: string) => {
    const file = e.target.files?.[0]
    if (!file) return

    const reader = new FileReader()
    reader.onload = (event) => {
      const base64Str = (event.target?.result as string).split(',')[1] // remove data:image/png;base64,
      const filename = `${Date.now()}-${file.name.replace(/\s+/g, '-')}`
      const path = `public/uploads/${filename}`
      const publicUrl = `/uploads/${filename}`

      // Add to pending uploads
      setPendingUploads(prev => [...prev, { path, base64: base64Str }])

      // Update data state with new URL
      handleItemChange(tab, index, field, publicUrl)
    }
    reader.readAsDataURL(file)
  }

  const handleAddItem = () => {
    const newData = { ...data }
    const currentArray = newData[activeTab]
    const template = currentArray.length > 0 ? { ...currentArray[0] } : {}
    
    // Clear the template values but keep structure
    Object.keys(template).forEach(key => {
      if (key === 'id') template[key] = Date.now()
      else if (Array.isArray(template[key])) template[key] = []
      else template[key] = ''
    })

    if (!template.id) template.id = Date.now()
    newData[activeTab] = [...currentArray, template]
    setData(newData)
  }

  const handleDeleteItem = (index: number) => {
    if (!confirm('Are you sure you want to delete this item?')) return
    const newData = { ...data }
    newData[activeTab].splice(index, 1)
    setData(newData)
  }

  if (!isAuthenticated) {
    return (
      <div className="admin-login-wrapper">
        <div className="admin-login-card">
          <div className="admin-icon"><Lock size={48} /></div>
          <h2>Admin Login</h2>
          <p>Please enter your secure passcode to edit website content.</p>
          <form onSubmit={handleLogin}>
            <input 
              type="password" 
              placeholder="Enter passcode" 
              value={passcode} 
              onChange={e => setPasscode(e.target.value)}
              className="admin-input"
            />
            <button type="submit" className="admin-btn"><LogIn size={18} /> Access Dashboard</button>
            {status.message && <div className={`admin-status ${status.type}`}>{status.message}</div>}
          </form>
        </div>
      </div>
    )
  }

  const categories = Object.keys(data)

  return (
    <div className="admin-dashboard">
      <div className="admin-sidebar">
        <div className="admin-sidebar-header">
          <h3><Database size={20} /> GreensCab CMS</h3>
        </div>
        <nav className="admin-nav">
          {categories.map(cat => (
            <button 
              key={cat} 
              className={`admin-nav-btn ${activeTab === cat ? 'active' : ''}`}
              onClick={() => setActiveTab(cat)}
            >
              {cat.charAt(0).toUpperCase() + cat.slice(1)}
            </button>
          ))}
        </nav>
        

      </div>

      <div className="admin-content">
        <div className="admin-header">
          <h2>Editing: {activeTab.charAt(0).toUpperCase() + activeTab.slice(1)}</h2>
          <button className="admin-btn-primary" onClick={handleSave} disabled={isSaving}>
            <Save size={18} /> {isSaving ? 'Saving...' : 'Save to Live Site'}
          </button>
        </div>

        {status.message && (
          <div className={`admin-status-banner ${status.type}`}>
            {status.message}
          </div>
        )}

        <div className="admin-items-grid">
          {data[activeTab].map((item: any, index: number) => (
            <div key={item.id || index} className="admin-item-card">
              <div className="admin-item-header" style={{display: 'flex', justifyContent: 'space-between'}}>
                <strong>{item.name || item.title || `Item ${index + 1}`}</strong>
                <button onClick={() => handleDeleteItem(index)} className="admin-btn-icon danger" title="Delete Item">
                  <Trash2 size={16} />
                </button>
              </div>
              <div className="admin-item-body">
                {Object.keys(item).filter(k => k !== 'id').map(key => (
                  <div key={key} className="admin-field">
                    <label>{key}</label>
                    {key === 'img' || key === 'image' ? (
                      <div className="admin-image-field">
                        <input 
                          type="text" 
                          value={item[key]}
                          onChange={(e) => handleItemChange(activeTab, index, key, e.target.value)}
                          className="admin-input-small"
                          placeholder="Image URL"
                        />
                        <div className="admin-file-upload">
                          <label className="admin-upload-btn">
                            <Upload size={14} /> Upload Image
                            <input 
                              type="file" 
                              accept="image/*" 
                              onChange={(e) => handleImageUpload(e, activeTab, index, key)} 
                              style={{ display: 'none' }}
                            />
                          </label>
                        </div>
                        {item[key] && <img src={item[key]} alt="preview" className="admin-img-preview" />}
                      </div>
                    ) : Array.isArray(item[key]) ? (
                      <div className="admin-array">
                        {item[key].map((arrVal: string, arrIdx: number) => (
                          <input 
                            key={arrIdx}
                            type="text" 
                            value={arrVal}
                            onChange={(e) => handleArrayChange(activeTab, index, key, arrIdx, e.target.value)}
                            className="admin-input-small"
                          />
                        ))}
                      </div>
                    ) : (
                      key === 'desc' || key === 'extra' ? (
                        <textarea 
                          value={item[key]}
                          onChange={(e) => handleItemChange(activeTab, index, key, e.target.value)}
                          className="admin-textarea"
                          rows={3}
                        />
                      ) : (
                        <input 
                          type="text" 
                          value={item[key]}
                          onChange={(e) => handleItemChange(activeTab, index, key, e.target.value)}
                          className="admin-input-small"
                        />
                      )
                    )}
                  </div>
                ))}
              </div>
            </div>
          ))}

          <div className="admin-item-card admin-add-card" onClick={handleAddItem}>
            <div className="admin-add-content">
              <Plus size={32} />
              <span>Add New Item</span>
            </div>
          </div>
        </div>
      </div>
    </div>
  )
}


