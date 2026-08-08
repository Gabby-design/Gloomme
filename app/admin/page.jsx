'use client'

import { useState } from 'react'
import { createClient } from '../../utils/supabase/client'
import toast from 'react-hot-toast'

export default function AdminDashboard() {
  const [loading, setLoading] = useState(false)
  const supabase = createClient()

  async function handleUpload(e) {
    e.preventDefault()
    setLoading(true)
    
    const formData = new FormData(e.target)
    const name = formData.get('name')
    const price = formData.get('price')
    const description = formData.get('description')
    const imageFile = formData.get('image')

    try {
      let imageUrl = null

      if (imageFile && imageFile.size > 0) {
        const fileExt = imageFile.name.split('.').pop()
        const fileName = `${Math.random()}.${fileExt}`
        const filePath = `${fileName}`

        const { error: uploadError } = await supabase.storage
          .from('products') // Assuming a bucket named 'products'
          .upload(filePath, imageFile)

        if (uploadError) {
          throw uploadError
        }

        const { data: publicUrlData } = supabase.storage
          .from('products')
          .getPublicUrl(filePath)
          
        imageUrl = publicUrlData.publicUrl
      }

      // We will insert into a hypothetical 'products' table.
      // If the table doesn't exist, this will fail, but the form is ready.
      const { error: dbError } = await supabase
        .from('products')
        .insert([{ 
          name, 
          price: parseFloat(price), 
          description, 
          image_url: imageUrl 
        }])

      if (dbError) throw dbError

      toast.success('T-Shirt uploaded successfully!')
      e.target.reset()
    } catch (error) {
      console.error(error)
      toast.error(`Upload failed: ${error.message}`)
    } finally {
      setLoading(false)
    }
  }

  return (
    <div className="max-w-2xl mx-auto bg-white p-8 border border-neutral-200">
      <h2 className="text-2xl font-bold text-[#1a1a1a] mb-6 font-['Syne']">
        Upload New T-Shirt
      </h2>
      <form onSubmit={handleUpload} className="flex flex-col gap-6">
        <div className="flex flex-col gap-2">
          <label className="text-sm font-semibold text-[#1a1a1a] font-['DM_Sans']">
            Product Name
          </label>
          <input
            name="name"
            type="text"
            required
            className="px-4 py-3 border border-neutral-300 focus:outline-none focus:border-[#1a1a1a] transition-colors bg-[#f8f8f8] text-[#1a1a1a] font-['DM_Sans']"
          />
        </div>

        <div className="flex flex-col gap-2">
          <label className="text-sm font-semibold text-[#1a1a1a] font-['DM_Sans']">
            Price (in USD)
          </label>
          <input
            name="price"
            type="number"
            step="0.01"
            required
            className="px-4 py-3 border border-neutral-300 focus:outline-none focus:border-[#1a1a1a] transition-colors bg-[#f8f8f8] text-[#1a1a1a] font-['DM_Sans']"
          />
        </div>

        <div className="flex flex-col gap-2">
          <label className="text-sm font-semibold text-[#1a1a1a] font-['DM_Sans']">
            Description
          </label>
          <textarea
            name="description"
            rows="4"
            required
            className="px-4 py-3 border border-neutral-300 focus:outline-none focus:border-[#1a1a1a] transition-colors bg-[#f8f8f8] text-[#1a1a1a] font-['DM_Sans']"
          ></textarea>
        </div>

        <div className="flex flex-col gap-2">
          <label className="text-sm font-semibold text-[#1a1a1a] font-['DM_Sans']">
            Product Image
          </label>
          <input
            name="image"
            type="file"
            accept="image/*"
            required
            className="font-['DM_Sans'] file:mr-4 file:py-2 file:px-4 file:border-0 file:text-sm file:font-semibold file:bg-[#1a1a1a] file:text-[#f8f8f8] hover:file:bg-neutral-800 transition-colors"
          />
          <p className="text-xs text-neutral-500 font-['DM_Sans'] mt-1">
            * Note: Make sure you have created a public bucket named 'products' in your Supabase Storage.
          </p>
        </div>

        <button
          type="submit"
          disabled={loading}
          className="mt-4 bg-[#1a1a1a] text-[#f8f8f8] font-bold font-['DM_Sans'] uppercase tracking-wider py-4 hover:bg-neutral-800 transition-colors border border-transparent disabled:opacity-50"
        >
          {loading ? 'Uploading...' : 'Upload T-Shirt'}
        </button>
      </form>
    </div>
  )
}
