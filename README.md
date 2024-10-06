move away from flask and use Fast API

The goal is to build an app that tailors your resume to a job listing. We first load, parse, edit, and finalize the existing resume. We then scrape and parse the job listing. The application then leverages LLM to match bullet points to requirements and rewrite your resume.

# MVP Road Map

- create db models
  - user
  - tailor_job
  - listing
  - resume
  - tailored_resume
- store resume pdf in fs
- store listing html in fs
- call ChatGPT API with resume and listing files
- store tailored resume response in db
- make available for download as pdf

- db tables
  - user
    - user_id: int
    - name: varchar
    - email: varchar
    - phone: int
    - password: varchar
  - tailor_job
    - tailor_job_id: int
    - tailor_job_name: varchar
    - user_id: int
    - resume_id: int
    - listing_id: int
    - tailored_resume_id: int
  - listing
    - listing_id: int
    - user_id: int
    - listing_url: varchar
  - resume
    - resume_id: int
    - user_id: int
    - name: varchar
    - email: varchar
    - phone: int
    - city: varchar
    - skills: array of varchar
    - education: array of objects
    - certifications: array of objects
    - work experience: array of objects
  - tailored_resume
    - tailored_resume_id: int
    - user_id: int
    - name: varchar
    - email: varchar
    - phone: int
    - city: varchar
    - skills: array of varchar
    - education: array of objects
    - certifications: array of objects
    - work experience: array of objects

# 1.0.0 Road Map

- auth
- cover letters
- job board modules
  - indeed
  - ziprecruiter
  - monster
  - glassdoor
  - etc.
- skills db
- automated match and tailor
