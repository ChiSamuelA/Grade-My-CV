import React, { useState, type FormEvent } from 'react'
import FileUploader from '~/components/FileUploader';
import Navbar from '~/components/Navbar'

const Upload = () => {
    const [ isProcessing, setIsProcessing ] = useState(false)
    const [ statusText, setStatusText ] = useState('');
    const [ file, setFile ] = useState<File | null>(null);

    const handleFileSelect = (file: File | null) => {
        setFile(file)
    }

    const handleSubmit = (e: FormEvent<HTMLFormElement>) => {
        e.preventDefault()
        const form = e.currentTarget.closest('form');
        if(!form) return;
        const formData = new FormData(form);

        const companyName = formData.get('company-name');
        const jobTitle = formData.get('job-title');
        const jobDescription = formData.get('job-description');

        console.log({
            companyName, jobTitle, jobDescription,file
        });
        
    }

  return (
    <main className="bg-[url('/images/bg-main.svg')] bg-cover">
      <Navbar />

      <section className="main-section">
        <div className="page-heading py-14">
            <h1 className='capitalize'>smart feedback for your dream job</h1>
            { isProcessing ? (
                <>
                    <h2>{ statusText }</h2>
                    <img src="/images/resume-scan.gif" alt="" className='w-full' />
                </>
            ): (
                <h2 className='capitalize'>drop your resume for an ATS score and improvement tips</h2>
            )}

            { !isProcessing && (
                <form id='upload-file' onSubmit={handleSubmit} className='flex flex-col gap-4 mt-6'>
                    <div className="form-div">
                        <label htmlFor="company-name" className='capitalize'>company name</label>
                        <input type="text" name='company-name' placeholder='Company Name' id='company-name' />
                    </div>

                    <div className="form-div">
                        <label htmlFor="job-title" className='capitalize'>job title</label>
                        <input type="text" name='job-title' placeholder='Job Title' id='job-title' />
                    </div>

                    <div className="form-div">
                        <label htmlFor="job-description" className='capitalize'>job description</label>
                        <textarea rows={5} name='job-description' placeholder='Job-Description' id='job-description' />
                    </div>

                    <div className="form-div">
                        <label htmlFor="uploader" className='capitalize'>upload resume</label>
                        <FileUploader onFileSelect={handleFileSelect} />
                    </div>

                    <button className="primary-button capitalize" type='submit'>analyze resume</button>
                </form>
            )}
        </div>
      </section>
    </main>
  )
}

export default Upload
