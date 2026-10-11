-- =====================================================================
-- EduNexus AI — Synthetic Demo Seed SQL
-- Generated on: 2026-10-11T05:59:46.910822+00:00
-- Total Students: 36
-- =====================================================================

-- 1. Insert Synthetic Students
INSERT INTO public.students (id, student_id, first_name, last_name, email, date_of_birth, gender, enrollment_date, current_grade, academic_term, section, status, notes)
VALUES ('0411a66b-943d-46d5-895d-28026b071aab', 'STU-001', 'Aarav', 'Sharma', 'aarav.sharma@edunexus-demo.example', '2008-04-24', 'Male', '2025-06-21', 'Grade 9', 'AY 2024-25 Term 1', 'A', 'active', 'Synthetic demo profile: high_risk trajectory persona.')
ON CONFLICT (student_id) DO NOTHING;
INSERT INTO public.students (id, student_id, first_name, last_name, email, date_of_birth, gender, enrollment_date, current_grade, academic_term, section, status, notes)
VALUES ('edd5c0e8-986a-4275-b213-362f1d2e2a5e', 'STU-002', 'Diya', 'Patel', 'diya.patel@edunexus-demo.example', '2008-10-03', 'Female', '2025-06-13', 'Grade 10', 'AY 2024-25 Term 2', 'B', 'active', 'Synthetic demo profile: high_risk trajectory persona.')
ON CONFLICT (student_id) DO NOTHING;
INSERT INTO public.students (id, student_id, first_name, last_name, email, date_of_birth, gender, enrollment_date, current_grade, academic_term, section, status, notes)
VALUES ('06088341-1830-40a1-b648-869368a12a82', 'STU-003', 'Rohan', 'Mehta', 'rohan.mehta@edunexus-demo.example', '2008-07-22', 'Male', '2025-06-20', 'Grade 11', 'AY 2025-26 Term 1', 'C', 'active', 'Synthetic demo profile: high_risk trajectory persona.')
ON CONFLICT (student_id) DO NOTHING;
INSERT INTO public.students (id, student_id, first_name, last_name, email, date_of_birth, gender, enrollment_date, current_grade, academic_term, section, status, notes)
VALUES ('d8bcb8d5-c15c-421a-bc22-29148cd4eefc', 'STU-004', 'Ananya', 'Iyer', 'ananya.iyer@edunexus-demo.example', '2009-11-05', 'Female', '2025-06-04', 'Grade 12', 'AY 2025-26 Term 2', 'A', 'active', 'Synthetic demo profile: high_risk trajectory persona.')
ON CONFLICT (student_id) DO NOTHING;
INSERT INTO public.students (id, student_id, first_name, last_name, email, date_of_birth, gender, enrollment_date, current_grade, academic_term, section, status, notes)
VALUES ('3f043811-1641-4ea6-a8b5-c0da39193232', 'STU-005', 'Vikram', 'Reddy', 'vikram.reddy@edunexus-demo.example', '2009-08-31', 'Male', '2025-06-19', 'Grade 9', 'AY 2024-25 Term 1', 'B', 'active', 'Synthetic demo profile: high_risk trajectory persona.')
ON CONFLICT (student_id) DO NOTHING;
INSERT INTO public.students (id, student_id, first_name, last_name, email, date_of_birth, gender, enrollment_date, current_grade, academic_term, section, status, notes)
VALUES ('b208e78a-2f96-4e70-bc46-99e51f4d6543', 'STU-006', 'Ishita', 'Verma', 'ishita.verma@edunexus-demo.example', '2008-03-18', 'Female', '2025-06-04', 'Grade 10', 'AY 2024-25 Term 2', 'C', 'active', 'Synthetic demo profile: high_risk trajectory persona.')
ON CONFLICT (student_id) DO NOTHING;
INSERT INTO public.students (id, student_id, first_name, last_name, email, date_of_birth, gender, enrollment_date, current_grade, academic_term, section, status, notes)
VALUES ('bef6289e-41de-428e-b7bf-13a855d6e54e', 'STU-007', 'Kabir', 'Kapoor', 'kabir.kapoor@edunexus-demo.example', '2009-01-29', 'Male', '2025-06-04', 'Grade 11', 'AY 2025-26 Term 1', 'A', 'active', 'Synthetic demo profile: moderate_risk trajectory persona.')
ON CONFLICT (student_id) DO NOTHING;
INSERT INTO public.students (id, student_id, first_name, last_name, email, date_of_birth, gender, enrollment_date, current_grade, academic_term, section, status, notes)
VALUES ('fef234a8-0c9c-468f-9383-f850a6082dc6', 'STU-008', 'Meera', 'Nair', 'meera.nair@edunexus-demo.example', '2010-02-07', 'Female', '2025-06-29', 'Grade 12', 'AY 2025-26 Term 2', 'B', 'active', 'Synthetic demo profile: moderate_risk trajectory persona.')
ON CONFLICT (student_id) DO NOTHING;
INSERT INTO public.students (id, student_id, first_name, last_name, email, date_of_birth, gender, enrollment_date, current_grade, academic_term, section, status, notes)
VALUES ('b7263fba-7dd1-48ee-99f4-be591aab11ad', 'STU-009', 'Aditya', 'Gupta', 'aditya.gupta@edunexus-demo.example', '2009-03-22', 'Male', '2025-06-09', 'Grade 9', 'AY 2024-25 Term 1', 'C', 'active', 'Synthetic demo profile: moderate_risk trajectory persona.')
ON CONFLICT (student_id) DO NOTHING;
INSERT INTO public.students (id, student_id, first_name, last_name, email, date_of_birth, gender, enrollment_date, current_grade, academic_term, section, status, notes)
VALUES ('f76a0ab1-57e1-482c-a611-f09c0932d6b8', 'STU-010', 'Pooja', 'Deshmukh', 'pooja.deshmukh@edunexus-demo.example', '2009-08-02', 'Female', '2025-06-26', 'Grade 10', 'AY 2024-25 Term 2', 'A', 'active', 'Synthetic demo profile: moderate_risk trajectory persona.')
ON CONFLICT (student_id) DO NOTHING;
INSERT INTO public.students (id, student_id, first_name, last_name, email, date_of_birth, gender, enrollment_date, current_grade, academic_term, section, status, notes)
VALUES ('eca115ce-9ee0-4d3c-965d-e0a3a33b40c7', 'STU-011', 'Arjun', 'Chopra', 'arjun.chopra@edunexus-demo.example', '2010-02-02', 'Male', '2025-06-14', 'Grade 11', 'AY 2025-26 Term 1', 'B', 'active', 'Synthetic demo profile: moderate_risk trajectory persona.')
ON CONFLICT (student_id) DO NOTHING;
INSERT INTO public.students (id, student_id, first_name, last_name, email, date_of_birth, gender, enrollment_date, current_grade, academic_term, section, status, notes)
VALUES ('06024d12-eb44-4417-8688-5eb60d3cff12', 'STU-012', 'Sneha', 'Joshi', 'sneha.joshi@edunexus-demo.example', '2010-09-10', 'Female', '2025-06-20', 'Grade 12', 'AY 2025-26 Term 2', 'C', 'active', 'Synthetic demo profile: moderate_risk trajectory persona.')
ON CONFLICT (student_id) DO NOTHING;
INSERT INTO public.students (id, student_id, first_name, last_name, email, date_of_birth, gender, enrollment_date, current_grade, academic_term, section, status, notes)
VALUES ('0ed0d835-d441-45ea-98da-efe44480ad7a', 'STU-013', 'Karan', 'Bose', 'karan.bose@edunexus-demo.example', '2009-03-22', 'Male', '2025-06-19', 'Grade 9', 'AY 2024-25 Term 1', 'A', 'active', 'Synthetic demo profile: moderate_risk trajectory persona.')
ON CONFLICT (student_id) DO NOTHING;
INSERT INTO public.students (id, student_id, first_name, last_name, email, date_of_birth, gender, enrollment_date, current_grade, academic_term, section, status, notes)
VALUES ('23c7c2fc-8dec-42bf-b8c2-a1b7a497a8e6', 'STU-014', 'Tanvi', 'Kulkarni', 'tanvi.kulkarni@edunexus-demo.example', '2008-03-12', 'Female', '2025-06-28', 'Grade 10', 'AY 2024-25 Term 2', 'B', 'active', 'Synthetic demo profile: moderate_risk trajectory persona.')
ON CONFLICT (student_id) DO NOTHING;
INSERT INTO public.students (id, student_id, first_name, last_name, email, date_of_birth, gender, enrollment_date, current_grade, academic_term, section, status, notes)
VALUES ('91ce6ee5-9509-461e-ae83-f443631a3016', 'STU-015', 'Nikhil', 'Sen', 'nikhil.sen@edunexus-demo.example', '2008-04-10', 'Male', '2025-06-14', 'Grade 11', 'AY 2025-26 Term 1', 'C', 'active', 'Synthetic demo profile: standard trajectory persona.')
ON CONFLICT (student_id) DO NOTHING;
INSERT INTO public.students (id, student_id, first_name, last_name, email, date_of_birth, gender, enrollment_date, current_grade, academic_term, section, status, notes)
VALUES ('689593b4-7c6c-42a3-a041-16f1ac029f06', 'STU-016', 'Priya', 'Pillai', 'priya.pillai@edunexus-demo.example', '2008-04-09', 'Female', '2025-06-21', 'Grade 12', 'AY 2025-26 Term 2', 'A', 'active', 'Synthetic demo profile: standard trajectory persona.')
ON CONFLICT (student_id) DO NOTHING;
INSERT INTO public.students (id, student_id, first_name, last_name, email, date_of_birth, gender, enrollment_date, current_grade, academic_term, section, status, notes)
VALUES ('20d07c0c-ac56-4b30-8e9c-f79cad701de3', 'STU-017', 'Siddharth', 'Choudhury', 'siddharth.choudhury@edunexus-demo.example', '2009-11-17', 'Male', '2025-06-12', 'Grade 9', 'AY 2024-25 Term 1', 'B', 'active', 'Synthetic demo profile: standard trajectory persona.')
ON CONFLICT (student_id) DO NOTHING;
INSERT INTO public.students (id, student_id, first_name, last_name, email, date_of_birth, gender, enrollment_date, current_grade, academic_term, section, status, notes)
VALUES ('04bdc67a-42d0-4872-b096-afdd8e4549db', 'STU-018', 'Rhea', 'Bhat', 'rhea.bhat@edunexus-demo.example', '2008-03-06', 'Female', '2025-06-24', 'Grade 10', 'AY 2024-25 Term 2', 'C', 'active', 'Synthetic demo profile: standard trajectory persona.')
ON CONFLICT (student_id) DO NOTHING;
INSERT INTO public.students (id, student_id, first_name, last_name, email, date_of_birth, gender, enrollment_date, current_grade, academic_term, section, status, notes)
VALUES ('e89ca679-ca93-4c30-9621-450664c5b826', 'STU-019', 'Dhruv', 'Malhotra', 'dhruv.malhotra@edunexus-demo.example', '2008-12-28', 'Male', '2025-06-14', 'Grade 11', 'AY 2025-26 Term 1', 'A', 'active', 'Synthetic demo profile: standard trajectory persona.')
ON CONFLICT (student_id) DO NOTHING;
INSERT INTO public.students (id, student_id, first_name, last_name, email, date_of_birth, gender, enrollment_date, current_grade, academic_term, section, status, notes)
VALUES ('23bae913-0d5d-498a-88c5-5bd5bfcc2901', 'STU-020', 'Kavya', 'Rao', 'kavya.rao@edunexus-demo.example', '2010-02-12', 'Female', '2025-06-07', 'Grade 12', 'AY 2025-26 Term 2', 'B', 'active', 'Synthetic demo profile: standard trajectory persona.')
ON CONFLICT (student_id) DO NOTHING;
INSERT INTO public.students (id, student_id, first_name, last_name, email, date_of_birth, gender, enrollment_date, current_grade, academic_term, section, status, notes)
VALUES ('05089772-5251-4ee4-83ce-87f21ae73662', 'STU-021', 'Rahul', 'Singhania', 'rahul.singhania@edunexus-demo.example', '2008-06-26', 'Male', '2025-06-07', 'Grade 9', 'AY 2024-25 Term 1', 'C', 'active', 'Synthetic demo profile: standard trajectory persona.')
ON CONFLICT (student_id) DO NOTHING;
INSERT INTO public.students (id, student_id, first_name, last_name, email, date_of_birth, gender, enrollment_date, current_grade, academic_term, section, status, notes)
VALUES ('78e7fd7b-5932-428e-9786-3195e157ae0e', 'STU-022', 'Neha', 'Mukherjee', 'neha.mukherjee@edunexus-demo.example', '2009-07-25', 'Female', '2025-06-04', 'Grade 10', 'AY 2024-25 Term 2', 'A', 'active', 'Synthetic demo profile: standard trajectory persona.')
ON CONFLICT (student_id) DO NOTHING;
INSERT INTO public.students (id, student_id, first_name, last_name, email, date_of_birth, gender, enrollment_date, current_grade, academic_term, section, status, notes)
VALUES ('f45c2d18-420f-4a52-98a6-f8f5b8211c51', 'STU-023', 'Varun', 'Das', 'varun.das@edunexus-demo.example', '2010-04-08', 'Male', '2025-07-01', 'Grade 11', 'AY 2025-26 Term 1', 'B', 'active', 'Synthetic demo profile: standard trajectory persona.')
ON CONFLICT (student_id) DO NOTHING;
INSERT INTO public.students (id, student_id, first_name, last_name, email, date_of_birth, gender, enrollment_date, current_grade, academic_term, section, status, notes)
VALUES ('a5859586-17fe-40e2-89df-e2adbaeb7e3f', 'STU-024', 'Simran', 'Saxena', 'simran.saxena@edunexus-demo.example', '2008-11-04', 'Female', '2025-06-08', 'Grade 12', 'AY 2025-26 Term 2', 'C', 'active', 'Synthetic demo profile: standard trajectory persona.')
ON CONFLICT (student_id) DO NOTHING;
INSERT INTO public.students (id, student_id, first_name, last_name, email, date_of_birth, gender, enrollment_date, current_grade, academic_term, section, status, notes)
VALUES ('4a0b911a-abfd-4139-b18d-eb21fb120991', 'STU-025', 'Manish', 'Mishra', 'manish.mishra@edunexus-demo.example', '2009-11-02', 'Male', '2025-06-28', 'Grade 9', 'AY 2024-25 Term 1', 'A', 'active', 'Synthetic demo profile: standard trajectory persona.')
ON CONFLICT (student_id) DO NOTHING;
INSERT INTO public.students (id, student_id, first_name, last_name, email, date_of_birth, gender, enrollment_date, current_grade, academic_term, section, status, notes)
VALUES ('d7bb4c48-ee9b-41d9-b303-68427673dd14', 'STU-026', 'Shreya', 'Trivedi', 'shreya.trivedi@edunexus-demo.example', '2009-06-14', 'Female', '2025-06-16', 'Grade 10', 'AY 2024-25 Term 2', 'B', 'active', 'Synthetic demo profile: standard trajectory persona.')
ON CONFLICT (student_id) DO NOTHING;
INSERT INTO public.students (id, student_id, first_name, last_name, email, date_of_birth, gender, enrollment_date, current_grade, academic_term, section, status, notes)
VALUES ('c6518feb-e30e-4c60-992b-7b67af2efe1a', 'STU-027', 'Akash', 'Banerjee', 'akash.banerjee@edunexus-demo.example', '2008-11-26', 'Male', '2025-06-06', 'Grade 11', 'AY 2025-26 Term 1', 'C', 'active', 'Synthetic demo profile: standard trajectory persona.')
ON CONFLICT (student_id) DO NOTHING;
INSERT INTO public.students (id, student_id, first_name, last_name, email, date_of_birth, gender, enrollment_date, current_grade, academic_term, section, status, notes)
VALUES ('e3f1d90f-85ed-4367-a618-8604c886458e', 'STU-028', 'Tara', 'Menon', 'tara.menon@edunexus-demo.example', '2008-02-21', 'Female', '2025-06-04', 'Grade 12', 'AY 2025-26 Term 2', 'A', 'active', 'Synthetic demo profile: standard trajectory persona.')
ON CONFLICT (student_id) DO NOTHING;
INSERT INTO public.students (id, student_id, first_name, last_name, email, date_of_birth, gender, enrollment_date, current_grade, academic_term, section, status, notes)
VALUES ('b0d23702-e1d5-4b0a-9bdb-13a4c496dfba', 'STU-029', 'Gaurav', 'Agarwal', 'gaurav.agarwal@edunexus-demo.example', '2009-09-12', 'Male', '2025-06-05', 'Grade 9', 'AY 2024-25 Term 1', 'B', 'active', 'Synthetic demo profile: standard trajectory persona.')
ON CONFLICT (student_id) DO NOTHING;
INSERT INTO public.students (id, student_id, first_name, last_name, email, date_of_birth, gender, enrollment_date, current_grade, academic_term, section, status, notes)
VALUES ('82bf37fc-0077-4756-b27a-b23dd1d6ceaa', 'STU-030', 'Divya', 'Nambiar', 'divya.nambiar@edunexus-demo.example', '2008-12-28', 'Female', '2025-06-18', 'Grade 10', 'AY 2024-25 Term 2', 'C', 'active', 'Synthetic demo profile: standard trajectory persona.')
ON CONFLICT (student_id) DO NOTHING;
INSERT INTO public.students (id, student_id, first_name, last_name, email, date_of_birth, gender, enrollment_date, current_grade, academic_term, section, status, notes)
VALUES ('cc13ac1f-cca4-4600-8dd7-f49f124c855d', 'STU-031', 'Dev', 'Thakur', 'dev.thakur@edunexus-demo.example', '2008-10-19', 'Male', '2025-06-11', 'Grade 11', 'AY 2025-26 Term 1', 'A', 'active', 'Synthetic demo profile: standard trajectory persona.')
ON CONFLICT (student_id) DO NOTHING;
INSERT INTO public.students (id, student_id, first_name, last_name, email, date_of_birth, gender, enrollment_date, current_grade, academic_term, section, status, notes)
VALUES ('338719c7-39d7-4471-919b-13bd4ab61261', 'STU-032', 'Ira', 'Pandey', 'ira.pandey@edunexus-demo.example', '2008-08-29', 'Female', '2025-06-23', 'Grade 12', 'AY 2025-26 Term 2', 'B', 'active', 'Synthetic demo profile: standard trajectory persona.')
ON CONFLICT (student_id) DO NOTHING;
INSERT INTO public.students (id, student_id, first_name, last_name, email, date_of_birth, gender, enrollment_date, current_grade, academic_term, section, status, notes)
VALUES ('6c1c4728-a4f1-4c03-bebb-a55afe559ac5', 'STU-033', 'Harsh', 'Dutta', 'harsh.dutta@edunexus-demo.example', '2009-12-18', 'Male', '2025-06-12', 'Grade 9', 'AY 2024-25 Term 1', 'C', 'active', 'Synthetic demo profile: standard trajectory persona.')
ON CONFLICT (student_id) DO NOTHING;
INSERT INTO public.students (id, student_id, first_name, last_name, email, date_of_birth, gender, enrollment_date, current_grade, academic_term, section, status, notes)
VALUES ('71149234-66ac-4fba-be76-07ea55d85ae9', 'STU-034', 'Aditi', 'Goswami', 'aditi.goswami@edunexus-demo.example', '2009-09-04', 'Female', '2025-06-19', 'Grade 10', 'AY 2024-25 Term 2', 'A', 'active', 'Synthetic demo profile: standard trajectory persona.')
ON CONFLICT (student_id) DO NOTHING;
INSERT INTO public.students (id, student_id, first_name, last_name, email, date_of_birth, gender, enrollment_date, current_grade, academic_term, section, status, notes)
VALUES ('b2b2a424-b2a2-4cd8-8261-fa53cd7c6397', 'STU-035', 'Pranav', 'Bhattacharya', 'pranav.bhattacharya@edunexus-demo.example', '2010-07-26', 'Male', '2025-06-13', 'Grade 11', 'AY 2025-26 Term 1', 'B', 'active', 'Synthetic demo profile: standard trajectory persona.')
ON CONFLICT (student_id) DO NOTHING;
INSERT INTO public.students (id, student_id, first_name, last_name, email, date_of_birth, gender, enrollment_date, current_grade, academic_term, section, status, notes)
VALUES ('4e57e01c-8466-4ce3-b1f6-95cc2c119c64', 'STU-036', 'Zoya', 'Sethi', 'zoya.sethi@edunexus-demo.example', '2009-05-14', 'Female', '2025-06-22', 'Grade 12', 'AY 2025-26 Term 2', 'C', 'active', 'Synthetic demo profile: standard trajectory persona.')
ON CONFLICT (student_id) DO NOTHING;

-- 2. Insert Synthetic Attendance Records
INSERT INTO public.attendance (id, student_id, session_date, period, status, remarks)
VALUES ('e50d617f-7bd8-4498-91d0-2698f151a1ed', '0411a66b-943d-46d5-895d-28026b071aab', '2025-08-01', 'full_day', 'present', NULL)
ON CONFLICT (student_id, session_date, period) DO NOTHING;
INSERT INTO public.attendance (id, student_id, session_date, period, status, remarks)
VALUES ('c504a3a6-5249-4513-9f8b-45d7db381bee', '0411a66b-943d-46d5-895d-28026b071aab', '2025-08-04', 'full_day', 'present', NULL)
ON CONFLICT (student_id, session_date, period) DO NOTHING;
INSERT INTO public.attendance (id, student_id, session_date, period, status, remarks)
VALUES ('24dca464-12f4-483c-8bf8-4ba5855e3634', '0411a66b-943d-46d5-895d-28026b071aab', '2025-08-05', 'full_day', 'present', NULL)
ON CONFLICT (student_id, session_date, period) DO NOTHING;
INSERT INTO public.attendance (id, student_id, session_date, period, status, remarks)
VALUES ('2ca9056b-8757-4a4b-b759-67e8c53fd457', '0411a66b-943d-46d5-895d-28026b071aab', '2025-08-06', 'full_day', 'absent', 'Morning roll call record')
ON CONFLICT (student_id, session_date, period) DO NOTHING;
INSERT INTO public.attendance (id, student_id, session_date, period, status, remarks)
VALUES ('498d3475-017c-4364-97c1-360b361e312a', '0411a66b-943d-46d5-895d-28026b071aab', '2025-08-07', 'full_day', 'absent', 'Morning roll call record')
ON CONFLICT (student_id, session_date, period) DO NOTHING;
INSERT INTO public.attendance (id, student_id, session_date, period, status, remarks)
VALUES ('297d219b-add4-4e8b-9590-b8a165c62603', '0411a66b-943d-46d5-895d-28026b071aab', '2025-08-08', 'full_day', 'absent', 'Morning roll call record')
ON CONFLICT (student_id, session_date, period) DO NOTHING;
INSERT INTO public.attendance (id, student_id, session_date, period, status, remarks)
VALUES ('3092f78e-534a-46ab-93e2-ab0c9785bc59', '0411a66b-943d-46d5-895d-28026b071aab', '2025-08-11', 'full_day', 'present', NULL)
ON CONFLICT (student_id, session_date, period) DO NOTHING;
INSERT INTO public.attendance (id, student_id, session_date, period, status, remarks)
VALUES ('2b7bfa26-ce32-479d-aae2-fc6adea72e6e', '0411a66b-943d-46d5-895d-28026b071aab', '2025-08-12', 'full_day', 'present', NULL)
ON CONFLICT (student_id, session_date, period) DO NOTHING;
INSERT INTO public.attendance (id, student_id, session_date, period, status, remarks)
VALUES ('7fb1f1c7-040a-4482-b529-8aff850213c2', '0411a66b-943d-46d5-895d-28026b071aab', '2025-08-13', 'full_day', 'present', NULL)
ON CONFLICT (student_id, session_date, period) DO NOTHING;
INSERT INTO public.attendance (id, student_id, session_date, period, status, remarks)
VALUES ('190d5d33-8412-42ab-8854-4237b60fcb06', '0411a66b-943d-46d5-895d-28026b071aab', '2025-08-14', 'full_day', 'present', NULL)
ON CONFLICT (student_id, session_date, period) DO NOTHING;
INSERT INTO public.attendance (id, student_id, session_date, period, status, remarks)
VALUES ('f6be6404-0d20-47ac-9451-8fd737273c99', '0411a66b-943d-46d5-895d-28026b071aab', '2025-08-15', 'full_day', 'late', 'Morning roll call record')
ON CONFLICT (student_id, session_date, period) DO NOTHING;
INSERT INTO public.attendance (id, student_id, session_date, period, status, remarks)
VALUES ('fbef41d4-c676-43fd-ba6c-985ab9a858c4', '0411a66b-943d-46d5-895d-28026b071aab', '2025-08-18', 'full_day', 'present', NULL)
ON CONFLICT (student_id, session_date, period) DO NOTHING;
INSERT INTO public.attendance (id, student_id, session_date, period, status, remarks)
VALUES ('d0fff3db-607a-488c-846a-27cf30382561', '0411a66b-943d-46d5-895d-28026b071aab', '2025-08-19', 'full_day', 'present', NULL)
ON CONFLICT (student_id, session_date, period) DO NOTHING;
INSERT INTO public.attendance (id, student_id, session_date, period, status, remarks)
VALUES ('6db4eabd-2337-4259-a13f-958a7a4aef5d', '0411a66b-943d-46d5-895d-28026b071aab', '2025-08-20', 'full_day', 'late', 'Morning roll call record')
ON CONFLICT (student_id, session_date, period) DO NOTHING;
INSERT INTO public.attendance (id, student_id, session_date, period, status, remarks)
VALUES ('19a01f17-7760-48b2-8667-9f9e01a0bc1f', '0411a66b-943d-46d5-895d-28026b071aab', '2025-08-21', 'full_day', 'late', 'Morning roll call record')
ON CONFLICT (student_id, session_date, period) DO NOTHING;
INSERT INTO public.attendance (id, student_id, session_date, period, status, remarks)
VALUES ('f20f41b6-83d2-4c37-910c-b173aaf862a5', '0411a66b-943d-46d5-895d-28026b071aab', '2025-08-22', 'full_day', 'present', NULL)
ON CONFLICT (student_id, session_date, period) DO NOTHING;
INSERT INTO public.attendance (id, student_id, session_date, period, status, remarks)
VALUES ('1edf9b85-3c55-4164-8ab8-6240c2a02b7b', '0411a66b-943d-46d5-895d-28026b071aab', '2025-08-25', 'full_day', 'late', 'Morning roll call record')
ON CONFLICT (student_id, session_date, period) DO NOTHING;
INSERT INTO public.attendance (id, student_id, session_date, period, status, remarks)
VALUES ('0fa9f808-1b72-4b69-a93f-8049a0c458ec', '0411a66b-943d-46d5-895d-28026b071aab', '2025-08-26', 'full_day', 'absent', 'Morning roll call record')
ON CONFLICT (student_id, session_date, period) DO NOTHING;
INSERT INTO public.attendance (id, student_id, session_date, period, status, remarks)
VALUES ('0f0dfa0c-a9f6-4ccb-9b10-b0ff9046f7e3', '0411a66b-943d-46d5-895d-28026b071aab', '2025-08-27', 'full_day', 'present', NULL)
ON CONFLICT (student_id, session_date, period) DO NOTHING;
INSERT INTO public.attendance (id, student_id, session_date, period, status, remarks)
VALUES ('c775436d-a47e-49cd-a3c7-be72b781ed1d', '0411a66b-943d-46d5-895d-28026b071aab', '2025-08-28', 'full_day', 'absent', 'Morning roll call record')
ON CONFLICT (student_id, session_date, period) DO NOTHING;
INSERT INTO public.attendance (id, student_id, session_date, period, status, remarks)
VALUES ('590f78d2-b3f0-47b5-8457-e3fc3393de7f', '0411a66b-943d-46d5-895d-28026b071aab', '2025-08-29', 'full_day', 'absent', 'Morning roll call record')
ON CONFLICT (student_id, session_date, period) DO NOTHING;
INSERT INTO public.attendance (id, student_id, session_date, period, status, remarks)
VALUES ('f61d3537-9c04-443c-a26f-4ae669a2c079', 'edd5c0e8-986a-4275-b213-362f1d2e2a5e', '2025-08-01', 'full_day', 'excused', 'Morning roll call record')
ON CONFLICT (student_id, session_date, period) DO NOTHING;
INSERT INTO public.attendance (id, student_id, session_date, period, status, remarks)
VALUES ('90213963-1008-4889-bfc9-282933862552', 'edd5c0e8-986a-4275-b213-362f1d2e2a5e', '2025-08-04', 'full_day', 'late', 'Morning roll call record')
ON CONFLICT (student_id, session_date, period) DO NOTHING;
INSERT INTO public.attendance (id, student_id, session_date, period, status, remarks)
VALUES ('b2b8277d-1ac0-4f45-a5b6-d54ba26e95b4', 'edd5c0e8-986a-4275-b213-362f1d2e2a5e', '2025-08-05', 'full_day', 'late', 'Morning roll call record')
ON CONFLICT (student_id, session_date, period) DO NOTHING;
INSERT INTO public.attendance (id, student_id, session_date, period, status, remarks)
VALUES ('40e13ca7-7dbb-491d-9fd5-35512da7bd72', 'edd5c0e8-986a-4275-b213-362f1d2e2a5e', '2025-08-06', 'full_day', 'absent', 'Morning roll call record')
ON CONFLICT (student_id, session_date, period) DO NOTHING;
INSERT INTO public.attendance (id, student_id, session_date, period, status, remarks)
VALUES ('8113ce45-cf96-418b-8f07-6c62e8ef05a0', 'edd5c0e8-986a-4275-b213-362f1d2e2a5e', '2025-08-07', 'full_day', 'absent', 'Morning roll call record')
ON CONFLICT (student_id, session_date, period) DO NOTHING;
INSERT INTO public.attendance (id, student_id, session_date, period, status, remarks)
VALUES ('72cd885b-c21f-429a-b247-f18f86a5ddb2', 'edd5c0e8-986a-4275-b213-362f1d2e2a5e', '2025-08-08', 'full_day', 'absent', 'Morning roll call record')
ON CONFLICT (student_id, session_date, period) DO NOTHING;
INSERT INTO public.attendance (id, student_id, session_date, period, status, remarks)
VALUES ('fe1327ee-395a-4827-b56e-9c05b2ce83cb', 'edd5c0e8-986a-4275-b213-362f1d2e2a5e', '2025-08-11', 'full_day', 'present', NULL)
ON CONFLICT (student_id, session_date, period) DO NOTHING;
INSERT INTO public.attendance (id, student_id, session_date, period, status, remarks)
VALUES ('2fa67f59-3ce9-4d2d-a131-8f9dc1f8ff61', 'edd5c0e8-986a-4275-b213-362f1d2e2a5e', '2025-08-12', 'full_day', 'present', NULL)
ON CONFLICT (student_id, session_date, period) DO NOTHING;
INSERT INTO public.attendance (id, student_id, session_date, period, status, remarks)
VALUES ('06cfe08f-b9d3-4658-960b-47c85d57cb68', 'edd5c0e8-986a-4275-b213-362f1d2e2a5e', '2025-08-13', 'full_day', 'present', NULL)
ON CONFLICT (student_id, session_date, period) DO NOTHING;
INSERT INTO public.attendance (id, student_id, session_date, period, status, remarks)
VALUES ('d8236498-9236-465b-ac91-5930137480c5', 'edd5c0e8-986a-4275-b213-362f1d2e2a5e', '2025-08-14', 'full_day', 'present', NULL)
ON CONFLICT (student_id, session_date, period) DO NOTHING;
INSERT INTO public.attendance (id, student_id, session_date, period, status, remarks)
VALUES ('6ff129fe-9e40-4a5f-8be9-dcbc2a20b645', 'edd5c0e8-986a-4275-b213-362f1d2e2a5e', '2025-08-15', 'full_day', 'present', NULL)
ON CONFLICT (student_id, session_date, period) DO NOTHING;
INSERT INTO public.attendance (id, student_id, session_date, period, status, remarks)
VALUES ('45d289fb-4d2e-4ecb-9fd6-2e76d8081b87', 'edd5c0e8-986a-4275-b213-362f1d2e2a5e', '2025-08-18', 'full_day', 'absent', 'Morning roll call record')
ON CONFLICT (student_id, session_date, period) DO NOTHING;
INSERT INTO public.attendance (id, student_id, session_date, period, status, remarks)
VALUES ('6790a1b8-299c-4927-b3a9-13b994377ce8', 'edd5c0e8-986a-4275-b213-362f1d2e2a5e', '2025-08-19', 'full_day', 'absent', 'Morning roll call record')
ON CONFLICT (student_id, session_date, period) DO NOTHING;
INSERT INTO public.attendance (id, student_id, session_date, period, status, remarks)
VALUES ('de28dc34-5551-40a0-a06a-50f90337dded', 'edd5c0e8-986a-4275-b213-362f1d2e2a5e', '2025-08-20', 'full_day', 'present', NULL)
ON CONFLICT (student_id, session_date, period) DO NOTHING;
INSERT INTO public.attendance (id, student_id, session_date, period, status, remarks)
VALUES ('0cfa04eb-0c3c-4826-9c04-e7dab3502f27', 'edd5c0e8-986a-4275-b213-362f1d2e2a5e', '2025-08-21', 'full_day', 'absent', 'Morning roll call record')
ON CONFLICT (student_id, session_date, period) DO NOTHING;
INSERT INTO public.attendance (id, student_id, session_date, period, status, remarks)
VALUES ('c50ce9fa-1bbf-42b9-948e-7c5757e0562c', 'edd5c0e8-986a-4275-b213-362f1d2e2a5e', '2025-08-22', 'full_day', 'present', NULL)
ON CONFLICT (student_id, session_date, period) DO NOTHING;
INSERT INTO public.attendance (id, student_id, session_date, period, status, remarks)
VALUES ('63811f70-bcea-442b-b0ea-6338df5a8c50', 'edd5c0e8-986a-4275-b213-362f1d2e2a5e', '2025-08-25', 'full_day', 'absent', 'Morning roll call record')
ON CONFLICT (student_id, session_date, period) DO NOTHING;
INSERT INTO public.attendance (id, student_id, session_date, period, status, remarks)
VALUES ('98397a86-115b-454d-8547-1bc4969dabaa', 'edd5c0e8-986a-4275-b213-362f1d2e2a5e', '2025-08-26', 'full_day', 'present', NULL)
ON CONFLICT (student_id, session_date, period) DO NOTHING;
INSERT INTO public.attendance (id, student_id, session_date, period, status, remarks)
VALUES ('756c0c4d-b8e4-4b78-80a1-ec5b383b99a2', 'edd5c0e8-986a-4275-b213-362f1d2e2a5e', '2025-08-27', 'full_day', 'present', NULL)
ON CONFLICT (student_id, session_date, period) DO NOTHING;
INSERT INTO public.attendance (id, student_id, session_date, period, status, remarks)
VALUES ('216acadb-8952-4b39-8fef-b551f90f3bd1', 'edd5c0e8-986a-4275-b213-362f1d2e2a5e', '2025-08-28', 'full_day', 'present', NULL)
ON CONFLICT (student_id, session_date, period) DO NOTHING;
INSERT INTO public.attendance (id, student_id, session_date, period, status, remarks)
VALUES ('953e3b28-e783-479a-9298-d0efbed6fab4', 'edd5c0e8-986a-4275-b213-362f1d2e2a5e', '2025-08-29', 'full_day', 'late', 'Morning roll call record')
ON CONFLICT (student_id, session_date, period) DO NOTHING;
INSERT INTO public.attendance (id, student_id, session_date, period, status, remarks)
VALUES ('38408cfc-f332-4160-9a9a-a66870a00340', '06088341-1830-40a1-b648-869368a12a82', '2025-08-01', 'full_day', 'present', NULL)
ON CONFLICT (student_id, session_date, period) DO NOTHING;
INSERT INTO public.attendance (id, student_id, session_date, period, status, remarks)
VALUES ('f7ca25e0-72db-4e14-9674-8ca7dee56da7', '06088341-1830-40a1-b648-869368a12a82', '2025-08-04', 'full_day', 'absent', 'Morning roll call record')
ON CONFLICT (student_id, session_date, period) DO NOTHING;
INSERT INTO public.attendance (id, student_id, session_date, period, status, remarks)
VALUES ('95d6235a-55d8-4495-8beb-55cc19921e68', '06088341-1830-40a1-b648-869368a12a82', '2025-08-05', 'full_day', 'late', 'Morning roll call record')
ON CONFLICT (student_id, session_date, period) DO NOTHING;
INSERT INTO public.attendance (id, student_id, session_date, period, status, remarks)
VALUES ('0df99fca-f192-474e-b6a0-cbbaaa842cf9', '06088341-1830-40a1-b648-869368a12a82', '2025-08-06', 'full_day', 'absent', 'Morning roll call record')
ON CONFLICT (student_id, session_date, period) DO NOTHING;
INSERT INTO public.attendance (id, student_id, session_date, period, status, remarks)
VALUES ('81fd8080-4edf-4acc-869b-2e9e21cf50a1', '06088341-1830-40a1-b648-869368a12a82', '2025-08-07', 'full_day', 'late', 'Morning roll call record')
ON CONFLICT (student_id, session_date, period) DO NOTHING;
INSERT INTO public.attendance (id, student_id, session_date, period, status, remarks)
VALUES ('33c96f41-4c32-4653-a69b-9e69b43f611f', '06088341-1830-40a1-b648-869368a12a82', '2025-08-08', 'full_day', 'present', NULL)
ON CONFLICT (student_id, session_date, period) DO NOTHING;
INSERT INTO public.attendance (id, student_id, session_date, period, status, remarks)
VALUES ('58c8e82a-7b6c-494a-8452-b2bec8fd99fd', '06088341-1830-40a1-b648-869368a12a82', '2025-08-11', 'full_day', 'present', NULL)
ON CONFLICT (student_id, session_date, period) DO NOTHING;
INSERT INTO public.attendance (id, student_id, session_date, period, status, remarks)
VALUES ('95f8c1d2-57c7-4179-93ed-07b434ef5e6e', '06088341-1830-40a1-b648-869368a12a82', '2025-08-12', 'full_day', 'present', NULL)
ON CONFLICT (student_id, session_date, period) DO NOTHING;
INSERT INTO public.attendance (id, student_id, session_date, period, status, remarks)
VALUES ('ccf8ea8a-d371-4c56-a57e-8e3aaaf43ee4', '06088341-1830-40a1-b648-869368a12a82', '2025-08-13', 'full_day', 'absent', 'Morning roll call record')
ON CONFLICT (student_id, session_date, period) DO NOTHING;
INSERT INTO public.attendance (id, student_id, session_date, period, status, remarks)
VALUES ('9d78bb00-34a9-4ef6-ab2f-519a88516f92', '06088341-1830-40a1-b648-869368a12a82', '2025-08-14', 'full_day', 'absent', 'Morning roll call record')
ON CONFLICT (student_id, session_date, period) DO NOTHING;
INSERT INTO public.attendance (id, student_id, session_date, period, status, remarks)
VALUES ('1055ca99-1f9e-4e39-a08f-28767ecfcfb2', '06088341-1830-40a1-b648-869368a12a82', '2025-08-15', 'full_day', 'absent', 'Morning roll call record')
ON CONFLICT (student_id, session_date, period) DO NOTHING;
INSERT INTO public.attendance (id, student_id, session_date, period, status, remarks)
VALUES ('5f73ecdd-b4c4-491b-9c44-99d17b78498b', '06088341-1830-40a1-b648-869368a12a82', '2025-08-18', 'full_day', 'present', NULL)
ON CONFLICT (student_id, session_date, period) DO NOTHING;
INSERT INTO public.attendance (id, student_id, session_date, period, status, remarks)
VALUES ('412d4bdb-7f9e-4154-b0d4-75ced99dc4c4', '06088341-1830-40a1-b648-869368a12a82', '2025-08-19', 'full_day', 'present', NULL)
ON CONFLICT (student_id, session_date, period) DO NOTHING;
INSERT INTO public.attendance (id, student_id, session_date, period, status, remarks)
VALUES ('b22f18e7-c44a-41f0-bb28-c5bc56aafe73', '06088341-1830-40a1-b648-869368a12a82', '2025-08-20', 'full_day', 'absent', 'Morning roll call record')
ON CONFLICT (student_id, session_date, period) DO NOTHING;
INSERT INTO public.attendance (id, student_id, session_date, period, status, remarks)
VALUES ('c9f6d06b-0545-40af-83d6-cf4fd135c6a7', '06088341-1830-40a1-b648-869368a12a82', '2025-08-21', 'full_day', 'absent', 'Morning roll call record')
ON CONFLICT (student_id, session_date, period) DO NOTHING;
INSERT INTO public.attendance (id, student_id, session_date, period, status, remarks)
VALUES ('d024139f-1d39-42a8-94cc-3e555070733d', '06088341-1830-40a1-b648-869368a12a82', '2025-08-22', 'full_day', 'present', NULL)
ON CONFLICT (student_id, session_date, period) DO NOTHING;
INSERT INTO public.attendance (id, student_id, session_date, period, status, remarks)
VALUES ('cf23c48a-167d-4dd5-9371-7b3ae09bc895', '06088341-1830-40a1-b648-869368a12a82', '2025-08-25', 'full_day', 'present', NULL)
ON CONFLICT (student_id, session_date, period) DO NOTHING;
INSERT INTO public.attendance (id, student_id, session_date, period, status, remarks)
VALUES ('0ac4a913-4892-4f65-939c-543bcf2e0220', '06088341-1830-40a1-b648-869368a12a82', '2025-08-26', 'full_day', 'present', NULL)
ON CONFLICT (student_id, session_date, period) DO NOTHING;
INSERT INTO public.attendance (id, student_id, session_date, period, status, remarks)
VALUES ('d55e787f-c750-421c-b01e-1703f5e8eccf', '06088341-1830-40a1-b648-869368a12a82', '2025-08-27', 'full_day', 'absent', 'Morning roll call record')
ON CONFLICT (student_id, session_date, period) DO NOTHING;
INSERT INTO public.attendance (id, student_id, session_date, period, status, remarks)
VALUES ('65f0688d-4cb4-49b0-8f98-4d592149a1a1', '06088341-1830-40a1-b648-869368a12a82', '2025-08-28', 'full_day', 'absent', 'Morning roll call record')
ON CONFLICT (student_id, session_date, period) DO NOTHING;
INSERT INTO public.attendance (id, student_id, session_date, period, status, remarks)
VALUES ('93422b56-ccc8-45bc-ab88-3528743bd5d0', '06088341-1830-40a1-b648-869368a12a82', '2025-08-29', 'full_day', 'present', NULL)
ON CONFLICT (student_id, session_date, period) DO NOTHING;
INSERT INTO public.attendance (id, student_id, session_date, period, status, remarks)
VALUES ('ee26e0fa-6bde-4dbe-9fb9-6619a5d171c2', 'd8bcb8d5-c15c-421a-bc22-29148cd4eefc', '2025-08-01', 'full_day', 'present', NULL)
ON CONFLICT (student_id, session_date, period) DO NOTHING;
INSERT INTO public.attendance (id, student_id, session_date, period, status, remarks)
VALUES ('749dc5fd-9cee-4b7f-9523-118cc8386d7e', 'd8bcb8d5-c15c-421a-bc22-29148cd4eefc', '2025-08-04', 'full_day', 'present', NULL)
ON CONFLICT (student_id, session_date, period) DO NOTHING;
INSERT INTO public.attendance (id, student_id, session_date, period, status, remarks)
VALUES ('f67fdab8-e1e3-4920-ba4e-cd61531c6b03', 'd8bcb8d5-c15c-421a-bc22-29148cd4eefc', '2025-08-05', 'full_day', 'present', NULL)
ON CONFLICT (student_id, session_date, period) DO NOTHING;
INSERT INTO public.attendance (id, student_id, session_date, period, status, remarks)
VALUES ('93e5d1a8-48d1-44b3-b2ec-3b57e7b38200', 'd8bcb8d5-c15c-421a-bc22-29148cd4eefc', '2025-08-06', 'full_day', 'absent', 'Morning roll call record')
ON CONFLICT (student_id, session_date, period) DO NOTHING;
INSERT INTO public.attendance (id, student_id, session_date, period, status, remarks)
VALUES ('ad45bb2b-ebcc-40f8-94d0-bf68a017a3b7', 'd8bcb8d5-c15c-421a-bc22-29148cd4eefc', '2025-08-07', 'full_day', 'absent', 'Morning roll call record')
ON CONFLICT (student_id, session_date, period) DO NOTHING;
INSERT INTO public.attendance (id, student_id, session_date, period, status, remarks)
VALUES ('959c871a-8b46-4af0-adab-7567a9e89e14', 'd8bcb8d5-c15c-421a-bc22-29148cd4eefc', '2025-08-08', 'full_day', 'excused', 'Morning roll call record')
ON CONFLICT (student_id, session_date, period) DO NOTHING;
INSERT INTO public.attendance (id, student_id, session_date, period, status, remarks)
VALUES ('6701df77-f3ec-423e-839a-c31287dd5f5f', 'd8bcb8d5-c15c-421a-bc22-29148cd4eefc', '2025-08-11', 'full_day', 'present', NULL)
ON CONFLICT (student_id, session_date, period) DO NOTHING;
INSERT INTO public.attendance (id, student_id, session_date, period, status, remarks)
VALUES ('42fbff98-9cc0-476a-a47d-5e79fb34432e', 'd8bcb8d5-c15c-421a-bc22-29148cd4eefc', '2025-08-12', 'full_day', 'present', NULL)
ON CONFLICT (student_id, session_date, period) DO NOTHING;
INSERT INTO public.attendance (id, student_id, session_date, period, status, remarks)
VALUES ('40723bdb-1089-42b2-8896-0481383c67b3', 'd8bcb8d5-c15c-421a-bc22-29148cd4eefc', '2025-08-13', 'full_day', 'present', NULL)
ON CONFLICT (student_id, session_date, period) DO NOTHING;
INSERT INTO public.attendance (id, student_id, session_date, period, status, remarks)
VALUES ('2ebfef00-3f1c-4c53-b09a-01459ebc74c6', 'd8bcb8d5-c15c-421a-bc22-29148cd4eefc', '2025-08-14', 'full_day', 'absent', 'Morning roll call record')
ON CONFLICT (student_id, session_date, period) DO NOTHING;
INSERT INTO public.attendance (id, student_id, session_date, period, status, remarks)
VALUES ('1b60710b-8044-4ab5-b3c0-3127b3e464e2', 'd8bcb8d5-c15c-421a-bc22-29148cd4eefc', '2025-08-15', 'full_day', 'present', NULL)
ON CONFLICT (student_id, session_date, period) DO NOTHING;
INSERT INTO public.attendance (id, student_id, session_date, period, status, remarks)
VALUES ('7b339cf3-e2ea-434d-97f5-11173667a35a', 'd8bcb8d5-c15c-421a-bc22-29148cd4eefc', '2025-08-18', 'full_day', 'present', NULL)
ON CONFLICT (student_id, session_date, period) DO NOTHING;
INSERT INTO public.attendance (id, student_id, session_date, period, status, remarks)
VALUES ('756e6207-9e1a-47f0-ae5d-c7907fa29e2c', 'd8bcb8d5-c15c-421a-bc22-29148cd4eefc', '2025-08-19', 'full_day', 'present', NULL)
ON CONFLICT (student_id, session_date, period) DO NOTHING;
INSERT INTO public.attendance (id, student_id, session_date, period, status, remarks)
VALUES ('a71c765d-d144-4c9d-89de-ac95788eebe4', 'd8bcb8d5-c15c-421a-bc22-29148cd4eefc', '2025-08-20', 'full_day', 'present', NULL)
ON CONFLICT (student_id, session_date, period) DO NOTHING;
INSERT INTO public.attendance (id, student_id, session_date, period, status, remarks)
VALUES ('dc5091f8-982e-40e5-b11f-8c6e1dde8c4d', 'd8bcb8d5-c15c-421a-bc22-29148cd4eefc', '2025-08-21', 'full_day', 'present', NULL)
ON CONFLICT (student_id, session_date, period) DO NOTHING;
INSERT INTO public.attendance (id, student_id, session_date, period, status, remarks)
VALUES ('e4e79798-8c99-4a84-82a5-03fe6642094c', 'd8bcb8d5-c15c-421a-bc22-29148cd4eefc', '2025-08-22', 'full_day', 'present', NULL)
ON CONFLICT (student_id, session_date, period) DO NOTHING;
INSERT INTO public.attendance (id, student_id, session_date, period, status, remarks)
VALUES ('f5885a4e-6ebf-4b23-95c0-c0ada2e1e0c9', 'd8bcb8d5-c15c-421a-bc22-29148cd4eefc', '2025-08-25', 'full_day', 'absent', 'Morning roll call record')
ON CONFLICT (student_id, session_date, period) DO NOTHING;
INSERT INTO public.attendance (id, student_id, session_date, period, status, remarks)
VALUES ('a5dd0cb0-24fd-40c7-8fc4-a3d093bfe7b4', 'd8bcb8d5-c15c-421a-bc22-29148cd4eefc', '2025-08-26', 'full_day', 'present', NULL)
ON CONFLICT (student_id, session_date, period) DO NOTHING;
INSERT INTO public.attendance (id, student_id, session_date, period, status, remarks)
VALUES ('1daf0b78-2472-4506-b90b-d34868ffb838', 'd8bcb8d5-c15c-421a-bc22-29148cd4eefc', '2025-08-27', 'full_day', 'absent', 'Morning roll call record')
ON CONFLICT (student_id, session_date, period) DO NOTHING;
INSERT INTO public.attendance (id, student_id, session_date, period, status, remarks)
VALUES ('01744df0-0c25-4549-9708-a6afabf377fb', 'd8bcb8d5-c15c-421a-bc22-29148cd4eefc', '2025-08-28', 'full_day', 'late', 'Morning roll call record')
ON CONFLICT (student_id, session_date, period) DO NOTHING;
INSERT INTO public.attendance (id, student_id, session_date, period, status, remarks)
VALUES ('0bd1fa43-ef56-4a97-a7c5-d53bf38c44eb', 'd8bcb8d5-c15c-421a-bc22-29148cd4eefc', '2025-08-29', 'full_day', 'present', NULL)
ON CONFLICT (student_id, session_date, period) DO NOTHING;
INSERT INTO public.attendance (id, student_id, session_date, period, status, remarks)
VALUES ('317ee287-d5cb-43e4-9d13-0d3e890c84d0', '3f043811-1641-4ea6-a8b5-c0da39193232', '2025-08-01', 'full_day', 'present', NULL)
ON CONFLICT (student_id, session_date, period) DO NOTHING;
INSERT INTO public.attendance (id, student_id, session_date, period, status, remarks)
VALUES ('adb925f7-c993-43d2-9610-241c828b0375', '3f043811-1641-4ea6-a8b5-c0da39193232', '2025-08-04', 'full_day', 'present', NULL)
ON CONFLICT (student_id, session_date, period) DO NOTHING;
INSERT INTO public.attendance (id, student_id, session_date, period, status, remarks)
VALUES ('f06313d6-c22d-407a-ba72-bba6d58e061a', '3f043811-1641-4ea6-a8b5-c0da39193232', '2025-08-05', 'full_day', 'absent', 'Morning roll call record')
ON CONFLICT (student_id, session_date, period) DO NOTHING;
INSERT INTO public.attendance (id, student_id, session_date, period, status, remarks)
VALUES ('9f9eb9fd-9794-433f-add1-8262583b3814', '3f043811-1641-4ea6-a8b5-c0da39193232', '2025-08-06', 'full_day', 'late', 'Morning roll call record')
ON CONFLICT (student_id, session_date, period) DO NOTHING;
INSERT INTO public.attendance (id, student_id, session_date, period, status, remarks)
VALUES ('8be8c240-4025-4ee6-bf15-72050f17626b', '3f043811-1641-4ea6-a8b5-c0da39193232', '2025-08-07', 'full_day', 'present', NULL)
ON CONFLICT (student_id, session_date, period) DO NOTHING;
INSERT INTO public.attendance (id, student_id, session_date, period, status, remarks)
VALUES ('806f77af-d9da-406b-b930-917a3c39dc0d', '3f043811-1641-4ea6-a8b5-c0da39193232', '2025-08-08', 'full_day', 'present', NULL)
ON CONFLICT (student_id, session_date, period) DO NOTHING;
INSERT INTO public.attendance (id, student_id, session_date, period, status, remarks)
VALUES ('a98ba4f8-9f15-4319-89bf-732fa658b273', '3f043811-1641-4ea6-a8b5-c0da39193232', '2025-08-11', 'full_day', 'absent', 'Morning roll call record')
ON CONFLICT (student_id, session_date, period) DO NOTHING;
INSERT INTO public.attendance (id, student_id, session_date, period, status, remarks)
VALUES ('52fb1d18-ce81-4c4a-9247-e5ed1b2624dd', '3f043811-1641-4ea6-a8b5-c0da39193232', '2025-08-12', 'full_day', 'present', NULL)
ON CONFLICT (student_id, session_date, period) DO NOTHING;
INSERT INTO public.attendance (id, student_id, session_date, period, status, remarks)
VALUES ('f15ffa25-6aca-47e8-86eb-5e8cbc84943f', '3f043811-1641-4ea6-a8b5-c0da39193232', '2025-08-13', 'full_day', 'present', NULL)
ON CONFLICT (student_id, session_date, period) DO NOTHING;
INSERT INTO public.attendance (id, student_id, session_date, period, status, remarks)
VALUES ('fbb124b3-43c2-4e40-8a85-61d7a63e06ef', '3f043811-1641-4ea6-a8b5-c0da39193232', '2025-08-14', 'full_day', 'present', NULL)
ON CONFLICT (student_id, session_date, period) DO NOTHING;
INSERT INTO public.attendance (id, student_id, session_date, period, status, remarks)
VALUES ('8c57a89a-97f7-4793-af89-ae88ad927414', '3f043811-1641-4ea6-a8b5-c0da39193232', '2025-08-15', 'full_day', 'late', 'Morning roll call record')
ON CONFLICT (student_id, session_date, period) DO NOTHING;
INSERT INTO public.attendance (id, student_id, session_date, period, status, remarks)
VALUES ('975b7290-12e9-45f6-bbb2-5249b6a7d5be', '3f043811-1641-4ea6-a8b5-c0da39193232', '2025-08-18', 'full_day', 'present', NULL)
ON CONFLICT (student_id, session_date, period) DO NOTHING;
INSERT INTO public.attendance (id, student_id, session_date, period, status, remarks)
VALUES ('61e429e9-25d7-48a6-887a-39166acf6b1b', '3f043811-1641-4ea6-a8b5-c0da39193232', '2025-08-19', 'full_day', 'absent', 'Morning roll call record')
ON CONFLICT (student_id, session_date, period) DO NOTHING;
INSERT INTO public.attendance (id, student_id, session_date, period, status, remarks)
VALUES ('2589af02-f249-455d-9d0d-e3090742e4cd', '3f043811-1641-4ea6-a8b5-c0da39193232', '2025-08-20', 'full_day', 'absent', 'Morning roll call record')
ON CONFLICT (student_id, session_date, period) DO NOTHING;
INSERT INTO public.attendance (id, student_id, session_date, period, status, remarks)
VALUES ('51163e16-dada-4e1e-adda-8191ffa534bd', '3f043811-1641-4ea6-a8b5-c0da39193232', '2025-08-21', 'full_day', 'present', NULL)
ON CONFLICT (student_id, session_date, period) DO NOTHING;
INSERT INTO public.attendance (id, student_id, session_date, period, status, remarks)
VALUES ('a19d11ed-ea83-412a-9384-fcdfe005c6d1', '3f043811-1641-4ea6-a8b5-c0da39193232', '2025-08-22', 'full_day', 'late', 'Morning roll call record')
ON CONFLICT (student_id, session_date, period) DO NOTHING;
INSERT INTO public.attendance (id, student_id, session_date, period, status, remarks)
VALUES ('d96075f5-7c8b-408c-b3f3-6f0b1acbf81a', '3f043811-1641-4ea6-a8b5-c0da39193232', '2025-08-25', 'full_day', 'late', 'Morning roll call record')
ON CONFLICT (student_id, session_date, period) DO NOTHING;
INSERT INTO public.attendance (id, student_id, session_date, period, status, remarks)
VALUES ('c982aaa9-febe-4e60-af13-bfab0f152b15', '3f043811-1641-4ea6-a8b5-c0da39193232', '2025-08-26', 'full_day', 'present', NULL)
ON CONFLICT (student_id, session_date, period) DO NOTHING;
INSERT INTO public.attendance (id, student_id, session_date, period, status, remarks)
VALUES ('1de9b80b-8625-40fb-92c0-72936875358d', '3f043811-1641-4ea6-a8b5-c0da39193232', '2025-08-27', 'full_day', 'late', 'Morning roll call record')
ON CONFLICT (student_id, session_date, period) DO NOTHING;
INSERT INTO public.attendance (id, student_id, session_date, period, status, remarks)
VALUES ('199e9b22-41a7-43e6-a5c4-57a18cd9d69d', '3f043811-1641-4ea6-a8b5-c0da39193232', '2025-08-28', 'full_day', 'late', 'Morning roll call record')
ON CONFLICT (student_id, session_date, period) DO NOTHING;
INSERT INTO public.attendance (id, student_id, session_date, period, status, remarks)
VALUES ('57ed6729-4d61-4f20-a7eb-b1d4bcda4b5e', '3f043811-1641-4ea6-a8b5-c0da39193232', '2025-08-29', 'full_day', 'present', NULL)
ON CONFLICT (student_id, session_date, period) DO NOTHING;
INSERT INTO public.attendance (id, student_id, session_date, period, status, remarks)
VALUES ('176e72bc-68b4-404f-aefc-26063cd72104', 'b208e78a-2f96-4e70-bc46-99e51f4d6543', '2025-08-01', 'full_day', 'absent', 'Morning roll call record')
ON CONFLICT (student_id, session_date, period) DO NOTHING;
INSERT INTO public.attendance (id, student_id, session_date, period, status, remarks)
VALUES ('8a5be745-89ca-4192-992f-b680562b9b7f', 'b208e78a-2f96-4e70-bc46-99e51f4d6543', '2025-08-04', 'full_day', 'absent', 'Morning roll call record')
ON CONFLICT (student_id, session_date, period) DO NOTHING;
INSERT INTO public.attendance (id, student_id, session_date, period, status, remarks)
VALUES ('4b887c5a-8ca2-4d9a-96aa-1ea6c711ad37', 'b208e78a-2f96-4e70-bc46-99e51f4d6543', '2025-08-05', 'full_day', 'present', NULL)
ON CONFLICT (student_id, session_date, period) DO NOTHING;
INSERT INTO public.attendance (id, student_id, session_date, period, status, remarks)
VALUES ('3df61da0-f61c-45e1-96fb-29d4c8cfcc77', 'b208e78a-2f96-4e70-bc46-99e51f4d6543', '2025-08-06', 'full_day', 'present', NULL)
ON CONFLICT (student_id, session_date, period) DO NOTHING;
INSERT INTO public.attendance (id, student_id, session_date, period, status, remarks)
VALUES ('6cada00c-fcbe-45de-9bf8-ff3d3feddf55', 'b208e78a-2f96-4e70-bc46-99e51f4d6543', '2025-08-07', 'full_day', 'present', NULL)
ON CONFLICT (student_id, session_date, period) DO NOTHING;
INSERT INTO public.attendance (id, student_id, session_date, period, status, remarks)
VALUES ('5dbafb4c-dfca-4ac3-ab74-2752b0fd8c4f', 'b208e78a-2f96-4e70-bc46-99e51f4d6543', '2025-08-08', 'full_day', 'late', 'Morning roll call record')
ON CONFLICT (student_id, session_date, period) DO NOTHING;
INSERT INTO public.attendance (id, student_id, session_date, period, status, remarks)
VALUES ('169a749c-2b55-4588-836a-12b9bc1ea188', 'b208e78a-2f96-4e70-bc46-99e51f4d6543', '2025-08-11', 'full_day', 'present', NULL)
ON CONFLICT (student_id, session_date, period) DO NOTHING;
INSERT INTO public.attendance (id, student_id, session_date, period, status, remarks)
VALUES ('9f2bf4a8-1c51-4f99-b666-a5924427eb94', 'b208e78a-2f96-4e70-bc46-99e51f4d6543', '2025-08-12', 'full_day', 'present', NULL)
ON CONFLICT (student_id, session_date, period) DO NOTHING;
INSERT INTO public.attendance (id, student_id, session_date, period, status, remarks)
VALUES ('0329ed9d-a099-4f9a-92d2-8987a03488fe', 'b208e78a-2f96-4e70-bc46-99e51f4d6543', '2025-08-13', 'full_day', 'present', NULL)
ON CONFLICT (student_id, session_date, period) DO NOTHING;
INSERT INTO public.attendance (id, student_id, session_date, period, status, remarks)
VALUES ('a03d8463-1756-4239-97fa-2d8cb11599d6', 'b208e78a-2f96-4e70-bc46-99e51f4d6543', '2025-08-14', 'full_day', 'absent', 'Morning roll call record')
ON CONFLICT (student_id, session_date, period) DO NOTHING;
INSERT INTO public.attendance (id, student_id, session_date, period, status, remarks)
VALUES ('f0b9c856-d49c-42b7-9cd3-0ef58e41350e', 'b208e78a-2f96-4e70-bc46-99e51f4d6543', '2025-08-15', 'full_day', 'excused', 'Morning roll call record')
ON CONFLICT (student_id, session_date, period) DO NOTHING;
INSERT INTO public.attendance (id, student_id, session_date, period, status, remarks)
VALUES ('becb9cac-7aab-4cc3-9874-00811a05ebca', 'b208e78a-2f96-4e70-bc46-99e51f4d6543', '2025-08-18', 'full_day', 'present', NULL)
ON CONFLICT (student_id, session_date, period) DO NOTHING;
INSERT INTO public.attendance (id, student_id, session_date, period, status, remarks)
VALUES ('6831802f-38a8-4692-b582-e459e87233c3', 'b208e78a-2f96-4e70-bc46-99e51f4d6543', '2025-08-19', 'full_day', 'present', NULL)
ON CONFLICT (student_id, session_date, period) DO NOTHING;
INSERT INTO public.attendance (id, student_id, session_date, period, status, remarks)
VALUES ('afdac579-9224-491a-98e2-13ec037283bc', 'b208e78a-2f96-4e70-bc46-99e51f4d6543', '2025-08-20', 'full_day', 'absent', 'Morning roll call record')
ON CONFLICT (student_id, session_date, period) DO NOTHING;
INSERT INTO public.attendance (id, student_id, session_date, period, status, remarks)
VALUES ('75f44cf5-103c-417a-a2fb-5107eb82fe71', 'b208e78a-2f96-4e70-bc46-99e51f4d6543', '2025-08-21', 'full_day', 'absent', 'Morning roll call record')
ON CONFLICT (student_id, session_date, period) DO NOTHING;
INSERT INTO public.attendance (id, student_id, session_date, period, status, remarks)
VALUES ('c9c78c19-65c6-4014-b5e0-ee4148cb2ad2', 'b208e78a-2f96-4e70-bc46-99e51f4d6543', '2025-08-22', 'full_day', 'present', NULL)
ON CONFLICT (student_id, session_date, period) DO NOTHING;
INSERT INTO public.attendance (id, student_id, session_date, period, status, remarks)
VALUES ('ede5e660-9b19-4b31-b2ac-3a7c981b8f38', 'b208e78a-2f96-4e70-bc46-99e51f4d6543', '2025-08-25', 'full_day', 'late', 'Morning roll call record')
ON CONFLICT (student_id, session_date, period) DO NOTHING;
INSERT INTO public.attendance (id, student_id, session_date, period, status, remarks)
VALUES ('8aabfcb5-579a-4699-86a7-d8e2923f647f', 'b208e78a-2f96-4e70-bc46-99e51f4d6543', '2025-08-26', 'full_day', 'absent', 'Morning roll call record')
ON CONFLICT (student_id, session_date, period) DO NOTHING;
INSERT INTO public.attendance (id, student_id, session_date, period, status, remarks)
VALUES ('7f0168b8-0562-4559-8e9e-ce3a1125e8c2', 'b208e78a-2f96-4e70-bc46-99e51f4d6543', '2025-08-27', 'full_day', 'excused', 'Morning roll call record')
ON CONFLICT (student_id, session_date, period) DO NOTHING;
INSERT INTO public.attendance (id, student_id, session_date, period, status, remarks)
VALUES ('0034e696-9e44-4d63-a2dc-8c7f139ff0c2', 'b208e78a-2f96-4e70-bc46-99e51f4d6543', '2025-08-28', 'full_day', 'absent', 'Morning roll call record')
ON CONFLICT (student_id, session_date, period) DO NOTHING;
INSERT INTO public.attendance (id, student_id, session_date, period, status, remarks)
VALUES ('8c136b36-cb2a-4301-9d5b-1e65744236b6', 'b208e78a-2f96-4e70-bc46-99e51f4d6543', '2025-08-29', 'full_day', 'absent', 'Morning roll call record')
ON CONFLICT (student_id, session_date, period) DO NOTHING;
INSERT INTO public.attendance (id, student_id, session_date, period, status, remarks)
VALUES ('1782d65e-833f-4326-8af4-52f925249d27', 'bef6289e-41de-428e-b7bf-13a855d6e54e', '2025-08-01', 'full_day', 'absent', 'Morning roll call record')
ON CONFLICT (student_id, session_date, period) DO NOTHING;
INSERT INTO public.attendance (id, student_id, session_date, period, status, remarks)
VALUES ('50acbf30-deed-46c0-94db-a66d4e9487be', 'bef6289e-41de-428e-b7bf-13a855d6e54e', '2025-08-04', 'full_day', 'present', NULL)
ON CONFLICT (student_id, session_date, period) DO NOTHING;
INSERT INTO public.attendance (id, student_id, session_date, period, status, remarks)
VALUES ('0f0bbbe6-18e0-4c77-b48b-f0a3d6cec8d9', 'bef6289e-41de-428e-b7bf-13a855d6e54e', '2025-08-05', 'full_day', 'present', NULL)
ON CONFLICT (student_id, session_date, period) DO NOTHING;
INSERT INTO public.attendance (id, student_id, session_date, period, status, remarks)
VALUES ('bf28f658-9378-4782-ad0f-19ea6cd4af34', 'bef6289e-41de-428e-b7bf-13a855d6e54e', '2025-08-06', 'full_day', 'present', NULL)
ON CONFLICT (student_id, session_date, period) DO NOTHING;
INSERT INTO public.attendance (id, student_id, session_date, period, status, remarks)
VALUES ('22f4513c-61d1-4464-96dd-46315ee88317', 'bef6289e-41de-428e-b7bf-13a855d6e54e', '2025-08-07', 'full_day', 'present', NULL)
ON CONFLICT (student_id, session_date, period) DO NOTHING;
INSERT INTO public.attendance (id, student_id, session_date, period, status, remarks)
VALUES ('0f2855c6-f624-4e29-bfc0-d284ea5f9857', 'bef6289e-41de-428e-b7bf-13a855d6e54e', '2025-08-08', 'full_day', 'late', 'Morning roll call record')
ON CONFLICT (student_id, session_date, period) DO NOTHING;
INSERT INTO public.attendance (id, student_id, session_date, period, status, remarks)
VALUES ('45671591-4a01-43ef-be20-296ebe1e4345', 'bef6289e-41de-428e-b7bf-13a855d6e54e', '2025-08-11', 'full_day', 'present', NULL)
ON CONFLICT (student_id, session_date, period) DO NOTHING;
INSERT INTO public.attendance (id, student_id, session_date, period, status, remarks)
VALUES ('fe446128-bc29-437e-9971-e895946a3e4d', 'bef6289e-41de-428e-b7bf-13a855d6e54e', '2025-08-12', 'full_day', 'absent', 'Morning roll call record')
ON CONFLICT (student_id, session_date, period) DO NOTHING;
INSERT INTO public.attendance (id, student_id, session_date, period, status, remarks)
VALUES ('8d43a179-1043-42ea-93db-c0bd8d60d1ad', 'bef6289e-41de-428e-b7bf-13a855d6e54e', '2025-08-13', 'full_day', 'present', NULL)
ON CONFLICT (student_id, session_date, period) DO NOTHING;
INSERT INTO public.attendance (id, student_id, session_date, period, status, remarks)
VALUES ('d9baf440-a5f9-47d0-9334-5fafcdd9b288', 'bef6289e-41de-428e-b7bf-13a855d6e54e', '2025-08-14', 'full_day', 'present', NULL)
ON CONFLICT (student_id, session_date, period) DO NOTHING;
INSERT INTO public.attendance (id, student_id, session_date, period, status, remarks)
VALUES ('045f2eff-668d-42a3-9cc3-506fa2f087b3', 'bef6289e-41de-428e-b7bf-13a855d6e54e', '2025-08-15', 'full_day', 'present', NULL)
ON CONFLICT (student_id, session_date, period) DO NOTHING;
INSERT INTO public.attendance (id, student_id, session_date, period, status, remarks)
VALUES ('09f71784-e720-4016-8c21-fedd2483128e', 'bef6289e-41de-428e-b7bf-13a855d6e54e', '2025-08-18', 'full_day', 'absent', 'Morning roll call record')
ON CONFLICT (student_id, session_date, period) DO NOTHING;
INSERT INTO public.attendance (id, student_id, session_date, period, status, remarks)
VALUES ('54a63fa3-6286-4e4a-8f3f-e9cfcc208f77', 'bef6289e-41de-428e-b7bf-13a855d6e54e', '2025-08-19', 'full_day', 'absent', 'Morning roll call record')
ON CONFLICT (student_id, session_date, period) DO NOTHING;
INSERT INTO public.attendance (id, student_id, session_date, period, status, remarks)
VALUES ('397bb748-f1ff-4e61-9bc7-5fab3e302d8b', 'bef6289e-41de-428e-b7bf-13a855d6e54e', '2025-08-20', 'full_day', 'present', NULL)
ON CONFLICT (student_id, session_date, period) DO NOTHING;
INSERT INTO public.attendance (id, student_id, session_date, period, status, remarks)
VALUES ('065d988d-3af4-4a70-b90a-3a5be13643a2', 'bef6289e-41de-428e-b7bf-13a855d6e54e', '2025-08-21', 'full_day', 'present', NULL)
ON CONFLICT (student_id, session_date, period) DO NOTHING;
INSERT INTO public.attendance (id, student_id, session_date, period, status, remarks)
VALUES ('9118abbd-42db-44f6-95b5-ebca7563a77c', 'bef6289e-41de-428e-b7bf-13a855d6e54e', '2025-08-22', 'full_day', 'present', NULL)
ON CONFLICT (student_id, session_date, period) DO NOTHING;
INSERT INTO public.attendance (id, student_id, session_date, period, status, remarks)
VALUES ('403a31e0-762b-47c6-bdaa-e6bd1363c1fc', 'bef6289e-41de-428e-b7bf-13a855d6e54e', '2025-08-25', 'full_day', 'absent', 'Morning roll call record')
ON CONFLICT (student_id, session_date, period) DO NOTHING;
INSERT INTO public.attendance (id, student_id, session_date, period, status, remarks)
VALUES ('4c8212a4-35d3-4d8a-9953-209a48ad1b1f', 'bef6289e-41de-428e-b7bf-13a855d6e54e', '2025-08-26', 'full_day', 'present', NULL)
ON CONFLICT (student_id, session_date, period) DO NOTHING;
INSERT INTO public.attendance (id, student_id, session_date, period, status, remarks)
VALUES ('1dfce9d5-26db-4866-b728-882d86dc0d31', 'bef6289e-41de-428e-b7bf-13a855d6e54e', '2025-08-27', 'full_day', 'present', NULL)
ON CONFLICT (student_id, session_date, period) DO NOTHING;
INSERT INTO public.attendance (id, student_id, session_date, period, status, remarks)
VALUES ('0e1578c2-4009-41c3-8055-529aa3a1b7f7', 'bef6289e-41de-428e-b7bf-13a855d6e54e', '2025-08-28', 'full_day', 'present', NULL)
ON CONFLICT (student_id, session_date, period) DO NOTHING;
INSERT INTO public.attendance (id, student_id, session_date, period, status, remarks)
VALUES ('e7dc56aa-46b5-4a2f-b002-f974b14f7132', 'bef6289e-41de-428e-b7bf-13a855d6e54e', '2025-08-29', 'full_day', 'present', NULL)
ON CONFLICT (student_id, session_date, period) DO NOTHING;
INSERT INTO public.attendance (id, student_id, session_date, period, status, remarks)
VALUES ('3a3a01f1-475f-43e3-8d86-68df7266d1cb', 'fef234a8-0c9c-468f-9383-f850a6082dc6', '2025-08-01', 'full_day', 'late', 'Morning roll call record')
ON CONFLICT (student_id, session_date, period) DO NOTHING;
INSERT INTO public.attendance (id, student_id, session_date, period, status, remarks)
VALUES ('71594f5b-22bc-40df-b180-0d5370ee1a5c', 'fef234a8-0c9c-468f-9383-f850a6082dc6', '2025-08-04', 'full_day', 'absent', 'Morning roll call record')
ON CONFLICT (student_id, session_date, period) DO NOTHING;
INSERT INTO public.attendance (id, student_id, session_date, period, status, remarks)
VALUES ('34c37854-418f-4152-a880-7ffee2e12e8d', 'fef234a8-0c9c-468f-9383-f850a6082dc6', '2025-08-05', 'full_day', 'late', 'Morning roll call record')
ON CONFLICT (student_id, session_date, period) DO NOTHING;
INSERT INTO public.attendance (id, student_id, session_date, period, status, remarks)
VALUES ('ed1bac1b-2686-43e9-90e4-95907b77d47b', 'fef234a8-0c9c-468f-9383-f850a6082dc6', '2025-08-06', 'full_day', 'present', NULL)
ON CONFLICT (student_id, session_date, period) DO NOTHING;
INSERT INTO public.attendance (id, student_id, session_date, period, status, remarks)
VALUES ('e44cf5ad-4f87-4d62-93ce-0e460496c1cc', 'fef234a8-0c9c-468f-9383-f850a6082dc6', '2025-08-07', 'full_day', 'late', 'Morning roll call record')
ON CONFLICT (student_id, session_date, period) DO NOTHING;
INSERT INTO public.attendance (id, student_id, session_date, period, status, remarks)
VALUES ('7179fab9-6e95-4123-bcd9-b1bd97119994', 'fef234a8-0c9c-468f-9383-f850a6082dc6', '2025-08-08', 'full_day', 'present', NULL)
ON CONFLICT (student_id, session_date, period) DO NOTHING;
INSERT INTO public.attendance (id, student_id, session_date, period, status, remarks)
VALUES ('e5380869-5f9b-4da2-9a77-60d265fc2cf1', 'fef234a8-0c9c-468f-9383-f850a6082dc6', '2025-08-11', 'full_day', 'present', NULL)
ON CONFLICT (student_id, session_date, period) DO NOTHING;
INSERT INTO public.attendance (id, student_id, session_date, period, status, remarks)
VALUES ('4f224baf-9b59-4888-8eac-eea89139585e', 'fef234a8-0c9c-468f-9383-f850a6082dc6', '2025-08-12', 'full_day', 'present', NULL)
ON CONFLICT (student_id, session_date, period) DO NOTHING;
INSERT INTO public.attendance (id, student_id, session_date, period, status, remarks)
VALUES ('20b0bbdb-14d6-4b7a-82d9-9e0c95df3926', 'fef234a8-0c9c-468f-9383-f850a6082dc6', '2025-08-13', 'full_day', 'absent', 'Morning roll call record')
ON CONFLICT (student_id, session_date, period) DO NOTHING;
INSERT INTO public.attendance (id, student_id, session_date, period, status, remarks)
VALUES ('f2620d14-cb3f-4a8e-8017-f4877e8d5119', 'fef234a8-0c9c-468f-9383-f850a6082dc6', '2025-08-14', 'full_day', 'present', NULL)
ON CONFLICT (student_id, session_date, period) DO NOTHING;
INSERT INTO public.attendance (id, student_id, session_date, period, status, remarks)
VALUES ('e8a9fbc2-6078-4805-a00e-51a8529b50c5', 'fef234a8-0c9c-468f-9383-f850a6082dc6', '2025-08-15', 'full_day', 'present', NULL)
ON CONFLICT (student_id, session_date, period) DO NOTHING;
INSERT INTO public.attendance (id, student_id, session_date, period, status, remarks)
VALUES ('a02d2be4-43d7-44ec-94fa-f48eb72d02ed', 'fef234a8-0c9c-468f-9383-f850a6082dc6', '2025-08-18', 'full_day', 'present', NULL)
ON CONFLICT (student_id, session_date, period) DO NOTHING;
INSERT INTO public.attendance (id, student_id, session_date, period, status, remarks)
VALUES ('b2fe3758-1f65-4cc9-a3e7-39a6dec4a564', 'fef234a8-0c9c-468f-9383-f850a6082dc6', '2025-08-19', 'full_day', 'present', NULL)
ON CONFLICT (student_id, session_date, period) DO NOTHING;
INSERT INTO public.attendance (id, student_id, session_date, period, status, remarks)
VALUES ('aa02c399-665b-4e66-8342-e37787356240', 'fef234a8-0c9c-468f-9383-f850a6082dc6', '2025-08-20', 'full_day', 'present', NULL)
ON CONFLICT (student_id, session_date, period) DO NOTHING;
INSERT INTO public.attendance (id, student_id, session_date, period, status, remarks)
VALUES ('9b13cbf2-3da9-4a24-800d-f3ab4fe0ad00', 'fef234a8-0c9c-468f-9383-f850a6082dc6', '2025-08-21', 'full_day', 'present', NULL)
ON CONFLICT (student_id, session_date, period) DO NOTHING;
INSERT INTO public.attendance (id, student_id, session_date, period, status, remarks)
VALUES ('280547ef-3d9d-4a91-b28b-6f96dd8385d8', 'fef234a8-0c9c-468f-9383-f850a6082dc6', '2025-08-22', 'full_day', 'late', 'Morning roll call record')
ON CONFLICT (student_id, session_date, period) DO NOTHING;
INSERT INTO public.attendance (id, student_id, session_date, period, status, remarks)
VALUES ('68fa984a-1233-4c31-9dc8-0a00869f802d', 'fef234a8-0c9c-468f-9383-f850a6082dc6', '2025-08-25', 'full_day', 'present', NULL)
ON CONFLICT (student_id, session_date, period) DO NOTHING;
INSERT INTO public.attendance (id, student_id, session_date, period, status, remarks)
VALUES ('b7ad06a9-6527-4a68-b182-4c7aebec1aaa', 'fef234a8-0c9c-468f-9383-f850a6082dc6', '2025-08-26', 'full_day', 'late', 'Morning roll call record')
ON CONFLICT (student_id, session_date, period) DO NOTHING;
INSERT INTO public.attendance (id, student_id, session_date, period, status, remarks)
VALUES ('f9e859dc-c821-48ec-bf93-0168e41ea299', 'fef234a8-0c9c-468f-9383-f850a6082dc6', '2025-08-27', 'full_day', 'absent', 'Morning roll call record')
ON CONFLICT (student_id, session_date, period) DO NOTHING;
INSERT INTO public.attendance (id, student_id, session_date, period, status, remarks)
VALUES ('828fb62f-4e8b-456a-b324-96057e7b688f', 'fef234a8-0c9c-468f-9383-f850a6082dc6', '2025-08-28', 'full_day', 'present', NULL)
ON CONFLICT (student_id, session_date, period) DO NOTHING;
INSERT INTO public.attendance (id, student_id, session_date, period, status, remarks)
VALUES ('8a18873f-81f9-4d1d-96a2-65cfdb2aece5', 'fef234a8-0c9c-468f-9383-f850a6082dc6', '2025-08-29', 'full_day', 'absent', 'Morning roll call record')
ON CONFLICT (student_id, session_date, period) DO NOTHING;
INSERT INTO public.attendance (id, student_id, session_date, period, status, remarks)
VALUES ('f9b64a44-9c6e-4d00-a82c-d85a8320e5d6', 'b7263fba-7dd1-48ee-99f4-be591aab11ad', '2025-08-01', 'full_day', 'present', NULL)
ON CONFLICT (student_id, session_date, period) DO NOTHING;
INSERT INTO public.attendance (id, student_id, session_date, period, status, remarks)
VALUES ('23ed51c8-fdc3-4249-9f2d-153c24d6cdd4', 'b7263fba-7dd1-48ee-99f4-be591aab11ad', '2025-08-04', 'full_day', 'present', NULL)
ON CONFLICT (student_id, session_date, period) DO NOTHING;
INSERT INTO public.attendance (id, student_id, session_date, period, status, remarks)
VALUES ('962cb3d7-2bcf-44a0-9e50-7d2fb2371dea', 'b7263fba-7dd1-48ee-99f4-be591aab11ad', '2025-08-05', 'full_day', 'present', NULL)
ON CONFLICT (student_id, session_date, period) DO NOTHING;
INSERT INTO public.attendance (id, student_id, session_date, period, status, remarks)
VALUES ('4005c332-f269-4ab3-8369-fe4b60febdda', 'b7263fba-7dd1-48ee-99f4-be591aab11ad', '2025-08-06', 'full_day', 'late', 'Morning roll call record')
ON CONFLICT (student_id, session_date, period) DO NOTHING;
INSERT INTO public.attendance (id, student_id, session_date, period, status, remarks)
VALUES ('47f155bd-ef46-459e-900d-491d34bce6e6', 'b7263fba-7dd1-48ee-99f4-be591aab11ad', '2025-08-07', 'full_day', 'present', NULL)
ON CONFLICT (student_id, session_date, period) DO NOTHING;
INSERT INTO public.attendance (id, student_id, session_date, period, status, remarks)
VALUES ('569fe931-dae2-4bc0-ae89-561a470c466f', 'b7263fba-7dd1-48ee-99f4-be591aab11ad', '2025-08-08', 'full_day', 'late', 'Morning roll call record')
ON CONFLICT (student_id, session_date, period) DO NOTHING;
INSERT INTO public.attendance (id, student_id, session_date, period, status, remarks)
VALUES ('228bd31b-611a-4ee2-9ee0-55e60dad3d55', 'b7263fba-7dd1-48ee-99f4-be591aab11ad', '2025-08-11', 'full_day', 'absent', 'Morning roll call record')
ON CONFLICT (student_id, session_date, period) DO NOTHING;
INSERT INTO public.attendance (id, student_id, session_date, period, status, remarks)
VALUES ('73e75ea4-ddad-49a9-a7b3-013577ef6522', 'b7263fba-7dd1-48ee-99f4-be591aab11ad', '2025-08-12', 'full_day', 'excused', 'Morning roll call record')
ON CONFLICT (student_id, session_date, period) DO NOTHING;
INSERT INTO public.attendance (id, student_id, session_date, period, status, remarks)
VALUES ('952cc22d-f81a-4f2b-886d-bc9d8be47e60', 'b7263fba-7dd1-48ee-99f4-be591aab11ad', '2025-08-13', 'full_day', 'present', NULL)
ON CONFLICT (student_id, session_date, period) DO NOTHING;
INSERT INTO public.attendance (id, student_id, session_date, period, status, remarks)
VALUES ('e468b5ae-68b0-4e43-8cdf-2a0986184c00', 'b7263fba-7dd1-48ee-99f4-be591aab11ad', '2025-08-14', 'full_day', 'absent', 'Morning roll call record')
ON CONFLICT (student_id, session_date, period) DO NOTHING;
INSERT INTO public.attendance (id, student_id, session_date, period, status, remarks)
VALUES ('ddd38439-f01d-4857-afff-464857a5c9b1', 'b7263fba-7dd1-48ee-99f4-be591aab11ad', '2025-08-15', 'full_day', 'present', NULL)
ON CONFLICT (student_id, session_date, period) DO NOTHING;
INSERT INTO public.attendance (id, student_id, session_date, period, status, remarks)
VALUES ('0e65ba31-afef-48df-b95a-d1990a00d011', 'b7263fba-7dd1-48ee-99f4-be591aab11ad', '2025-08-18', 'full_day', 'present', NULL)
ON CONFLICT (student_id, session_date, period) DO NOTHING;
INSERT INTO public.attendance (id, student_id, session_date, period, status, remarks)
VALUES ('fc619c59-f1f0-47da-b505-bc936bc901b5', 'b7263fba-7dd1-48ee-99f4-be591aab11ad', '2025-08-19', 'full_day', 'present', NULL)
ON CONFLICT (student_id, session_date, period) DO NOTHING;
INSERT INTO public.attendance (id, student_id, session_date, period, status, remarks)
VALUES ('8affd4bb-956e-4679-8182-de948869df5e', 'b7263fba-7dd1-48ee-99f4-be591aab11ad', '2025-08-20', 'full_day', 'present', NULL)
ON CONFLICT (student_id, session_date, period) DO NOTHING;
INSERT INTO public.attendance (id, student_id, session_date, period, status, remarks)
VALUES ('5b2ced74-2d25-40d3-aff9-ed4b0152db9a', 'b7263fba-7dd1-48ee-99f4-be591aab11ad', '2025-08-21', 'full_day', 'late', 'Morning roll call record')
ON CONFLICT (student_id, session_date, period) DO NOTHING;
INSERT INTO public.attendance (id, student_id, session_date, period, status, remarks)
VALUES ('95b45b4b-affb-4f21-9908-7bd0d3172246', 'b7263fba-7dd1-48ee-99f4-be591aab11ad', '2025-08-22', 'full_day', 'present', NULL)
ON CONFLICT (student_id, session_date, period) DO NOTHING;
INSERT INTO public.attendance (id, student_id, session_date, period, status, remarks)
VALUES ('3aae5995-9676-4315-a641-536df39e28f5', 'b7263fba-7dd1-48ee-99f4-be591aab11ad', '2025-08-25', 'full_day', 'present', NULL)
ON CONFLICT (student_id, session_date, period) DO NOTHING;
INSERT INTO public.attendance (id, student_id, session_date, period, status, remarks)
VALUES ('2d0611d9-b96b-46e6-ade9-4f0e89d1e706', 'b7263fba-7dd1-48ee-99f4-be591aab11ad', '2025-08-26', 'full_day', 'present', NULL)
ON CONFLICT (student_id, session_date, period) DO NOTHING;
INSERT INTO public.attendance (id, student_id, session_date, period, status, remarks)
VALUES ('61e643ac-e180-4590-ad6e-ac70e0bdf79a', 'b7263fba-7dd1-48ee-99f4-be591aab11ad', '2025-08-27', 'full_day', 'present', NULL)
ON CONFLICT (student_id, session_date, period) DO NOTHING;
INSERT INTO public.attendance (id, student_id, session_date, period, status, remarks)
VALUES ('2cbea62e-c141-4acb-9132-e8a206e9a28f', 'b7263fba-7dd1-48ee-99f4-be591aab11ad', '2025-08-28', 'full_day', 'present', NULL)
ON CONFLICT (student_id, session_date, period) DO NOTHING;
INSERT INTO public.attendance (id, student_id, session_date, period, status, remarks)
VALUES ('35a2317f-f3a6-4593-9b82-517658fa71fe', 'b7263fba-7dd1-48ee-99f4-be591aab11ad', '2025-08-29', 'full_day', 'absent', 'Morning roll call record')
ON CONFLICT (student_id, session_date, period) DO NOTHING;
INSERT INTO public.attendance (id, student_id, session_date, period, status, remarks)
VALUES ('e65b4ae9-aef2-4f6a-babc-e19a95c50e85', 'f76a0ab1-57e1-482c-a611-f09c0932d6b8', '2025-08-01', 'full_day', 'late', 'Morning roll call record')
ON CONFLICT (student_id, session_date, period) DO NOTHING;
INSERT INTO public.attendance (id, student_id, session_date, period, status, remarks)
VALUES ('8bce7e36-6a64-48c6-9d63-d0d02ca0ab4d', 'f76a0ab1-57e1-482c-a611-f09c0932d6b8', '2025-08-04', 'full_day', 'present', NULL)
ON CONFLICT (student_id, session_date, period) DO NOTHING;
INSERT INTO public.attendance (id, student_id, session_date, period, status, remarks)
VALUES ('7e11bb0b-a038-4586-9861-40252621f32d', 'f76a0ab1-57e1-482c-a611-f09c0932d6b8', '2025-08-05', 'full_day', 'present', NULL)
ON CONFLICT (student_id, session_date, period) DO NOTHING;
INSERT INTO public.attendance (id, student_id, session_date, period, status, remarks)
VALUES ('129f7945-e649-45e4-91b7-6964a859e5e5', 'f76a0ab1-57e1-482c-a611-f09c0932d6b8', '2025-08-06', 'full_day', 'present', NULL)
ON CONFLICT (student_id, session_date, period) DO NOTHING;
INSERT INTO public.attendance (id, student_id, session_date, period, status, remarks)
VALUES ('e0e2157a-0a95-4742-9bcf-ab0c85288ab9', 'f76a0ab1-57e1-482c-a611-f09c0932d6b8', '2025-08-07', 'full_day', 'present', NULL)
ON CONFLICT (student_id, session_date, period) DO NOTHING;
INSERT INTO public.attendance (id, student_id, session_date, period, status, remarks)
VALUES ('921a47a6-e0ce-4233-a8ff-c4b0716ca296', 'f76a0ab1-57e1-482c-a611-f09c0932d6b8', '2025-08-08', 'full_day', 'present', NULL)
ON CONFLICT (student_id, session_date, period) DO NOTHING;
INSERT INTO public.attendance (id, student_id, session_date, period, status, remarks)
VALUES ('d5b45eae-d910-4652-bd4a-fc5468951597', 'f76a0ab1-57e1-482c-a611-f09c0932d6b8', '2025-08-11', 'full_day', 'late', 'Morning roll call record')
ON CONFLICT (student_id, session_date, period) DO NOTHING;
INSERT INTO public.attendance (id, student_id, session_date, period, status, remarks)
VALUES ('5da80949-66a8-4ed0-9b58-2f262f4936c7', 'f76a0ab1-57e1-482c-a611-f09c0932d6b8', '2025-08-12', 'full_day', 'late', 'Morning roll call record')
ON CONFLICT (student_id, session_date, period) DO NOTHING;
INSERT INTO public.attendance (id, student_id, session_date, period, status, remarks)
VALUES ('a086c0fe-3f3c-4877-b156-9d2fc077b02b', 'f76a0ab1-57e1-482c-a611-f09c0932d6b8', '2025-08-13', 'full_day', 'present', NULL)
ON CONFLICT (student_id, session_date, period) DO NOTHING;
INSERT INTO public.attendance (id, student_id, session_date, period, status, remarks)
VALUES ('5b450f3a-ec1c-4e79-92e1-4d5d1056f99a', 'f76a0ab1-57e1-482c-a611-f09c0932d6b8', '2025-08-14', 'full_day', 'absent', 'Morning roll call record')
ON CONFLICT (student_id, session_date, period) DO NOTHING;
INSERT INTO public.attendance (id, student_id, session_date, period, status, remarks)
VALUES ('02ea4622-07b4-474c-b87e-6745d439dfb7', 'f76a0ab1-57e1-482c-a611-f09c0932d6b8', '2025-08-15', 'full_day', 'present', NULL)
ON CONFLICT (student_id, session_date, period) DO NOTHING;
INSERT INTO public.attendance (id, student_id, session_date, period, status, remarks)
VALUES ('c4d74315-eaf0-4162-b456-8588b85dfd39', 'f76a0ab1-57e1-482c-a611-f09c0932d6b8', '2025-08-18', 'full_day', 'late', 'Morning roll call record')
ON CONFLICT (student_id, session_date, period) DO NOTHING;
INSERT INTO public.attendance (id, student_id, session_date, period, status, remarks)
VALUES ('414de584-18fc-4d01-af7c-cce22d86e2a0', 'f76a0ab1-57e1-482c-a611-f09c0932d6b8', '2025-08-19', 'full_day', 'present', NULL)
ON CONFLICT (student_id, session_date, period) DO NOTHING;
INSERT INTO public.attendance (id, student_id, session_date, period, status, remarks)
VALUES ('331b1b2a-720b-47ae-93ba-7a88ccc0b315', 'f76a0ab1-57e1-482c-a611-f09c0932d6b8', '2025-08-20', 'full_day', 'present', NULL)
ON CONFLICT (student_id, session_date, period) DO NOTHING;
INSERT INTO public.attendance (id, student_id, session_date, period, status, remarks)
VALUES ('97645167-52e5-4ef0-8dd4-cca41edc6066', 'f76a0ab1-57e1-482c-a611-f09c0932d6b8', '2025-08-21', 'full_day', 'present', NULL)
ON CONFLICT (student_id, session_date, period) DO NOTHING;
INSERT INTO public.attendance (id, student_id, session_date, period, status, remarks)
VALUES ('fda6b9a0-54ef-4778-b05b-3f9f54da823e', 'f76a0ab1-57e1-482c-a611-f09c0932d6b8', '2025-08-22', 'full_day', 'absent', 'Morning roll call record')
ON CONFLICT (student_id, session_date, period) DO NOTHING;
INSERT INTO public.attendance (id, student_id, session_date, period, status, remarks)
VALUES ('1801c2cb-e7a7-4c2f-ae72-86e723567e30', 'f76a0ab1-57e1-482c-a611-f09c0932d6b8', '2025-08-25', 'full_day', 'present', NULL)
ON CONFLICT (student_id, session_date, period) DO NOTHING;
INSERT INTO public.attendance (id, student_id, session_date, period, status, remarks)
VALUES ('85feb6bb-0dff-41df-9f34-81019486ef00', 'f76a0ab1-57e1-482c-a611-f09c0932d6b8', '2025-08-26', 'full_day', 'late', 'Morning roll call record')
ON CONFLICT (student_id, session_date, period) DO NOTHING;
INSERT INTO public.attendance (id, student_id, session_date, period, status, remarks)
VALUES ('214c87c1-6281-4722-94e4-7f8bee0d9151', 'f76a0ab1-57e1-482c-a611-f09c0932d6b8', '2025-08-27', 'full_day', 'present', NULL)
ON CONFLICT (student_id, session_date, period) DO NOTHING;
INSERT INTO public.attendance (id, student_id, session_date, period, status, remarks)
VALUES ('89633b07-9543-4f41-8958-a652769215e3', 'f76a0ab1-57e1-482c-a611-f09c0932d6b8', '2025-08-28', 'full_day', 'present', NULL)
ON CONFLICT (student_id, session_date, period) DO NOTHING;
INSERT INTO public.attendance (id, student_id, session_date, period, status, remarks)
VALUES ('81d650d0-089d-46eb-bec2-1aa41aaf73db', 'f76a0ab1-57e1-482c-a611-f09c0932d6b8', '2025-08-29', 'full_day', 'present', NULL)
ON CONFLICT (student_id, session_date, period) DO NOTHING;
INSERT INTO public.attendance (id, student_id, session_date, period, status, remarks)
VALUES ('8e5ac354-10e1-411a-a0fe-003be2d47130', 'eca115ce-9ee0-4d3c-965d-e0a3a33b40c7', '2025-08-01', 'full_day', 'present', NULL)
ON CONFLICT (student_id, session_date, period) DO NOTHING;
INSERT INTO public.attendance (id, student_id, session_date, period, status, remarks)
VALUES ('b7ec2d6e-6f18-4f4e-915f-24642d3660cb', 'eca115ce-9ee0-4d3c-965d-e0a3a33b40c7', '2025-08-04', 'full_day', 'present', NULL)
ON CONFLICT (student_id, session_date, period) DO NOTHING;
INSERT INTO public.attendance (id, student_id, session_date, period, status, remarks)
VALUES ('99c9005a-5f56-47af-a868-eb657aa9b976', 'eca115ce-9ee0-4d3c-965d-e0a3a33b40c7', '2025-08-05', 'full_day', 'present', NULL)
ON CONFLICT (student_id, session_date, period) DO NOTHING;
INSERT INTO public.attendance (id, student_id, session_date, period, status, remarks)
VALUES ('affee567-daac-4c4c-a2f7-1fd16196b1fb', 'eca115ce-9ee0-4d3c-965d-e0a3a33b40c7', '2025-08-06', 'full_day', 'present', NULL)
ON CONFLICT (student_id, session_date, period) DO NOTHING;
INSERT INTO public.attendance (id, student_id, session_date, period, status, remarks)
VALUES ('6e335ac8-df17-4029-8cbd-635dce4ad7b7', 'eca115ce-9ee0-4d3c-965d-e0a3a33b40c7', '2025-08-07', 'full_day', 'present', NULL)
ON CONFLICT (student_id, session_date, period) DO NOTHING;
INSERT INTO public.attendance (id, student_id, session_date, period, status, remarks)
VALUES ('a7a95ab0-ef65-403c-90cb-a8dd4ed1f963', 'eca115ce-9ee0-4d3c-965d-e0a3a33b40c7', '2025-08-08', 'full_day', 'present', NULL)
ON CONFLICT (student_id, session_date, period) DO NOTHING;
INSERT INTO public.attendance (id, student_id, session_date, period, status, remarks)
VALUES ('433a4833-60ba-4b7c-9950-544850e132f0', 'eca115ce-9ee0-4d3c-965d-e0a3a33b40c7', '2025-08-11', 'full_day', 'present', NULL)
ON CONFLICT (student_id, session_date, period) DO NOTHING;
INSERT INTO public.attendance (id, student_id, session_date, period, status, remarks)
VALUES ('36b2d9d9-f64d-44a1-9706-45be63941636', 'eca115ce-9ee0-4d3c-965d-e0a3a33b40c7', '2025-08-12', 'full_day', 'present', NULL)
ON CONFLICT (student_id, session_date, period) DO NOTHING;
INSERT INTO public.attendance (id, student_id, session_date, period, status, remarks)
VALUES ('71514fb8-e106-468e-8f33-d2f457fbb18c', 'eca115ce-9ee0-4d3c-965d-e0a3a33b40c7', '2025-08-13', 'full_day', 'absent', 'Morning roll call record')
ON CONFLICT (student_id, session_date, period) DO NOTHING;
INSERT INTO public.attendance (id, student_id, session_date, period, status, remarks)
VALUES ('e4ebd5f8-5a6e-4c5c-b48c-bf9c8a87d637', 'eca115ce-9ee0-4d3c-965d-e0a3a33b40c7', '2025-08-14', 'full_day', 'present', NULL)
ON CONFLICT (student_id, session_date, period) DO NOTHING;
INSERT INTO public.attendance (id, student_id, session_date, period, status, remarks)
VALUES ('ce50e53f-3b4d-4fd0-9621-15259f318a2e', 'eca115ce-9ee0-4d3c-965d-e0a3a33b40c7', '2025-08-15', 'full_day', 'present', NULL)
ON CONFLICT (student_id, session_date, period) DO NOTHING;
INSERT INTO public.attendance (id, student_id, session_date, period, status, remarks)
VALUES ('dccb0a87-d2ec-4bc9-8e59-4ab2af46f0e9', 'eca115ce-9ee0-4d3c-965d-e0a3a33b40c7', '2025-08-18', 'full_day', 'present', NULL)
ON CONFLICT (student_id, session_date, period) DO NOTHING;
INSERT INTO public.attendance (id, student_id, session_date, period, status, remarks)
VALUES ('2a39363d-638a-4d41-b990-28c9197d5909', 'eca115ce-9ee0-4d3c-965d-e0a3a33b40c7', '2025-08-19', 'full_day', 'present', NULL)
ON CONFLICT (student_id, session_date, period) DO NOTHING;
INSERT INTO public.attendance (id, student_id, session_date, period, status, remarks)
VALUES ('f1f4798a-e1ba-4837-a56d-7766a44ff5d7', 'eca115ce-9ee0-4d3c-965d-e0a3a33b40c7', '2025-08-20', 'full_day', 'present', NULL)
ON CONFLICT (student_id, session_date, period) DO NOTHING;
INSERT INTO public.attendance (id, student_id, session_date, period, status, remarks)
VALUES ('fbf68fd2-b16c-4f79-809d-9a9b6de4839f', 'eca115ce-9ee0-4d3c-965d-e0a3a33b40c7', '2025-08-21', 'full_day', 'late', 'Morning roll call record')
ON CONFLICT (student_id, session_date, period) DO NOTHING;
INSERT INTO public.attendance (id, student_id, session_date, period, status, remarks)
VALUES ('ff613074-45b7-4ba0-a40b-f70fc5677b78', 'eca115ce-9ee0-4d3c-965d-e0a3a33b40c7', '2025-08-22', 'full_day', 'present', NULL)
ON CONFLICT (student_id, session_date, period) DO NOTHING;
INSERT INTO public.attendance (id, student_id, session_date, period, status, remarks)
VALUES ('b3520752-eb6d-4982-a110-04c4ed14bc59', 'eca115ce-9ee0-4d3c-965d-e0a3a33b40c7', '2025-08-25', 'full_day', 'excused', 'Morning roll call record')
ON CONFLICT (student_id, session_date, period) DO NOTHING;
INSERT INTO public.attendance (id, student_id, session_date, period, status, remarks)
VALUES ('88ae221b-3ce6-455a-ae3a-a16730e7400a', 'eca115ce-9ee0-4d3c-965d-e0a3a33b40c7', '2025-08-26', 'full_day', 'late', 'Morning roll call record')
ON CONFLICT (student_id, session_date, period) DO NOTHING;
INSERT INTO public.attendance (id, student_id, session_date, period, status, remarks)
VALUES ('a5eaa9f7-4e09-4322-81db-ce01b2500f58', 'eca115ce-9ee0-4d3c-965d-e0a3a33b40c7', '2025-08-27', 'full_day', 'present', NULL)
ON CONFLICT (student_id, session_date, period) DO NOTHING;
INSERT INTO public.attendance (id, student_id, session_date, period, status, remarks)
VALUES ('5dc5be45-f732-4ded-8c30-c7335d2fa7c4', 'eca115ce-9ee0-4d3c-965d-e0a3a33b40c7', '2025-08-28', 'full_day', 'present', NULL)
ON CONFLICT (student_id, session_date, period) DO NOTHING;
INSERT INTO public.attendance (id, student_id, session_date, period, status, remarks)
VALUES ('39fc2eef-b8af-4413-8481-6faa9fdf2cc0', 'eca115ce-9ee0-4d3c-965d-e0a3a33b40c7', '2025-08-29', 'full_day', 'present', NULL)
ON CONFLICT (student_id, session_date, period) DO NOTHING;
INSERT INTO public.attendance (id, student_id, session_date, period, status, remarks)
VALUES ('dccfc94a-2676-4cbb-8f99-c2c865078387', '06024d12-eb44-4417-8688-5eb60d3cff12', '2025-08-01', 'full_day', 'present', NULL)
ON CONFLICT (student_id, session_date, period) DO NOTHING;
INSERT INTO public.attendance (id, student_id, session_date, period, status, remarks)
VALUES ('b8eafe6d-e79a-4b8f-9edc-6fe0b945503c', '06024d12-eb44-4417-8688-5eb60d3cff12', '2025-08-04', 'full_day', 'absent', 'Morning roll call record')
ON CONFLICT (student_id, session_date, period) DO NOTHING;
INSERT INTO public.attendance (id, student_id, session_date, period, status, remarks)
VALUES ('35bb197e-efe7-4685-8fb9-c5b90bc8405c', '06024d12-eb44-4417-8688-5eb60d3cff12', '2025-08-05', 'full_day', 'present', NULL)
ON CONFLICT (student_id, session_date, period) DO NOTHING;
INSERT INTO public.attendance (id, student_id, session_date, period, status, remarks)
VALUES ('a7bcc93e-cf07-4b14-b93f-45bc386a5e7c', '06024d12-eb44-4417-8688-5eb60d3cff12', '2025-08-06', 'full_day', 'present', NULL)
ON CONFLICT (student_id, session_date, period) DO NOTHING;
INSERT INTO public.attendance (id, student_id, session_date, period, status, remarks)
VALUES ('0635fa89-cf58-48bc-b3a7-005ea1e78087', '06024d12-eb44-4417-8688-5eb60d3cff12', '2025-08-07', 'full_day', 'present', NULL)
ON CONFLICT (student_id, session_date, period) DO NOTHING;
INSERT INTO public.attendance (id, student_id, session_date, period, status, remarks)
VALUES ('2b05e51a-0415-4674-ad84-b268e1f05706', '06024d12-eb44-4417-8688-5eb60d3cff12', '2025-08-08', 'full_day', 'present', NULL)
ON CONFLICT (student_id, session_date, period) DO NOTHING;
INSERT INTO public.attendance (id, student_id, session_date, period, status, remarks)
VALUES ('9caa7484-488b-434d-bb4e-90ea58516293', '06024d12-eb44-4417-8688-5eb60d3cff12', '2025-08-11', 'full_day', 'present', NULL)
ON CONFLICT (student_id, session_date, period) DO NOTHING;
INSERT INTO public.attendance (id, student_id, session_date, period, status, remarks)
VALUES ('279a090c-1dbd-4c01-8d1f-b95e47fb1e57', '06024d12-eb44-4417-8688-5eb60d3cff12', '2025-08-12', 'full_day', 'present', NULL)
ON CONFLICT (student_id, session_date, period) DO NOTHING;
INSERT INTO public.attendance (id, student_id, session_date, period, status, remarks)
VALUES ('58107020-caf0-40ba-80a2-a0f292502562', '06024d12-eb44-4417-8688-5eb60d3cff12', '2025-08-13', 'full_day', 'present', NULL)
ON CONFLICT (student_id, session_date, period) DO NOTHING;
INSERT INTO public.attendance (id, student_id, session_date, period, status, remarks)
VALUES ('4b039c1c-56d3-4d20-a96d-d3ce7b403e29', '06024d12-eb44-4417-8688-5eb60d3cff12', '2025-08-14', 'full_day', 'present', NULL)
ON CONFLICT (student_id, session_date, period) DO NOTHING;
INSERT INTO public.attendance (id, student_id, session_date, period, status, remarks)
VALUES ('d1a0cfa1-e15f-4d47-819b-08a37e1d02f0', '06024d12-eb44-4417-8688-5eb60d3cff12', '2025-08-15', 'full_day', 'present', NULL)
ON CONFLICT (student_id, session_date, period) DO NOTHING;
INSERT INTO public.attendance (id, student_id, session_date, period, status, remarks)
VALUES ('c6a69dba-528f-4dd5-b412-ee4a40d26d11', '06024d12-eb44-4417-8688-5eb60d3cff12', '2025-08-18', 'full_day', 'present', NULL)
ON CONFLICT (student_id, session_date, period) DO NOTHING;
INSERT INTO public.attendance (id, student_id, session_date, period, status, remarks)
VALUES ('23ea822c-fbfd-4016-a7fe-8154938c9778', '06024d12-eb44-4417-8688-5eb60d3cff12', '2025-08-19', 'full_day', 'present', NULL)
ON CONFLICT (student_id, session_date, period) DO NOTHING;
INSERT INTO public.attendance (id, student_id, session_date, period, status, remarks)
VALUES ('fed78962-ee87-4af5-8bee-9623335b968a', '06024d12-eb44-4417-8688-5eb60d3cff12', '2025-08-20', 'full_day', 'present', NULL)
ON CONFLICT (student_id, session_date, period) DO NOTHING;
INSERT INTO public.attendance (id, student_id, session_date, period, status, remarks)
VALUES ('313b1f27-a61d-4073-9fc6-c2854b90d928', '06024d12-eb44-4417-8688-5eb60d3cff12', '2025-08-21', 'full_day', 'present', NULL)
ON CONFLICT (student_id, session_date, period) DO NOTHING;
INSERT INTO public.attendance (id, student_id, session_date, period, status, remarks)
VALUES ('641403bf-8367-4737-a5b1-94926faec0f4', '06024d12-eb44-4417-8688-5eb60d3cff12', '2025-08-22', 'full_day', 'present', NULL)
ON CONFLICT (student_id, session_date, period) DO NOTHING;
INSERT INTO public.attendance (id, student_id, session_date, period, status, remarks)
VALUES ('a768e7be-e18e-44e0-90c3-0d9b8d94ce8d', '06024d12-eb44-4417-8688-5eb60d3cff12', '2025-08-25', 'full_day', 'present', NULL)
ON CONFLICT (student_id, session_date, period) DO NOTHING;
INSERT INTO public.attendance (id, student_id, session_date, period, status, remarks)
VALUES ('992619e2-0c1a-42b1-bd94-96a93efb92d6', '06024d12-eb44-4417-8688-5eb60d3cff12', '2025-08-26', 'full_day', 'absent', 'Morning roll call record')
ON CONFLICT (student_id, session_date, period) DO NOTHING;
INSERT INTO public.attendance (id, student_id, session_date, period, status, remarks)
VALUES ('b35d7850-aee1-4c2c-8c4c-3316de643d60', '06024d12-eb44-4417-8688-5eb60d3cff12', '2025-08-27', 'full_day', 'late', 'Morning roll call record')
ON CONFLICT (student_id, session_date, period) DO NOTHING;
INSERT INTO public.attendance (id, student_id, session_date, period, status, remarks)
VALUES ('039f5f1c-ad79-4223-874d-5fdc9f06835a', '06024d12-eb44-4417-8688-5eb60d3cff12', '2025-08-28', 'full_day', 'present', NULL)
ON CONFLICT (student_id, session_date, period) DO NOTHING;
INSERT INTO public.attendance (id, student_id, session_date, period, status, remarks)
VALUES ('67e9de0b-2b6c-4dbf-af7a-9bddccc67e26', '06024d12-eb44-4417-8688-5eb60d3cff12', '2025-08-29', 'full_day', 'present', NULL)
ON CONFLICT (student_id, session_date, period) DO NOTHING;
INSERT INTO public.attendance (id, student_id, session_date, period, status, remarks)
VALUES ('b33cc721-9b11-4da8-aa08-9590a069a665', '0ed0d835-d441-45ea-98da-efe44480ad7a', '2025-08-01', 'full_day', 'present', NULL)
ON CONFLICT (student_id, session_date, period) DO NOTHING;
INSERT INTO public.attendance (id, student_id, session_date, period, status, remarks)
VALUES ('4b87bdaf-dcb3-45d9-9ac2-a4ba883d610e', '0ed0d835-d441-45ea-98da-efe44480ad7a', '2025-08-04', 'full_day', 'present', NULL)
ON CONFLICT (student_id, session_date, period) DO NOTHING;
INSERT INTO public.attendance (id, student_id, session_date, period, status, remarks)
VALUES ('697ab1ba-1dac-4254-adb4-ddc601d4f7ee', '0ed0d835-d441-45ea-98da-efe44480ad7a', '2025-08-05', 'full_day', 'present', NULL)
ON CONFLICT (student_id, session_date, period) DO NOTHING;
INSERT INTO public.attendance (id, student_id, session_date, period, status, remarks)
VALUES ('adc3bcf3-b872-4cb4-b801-9ed3e085d42b', '0ed0d835-d441-45ea-98da-efe44480ad7a', '2025-08-06', 'full_day', 'present', NULL)
ON CONFLICT (student_id, session_date, period) DO NOTHING;
INSERT INTO public.attendance (id, student_id, session_date, period, status, remarks)
VALUES ('78816b5e-4f4f-4857-838b-3648bfb8c8b3', '0ed0d835-d441-45ea-98da-efe44480ad7a', '2025-08-07', 'full_day', 'present', NULL)
ON CONFLICT (student_id, session_date, period) DO NOTHING;
INSERT INTO public.attendance (id, student_id, session_date, period, status, remarks)
VALUES ('6a790a8d-f0ab-4eb0-86d3-d4b480366786', '0ed0d835-d441-45ea-98da-efe44480ad7a', '2025-08-08', 'full_day', 'present', NULL)
ON CONFLICT (student_id, session_date, period) DO NOTHING;
INSERT INTO public.attendance (id, student_id, session_date, period, status, remarks)
VALUES ('f65b8e4a-c710-4e29-a129-4e6e155e11f3', '0ed0d835-d441-45ea-98da-efe44480ad7a', '2025-08-11', 'full_day', 'late', 'Morning roll call record')
ON CONFLICT (student_id, session_date, period) DO NOTHING;
INSERT INTO public.attendance (id, student_id, session_date, period, status, remarks)
VALUES ('e4e247bd-237f-40f4-a9f6-2d4d69fa4c53', '0ed0d835-d441-45ea-98da-efe44480ad7a', '2025-08-12', 'full_day', 'present', NULL)
ON CONFLICT (student_id, session_date, period) DO NOTHING;
INSERT INTO public.attendance (id, student_id, session_date, period, status, remarks)
VALUES ('2caceb6e-d272-4bae-a134-7f32dc71e701', '0ed0d835-d441-45ea-98da-efe44480ad7a', '2025-08-13', 'full_day', 'present', NULL)
ON CONFLICT (student_id, session_date, period) DO NOTHING;
INSERT INTO public.attendance (id, student_id, session_date, period, status, remarks)
VALUES ('b7e033e8-4d8b-49c2-9e19-880cd3187f5f', '0ed0d835-d441-45ea-98da-efe44480ad7a', '2025-08-14', 'full_day', 'present', NULL)
ON CONFLICT (student_id, session_date, period) DO NOTHING;
INSERT INTO public.attendance (id, student_id, session_date, period, status, remarks)
VALUES ('99fcdcf5-193d-492f-97c6-fc40b659ae20', '0ed0d835-d441-45ea-98da-efe44480ad7a', '2025-08-15', 'full_day', 'absent', 'Morning roll call record')
ON CONFLICT (student_id, session_date, period) DO NOTHING;
INSERT INTO public.attendance (id, student_id, session_date, period, status, remarks)
VALUES ('4b017cbb-fe0c-4b00-83ca-639734a5e7ef', '0ed0d835-d441-45ea-98da-efe44480ad7a', '2025-08-18', 'full_day', 'late', 'Morning roll call record')
ON CONFLICT (student_id, session_date, period) DO NOTHING;
INSERT INTO public.attendance (id, student_id, session_date, period, status, remarks)
VALUES ('76c702e0-91bb-499c-a867-8f9a931e2e4e', '0ed0d835-d441-45ea-98da-efe44480ad7a', '2025-08-19', 'full_day', 'present', NULL)
ON CONFLICT (student_id, session_date, period) DO NOTHING;
INSERT INTO public.attendance (id, student_id, session_date, period, status, remarks)
VALUES ('3c77ed0c-0675-4dfe-9cf3-50c678bf8a33', '0ed0d835-d441-45ea-98da-efe44480ad7a', '2025-08-20', 'full_day', 'present', NULL)
ON CONFLICT (student_id, session_date, period) DO NOTHING;
INSERT INTO public.attendance (id, student_id, session_date, period, status, remarks)
VALUES ('f2dd3c80-fa7e-4a09-b629-715c0ff57d29', '0ed0d835-d441-45ea-98da-efe44480ad7a', '2025-08-21', 'full_day', 'present', NULL)
ON CONFLICT (student_id, session_date, period) DO NOTHING;
INSERT INTO public.attendance (id, student_id, session_date, period, status, remarks)
VALUES ('3c82c918-b0b5-48c2-ae53-6b1103eed2e1', '0ed0d835-d441-45ea-98da-efe44480ad7a', '2025-08-22', 'full_day', 'present', NULL)
ON CONFLICT (student_id, session_date, period) DO NOTHING;
INSERT INTO public.attendance (id, student_id, session_date, period, status, remarks)
VALUES ('26f2bedd-63f8-4e7e-ae96-a3439d88443e', '0ed0d835-d441-45ea-98da-efe44480ad7a', '2025-08-25', 'full_day', 'excused', 'Morning roll call record')
ON CONFLICT (student_id, session_date, period) DO NOTHING;
INSERT INTO public.attendance (id, student_id, session_date, period, status, remarks)
VALUES ('10bd6e17-ebcd-47af-818d-441bfcd87be6', '0ed0d835-d441-45ea-98da-efe44480ad7a', '2025-08-26', 'full_day', 'present', NULL)
ON CONFLICT (student_id, session_date, period) DO NOTHING;
INSERT INTO public.attendance (id, student_id, session_date, period, status, remarks)
VALUES ('548612b4-c869-4a21-b8d6-bac17a0b4231', '0ed0d835-d441-45ea-98da-efe44480ad7a', '2025-08-27', 'full_day', 'present', NULL)
ON CONFLICT (student_id, session_date, period) DO NOTHING;
INSERT INTO public.attendance (id, student_id, session_date, period, status, remarks)
VALUES ('adac5129-0427-4c91-9a67-5905f2b7b563', '0ed0d835-d441-45ea-98da-efe44480ad7a', '2025-08-28', 'full_day', 'excused', 'Morning roll call record')
ON CONFLICT (student_id, session_date, period) DO NOTHING;
INSERT INTO public.attendance (id, student_id, session_date, period, status, remarks)
VALUES ('013ed716-66d4-4f9f-9aa8-9c0b94847cd3', '0ed0d835-d441-45ea-98da-efe44480ad7a', '2025-08-29', 'full_day', 'present', NULL)
ON CONFLICT (student_id, session_date, period) DO NOTHING;
INSERT INTO public.attendance (id, student_id, session_date, period, status, remarks)
VALUES ('abd74798-cc12-46ae-88c2-a213c8fc3556', '23c7c2fc-8dec-42bf-b8c2-a1b7a497a8e6', '2025-08-01', 'full_day', 'present', NULL)
ON CONFLICT (student_id, session_date, period) DO NOTHING;
INSERT INTO public.attendance (id, student_id, session_date, period, status, remarks)
VALUES ('64bf9309-8bef-497c-b56a-8d51957fb549', '23c7c2fc-8dec-42bf-b8c2-a1b7a497a8e6', '2025-08-04', 'full_day', 'late', 'Morning roll call record')
ON CONFLICT (student_id, session_date, period) DO NOTHING;
INSERT INTO public.attendance (id, student_id, session_date, period, status, remarks)
VALUES ('105d9cdb-243d-439c-aa9c-3256c04eac78', '23c7c2fc-8dec-42bf-b8c2-a1b7a497a8e6', '2025-08-05', 'full_day', 'present', NULL)
ON CONFLICT (student_id, session_date, period) DO NOTHING;
INSERT INTO public.attendance (id, student_id, session_date, period, status, remarks)
VALUES ('db59e787-e6e6-4c43-b0cb-e3cdbae292dc', '23c7c2fc-8dec-42bf-b8c2-a1b7a497a8e6', '2025-08-06', 'full_day', 'absent', 'Morning roll call record')
ON CONFLICT (student_id, session_date, period) DO NOTHING;
INSERT INTO public.attendance (id, student_id, session_date, period, status, remarks)
VALUES ('86a56050-fd5b-4467-abdf-4c7cc65cf083', '23c7c2fc-8dec-42bf-b8c2-a1b7a497a8e6', '2025-08-07', 'full_day', 'present', NULL)
ON CONFLICT (student_id, session_date, period) DO NOTHING;
INSERT INTO public.attendance (id, student_id, session_date, period, status, remarks)
VALUES ('a2e0b7cf-28aa-4d4a-a861-e412df940b83', '23c7c2fc-8dec-42bf-b8c2-a1b7a497a8e6', '2025-08-08', 'full_day', 'late', 'Morning roll call record')
ON CONFLICT (student_id, session_date, period) DO NOTHING;
INSERT INTO public.attendance (id, student_id, session_date, period, status, remarks)
VALUES ('9ebc2992-c9ba-4e12-9ee4-3dc4c53040a0', '23c7c2fc-8dec-42bf-b8c2-a1b7a497a8e6', '2025-08-11', 'full_day', 'present', NULL)
ON CONFLICT (student_id, session_date, period) DO NOTHING;
INSERT INTO public.attendance (id, student_id, session_date, period, status, remarks)
VALUES ('77c5bd4f-2bd0-412e-b257-c9b2a304b7dd', '23c7c2fc-8dec-42bf-b8c2-a1b7a497a8e6', '2025-08-12', 'full_day', 'present', NULL)
ON CONFLICT (student_id, session_date, period) DO NOTHING;
INSERT INTO public.attendance (id, student_id, session_date, period, status, remarks)
VALUES ('9d3732f2-4a45-44f4-afc1-20b39fb69978', '23c7c2fc-8dec-42bf-b8c2-a1b7a497a8e6', '2025-08-13', 'full_day', 'present', NULL)
ON CONFLICT (student_id, session_date, period) DO NOTHING;
INSERT INTO public.attendance (id, student_id, session_date, period, status, remarks)
VALUES ('f9c3e42e-76d4-4308-ad6a-d17f70fc090e', '23c7c2fc-8dec-42bf-b8c2-a1b7a497a8e6', '2025-08-14', 'full_day', 'excused', 'Morning roll call record')
ON CONFLICT (student_id, session_date, period) DO NOTHING;
INSERT INTO public.attendance (id, student_id, session_date, period, status, remarks)
VALUES ('2fbb47cd-177a-469a-b13a-90acd11c9a00', '23c7c2fc-8dec-42bf-b8c2-a1b7a497a8e6', '2025-08-15', 'full_day', 'present', NULL)
ON CONFLICT (student_id, session_date, period) DO NOTHING;
INSERT INTO public.attendance (id, student_id, session_date, period, status, remarks)
VALUES ('b0deb81b-87a4-454b-a1d9-495e2a71f1a1', '23c7c2fc-8dec-42bf-b8c2-a1b7a497a8e6', '2025-08-18', 'full_day', 'present', NULL)
ON CONFLICT (student_id, session_date, period) DO NOTHING;
INSERT INTO public.attendance (id, student_id, session_date, period, status, remarks)
VALUES ('5f267c9d-e21d-49a3-b7bd-df5779c0a54e', '23c7c2fc-8dec-42bf-b8c2-a1b7a497a8e6', '2025-08-19', 'full_day', 'present', NULL)
ON CONFLICT (student_id, session_date, period) DO NOTHING;
INSERT INTO public.attendance (id, student_id, session_date, period, status, remarks)
VALUES ('551dcc1f-89be-46e2-a343-95f133127613', '23c7c2fc-8dec-42bf-b8c2-a1b7a497a8e6', '2025-08-20', 'full_day', 'present', NULL)
ON CONFLICT (student_id, session_date, period) DO NOTHING;
INSERT INTO public.attendance (id, student_id, session_date, period, status, remarks)
VALUES ('8c18020c-bdff-49c2-a229-86cbdbc05c2e', '23c7c2fc-8dec-42bf-b8c2-a1b7a497a8e6', '2025-08-21', 'full_day', 'present', NULL)
ON CONFLICT (student_id, session_date, period) DO NOTHING;
INSERT INTO public.attendance (id, student_id, session_date, period, status, remarks)
VALUES ('c5d8ea21-d344-41fd-913c-e8d309bc01d1', '23c7c2fc-8dec-42bf-b8c2-a1b7a497a8e6', '2025-08-22', 'full_day', 'present', NULL)
ON CONFLICT (student_id, session_date, period) DO NOTHING;
INSERT INTO public.attendance (id, student_id, session_date, period, status, remarks)
VALUES ('17cf045e-7382-4890-a366-6d793524d388', '23c7c2fc-8dec-42bf-b8c2-a1b7a497a8e6', '2025-08-25', 'full_day', 'present', NULL)
ON CONFLICT (student_id, session_date, period) DO NOTHING;
INSERT INTO public.attendance (id, student_id, session_date, period, status, remarks)
VALUES ('fa843136-8fcb-4726-920a-711fa81ec539', '23c7c2fc-8dec-42bf-b8c2-a1b7a497a8e6', '2025-08-26', 'full_day', 'present', NULL)
ON CONFLICT (student_id, session_date, period) DO NOTHING;
INSERT INTO public.attendance (id, student_id, session_date, period, status, remarks)
VALUES ('87c2e93d-80d1-4846-a7ec-01f7ada7ef9a', '23c7c2fc-8dec-42bf-b8c2-a1b7a497a8e6', '2025-08-27', 'full_day', 'present', NULL)
ON CONFLICT (student_id, session_date, period) DO NOTHING;
INSERT INTO public.attendance (id, student_id, session_date, period, status, remarks)
VALUES ('87ea4aec-905d-49ea-b68c-98743fa78ecb', '23c7c2fc-8dec-42bf-b8c2-a1b7a497a8e6', '2025-08-28', 'full_day', 'present', NULL)
ON CONFLICT (student_id, session_date, period) DO NOTHING;
INSERT INTO public.attendance (id, student_id, session_date, period, status, remarks)
VALUES ('a518af50-012b-4292-9927-49b4d9da9d28', '23c7c2fc-8dec-42bf-b8c2-a1b7a497a8e6', '2025-08-29', 'full_day', 'present', NULL)
ON CONFLICT (student_id, session_date, period) DO NOTHING;
INSERT INTO public.attendance (id, student_id, session_date, period, status, remarks)
VALUES ('fdfb54aa-f276-4fef-9af6-9a5c7a878b58', '91ce6ee5-9509-461e-ae83-f443631a3016', '2025-08-01', 'full_day', 'present', NULL)
ON CONFLICT (student_id, session_date, period) DO NOTHING;
INSERT INTO public.attendance (id, student_id, session_date, period, status, remarks)
VALUES ('a129befd-ab44-48b3-acab-e469bc4d02a2', '91ce6ee5-9509-461e-ae83-f443631a3016', '2025-08-04', 'full_day', 'present', NULL)
ON CONFLICT (student_id, session_date, period) DO NOTHING;
INSERT INTO public.attendance (id, student_id, session_date, period, status, remarks)
VALUES ('ceaeeee0-d40f-41e3-ad06-801a0f46617d', '91ce6ee5-9509-461e-ae83-f443631a3016', '2025-08-05', 'full_day', 'present', NULL)
ON CONFLICT (student_id, session_date, period) DO NOTHING;
INSERT INTO public.attendance (id, student_id, session_date, period, status, remarks)
VALUES ('501243ac-a7a8-45f5-817f-9620fe71a5bb', '91ce6ee5-9509-461e-ae83-f443631a3016', '2025-08-06', 'full_day', 'present', NULL)
ON CONFLICT (student_id, session_date, period) DO NOTHING;
INSERT INTO public.attendance (id, student_id, session_date, period, status, remarks)
VALUES ('84432873-ac88-4697-92fb-3c1d79663490', '91ce6ee5-9509-461e-ae83-f443631a3016', '2025-08-07', 'full_day', 'present', NULL)
ON CONFLICT (student_id, session_date, period) DO NOTHING;
INSERT INTO public.attendance (id, student_id, session_date, period, status, remarks)
VALUES ('34ec872b-70c8-40a4-a078-621a8f044584', '91ce6ee5-9509-461e-ae83-f443631a3016', '2025-08-08', 'full_day', 'present', NULL)
ON CONFLICT (student_id, session_date, period) DO NOTHING;
INSERT INTO public.attendance (id, student_id, session_date, period, status, remarks)
VALUES ('0ab1bd24-049b-474a-8915-2167b0617225', '91ce6ee5-9509-461e-ae83-f443631a3016', '2025-08-11', 'full_day', 'present', NULL)
ON CONFLICT (student_id, session_date, period) DO NOTHING;
INSERT INTO public.attendance (id, student_id, session_date, period, status, remarks)
VALUES ('37cc4b02-97f7-4a6b-b927-4e401df4004c', '91ce6ee5-9509-461e-ae83-f443631a3016', '2025-08-12', 'full_day', 'present', NULL)
ON CONFLICT (student_id, session_date, period) DO NOTHING;
INSERT INTO public.attendance (id, student_id, session_date, period, status, remarks)
VALUES ('4ed14ff2-407a-455e-b9fc-742f60650a55', '91ce6ee5-9509-461e-ae83-f443631a3016', '2025-08-13', 'full_day', 'present', NULL)
ON CONFLICT (student_id, session_date, period) DO NOTHING;
INSERT INTO public.attendance (id, student_id, session_date, period, status, remarks)
VALUES ('00dff1c4-dcd2-4d13-9706-aacd06c491d6', '91ce6ee5-9509-461e-ae83-f443631a3016', '2025-08-14', 'full_day', 'present', NULL)
ON CONFLICT (student_id, session_date, period) DO NOTHING;
INSERT INTO public.attendance (id, student_id, session_date, period, status, remarks)
VALUES ('25d0ab45-7e66-4aa7-ad0c-87cb50fcf89f', '91ce6ee5-9509-461e-ae83-f443631a3016', '2025-08-15', 'full_day', 'present', NULL)
ON CONFLICT (student_id, session_date, period) DO NOTHING;
INSERT INTO public.attendance (id, student_id, session_date, period, status, remarks)
VALUES ('53557f40-252a-41e3-af01-dd0a89e7fd1b', '91ce6ee5-9509-461e-ae83-f443631a3016', '2025-08-18', 'full_day', 'present', NULL)
ON CONFLICT (student_id, session_date, period) DO NOTHING;
INSERT INTO public.attendance (id, student_id, session_date, period, status, remarks)
VALUES ('87874855-9cb6-4ff6-9b92-419950197e8a', '91ce6ee5-9509-461e-ae83-f443631a3016', '2025-08-19', 'full_day', 'present', NULL)
ON CONFLICT (student_id, session_date, period) DO NOTHING;
INSERT INTO public.attendance (id, student_id, session_date, period, status, remarks)
VALUES ('a06c5854-6d18-4f0c-aa06-2aba573af9e3', '91ce6ee5-9509-461e-ae83-f443631a3016', '2025-08-20', 'full_day', 'present', NULL)
ON CONFLICT (student_id, session_date, period) DO NOTHING;
INSERT INTO public.attendance (id, student_id, session_date, period, status, remarks)
VALUES ('67b374e2-713c-4b84-89e1-f6a182cf2605', '91ce6ee5-9509-461e-ae83-f443631a3016', '2025-08-21', 'full_day', 'present', NULL)
ON CONFLICT (student_id, session_date, period) DO NOTHING;
INSERT INTO public.attendance (id, student_id, session_date, period, status, remarks)
VALUES ('59da75e7-6b68-4ecf-a19f-2043fc9da798', '91ce6ee5-9509-461e-ae83-f443631a3016', '2025-08-22', 'full_day', 'present', NULL)
ON CONFLICT (student_id, session_date, period) DO NOTHING;
INSERT INTO public.attendance (id, student_id, session_date, period, status, remarks)
VALUES ('bca13865-5453-4bb7-a633-23ebfb8d3ab7', '91ce6ee5-9509-461e-ae83-f443631a3016', '2025-08-25', 'full_day', 'present', NULL)
ON CONFLICT (student_id, session_date, period) DO NOTHING;
INSERT INTO public.attendance (id, student_id, session_date, period, status, remarks)
VALUES ('a10b3cfc-42ae-4ada-9394-2f2eff80ce23', '91ce6ee5-9509-461e-ae83-f443631a3016', '2025-08-26', 'full_day', 'present', NULL)
ON CONFLICT (student_id, session_date, period) DO NOTHING;
INSERT INTO public.attendance (id, student_id, session_date, period, status, remarks)
VALUES ('feb478a2-78e7-4082-b3c7-2c074b51f476', '91ce6ee5-9509-461e-ae83-f443631a3016', '2025-08-27', 'full_day', 'present', NULL)
ON CONFLICT (student_id, session_date, period) DO NOTHING;
INSERT INTO public.attendance (id, student_id, session_date, period, status, remarks)
VALUES ('5748c312-43f0-49f0-9192-fa19076296df', '91ce6ee5-9509-461e-ae83-f443631a3016', '2025-08-28', 'full_day', 'present', NULL)
ON CONFLICT (student_id, session_date, period) DO NOTHING;
INSERT INTO public.attendance (id, student_id, session_date, period, status, remarks)
VALUES ('a14ce1b3-4877-49cc-b80f-bc7c1ff4958d', '91ce6ee5-9509-461e-ae83-f443631a3016', '2025-08-29', 'full_day', 'present', NULL)
ON CONFLICT (student_id, session_date, period) DO NOTHING;
INSERT INTO public.attendance (id, student_id, session_date, period, status, remarks)
VALUES ('8823ed51-2121-4c65-8a11-18dd617ca6d9', '689593b4-7c6c-42a3-a041-16f1ac029f06', '2025-08-01', 'full_day', 'present', NULL)
ON CONFLICT (student_id, session_date, period) DO NOTHING;
INSERT INTO public.attendance (id, student_id, session_date, period, status, remarks)
VALUES ('b745fa30-737a-476e-914f-13a2390f2e59', '689593b4-7c6c-42a3-a041-16f1ac029f06', '2025-08-04', 'full_day', 'present', NULL)
ON CONFLICT (student_id, session_date, period) DO NOTHING;
INSERT INTO public.attendance (id, student_id, session_date, period, status, remarks)
VALUES ('0730dbdb-64a1-4925-95f5-4c61a49a382e', '689593b4-7c6c-42a3-a041-16f1ac029f06', '2025-08-05', 'full_day', 'present', NULL)
ON CONFLICT (student_id, session_date, period) DO NOTHING;
INSERT INTO public.attendance (id, student_id, session_date, period, status, remarks)
VALUES ('6ea8cab9-086a-4cfd-9a2d-b73cfb264734', '689593b4-7c6c-42a3-a041-16f1ac029f06', '2025-08-06', 'full_day', 'present', NULL)
ON CONFLICT (student_id, session_date, period) DO NOTHING;
INSERT INTO public.attendance (id, student_id, session_date, period, status, remarks)
VALUES ('0b5f3a61-625b-4877-b982-399ba54fa269', '689593b4-7c6c-42a3-a041-16f1ac029f06', '2025-08-07', 'full_day', 'present', NULL)
ON CONFLICT (student_id, session_date, period) DO NOTHING;
INSERT INTO public.attendance (id, student_id, session_date, period, status, remarks)
VALUES ('1b7321f9-83d8-4fce-83b0-58d1bdfddc1a', '689593b4-7c6c-42a3-a041-16f1ac029f06', '2025-08-08', 'full_day', 'present', NULL)
ON CONFLICT (student_id, session_date, period) DO NOTHING;
INSERT INTO public.attendance (id, student_id, session_date, period, status, remarks)
VALUES ('72ceb511-d3b3-4c01-a907-63e03b7936cb', '689593b4-7c6c-42a3-a041-16f1ac029f06', '2025-08-11', 'full_day', 'present', NULL)
ON CONFLICT (student_id, session_date, period) DO NOTHING;
INSERT INTO public.attendance (id, student_id, session_date, period, status, remarks)
VALUES ('bc292a35-b512-456a-aff7-b464ed7dcf8f', '689593b4-7c6c-42a3-a041-16f1ac029f06', '2025-08-12', 'full_day', 'present', NULL)
ON CONFLICT (student_id, session_date, period) DO NOTHING;
INSERT INTO public.attendance (id, student_id, session_date, period, status, remarks)
VALUES ('ee0dceab-5be4-4ce8-b44e-d34936e1fdf6', '689593b4-7c6c-42a3-a041-16f1ac029f06', '2025-08-13', 'full_day', 'present', NULL)
ON CONFLICT (student_id, session_date, period) DO NOTHING;
INSERT INTO public.attendance (id, student_id, session_date, period, status, remarks)
VALUES ('1bfab12c-032c-450f-986c-cf2d4bdff578', '689593b4-7c6c-42a3-a041-16f1ac029f06', '2025-08-14', 'full_day', 'present', NULL)
ON CONFLICT (student_id, session_date, period) DO NOTHING;
INSERT INTO public.attendance (id, student_id, session_date, period, status, remarks)
VALUES ('8c4bf1e1-2cee-4e77-835f-00c76ae3ae18', '689593b4-7c6c-42a3-a041-16f1ac029f06', '2025-08-15', 'full_day', 'present', NULL)
ON CONFLICT (student_id, session_date, period) DO NOTHING;
INSERT INTO public.attendance (id, student_id, session_date, period, status, remarks)
VALUES ('eb56064e-9de5-4986-9631-8d2ba3bb4a6e', '689593b4-7c6c-42a3-a041-16f1ac029f06', '2025-08-18', 'full_day', 'present', NULL)
ON CONFLICT (student_id, session_date, period) DO NOTHING;
INSERT INTO public.attendance (id, student_id, session_date, period, status, remarks)
VALUES ('438d5c4a-6999-4987-9aba-305f36bff807', '689593b4-7c6c-42a3-a041-16f1ac029f06', '2025-08-19', 'full_day', 'absent', 'Morning roll call record')
ON CONFLICT (student_id, session_date, period) DO NOTHING;
INSERT INTO public.attendance (id, student_id, session_date, period, status, remarks)
VALUES ('b92d9e67-a135-4b88-9dbb-be298bf430e1', '689593b4-7c6c-42a3-a041-16f1ac029f06', '2025-08-20', 'full_day', 'present', NULL)
ON CONFLICT (student_id, session_date, period) DO NOTHING;
INSERT INTO public.attendance (id, student_id, session_date, period, status, remarks)
VALUES ('6d5cba50-85f5-468a-bdb9-b06f4fdf2c19', '689593b4-7c6c-42a3-a041-16f1ac029f06', '2025-08-21', 'full_day', 'present', NULL)
ON CONFLICT (student_id, session_date, period) DO NOTHING;
INSERT INTO public.attendance (id, student_id, session_date, period, status, remarks)
VALUES ('44db4b0f-c8b4-4279-aa12-af6bcca9cfb6', '689593b4-7c6c-42a3-a041-16f1ac029f06', '2025-08-22', 'full_day', 'present', NULL)
ON CONFLICT (student_id, session_date, period) DO NOTHING;
INSERT INTO public.attendance (id, student_id, session_date, period, status, remarks)
VALUES ('e7c74db3-5377-4ae2-8122-9f476f28b39a', '689593b4-7c6c-42a3-a041-16f1ac029f06', '2025-08-25', 'full_day', 'present', NULL)
ON CONFLICT (student_id, session_date, period) DO NOTHING;
INSERT INTO public.attendance (id, student_id, session_date, period, status, remarks)
VALUES ('a7c55a45-8130-4bc5-a890-13bbe298ea7b', '689593b4-7c6c-42a3-a041-16f1ac029f06', '2025-08-26', 'full_day', 'present', NULL)
ON CONFLICT (student_id, session_date, period) DO NOTHING;
INSERT INTO public.attendance (id, student_id, session_date, period, status, remarks)
VALUES ('a2933eac-773f-4296-bf9c-e3d7fb1922e2', '689593b4-7c6c-42a3-a041-16f1ac029f06', '2025-08-27', 'full_day', 'present', NULL)
ON CONFLICT (student_id, session_date, period) DO NOTHING;
INSERT INTO public.attendance (id, student_id, session_date, period, status, remarks)
VALUES ('fa4c00a0-a362-4429-869c-f34c0cd76d00', '689593b4-7c6c-42a3-a041-16f1ac029f06', '2025-08-28', 'full_day', 'present', NULL)
ON CONFLICT (student_id, session_date, period) DO NOTHING;
INSERT INTO public.attendance (id, student_id, session_date, period, status, remarks)
VALUES ('8a44d65a-35db-48a5-b20d-b7ae255990c2', '689593b4-7c6c-42a3-a041-16f1ac029f06', '2025-08-29', 'full_day', 'present', NULL)
ON CONFLICT (student_id, session_date, period) DO NOTHING;
INSERT INTO public.attendance (id, student_id, session_date, period, status, remarks)
VALUES ('e21a8a2d-fe04-4c0b-832b-82f0ca31683c', '20d07c0c-ac56-4b30-8e9c-f79cad701de3', '2025-08-01', 'full_day', 'late', 'Morning roll call record')
ON CONFLICT (student_id, session_date, period) DO NOTHING;
INSERT INTO public.attendance (id, student_id, session_date, period, status, remarks)
VALUES ('bb21e88a-3f09-4450-8fe1-15ac56fc0273', '20d07c0c-ac56-4b30-8e9c-f79cad701de3', '2025-08-04', 'full_day', 'present', NULL)
ON CONFLICT (student_id, session_date, period) DO NOTHING;
INSERT INTO public.attendance (id, student_id, session_date, period, status, remarks)
VALUES ('50f7d2af-1ba7-4093-813a-068fbc418694', '20d07c0c-ac56-4b30-8e9c-f79cad701de3', '2025-08-05', 'full_day', 'present', NULL)
ON CONFLICT (student_id, session_date, period) DO NOTHING;
INSERT INTO public.attendance (id, student_id, session_date, period, status, remarks)
VALUES ('8aaaf74f-3905-4fa2-81df-21f05ef33d1c', '20d07c0c-ac56-4b30-8e9c-f79cad701de3', '2025-08-06', 'full_day', 'present', NULL)
ON CONFLICT (student_id, session_date, period) DO NOTHING;
INSERT INTO public.attendance (id, student_id, session_date, period, status, remarks)
VALUES ('21ff2537-7a35-4cef-9535-ae09d03cf8ad', '20d07c0c-ac56-4b30-8e9c-f79cad701de3', '2025-08-07', 'full_day', 'present', NULL)
ON CONFLICT (student_id, session_date, period) DO NOTHING;
INSERT INTO public.attendance (id, student_id, session_date, period, status, remarks)
VALUES ('acc25be9-b672-4457-8e6f-549f9121a42f', '20d07c0c-ac56-4b30-8e9c-f79cad701de3', '2025-08-08', 'full_day', 'present', NULL)
ON CONFLICT (student_id, session_date, period) DO NOTHING;
INSERT INTO public.attendance (id, student_id, session_date, period, status, remarks)
VALUES ('bca7b944-3743-4f8b-a093-a2c2cbe725e1', '20d07c0c-ac56-4b30-8e9c-f79cad701de3', '2025-08-11', 'full_day', 'present', NULL)
ON CONFLICT (student_id, session_date, period) DO NOTHING;
INSERT INTO public.attendance (id, student_id, session_date, period, status, remarks)
VALUES ('5dba7027-bf0e-4119-a9bb-9fac10be5a96', '20d07c0c-ac56-4b30-8e9c-f79cad701de3', '2025-08-12', 'full_day', 'present', NULL)
ON CONFLICT (student_id, session_date, period) DO NOTHING;
INSERT INTO public.attendance (id, student_id, session_date, period, status, remarks)
VALUES ('3bd0ef06-1b62-4bdb-8b80-4fcec2f547c9', '20d07c0c-ac56-4b30-8e9c-f79cad701de3', '2025-08-13', 'full_day', 'present', NULL)
ON CONFLICT (student_id, session_date, period) DO NOTHING;
INSERT INTO public.attendance (id, student_id, session_date, period, status, remarks)
VALUES ('e3e10b81-9eaa-4fcc-8eea-f28e537f2f86', '20d07c0c-ac56-4b30-8e9c-f79cad701de3', '2025-08-14', 'full_day', 'late', 'Morning roll call record')
ON CONFLICT (student_id, session_date, period) DO NOTHING;
INSERT INTO public.attendance (id, student_id, session_date, period, status, remarks)
VALUES ('d840d6ee-91c0-40d0-aa72-74e38146197f', '20d07c0c-ac56-4b30-8e9c-f79cad701de3', '2025-08-15', 'full_day', 'present', NULL)
ON CONFLICT (student_id, session_date, period) DO NOTHING;
INSERT INTO public.attendance (id, student_id, session_date, period, status, remarks)
VALUES ('147319bd-783d-4549-b712-5da3e19b08ae', '20d07c0c-ac56-4b30-8e9c-f79cad701de3', '2025-08-18', 'full_day', 'present', NULL)
ON CONFLICT (student_id, session_date, period) DO NOTHING;
INSERT INTO public.attendance (id, student_id, session_date, period, status, remarks)
VALUES ('bed1af0a-3bff-47cf-9e92-d47a893e2094', '20d07c0c-ac56-4b30-8e9c-f79cad701de3', '2025-08-19', 'full_day', 'present', NULL)
ON CONFLICT (student_id, session_date, period) DO NOTHING;
INSERT INTO public.attendance (id, student_id, session_date, period, status, remarks)
VALUES ('47e3a6d4-d5cb-48e0-924d-ff29d2053c85', '20d07c0c-ac56-4b30-8e9c-f79cad701de3', '2025-08-20', 'full_day', 'present', NULL)
ON CONFLICT (student_id, session_date, period) DO NOTHING;
INSERT INTO public.attendance (id, student_id, session_date, period, status, remarks)
VALUES ('249689fe-7af4-4a3a-8a5b-b73cc31c52f3', '20d07c0c-ac56-4b30-8e9c-f79cad701de3', '2025-08-21', 'full_day', 'present', NULL)
ON CONFLICT (student_id, session_date, period) DO NOTHING;
INSERT INTO public.attendance (id, student_id, session_date, period, status, remarks)
VALUES ('41c62e5e-a660-4b4b-9274-aae72851c8ad', '20d07c0c-ac56-4b30-8e9c-f79cad701de3', '2025-08-22', 'full_day', 'present', NULL)
ON CONFLICT (student_id, session_date, period) DO NOTHING;
INSERT INTO public.attendance (id, student_id, session_date, period, status, remarks)
VALUES ('07bfce32-4a1e-4991-b3dd-8b2b111da65a', '20d07c0c-ac56-4b30-8e9c-f79cad701de3', '2025-08-25', 'full_day', 'absent', 'Morning roll call record')
ON CONFLICT (student_id, session_date, period) DO NOTHING;
INSERT INTO public.attendance (id, student_id, session_date, period, status, remarks)
VALUES ('b500d9cc-28e4-469a-bbf0-b31a1a0455b4', '20d07c0c-ac56-4b30-8e9c-f79cad701de3', '2025-08-26', 'full_day', 'present', NULL)
ON CONFLICT (student_id, session_date, period) DO NOTHING;
INSERT INTO public.attendance (id, student_id, session_date, period, status, remarks)
VALUES ('53287e2b-44a1-4b20-ad2e-7ce5367cfd98', '20d07c0c-ac56-4b30-8e9c-f79cad701de3', '2025-08-27', 'full_day', 'present', NULL)
ON CONFLICT (student_id, session_date, period) DO NOTHING;
INSERT INTO public.attendance (id, student_id, session_date, period, status, remarks)
VALUES ('0f8ed8b6-c643-4c28-8e30-544d32bf12b1', '20d07c0c-ac56-4b30-8e9c-f79cad701de3', '2025-08-28', 'full_day', 'present', NULL)
ON CONFLICT (student_id, session_date, period) DO NOTHING;
INSERT INTO public.attendance (id, student_id, session_date, period, status, remarks)
VALUES ('3ccccacf-d7d7-4d50-804c-a7d070b02bf6', '20d07c0c-ac56-4b30-8e9c-f79cad701de3', '2025-08-29', 'full_day', 'present', NULL)
ON CONFLICT (student_id, session_date, period) DO NOTHING;
INSERT INTO public.attendance (id, student_id, session_date, period, status, remarks)
VALUES ('1de894f0-468f-46b8-aef5-eae2d0ff9033', '04bdc67a-42d0-4872-b096-afdd8e4549db', '2025-08-01', 'full_day', 'present', NULL)
ON CONFLICT (student_id, session_date, period) DO NOTHING;
INSERT INTO public.attendance (id, student_id, session_date, period, status, remarks)
VALUES ('d3c34a87-21f9-4d1c-9f7a-71556fbc19a8', '04bdc67a-42d0-4872-b096-afdd8e4549db', '2025-08-04', 'full_day', 'present', NULL)
ON CONFLICT (student_id, session_date, period) DO NOTHING;
INSERT INTO public.attendance (id, student_id, session_date, period, status, remarks)
VALUES ('39ba4344-12bf-4bca-a55a-75a46499f649', '04bdc67a-42d0-4872-b096-afdd8e4549db', '2025-08-05', 'full_day', 'present', NULL)
ON CONFLICT (student_id, session_date, period) DO NOTHING;
INSERT INTO public.attendance (id, student_id, session_date, period, status, remarks)
VALUES ('221a7e90-7e76-4082-a329-0a3c5f290001', '04bdc67a-42d0-4872-b096-afdd8e4549db', '2025-08-06', 'full_day', 'present', NULL)
ON CONFLICT (student_id, session_date, period) DO NOTHING;
INSERT INTO public.attendance (id, student_id, session_date, period, status, remarks)
VALUES ('0665ffe0-d88b-4a9b-9c3e-b05631817e90', '04bdc67a-42d0-4872-b096-afdd8e4549db', '2025-08-07', 'full_day', 'present', NULL)
ON CONFLICT (student_id, session_date, period) DO NOTHING;
INSERT INTO public.attendance (id, student_id, session_date, period, status, remarks)
VALUES ('16645de8-6b6a-402e-90f1-11a40b278d81', '04bdc67a-42d0-4872-b096-afdd8e4549db', '2025-08-08', 'full_day', 'late', 'Morning roll call record')
ON CONFLICT (student_id, session_date, period) DO NOTHING;
INSERT INTO public.attendance (id, student_id, session_date, period, status, remarks)
VALUES ('33b2d1a8-71a9-436d-bb05-60b8f9060334', '04bdc67a-42d0-4872-b096-afdd8e4549db', '2025-08-11', 'full_day', 'present', NULL)
ON CONFLICT (student_id, session_date, period) DO NOTHING;
INSERT INTO public.attendance (id, student_id, session_date, period, status, remarks)
VALUES ('b1014103-e4e0-4cfb-8f43-7c2a843ebe86', '04bdc67a-42d0-4872-b096-afdd8e4549db', '2025-08-12', 'full_day', 'present', NULL)
ON CONFLICT (student_id, session_date, period) DO NOTHING;
INSERT INTO public.attendance (id, student_id, session_date, period, status, remarks)
VALUES ('4a9883ff-cbef-4ee9-b598-e662b73f1536', '04bdc67a-42d0-4872-b096-afdd8e4549db', '2025-08-13', 'full_day', 'present', NULL)
ON CONFLICT (student_id, session_date, period) DO NOTHING;
INSERT INTO public.attendance (id, student_id, session_date, period, status, remarks)
VALUES ('108014a4-b43b-48a7-b98e-c1642ebdbfa8', '04bdc67a-42d0-4872-b096-afdd8e4549db', '2025-08-14', 'full_day', 'present', NULL)
ON CONFLICT (student_id, session_date, period) DO NOTHING;
INSERT INTO public.attendance (id, student_id, session_date, period, status, remarks)
VALUES ('aa77a6fa-9e15-4dae-b3df-4f2aa717b86f', '04bdc67a-42d0-4872-b096-afdd8e4549db', '2025-08-15', 'full_day', 'present', NULL)
ON CONFLICT (student_id, session_date, period) DO NOTHING;
INSERT INTO public.attendance (id, student_id, session_date, period, status, remarks)
VALUES ('b6d8e7d9-7816-4c83-96ee-e3fcbf503f6a', '04bdc67a-42d0-4872-b096-afdd8e4549db', '2025-08-18', 'full_day', 'late', 'Morning roll call record')
ON CONFLICT (student_id, session_date, period) DO NOTHING;
INSERT INTO public.attendance (id, student_id, session_date, period, status, remarks)
VALUES ('bf3059d6-3967-44a5-b252-278ef291dd18', '04bdc67a-42d0-4872-b096-afdd8e4549db', '2025-08-19', 'full_day', 'present', NULL)
ON CONFLICT (student_id, session_date, period) DO NOTHING;
INSERT INTO public.attendance (id, student_id, session_date, period, status, remarks)
VALUES ('f3aa2957-be84-4230-85d3-91eba9dd0ea8', '04bdc67a-42d0-4872-b096-afdd8e4549db', '2025-08-20', 'full_day', 'present', NULL)
ON CONFLICT (student_id, session_date, period) DO NOTHING;
INSERT INTO public.attendance (id, student_id, session_date, period, status, remarks)
VALUES ('ede176f7-db78-4948-9bd7-e20ebb08fa84', '04bdc67a-42d0-4872-b096-afdd8e4549db', '2025-08-21', 'full_day', 'present', NULL)
ON CONFLICT (student_id, session_date, period) DO NOTHING;
INSERT INTO public.attendance (id, student_id, session_date, period, status, remarks)
VALUES ('be3273d6-01be-4408-8b01-024b80e95629', '04bdc67a-42d0-4872-b096-afdd8e4549db', '2025-08-22', 'full_day', 'present', NULL)
ON CONFLICT (student_id, session_date, period) DO NOTHING;
INSERT INTO public.attendance (id, student_id, session_date, period, status, remarks)
VALUES ('fac9aa74-1b44-4eaf-b5fc-f57d42516187', '04bdc67a-42d0-4872-b096-afdd8e4549db', '2025-08-25', 'full_day', 'present', NULL)
ON CONFLICT (student_id, session_date, period) DO NOTHING;
INSERT INTO public.attendance (id, student_id, session_date, period, status, remarks)
VALUES ('a1a0c351-ced0-4c38-992d-99bb0aaa6fc4', '04bdc67a-42d0-4872-b096-afdd8e4549db', '2025-08-26', 'full_day', 'present', NULL)
ON CONFLICT (student_id, session_date, period) DO NOTHING;
INSERT INTO public.attendance (id, student_id, session_date, period, status, remarks)
VALUES ('c6666d16-5044-4853-98a7-72c6edf4b67c', '04bdc67a-42d0-4872-b096-afdd8e4549db', '2025-08-27', 'full_day', 'present', NULL)
ON CONFLICT (student_id, session_date, period) DO NOTHING;
INSERT INTO public.attendance (id, student_id, session_date, period, status, remarks)
VALUES ('a0713bfd-a44d-4b41-9554-4a99dd9c9c6e', '04bdc67a-42d0-4872-b096-afdd8e4549db', '2025-08-28', 'full_day', 'present', NULL)
ON CONFLICT (student_id, session_date, period) DO NOTHING;
INSERT INTO public.attendance (id, student_id, session_date, period, status, remarks)
VALUES ('e14095e3-94bf-49b1-8737-306749545828', '04bdc67a-42d0-4872-b096-afdd8e4549db', '2025-08-29', 'full_day', 'present', NULL)
ON CONFLICT (student_id, session_date, period) DO NOTHING;
INSERT INTO public.attendance (id, student_id, session_date, period, status, remarks)
VALUES ('9779473c-c596-4c89-8bb7-a6413f5a4abc', 'e89ca679-ca93-4c30-9621-450664c5b826', '2025-08-01', 'full_day', 'present', NULL)
ON CONFLICT (student_id, session_date, period) DO NOTHING;
INSERT INTO public.attendance (id, student_id, session_date, period, status, remarks)
VALUES ('a6e51c7a-0e6b-4003-969d-ad28886d1337', 'e89ca679-ca93-4c30-9621-450664c5b826', '2025-08-04', 'full_day', 'late', 'Morning roll call record')
ON CONFLICT (student_id, session_date, period) DO NOTHING;
INSERT INTO public.attendance (id, student_id, session_date, period, status, remarks)
VALUES ('b6c16782-fceb-4879-abdf-7018220ff4e2', 'e89ca679-ca93-4c30-9621-450664c5b826', '2025-08-05', 'full_day', 'present', NULL)
ON CONFLICT (student_id, session_date, period) DO NOTHING;
INSERT INTO public.attendance (id, student_id, session_date, period, status, remarks)
VALUES ('42fb7f4d-305d-475c-9a9f-d7ca44f3eaec', 'e89ca679-ca93-4c30-9621-450664c5b826', '2025-08-06', 'full_day', 'present', NULL)
ON CONFLICT (student_id, session_date, period) DO NOTHING;
INSERT INTO public.attendance (id, student_id, session_date, period, status, remarks)
VALUES ('f1f45f14-0532-4765-b4c0-5bd5ac0aab11', 'e89ca679-ca93-4c30-9621-450664c5b826', '2025-08-07', 'full_day', 'present', NULL)
ON CONFLICT (student_id, session_date, period) DO NOTHING;
INSERT INTO public.attendance (id, student_id, session_date, period, status, remarks)
VALUES ('3b6dbc44-fd7d-4e59-87d1-45792c5a7b06', 'e89ca679-ca93-4c30-9621-450664c5b826', '2025-08-08', 'full_day', 'present', NULL)
ON CONFLICT (student_id, session_date, period) DO NOTHING;
INSERT INTO public.attendance (id, student_id, session_date, period, status, remarks)
VALUES ('90b402aa-b653-4f23-bb1d-a40ac11c3c9d', 'e89ca679-ca93-4c30-9621-450664c5b826', '2025-08-11', 'full_day', 'present', NULL)
ON CONFLICT (student_id, session_date, period) DO NOTHING;
INSERT INTO public.attendance (id, student_id, session_date, period, status, remarks)
VALUES ('0706f91b-2ecf-4a7f-a390-220fe3bb714d', 'e89ca679-ca93-4c30-9621-450664c5b826', '2025-08-12', 'full_day', 'present', NULL)
ON CONFLICT (student_id, session_date, period) DO NOTHING;
INSERT INTO public.attendance (id, student_id, session_date, period, status, remarks)
VALUES ('8af9f9fe-adb9-4b53-8493-06ddebc22c3c', 'e89ca679-ca93-4c30-9621-450664c5b826', '2025-08-13', 'full_day', 'present', NULL)
ON CONFLICT (student_id, session_date, period) DO NOTHING;
INSERT INTO public.attendance (id, student_id, session_date, period, status, remarks)
VALUES ('e01a3dc1-d854-44f4-b5dc-e8a9c155b0b4', 'e89ca679-ca93-4c30-9621-450664c5b826', '2025-08-14', 'full_day', 'present', NULL)
ON CONFLICT (student_id, session_date, period) DO NOTHING;
INSERT INTO public.attendance (id, student_id, session_date, period, status, remarks)
VALUES ('82050ddd-269b-4f16-9193-84b263b85be7', 'e89ca679-ca93-4c30-9621-450664c5b826', '2025-08-15', 'full_day', 'present', NULL)
ON CONFLICT (student_id, session_date, period) DO NOTHING;
INSERT INTO public.attendance (id, student_id, session_date, period, status, remarks)
VALUES ('fa9f1ee4-f384-45b4-809d-3a9a04174469', 'e89ca679-ca93-4c30-9621-450664c5b826', '2025-08-18', 'full_day', 'present', NULL)
ON CONFLICT (student_id, session_date, period) DO NOTHING;
INSERT INTO public.attendance (id, student_id, session_date, period, status, remarks)
VALUES ('bb4520ee-60fd-44c3-b8fa-c5de6db50d2f', 'e89ca679-ca93-4c30-9621-450664c5b826', '2025-08-19', 'full_day', 'present', NULL)
ON CONFLICT (student_id, session_date, period) DO NOTHING;
INSERT INTO public.attendance (id, student_id, session_date, period, status, remarks)
VALUES ('02df7867-1a8e-46ad-8354-d3cf52d90d40', 'e89ca679-ca93-4c30-9621-450664c5b826', '2025-08-20', 'full_day', 'present', NULL)
ON CONFLICT (student_id, session_date, period) DO NOTHING;
INSERT INTO public.attendance (id, student_id, session_date, period, status, remarks)
VALUES ('16f92b4c-2b7f-4a8d-a712-f9001cd8ef67', 'e89ca679-ca93-4c30-9621-450664c5b826', '2025-08-21', 'full_day', 'present', NULL)
ON CONFLICT (student_id, session_date, period) DO NOTHING;
INSERT INTO public.attendance (id, student_id, session_date, period, status, remarks)
VALUES ('983b6400-cc21-40fd-a68d-b204cbc75ab1', 'e89ca679-ca93-4c30-9621-450664c5b826', '2025-08-22', 'full_day', 'present', NULL)
ON CONFLICT (student_id, session_date, period) DO NOTHING;
INSERT INTO public.attendance (id, student_id, session_date, period, status, remarks)
VALUES ('debac8b8-c31e-46d8-9b66-eb032c26e9e1', 'e89ca679-ca93-4c30-9621-450664c5b826', '2025-08-25', 'full_day', 'present', NULL)
ON CONFLICT (student_id, session_date, period) DO NOTHING;
INSERT INTO public.attendance (id, student_id, session_date, period, status, remarks)
VALUES ('ea3deaf1-1351-4400-957c-4252c8b7e51b', 'e89ca679-ca93-4c30-9621-450664c5b826', '2025-08-26', 'full_day', 'present', NULL)
ON CONFLICT (student_id, session_date, period) DO NOTHING;
INSERT INTO public.attendance (id, student_id, session_date, period, status, remarks)
VALUES ('0d150b65-5387-4c75-8426-fb06706108c7', 'e89ca679-ca93-4c30-9621-450664c5b826', '2025-08-27', 'full_day', 'present', NULL)
ON CONFLICT (student_id, session_date, period) DO NOTHING;
INSERT INTO public.attendance (id, student_id, session_date, period, status, remarks)
VALUES ('ccb88b14-e885-44db-947a-07023d03d3fd', 'e89ca679-ca93-4c30-9621-450664c5b826', '2025-08-28', 'full_day', 'present', NULL)
ON CONFLICT (student_id, session_date, period) DO NOTHING;
INSERT INTO public.attendance (id, student_id, session_date, period, status, remarks)
VALUES ('7aa86100-feca-4bb6-b324-6dcce562cbe0', 'e89ca679-ca93-4c30-9621-450664c5b826', '2025-08-29', 'full_day', 'present', NULL)
ON CONFLICT (student_id, session_date, period) DO NOTHING;
INSERT INTO public.attendance (id, student_id, session_date, period, status, remarks)
VALUES ('04c9ec52-52b9-4b06-b71d-623b07bc1707', '23bae913-0d5d-498a-88c5-5bd5bfcc2901', '2025-08-01', 'full_day', 'present', NULL)
ON CONFLICT (student_id, session_date, period) DO NOTHING;
INSERT INTO public.attendance (id, student_id, session_date, period, status, remarks)
VALUES ('85fec559-0d75-45bd-a7bd-3721c06c1ca4', '23bae913-0d5d-498a-88c5-5bd5bfcc2901', '2025-08-04', 'full_day', 'present', NULL)
ON CONFLICT (student_id, session_date, period) DO NOTHING;
INSERT INTO public.attendance (id, student_id, session_date, period, status, remarks)
VALUES ('d080a74d-660e-45e3-8833-3c3649212e6f', '23bae913-0d5d-498a-88c5-5bd5bfcc2901', '2025-08-05', 'full_day', 'present', NULL)
ON CONFLICT (student_id, session_date, period) DO NOTHING;
INSERT INTO public.attendance (id, student_id, session_date, period, status, remarks)
VALUES ('3dff69af-2de3-4312-97ef-146e977b266a', '23bae913-0d5d-498a-88c5-5bd5bfcc2901', '2025-08-06', 'full_day', 'present', NULL)
ON CONFLICT (student_id, session_date, period) DO NOTHING;
INSERT INTO public.attendance (id, student_id, session_date, period, status, remarks)
VALUES ('ce4f9d1d-6235-4002-b878-89a07a5ae067', '23bae913-0d5d-498a-88c5-5bd5bfcc2901', '2025-08-07', 'full_day', 'present', NULL)
ON CONFLICT (student_id, session_date, period) DO NOTHING;
INSERT INTO public.attendance (id, student_id, session_date, period, status, remarks)
VALUES ('bdf11085-12be-4222-b088-9348a3c1b3f1', '23bae913-0d5d-498a-88c5-5bd5bfcc2901', '2025-08-08', 'full_day', 'present', NULL)
ON CONFLICT (student_id, session_date, period) DO NOTHING;
INSERT INTO public.attendance (id, student_id, session_date, period, status, remarks)
VALUES ('81cd1cd1-fc2d-4bf6-91e0-2066fec34717', '23bae913-0d5d-498a-88c5-5bd5bfcc2901', '2025-08-11', 'full_day', 'present', NULL)
ON CONFLICT (student_id, session_date, period) DO NOTHING;
INSERT INTO public.attendance (id, student_id, session_date, period, status, remarks)
VALUES ('cc729740-cb5c-4a80-b7c0-6b439ab4d207', '23bae913-0d5d-498a-88c5-5bd5bfcc2901', '2025-08-12', 'full_day', 'present', NULL)
ON CONFLICT (student_id, session_date, period) DO NOTHING;
INSERT INTO public.attendance (id, student_id, session_date, period, status, remarks)
VALUES ('6c73d359-b721-43e5-a3bf-641e67a5aa7a', '23bae913-0d5d-498a-88c5-5bd5bfcc2901', '2025-08-13', 'full_day', 'absent', 'Morning roll call record')
ON CONFLICT (student_id, session_date, period) DO NOTHING;
INSERT INTO public.attendance (id, student_id, session_date, period, status, remarks)
VALUES ('aea27e09-65a1-49bf-85c1-728b39d33083', '23bae913-0d5d-498a-88c5-5bd5bfcc2901', '2025-08-14', 'full_day', 'present', NULL)
ON CONFLICT (student_id, session_date, period) DO NOTHING;
INSERT INTO public.attendance (id, student_id, session_date, period, status, remarks)
VALUES ('67fb30cd-04c6-46fb-80f8-a001aa6d72b7', '23bae913-0d5d-498a-88c5-5bd5bfcc2901', '2025-08-15', 'full_day', 'present', NULL)
ON CONFLICT (student_id, session_date, period) DO NOTHING;
INSERT INTO public.attendance (id, student_id, session_date, period, status, remarks)
VALUES ('3584a200-a97c-4670-99d0-dfd83dad9a92', '23bae913-0d5d-498a-88c5-5bd5bfcc2901', '2025-08-18', 'full_day', 'late', 'Morning roll call record')
ON CONFLICT (student_id, session_date, period) DO NOTHING;
INSERT INTO public.attendance (id, student_id, session_date, period, status, remarks)
VALUES ('b034fda3-1b19-4065-a48f-536e319a81c7', '23bae913-0d5d-498a-88c5-5bd5bfcc2901', '2025-08-19', 'full_day', 'present', NULL)
ON CONFLICT (student_id, session_date, period) DO NOTHING;
INSERT INTO public.attendance (id, student_id, session_date, period, status, remarks)
VALUES ('72ca9422-9679-4539-b4f8-9a5b8ec512ff', '23bae913-0d5d-498a-88c5-5bd5bfcc2901', '2025-08-20', 'full_day', 'present', NULL)
ON CONFLICT (student_id, session_date, period) DO NOTHING;
INSERT INTO public.attendance (id, student_id, session_date, period, status, remarks)
VALUES ('4a4fab18-92a3-4767-b3a0-ae0d61e01300', '23bae913-0d5d-498a-88c5-5bd5bfcc2901', '2025-08-21', 'full_day', 'present', NULL)
ON CONFLICT (student_id, session_date, period) DO NOTHING;
INSERT INTO public.attendance (id, student_id, session_date, period, status, remarks)
VALUES ('08e7f695-b371-4902-9bfc-6106a7afe2f4', '23bae913-0d5d-498a-88c5-5bd5bfcc2901', '2025-08-22', 'full_day', 'present', NULL)
ON CONFLICT (student_id, session_date, period) DO NOTHING;
INSERT INTO public.attendance (id, student_id, session_date, period, status, remarks)
VALUES ('3271b3f5-1fb8-45d3-8d7b-706205a63937', '23bae913-0d5d-498a-88c5-5bd5bfcc2901', '2025-08-25', 'full_day', 'present', NULL)
ON CONFLICT (student_id, session_date, period) DO NOTHING;
INSERT INTO public.attendance (id, student_id, session_date, period, status, remarks)
VALUES ('a1bd5847-fd0e-4155-a255-931a66022ee4', '23bae913-0d5d-498a-88c5-5bd5bfcc2901', '2025-08-26', 'full_day', 'present', NULL)
ON CONFLICT (student_id, session_date, period) DO NOTHING;
INSERT INTO public.attendance (id, student_id, session_date, period, status, remarks)
VALUES ('c8cb5360-93f2-40f3-8ff9-86a4dea5e23e', '23bae913-0d5d-498a-88c5-5bd5bfcc2901', '2025-08-27', 'full_day', 'present', NULL)
ON CONFLICT (student_id, session_date, period) DO NOTHING;
INSERT INTO public.attendance (id, student_id, session_date, period, status, remarks)
VALUES ('ce728da9-f0ee-4425-b91b-e7f5319bed73', '23bae913-0d5d-498a-88c5-5bd5bfcc2901', '2025-08-28', 'full_day', 'present', NULL)
ON CONFLICT (student_id, session_date, period) DO NOTHING;
INSERT INTO public.attendance (id, student_id, session_date, period, status, remarks)
VALUES ('758803bc-5f49-446d-a0fe-020a3b7055cd', '23bae913-0d5d-498a-88c5-5bd5bfcc2901', '2025-08-29', 'full_day', 'present', NULL)
ON CONFLICT (student_id, session_date, period) DO NOTHING;
INSERT INTO public.attendance (id, student_id, session_date, period, status, remarks)
VALUES ('e476dfa7-8975-48dd-bdc5-4ca7a58241c7', '05089772-5251-4ee4-83ce-87f21ae73662', '2025-08-01', 'full_day', 'present', NULL)
ON CONFLICT (student_id, session_date, period) DO NOTHING;
INSERT INTO public.attendance (id, student_id, session_date, period, status, remarks)
VALUES ('48e9c5f0-3235-482c-8b31-b2fcf8af82b6', '05089772-5251-4ee4-83ce-87f21ae73662', '2025-08-04', 'full_day', 'present', NULL)
ON CONFLICT (student_id, session_date, period) DO NOTHING;
INSERT INTO public.attendance (id, student_id, session_date, period, status, remarks)
VALUES ('fe131c0e-81af-402c-9855-a2d79327f927', '05089772-5251-4ee4-83ce-87f21ae73662', '2025-08-05', 'full_day', 'present', NULL)
ON CONFLICT (student_id, session_date, period) DO NOTHING;
INSERT INTO public.attendance (id, student_id, session_date, period, status, remarks)
VALUES ('13f94573-232a-4d10-9a78-c3d14f56762e', '05089772-5251-4ee4-83ce-87f21ae73662', '2025-08-06', 'full_day', 'present', NULL)
ON CONFLICT (student_id, session_date, period) DO NOTHING;
INSERT INTO public.attendance (id, student_id, session_date, period, status, remarks)
VALUES ('d1e96cc5-572a-4360-96d5-d4d535b976d0', '05089772-5251-4ee4-83ce-87f21ae73662', '2025-08-07', 'full_day', 'present', NULL)
ON CONFLICT (student_id, session_date, period) DO NOTHING;
INSERT INTO public.attendance (id, student_id, session_date, period, status, remarks)
VALUES ('9d2f6fa4-107c-4199-94b3-565811c1e7e6', '05089772-5251-4ee4-83ce-87f21ae73662', '2025-08-08', 'full_day', 'present', NULL)
ON CONFLICT (student_id, session_date, period) DO NOTHING;
INSERT INTO public.attendance (id, student_id, session_date, period, status, remarks)
VALUES ('1e55aa74-3313-423c-b820-ab757c156cba', '05089772-5251-4ee4-83ce-87f21ae73662', '2025-08-11', 'full_day', 'present', NULL)
ON CONFLICT (student_id, session_date, period) DO NOTHING;
INSERT INTO public.attendance (id, student_id, session_date, period, status, remarks)
VALUES ('74cee252-2ecf-4087-870a-2b0b95a39f41', '05089772-5251-4ee4-83ce-87f21ae73662', '2025-08-12', 'full_day', 'present', NULL)
ON CONFLICT (student_id, session_date, period) DO NOTHING;
INSERT INTO public.attendance (id, student_id, session_date, period, status, remarks)
VALUES ('f914a988-3c90-470a-bd50-df5d7eaff05a', '05089772-5251-4ee4-83ce-87f21ae73662', '2025-08-13', 'full_day', 'present', NULL)
ON CONFLICT (student_id, session_date, period) DO NOTHING;
INSERT INTO public.attendance (id, student_id, session_date, period, status, remarks)
VALUES ('d2d7a8a6-3a45-41cf-aed8-9555a99296d6', '05089772-5251-4ee4-83ce-87f21ae73662', '2025-08-14', 'full_day', 'late', 'Morning roll call record')
ON CONFLICT (student_id, session_date, period) DO NOTHING;
INSERT INTO public.attendance (id, student_id, session_date, period, status, remarks)
VALUES ('fff13baa-b678-4685-b98c-b410b488485e', '05089772-5251-4ee4-83ce-87f21ae73662', '2025-08-15', 'full_day', 'present', NULL)
ON CONFLICT (student_id, session_date, period) DO NOTHING;
INSERT INTO public.attendance (id, student_id, session_date, period, status, remarks)
VALUES ('0248b203-f188-46a3-8783-c71524ce13b0', '05089772-5251-4ee4-83ce-87f21ae73662', '2025-08-18', 'full_day', 'present', NULL)
ON CONFLICT (student_id, session_date, period) DO NOTHING;
INSERT INTO public.attendance (id, student_id, session_date, period, status, remarks)
VALUES ('40da0c67-756f-46ee-8e05-b898ec21045a', '05089772-5251-4ee4-83ce-87f21ae73662', '2025-08-19', 'full_day', 'present', NULL)
ON CONFLICT (student_id, session_date, period) DO NOTHING;
INSERT INTO public.attendance (id, student_id, session_date, period, status, remarks)
VALUES ('71ba639a-f02b-4abd-a59d-4b2099a3a9e0', '05089772-5251-4ee4-83ce-87f21ae73662', '2025-08-20', 'full_day', 'present', NULL)
ON CONFLICT (student_id, session_date, period) DO NOTHING;
INSERT INTO public.attendance (id, student_id, session_date, period, status, remarks)
VALUES ('e05d923c-bf39-46b5-bbee-56520b5f2cfc', '05089772-5251-4ee4-83ce-87f21ae73662', '2025-08-21', 'full_day', 'present', NULL)
ON CONFLICT (student_id, session_date, period) DO NOTHING;
INSERT INTO public.attendance (id, student_id, session_date, period, status, remarks)
VALUES ('b93f88bb-9f03-48c4-962c-4878d80ad544', '05089772-5251-4ee4-83ce-87f21ae73662', '2025-08-22', 'full_day', 'present', NULL)
ON CONFLICT (student_id, session_date, period) DO NOTHING;
INSERT INTO public.attendance (id, student_id, session_date, period, status, remarks)
VALUES ('d7f88480-5c6f-40ec-9ab3-880d04458623', '05089772-5251-4ee4-83ce-87f21ae73662', '2025-08-25', 'full_day', 'present', NULL)
ON CONFLICT (student_id, session_date, period) DO NOTHING;
INSERT INTO public.attendance (id, student_id, session_date, period, status, remarks)
VALUES ('578e7240-c78b-4ebd-be28-fef77794eaf6', '05089772-5251-4ee4-83ce-87f21ae73662', '2025-08-26', 'full_day', 'present', NULL)
ON CONFLICT (student_id, session_date, period) DO NOTHING;
INSERT INTO public.attendance (id, student_id, session_date, period, status, remarks)
VALUES ('3ad4a57c-077c-4ba4-af48-513f02bad984', '05089772-5251-4ee4-83ce-87f21ae73662', '2025-08-27', 'full_day', 'present', NULL)
ON CONFLICT (student_id, session_date, period) DO NOTHING;
INSERT INTO public.attendance (id, student_id, session_date, period, status, remarks)
VALUES ('e1778c51-2c16-481d-9c85-3100a66ef68f', '05089772-5251-4ee4-83ce-87f21ae73662', '2025-08-28', 'full_day', 'present', NULL)
ON CONFLICT (student_id, session_date, period) DO NOTHING;
INSERT INTO public.attendance (id, student_id, session_date, period, status, remarks)
VALUES ('579164c8-3493-466c-a09d-ab9942ef9864', '05089772-5251-4ee4-83ce-87f21ae73662', '2025-08-29', 'full_day', 'present', NULL)
ON CONFLICT (student_id, session_date, period) DO NOTHING;
INSERT INTO public.attendance (id, student_id, session_date, period, status, remarks)
VALUES ('a887a1f5-8199-4b9e-b51f-0fbd7991d76c', '78e7fd7b-5932-428e-9786-3195e157ae0e', '2025-08-01', 'full_day', 'present', NULL)
ON CONFLICT (student_id, session_date, period) DO NOTHING;
INSERT INTO public.attendance (id, student_id, session_date, period, status, remarks)
VALUES ('9aa19613-b01a-47fb-97e1-f98c8dd56eee', '78e7fd7b-5932-428e-9786-3195e157ae0e', '2025-08-04', 'full_day', 'present', NULL)
ON CONFLICT (student_id, session_date, period) DO NOTHING;
INSERT INTO public.attendance (id, student_id, session_date, period, status, remarks)
VALUES ('93889960-ea79-4a55-a8a7-161bf43d2a87', '78e7fd7b-5932-428e-9786-3195e157ae0e', '2025-08-05', 'full_day', 'present', NULL)
ON CONFLICT (student_id, session_date, period) DO NOTHING;
INSERT INTO public.attendance (id, student_id, session_date, period, status, remarks)
VALUES ('41ea2301-0ee6-446e-9ad0-f4dc959acecd', '78e7fd7b-5932-428e-9786-3195e157ae0e', '2025-08-06', 'full_day', 'present', NULL)
ON CONFLICT (student_id, session_date, period) DO NOTHING;
INSERT INTO public.attendance (id, student_id, session_date, period, status, remarks)
VALUES ('234d9bcc-1f88-4914-b8ec-22ac24c68572', '78e7fd7b-5932-428e-9786-3195e157ae0e', '2025-08-07', 'full_day', 'present', NULL)
ON CONFLICT (student_id, session_date, period) DO NOTHING;
INSERT INTO public.attendance (id, student_id, session_date, period, status, remarks)
VALUES ('d0cfe499-9b59-4dd9-8a81-d803d514b9b2', '78e7fd7b-5932-428e-9786-3195e157ae0e', '2025-08-08', 'full_day', 'present', NULL)
ON CONFLICT (student_id, session_date, period) DO NOTHING;
INSERT INTO public.attendance (id, student_id, session_date, period, status, remarks)
VALUES ('165d0d00-44a1-4324-9b16-6c5948b57925', '78e7fd7b-5932-428e-9786-3195e157ae0e', '2025-08-11', 'full_day', 'present', NULL)
ON CONFLICT (student_id, session_date, period) DO NOTHING;
INSERT INTO public.attendance (id, student_id, session_date, period, status, remarks)
VALUES ('eea4fecd-b255-405d-a0e3-55f2a1b0af71', '78e7fd7b-5932-428e-9786-3195e157ae0e', '2025-08-12', 'full_day', 'present', NULL)
ON CONFLICT (student_id, session_date, period) DO NOTHING;
INSERT INTO public.attendance (id, student_id, session_date, period, status, remarks)
VALUES ('9a6bf1eb-a61b-4cce-af53-7f4d275a3e32', '78e7fd7b-5932-428e-9786-3195e157ae0e', '2025-08-13', 'full_day', 'present', NULL)
ON CONFLICT (student_id, session_date, period) DO NOTHING;
INSERT INTO public.attendance (id, student_id, session_date, period, status, remarks)
VALUES ('bf1d6216-c400-412b-84ba-f383e8c6f8cf', '78e7fd7b-5932-428e-9786-3195e157ae0e', '2025-08-14', 'full_day', 'present', NULL)
ON CONFLICT (student_id, session_date, period) DO NOTHING;
INSERT INTO public.attendance (id, student_id, session_date, period, status, remarks)
VALUES ('51d811f6-61e4-45e0-ab39-9ca134ab3d93', '78e7fd7b-5932-428e-9786-3195e157ae0e', '2025-08-15', 'full_day', 'late', 'Morning roll call record')
ON CONFLICT (student_id, session_date, period) DO NOTHING;
INSERT INTO public.attendance (id, student_id, session_date, period, status, remarks)
VALUES ('49680af4-ea42-4f2b-8518-8353e75aec5e', '78e7fd7b-5932-428e-9786-3195e157ae0e', '2025-08-18', 'full_day', 'present', NULL)
ON CONFLICT (student_id, session_date, period) DO NOTHING;
INSERT INTO public.attendance (id, student_id, session_date, period, status, remarks)
VALUES ('af487938-2062-4aa9-8d63-e0bfdf39417b', '78e7fd7b-5932-428e-9786-3195e157ae0e', '2025-08-19', 'full_day', 'present', NULL)
ON CONFLICT (student_id, session_date, period) DO NOTHING;
INSERT INTO public.attendance (id, student_id, session_date, period, status, remarks)
VALUES ('48070730-2c86-4df3-8a82-ec758bbd655c', '78e7fd7b-5932-428e-9786-3195e157ae0e', '2025-08-20', 'full_day', 'present', NULL)
ON CONFLICT (student_id, session_date, period) DO NOTHING;
INSERT INTO public.attendance (id, student_id, session_date, period, status, remarks)
VALUES ('e3d06a9f-5273-4b0d-8998-35ad1648e758', '78e7fd7b-5932-428e-9786-3195e157ae0e', '2025-08-21', 'full_day', 'late', 'Morning roll call record')
ON CONFLICT (student_id, session_date, period) DO NOTHING;
INSERT INTO public.attendance (id, student_id, session_date, period, status, remarks)
VALUES ('11be0b75-5e50-4509-9fbe-0af0fea4bd19', '78e7fd7b-5932-428e-9786-3195e157ae0e', '2025-08-22', 'full_day', 'present', NULL)
ON CONFLICT (student_id, session_date, period) DO NOTHING;
INSERT INTO public.attendance (id, student_id, session_date, period, status, remarks)
VALUES ('34fbeb5e-ec46-4d9f-b34c-291153098b09', '78e7fd7b-5932-428e-9786-3195e157ae0e', '2025-08-25', 'full_day', 'present', NULL)
ON CONFLICT (student_id, session_date, period) DO NOTHING;
INSERT INTO public.attendance (id, student_id, session_date, period, status, remarks)
VALUES ('83b7adbc-a798-4e55-a1fd-c7427930d344', '78e7fd7b-5932-428e-9786-3195e157ae0e', '2025-08-26', 'full_day', 'present', NULL)
ON CONFLICT (student_id, session_date, period) DO NOTHING;
INSERT INTO public.attendance (id, student_id, session_date, period, status, remarks)
VALUES ('57c4385b-7e0e-440f-ae06-be4f0c1fb251', '78e7fd7b-5932-428e-9786-3195e157ae0e', '2025-08-27', 'full_day', 'present', NULL)
ON CONFLICT (student_id, session_date, period) DO NOTHING;
INSERT INTO public.attendance (id, student_id, session_date, period, status, remarks)
VALUES ('aa2c41df-c573-4715-bb41-b06d151c5bb2', '78e7fd7b-5932-428e-9786-3195e157ae0e', '2025-08-28', 'full_day', 'present', NULL)
ON CONFLICT (student_id, session_date, period) DO NOTHING;
INSERT INTO public.attendance (id, student_id, session_date, period, status, remarks)
VALUES ('ef2278b0-d2fc-4197-b712-c21f1a1ca6c5', '78e7fd7b-5932-428e-9786-3195e157ae0e', '2025-08-29', 'full_day', 'present', NULL)
ON CONFLICT (student_id, session_date, period) DO NOTHING;
INSERT INTO public.attendance (id, student_id, session_date, period, status, remarks)
VALUES ('c9ed6252-abec-4ed7-942b-54db4f901790', 'f45c2d18-420f-4a52-98a6-f8f5b8211c51', '2025-08-01', 'full_day', 'present', NULL)
ON CONFLICT (student_id, session_date, period) DO NOTHING;
INSERT INTO public.attendance (id, student_id, session_date, period, status, remarks)
VALUES ('88347271-c3d9-4aba-96f4-a5f26163e5c8', 'f45c2d18-420f-4a52-98a6-f8f5b8211c51', '2025-08-04', 'full_day', 'present', NULL)
ON CONFLICT (student_id, session_date, period) DO NOTHING;
INSERT INTO public.attendance (id, student_id, session_date, period, status, remarks)
VALUES ('ecfcbcc0-898d-4c7e-ba37-c133c23f7be7', 'f45c2d18-420f-4a52-98a6-f8f5b8211c51', '2025-08-05', 'full_day', 'present', NULL)
ON CONFLICT (student_id, session_date, period) DO NOTHING;
INSERT INTO public.attendance (id, student_id, session_date, period, status, remarks)
VALUES ('cdd14cfd-386f-425e-93dc-5f00b0e84c3d', 'f45c2d18-420f-4a52-98a6-f8f5b8211c51', '2025-08-06', 'full_day', 'present', NULL)
ON CONFLICT (student_id, session_date, period) DO NOTHING;
INSERT INTO public.attendance (id, student_id, session_date, period, status, remarks)
VALUES ('b904ffe0-984e-4c47-aa6c-8c4a0486474f', 'f45c2d18-420f-4a52-98a6-f8f5b8211c51', '2025-08-07', 'full_day', 'present', NULL)
ON CONFLICT (student_id, session_date, period) DO NOTHING;
INSERT INTO public.attendance (id, student_id, session_date, period, status, remarks)
VALUES ('90d9512a-20b5-46de-ab4e-b64c25ae76a0', 'f45c2d18-420f-4a52-98a6-f8f5b8211c51', '2025-08-08', 'full_day', 'present', NULL)
ON CONFLICT (student_id, session_date, period) DO NOTHING;
INSERT INTO public.attendance (id, student_id, session_date, period, status, remarks)
VALUES ('d45e0b24-fd67-4522-81e2-0198f2636be8', 'f45c2d18-420f-4a52-98a6-f8f5b8211c51', '2025-08-11', 'full_day', 'present', NULL)
ON CONFLICT (student_id, session_date, period) DO NOTHING;
INSERT INTO public.attendance (id, student_id, session_date, period, status, remarks)
VALUES ('2f4e96f3-7cae-4372-965a-7bcb68bb74e5', 'f45c2d18-420f-4a52-98a6-f8f5b8211c51', '2025-08-12', 'full_day', 'present', NULL)
ON CONFLICT (student_id, session_date, period) DO NOTHING;
INSERT INTO public.attendance (id, student_id, session_date, period, status, remarks)
VALUES ('8e5a30f3-b364-44b2-84bc-aaf37de0f400', 'f45c2d18-420f-4a52-98a6-f8f5b8211c51', '2025-08-13', 'full_day', 'present', NULL)
ON CONFLICT (student_id, session_date, period) DO NOTHING;
INSERT INTO public.attendance (id, student_id, session_date, period, status, remarks)
VALUES ('ea8adc8e-eaea-475a-ae69-3839100adce3', 'f45c2d18-420f-4a52-98a6-f8f5b8211c51', '2025-08-14', 'full_day', 'present', NULL)
ON CONFLICT (student_id, session_date, period) DO NOTHING;
INSERT INTO public.attendance (id, student_id, session_date, period, status, remarks)
VALUES ('91af7f20-c8db-473a-9ff3-b03993fd3e68', 'f45c2d18-420f-4a52-98a6-f8f5b8211c51', '2025-08-15', 'full_day', 'present', NULL)
ON CONFLICT (student_id, session_date, period) DO NOTHING;
INSERT INTO public.attendance (id, student_id, session_date, period, status, remarks)
VALUES ('56ff31ae-18ef-4de9-9b5f-c83f9662274d', 'f45c2d18-420f-4a52-98a6-f8f5b8211c51', '2025-08-18', 'full_day', 'present', NULL)
ON CONFLICT (student_id, session_date, period) DO NOTHING;
INSERT INTO public.attendance (id, student_id, session_date, period, status, remarks)
VALUES ('e85216a5-990b-4e50-97c4-756134bb773e', 'f45c2d18-420f-4a52-98a6-f8f5b8211c51', '2025-08-19', 'full_day', 'present', NULL)
ON CONFLICT (student_id, session_date, period) DO NOTHING;
INSERT INTO public.attendance (id, student_id, session_date, period, status, remarks)
VALUES ('aef8fa2b-1ae3-4bae-882c-46950041f713', 'f45c2d18-420f-4a52-98a6-f8f5b8211c51', '2025-08-20', 'full_day', 'present', NULL)
ON CONFLICT (student_id, session_date, period) DO NOTHING;
INSERT INTO public.attendance (id, student_id, session_date, period, status, remarks)
VALUES ('54e9fb78-6a82-4925-8161-72461fb1ea14', 'f45c2d18-420f-4a52-98a6-f8f5b8211c51', '2025-08-21', 'full_day', 'present', NULL)
ON CONFLICT (student_id, session_date, period) DO NOTHING;
INSERT INTO public.attendance (id, student_id, session_date, period, status, remarks)
VALUES ('7c9ec9de-36d7-415d-ba3f-88e60dbab69b', 'f45c2d18-420f-4a52-98a6-f8f5b8211c51', '2025-08-22', 'full_day', 'present', NULL)
ON CONFLICT (student_id, session_date, period) DO NOTHING;
INSERT INTO public.attendance (id, student_id, session_date, period, status, remarks)
VALUES ('6e1ee860-254d-4403-a8ed-73e1b6880f24', 'f45c2d18-420f-4a52-98a6-f8f5b8211c51', '2025-08-25', 'full_day', 'present', NULL)
ON CONFLICT (student_id, session_date, period) DO NOTHING;
INSERT INTO public.attendance (id, student_id, session_date, period, status, remarks)
VALUES ('4ae63b75-c916-419b-9163-0f058de7bd11', 'f45c2d18-420f-4a52-98a6-f8f5b8211c51', '2025-08-26', 'full_day', 'late', 'Morning roll call record')
ON CONFLICT (student_id, session_date, period) DO NOTHING;
INSERT INTO public.attendance (id, student_id, session_date, period, status, remarks)
VALUES ('2de92270-0d69-4c18-937b-bb0a4c8e2f21', 'f45c2d18-420f-4a52-98a6-f8f5b8211c51', '2025-08-27', 'full_day', 'present', NULL)
ON CONFLICT (student_id, session_date, period) DO NOTHING;
INSERT INTO public.attendance (id, student_id, session_date, period, status, remarks)
VALUES ('94bd6fa7-d226-4ffb-aac0-f2c6fd51aa94', 'f45c2d18-420f-4a52-98a6-f8f5b8211c51', '2025-08-28', 'full_day', 'present', NULL)
ON CONFLICT (student_id, session_date, period) DO NOTHING;
INSERT INTO public.attendance (id, student_id, session_date, period, status, remarks)
VALUES ('ad532d3e-aae6-4468-91ab-47dcc50df1e3', 'f45c2d18-420f-4a52-98a6-f8f5b8211c51', '2025-08-29', 'full_day', 'present', NULL)
ON CONFLICT (student_id, session_date, period) DO NOTHING;
INSERT INTO public.attendance (id, student_id, session_date, period, status, remarks)
VALUES ('8f611692-7770-4760-bca2-08fe85996e91', 'a5859586-17fe-40e2-89df-e2adbaeb7e3f', '2025-08-01', 'full_day', 'present', NULL)
ON CONFLICT (student_id, session_date, period) DO NOTHING;
INSERT INTO public.attendance (id, student_id, session_date, period, status, remarks)
VALUES ('9bc1a55a-5c46-4b11-8897-77f0acba73fe', 'a5859586-17fe-40e2-89df-e2adbaeb7e3f', '2025-08-04', 'full_day', 'present', NULL)
ON CONFLICT (student_id, session_date, period) DO NOTHING;
INSERT INTO public.attendance (id, student_id, session_date, period, status, remarks)
VALUES ('3b84f86a-74f2-478f-9d15-7a0c964f4a50', 'a5859586-17fe-40e2-89df-e2adbaeb7e3f', '2025-08-05', 'full_day', 'present', NULL)
ON CONFLICT (student_id, session_date, period) DO NOTHING;
INSERT INTO public.attendance (id, student_id, session_date, period, status, remarks)
VALUES ('250d3590-7430-4a2d-88b1-1133ee72734c', 'a5859586-17fe-40e2-89df-e2adbaeb7e3f', '2025-08-06', 'full_day', 'present', NULL)
ON CONFLICT (student_id, session_date, period) DO NOTHING;
INSERT INTO public.attendance (id, student_id, session_date, period, status, remarks)
VALUES ('45304d92-4a5d-482b-aafe-6f00c5382043', 'a5859586-17fe-40e2-89df-e2adbaeb7e3f', '2025-08-07', 'full_day', 'present', NULL)
ON CONFLICT (student_id, session_date, period) DO NOTHING;
INSERT INTO public.attendance (id, student_id, session_date, period, status, remarks)
VALUES ('d054fcdf-9fc9-42f1-86d7-227140ca05f3', 'a5859586-17fe-40e2-89df-e2adbaeb7e3f', '2025-08-08', 'full_day', 'present', NULL)
ON CONFLICT (student_id, session_date, period) DO NOTHING;
INSERT INTO public.attendance (id, student_id, session_date, period, status, remarks)
VALUES ('1370c069-f190-4c51-a05b-b1a19d0c1293', 'a5859586-17fe-40e2-89df-e2adbaeb7e3f', '2025-08-11', 'full_day', 'present', NULL)
ON CONFLICT (student_id, session_date, period) DO NOTHING;
INSERT INTO public.attendance (id, student_id, session_date, period, status, remarks)
VALUES ('9de5e347-4a6c-42af-80b7-e6a512de9d73', 'a5859586-17fe-40e2-89df-e2adbaeb7e3f', '2025-08-12', 'full_day', 'present', NULL)
ON CONFLICT (student_id, session_date, period) DO NOTHING;
INSERT INTO public.attendance (id, student_id, session_date, period, status, remarks)
VALUES ('e077f016-b31e-49f8-86ae-32f437da42c3', 'a5859586-17fe-40e2-89df-e2adbaeb7e3f', '2025-08-13', 'full_day', 'present', NULL)
ON CONFLICT (student_id, session_date, period) DO NOTHING;
INSERT INTO public.attendance (id, student_id, session_date, period, status, remarks)
VALUES ('42cfa41c-4a96-4f7e-9826-bd68d2eafeb9', 'a5859586-17fe-40e2-89df-e2adbaeb7e3f', '2025-08-14', 'full_day', 'present', NULL)
ON CONFLICT (student_id, session_date, period) DO NOTHING;
INSERT INTO public.attendance (id, student_id, session_date, period, status, remarks)
VALUES ('96f6f228-273d-456c-a4d0-04ad05cc76e4', 'a5859586-17fe-40e2-89df-e2adbaeb7e3f', '2025-08-15', 'full_day', 'present', NULL)
ON CONFLICT (student_id, session_date, period) DO NOTHING;
INSERT INTO public.attendance (id, student_id, session_date, period, status, remarks)
VALUES ('3802693c-7752-4f5a-bed6-ee95eb826c0a', 'a5859586-17fe-40e2-89df-e2adbaeb7e3f', '2025-08-18', 'full_day', 'present', NULL)
ON CONFLICT (student_id, session_date, period) DO NOTHING;
INSERT INTO public.attendance (id, student_id, session_date, period, status, remarks)
VALUES ('fcb89173-ebfb-4e1f-8352-b9d0201a565b', 'a5859586-17fe-40e2-89df-e2adbaeb7e3f', '2025-08-19', 'full_day', 'present', NULL)
ON CONFLICT (student_id, session_date, period) DO NOTHING;
INSERT INTO public.attendance (id, student_id, session_date, period, status, remarks)
VALUES ('fc9b831e-0deb-4934-9c22-6e65960ea464', 'a5859586-17fe-40e2-89df-e2adbaeb7e3f', '2025-08-20', 'full_day', 'present', NULL)
ON CONFLICT (student_id, session_date, period) DO NOTHING;
INSERT INTO public.attendance (id, student_id, session_date, period, status, remarks)
VALUES ('6b8ca2cb-1dd9-43c9-8a60-b4bb1ce27710', 'a5859586-17fe-40e2-89df-e2adbaeb7e3f', '2025-08-21', 'full_day', 'present', NULL)
ON CONFLICT (student_id, session_date, period) DO NOTHING;
INSERT INTO public.attendance (id, student_id, session_date, period, status, remarks)
VALUES ('4310d8ef-e42a-46d4-80cf-5c693991bbff', 'a5859586-17fe-40e2-89df-e2adbaeb7e3f', '2025-08-22', 'full_day', 'present', NULL)
ON CONFLICT (student_id, session_date, period) DO NOTHING;
INSERT INTO public.attendance (id, student_id, session_date, period, status, remarks)
VALUES ('05fc85e4-42b4-420a-8db6-8a0a0887d6b1', 'a5859586-17fe-40e2-89df-e2adbaeb7e3f', '2025-08-25', 'full_day', 'present', NULL)
ON CONFLICT (student_id, session_date, period) DO NOTHING;
INSERT INTO public.attendance (id, student_id, session_date, period, status, remarks)
VALUES ('e1dc5935-1d6d-46e2-a73e-59e055b972fa', 'a5859586-17fe-40e2-89df-e2adbaeb7e3f', '2025-08-26', 'full_day', 'present', NULL)
ON CONFLICT (student_id, session_date, period) DO NOTHING;
INSERT INTO public.attendance (id, student_id, session_date, period, status, remarks)
VALUES ('e2e6dad0-ea3b-4945-8d90-bee2e9277750', 'a5859586-17fe-40e2-89df-e2adbaeb7e3f', '2025-08-27', 'full_day', 'present', NULL)
ON CONFLICT (student_id, session_date, period) DO NOTHING;
INSERT INTO public.attendance (id, student_id, session_date, period, status, remarks)
VALUES ('f98f9e71-f2a3-41f6-85f7-0a4911b0a1f1', 'a5859586-17fe-40e2-89df-e2adbaeb7e3f', '2025-08-28', 'full_day', 'late', 'Morning roll call record')
ON CONFLICT (student_id, session_date, period) DO NOTHING;
INSERT INTO public.attendance (id, student_id, session_date, period, status, remarks)
VALUES ('27e0912d-5be9-4dbd-992b-2385a689a0f0', 'a5859586-17fe-40e2-89df-e2adbaeb7e3f', '2025-08-29', 'full_day', 'present', NULL)
ON CONFLICT (student_id, session_date, period) DO NOTHING;
INSERT INTO public.attendance (id, student_id, session_date, period, status, remarks)
VALUES ('e2799c03-d492-43a8-8431-6de49b2a419a', '4a0b911a-abfd-4139-b18d-eb21fb120991', '2025-08-01', 'full_day', 'present', NULL)
ON CONFLICT (student_id, session_date, period) DO NOTHING;
INSERT INTO public.attendance (id, student_id, session_date, period, status, remarks)
VALUES ('3ad75b09-a495-49c3-a2ec-8ee11ec8b9a8', '4a0b911a-abfd-4139-b18d-eb21fb120991', '2025-08-04', 'full_day', 'present', NULL)
ON CONFLICT (student_id, session_date, period) DO NOTHING;
INSERT INTO public.attendance (id, student_id, session_date, period, status, remarks)
VALUES ('c848c728-cc9f-47cf-a9dc-a11145fb4579', '4a0b911a-abfd-4139-b18d-eb21fb120991', '2025-08-05', 'full_day', 'present', NULL)
ON CONFLICT (student_id, session_date, period) DO NOTHING;
INSERT INTO public.attendance (id, student_id, session_date, period, status, remarks)
VALUES ('93b18022-100c-4dce-9ff4-3580a96bd606', '4a0b911a-abfd-4139-b18d-eb21fb120991', '2025-08-06', 'full_day', 'present', NULL)
ON CONFLICT (student_id, session_date, period) DO NOTHING;
INSERT INTO public.attendance (id, student_id, session_date, period, status, remarks)
VALUES ('accb3745-4fc5-40bf-bac1-b07f6b873edf', '4a0b911a-abfd-4139-b18d-eb21fb120991', '2025-08-07', 'full_day', 'present', NULL)
ON CONFLICT (student_id, session_date, period) DO NOTHING;
INSERT INTO public.attendance (id, student_id, session_date, period, status, remarks)
VALUES ('ccc9c721-df3a-46f8-b9f6-8e8140ec8e4e', '4a0b911a-abfd-4139-b18d-eb21fb120991', '2025-08-08', 'full_day', 'present', NULL)
ON CONFLICT (student_id, session_date, period) DO NOTHING;
INSERT INTO public.attendance (id, student_id, session_date, period, status, remarks)
VALUES ('f3df90a8-64d5-4155-baa4-76ad9a35223c', '4a0b911a-abfd-4139-b18d-eb21fb120991', '2025-08-11', 'full_day', 'present', NULL)
ON CONFLICT (student_id, session_date, period) DO NOTHING;
INSERT INTO public.attendance (id, student_id, session_date, period, status, remarks)
VALUES ('8cf62498-4050-45e6-91fc-4a5f848f6f93', '4a0b911a-abfd-4139-b18d-eb21fb120991', '2025-08-12', 'full_day', 'absent', 'Morning roll call record')
ON CONFLICT (student_id, session_date, period) DO NOTHING;
INSERT INTO public.attendance (id, student_id, session_date, period, status, remarks)
VALUES ('ad7792f5-2ea6-4d85-b142-c05df6c33f1f', '4a0b911a-abfd-4139-b18d-eb21fb120991', '2025-08-13', 'full_day', 'present', NULL)
ON CONFLICT (student_id, session_date, period) DO NOTHING;
INSERT INTO public.attendance (id, student_id, session_date, period, status, remarks)
VALUES ('70114ec9-78d0-4e23-a243-c79b467a2551', '4a0b911a-abfd-4139-b18d-eb21fb120991', '2025-08-14', 'full_day', 'present', NULL)
ON CONFLICT (student_id, session_date, period) DO NOTHING;
INSERT INTO public.attendance (id, student_id, session_date, period, status, remarks)
VALUES ('e41e0c17-04fd-4ef7-ab02-6eea5f8e2601', '4a0b911a-abfd-4139-b18d-eb21fb120991', '2025-08-15', 'full_day', 'late', 'Morning roll call record')
ON CONFLICT (student_id, session_date, period) DO NOTHING;
INSERT INTO public.attendance (id, student_id, session_date, period, status, remarks)
VALUES ('51800674-63fb-4518-869d-30427455f5f4', '4a0b911a-abfd-4139-b18d-eb21fb120991', '2025-08-18', 'full_day', 'present', NULL)
ON CONFLICT (student_id, session_date, period) DO NOTHING;
INSERT INTO public.attendance (id, student_id, session_date, period, status, remarks)
VALUES ('83c3aecd-691a-44ad-9474-49b785f87972', '4a0b911a-abfd-4139-b18d-eb21fb120991', '2025-08-19', 'full_day', 'present', NULL)
ON CONFLICT (student_id, session_date, period) DO NOTHING;
INSERT INTO public.attendance (id, student_id, session_date, period, status, remarks)
VALUES ('0b26fb1e-fec6-4120-89d7-e65c14610d71', '4a0b911a-abfd-4139-b18d-eb21fb120991', '2025-08-20', 'full_day', 'present', NULL)
ON CONFLICT (student_id, session_date, period) DO NOTHING;
INSERT INTO public.attendance (id, student_id, session_date, period, status, remarks)
VALUES ('fa7b957c-c91d-4be4-8848-30ce9bf7838e', '4a0b911a-abfd-4139-b18d-eb21fb120991', '2025-08-21', 'full_day', 'present', NULL)
ON CONFLICT (student_id, session_date, period) DO NOTHING;
INSERT INTO public.attendance (id, student_id, session_date, period, status, remarks)
VALUES ('44bcc5c0-188d-4a2b-b23c-6a4010cb5886', '4a0b911a-abfd-4139-b18d-eb21fb120991', '2025-08-22', 'full_day', 'present', NULL)
ON CONFLICT (student_id, session_date, period) DO NOTHING;
INSERT INTO public.attendance (id, student_id, session_date, period, status, remarks)
VALUES ('7dd9c7d1-3c46-4d59-a748-5c905243ac75', '4a0b911a-abfd-4139-b18d-eb21fb120991', '2025-08-25', 'full_day', 'present', NULL)
ON CONFLICT (student_id, session_date, period) DO NOTHING;
INSERT INTO public.attendance (id, student_id, session_date, period, status, remarks)
VALUES ('4ff937ed-56d4-463b-84d3-da0519fda24d', '4a0b911a-abfd-4139-b18d-eb21fb120991', '2025-08-26', 'full_day', 'present', NULL)
ON CONFLICT (student_id, session_date, period) DO NOTHING;
INSERT INTO public.attendance (id, student_id, session_date, period, status, remarks)
VALUES ('3ad648fd-40e9-454b-b39a-8cb9d3ab0c43', '4a0b911a-abfd-4139-b18d-eb21fb120991', '2025-08-27', 'full_day', 'present', NULL)
ON CONFLICT (student_id, session_date, period) DO NOTHING;
INSERT INTO public.attendance (id, student_id, session_date, period, status, remarks)
VALUES ('e20eebcd-cba7-4b4c-8fdb-e9efbd67f2ac', '4a0b911a-abfd-4139-b18d-eb21fb120991', '2025-08-28', 'full_day', 'present', NULL)
ON CONFLICT (student_id, session_date, period) DO NOTHING;
INSERT INTO public.attendance (id, student_id, session_date, period, status, remarks)
VALUES ('98863c1a-91a4-44fe-87f8-bd8d0112080a', '4a0b911a-abfd-4139-b18d-eb21fb120991', '2025-08-29', 'full_day', 'present', NULL)
ON CONFLICT (student_id, session_date, period) DO NOTHING;
INSERT INTO public.attendance (id, student_id, session_date, period, status, remarks)
VALUES ('bb747b7b-6147-45f4-b5a7-2b32d10eeb6f', 'd7bb4c48-ee9b-41d9-b303-68427673dd14', '2025-08-01', 'full_day', 'present', NULL)
ON CONFLICT (student_id, session_date, period) DO NOTHING;
INSERT INTO public.attendance (id, student_id, session_date, period, status, remarks)
VALUES ('b26349bb-2b15-4d70-902a-4d7b947ba27f', 'd7bb4c48-ee9b-41d9-b303-68427673dd14', '2025-08-04', 'full_day', 'present', NULL)
ON CONFLICT (student_id, session_date, period) DO NOTHING;
INSERT INTO public.attendance (id, student_id, session_date, period, status, remarks)
VALUES ('a246705e-09ce-4370-bd92-a1c70c5c4cce', 'd7bb4c48-ee9b-41d9-b303-68427673dd14', '2025-08-05', 'full_day', 'present', NULL)
ON CONFLICT (student_id, session_date, period) DO NOTHING;
INSERT INTO public.attendance (id, student_id, session_date, period, status, remarks)
VALUES ('03ab1f5d-171e-4db4-b15c-c9f5375c5041', 'd7bb4c48-ee9b-41d9-b303-68427673dd14', '2025-08-06', 'full_day', 'present', NULL)
ON CONFLICT (student_id, session_date, period) DO NOTHING;
INSERT INTO public.attendance (id, student_id, session_date, period, status, remarks)
VALUES ('c8ac31d7-3a53-4029-9294-d73001157ecd', 'd7bb4c48-ee9b-41d9-b303-68427673dd14', '2025-08-07', 'full_day', 'present', NULL)
ON CONFLICT (student_id, session_date, period) DO NOTHING;
INSERT INTO public.attendance (id, student_id, session_date, period, status, remarks)
VALUES ('ec141ddb-4f40-4634-8217-91a49f99ecb9', 'd7bb4c48-ee9b-41d9-b303-68427673dd14', '2025-08-08', 'full_day', 'excused', 'Morning roll call record')
ON CONFLICT (student_id, session_date, period) DO NOTHING;
INSERT INTO public.attendance (id, student_id, session_date, period, status, remarks)
VALUES ('4597aa02-d42a-4d46-8e90-c188754979d5', 'd7bb4c48-ee9b-41d9-b303-68427673dd14', '2025-08-11', 'full_day', 'present', NULL)
ON CONFLICT (student_id, session_date, period) DO NOTHING;
INSERT INTO public.attendance (id, student_id, session_date, period, status, remarks)
VALUES ('fa3e4d6c-a875-4973-a160-293ab4a98506', 'd7bb4c48-ee9b-41d9-b303-68427673dd14', '2025-08-12', 'full_day', 'present', NULL)
ON CONFLICT (student_id, session_date, period) DO NOTHING;
INSERT INTO public.attendance (id, student_id, session_date, period, status, remarks)
VALUES ('2e2902b2-60e2-44b1-8e52-433284e39ebf', 'd7bb4c48-ee9b-41d9-b303-68427673dd14', '2025-08-13', 'full_day', 'present', NULL)
ON CONFLICT (student_id, session_date, period) DO NOTHING;
INSERT INTO public.attendance (id, student_id, session_date, period, status, remarks)
VALUES ('91c9fb3c-ec51-4649-9d2c-bdad2c1e5040', 'd7bb4c48-ee9b-41d9-b303-68427673dd14', '2025-08-14', 'full_day', 'present', NULL)
ON CONFLICT (student_id, session_date, period) DO NOTHING;
INSERT INTO public.attendance (id, student_id, session_date, period, status, remarks)
VALUES ('81ead25d-63ec-4d7e-9e5b-bfcbfdb02a69', 'd7bb4c48-ee9b-41d9-b303-68427673dd14', '2025-08-15', 'full_day', 'present', NULL)
ON CONFLICT (student_id, session_date, period) DO NOTHING;
INSERT INTO public.attendance (id, student_id, session_date, period, status, remarks)
VALUES ('09523494-99bd-42f9-aa92-5c5429e78cfd', 'd7bb4c48-ee9b-41d9-b303-68427673dd14', '2025-08-18', 'full_day', 'present', NULL)
ON CONFLICT (student_id, session_date, period) DO NOTHING;
INSERT INTO public.attendance (id, student_id, session_date, period, status, remarks)
VALUES ('e8fa4960-c8c7-4f18-8dca-cb95ff553457', 'd7bb4c48-ee9b-41d9-b303-68427673dd14', '2025-08-19', 'full_day', 'present', NULL)
ON CONFLICT (student_id, session_date, period) DO NOTHING;
INSERT INTO public.attendance (id, student_id, session_date, period, status, remarks)
VALUES ('73fe81cd-878a-4659-90c2-83ac8c6f5bc4', 'd7bb4c48-ee9b-41d9-b303-68427673dd14', '2025-08-20', 'full_day', 'present', NULL)
ON CONFLICT (student_id, session_date, period) DO NOTHING;
INSERT INTO public.attendance (id, student_id, session_date, period, status, remarks)
VALUES ('9d7da146-5e5a-44ce-96d1-c06f5e0816f3', 'd7bb4c48-ee9b-41d9-b303-68427673dd14', '2025-08-21', 'full_day', 'present', NULL)
ON CONFLICT (student_id, session_date, period) DO NOTHING;
INSERT INTO public.attendance (id, student_id, session_date, period, status, remarks)
VALUES ('b17f14b5-72ce-4bc8-a43c-cdab1126ba35', 'd7bb4c48-ee9b-41d9-b303-68427673dd14', '2025-08-22', 'full_day', 'present', NULL)
ON CONFLICT (student_id, session_date, period) DO NOTHING;
INSERT INTO public.attendance (id, student_id, session_date, period, status, remarks)
VALUES ('632195b6-a363-4c87-9a5f-4abd6056e92b', 'd7bb4c48-ee9b-41d9-b303-68427673dd14', '2025-08-25', 'full_day', 'present', NULL)
ON CONFLICT (student_id, session_date, period) DO NOTHING;
INSERT INTO public.attendance (id, student_id, session_date, period, status, remarks)
VALUES ('3e04c0c0-8f18-442f-b1fa-8f89ca59c34f', 'd7bb4c48-ee9b-41d9-b303-68427673dd14', '2025-08-26', 'full_day', 'present', NULL)
ON CONFLICT (student_id, session_date, period) DO NOTHING;
INSERT INTO public.attendance (id, student_id, session_date, period, status, remarks)
VALUES ('7a6f037e-cecd-4ad1-8c2f-035eff280ea2', 'd7bb4c48-ee9b-41d9-b303-68427673dd14', '2025-08-27', 'full_day', 'present', NULL)
ON CONFLICT (student_id, session_date, period) DO NOTHING;
INSERT INTO public.attendance (id, student_id, session_date, period, status, remarks)
VALUES ('5472174f-1b2c-4978-9bc5-aba9ae4861e5', 'd7bb4c48-ee9b-41d9-b303-68427673dd14', '2025-08-28', 'full_day', 'present', NULL)
ON CONFLICT (student_id, session_date, period) DO NOTHING;
INSERT INTO public.attendance (id, student_id, session_date, period, status, remarks)
VALUES ('c89a2495-863e-4c85-a94f-f70887fd0273', 'd7bb4c48-ee9b-41d9-b303-68427673dd14', '2025-08-29', 'full_day', 'present', NULL)
ON CONFLICT (student_id, session_date, period) DO NOTHING;
INSERT INTO public.attendance (id, student_id, session_date, period, status, remarks)
VALUES ('4f3cee15-2196-4f51-8ca4-fdcef7dded93', 'c6518feb-e30e-4c60-992b-7b67af2efe1a', '2025-08-01', 'full_day', 'late', 'Morning roll call record')
ON CONFLICT (student_id, session_date, period) DO NOTHING;
INSERT INTO public.attendance (id, student_id, session_date, period, status, remarks)
VALUES ('e762de76-4040-4900-b6c1-f5b5453f0bf4', 'c6518feb-e30e-4c60-992b-7b67af2efe1a', '2025-08-04', 'full_day', 'present', NULL)
ON CONFLICT (student_id, session_date, period) DO NOTHING;
INSERT INTO public.attendance (id, student_id, session_date, period, status, remarks)
VALUES ('a70f6b37-82d0-41e4-8dba-756114d7ebcd', 'c6518feb-e30e-4c60-992b-7b67af2efe1a', '2025-08-05', 'full_day', 'late', 'Morning roll call record')
ON CONFLICT (student_id, session_date, period) DO NOTHING;
INSERT INTO public.attendance (id, student_id, session_date, period, status, remarks)
VALUES ('9ecf1c73-37c1-49db-a761-fd8ffffc2206', 'c6518feb-e30e-4c60-992b-7b67af2efe1a', '2025-08-06', 'full_day', 'present', NULL)
ON CONFLICT (student_id, session_date, period) DO NOTHING;
INSERT INTO public.attendance (id, student_id, session_date, period, status, remarks)
VALUES ('88831cdd-ce7d-41a5-b7cc-528ec45df82e', 'c6518feb-e30e-4c60-992b-7b67af2efe1a', '2025-08-07', 'full_day', 'present', NULL)
ON CONFLICT (student_id, session_date, period) DO NOTHING;
INSERT INTO public.attendance (id, student_id, session_date, period, status, remarks)
VALUES ('c1c7bb57-f2b6-4cd5-b1cf-078e1b136e88', 'c6518feb-e30e-4c60-992b-7b67af2efe1a', '2025-08-08', 'full_day', 'present', NULL)
ON CONFLICT (student_id, session_date, period) DO NOTHING;
INSERT INTO public.attendance (id, student_id, session_date, period, status, remarks)
VALUES ('2f826b5c-c523-424c-b4b2-40c875a8c5a5', 'c6518feb-e30e-4c60-992b-7b67af2efe1a', '2025-08-11', 'full_day', 'present', NULL)
ON CONFLICT (student_id, session_date, period) DO NOTHING;
INSERT INTO public.attendance (id, student_id, session_date, period, status, remarks)
VALUES ('7aa715ad-1b89-4afa-b22e-d38206e582cd', 'c6518feb-e30e-4c60-992b-7b67af2efe1a', '2025-08-12', 'full_day', 'late', 'Morning roll call record')
ON CONFLICT (student_id, session_date, period) DO NOTHING;
INSERT INTO public.attendance (id, student_id, session_date, period, status, remarks)
VALUES ('c248150c-aef3-44bb-9506-d1441c06a25f', 'c6518feb-e30e-4c60-992b-7b67af2efe1a', '2025-08-13', 'full_day', 'present', NULL)
ON CONFLICT (student_id, session_date, period) DO NOTHING;
INSERT INTO public.attendance (id, student_id, session_date, period, status, remarks)
VALUES ('25a83170-d2ae-41ce-b404-611f50095050', 'c6518feb-e30e-4c60-992b-7b67af2efe1a', '2025-08-14', 'full_day', 'present', NULL)
ON CONFLICT (student_id, session_date, period) DO NOTHING;
INSERT INTO public.attendance (id, student_id, session_date, period, status, remarks)
VALUES ('70a42385-662c-4473-acbe-f5c4d5706b8f', 'c6518feb-e30e-4c60-992b-7b67af2efe1a', '2025-08-15', 'full_day', 'present', NULL)
ON CONFLICT (student_id, session_date, period) DO NOTHING;
INSERT INTO public.attendance (id, student_id, session_date, period, status, remarks)
VALUES ('03da242c-fd7c-4677-b9b4-08a54b27c9c0', 'c6518feb-e30e-4c60-992b-7b67af2efe1a', '2025-08-18', 'full_day', 'present', NULL)
ON CONFLICT (student_id, session_date, period) DO NOTHING;
INSERT INTO public.attendance (id, student_id, session_date, period, status, remarks)
VALUES ('ac0c9f74-8550-4dbf-a87e-16572106fff2', 'c6518feb-e30e-4c60-992b-7b67af2efe1a', '2025-08-19', 'full_day', 'present', NULL)
ON CONFLICT (student_id, session_date, period) DO NOTHING;
INSERT INTO public.attendance (id, student_id, session_date, period, status, remarks)
VALUES ('b84e2556-595b-49e4-9114-464c59034330', 'c6518feb-e30e-4c60-992b-7b67af2efe1a', '2025-08-20', 'full_day', 'present', NULL)
ON CONFLICT (student_id, session_date, period) DO NOTHING;
INSERT INTO public.attendance (id, student_id, session_date, period, status, remarks)
VALUES ('55fcfb8c-b84a-4096-923e-30d75ea9269b', 'c6518feb-e30e-4c60-992b-7b67af2efe1a', '2025-08-21', 'full_day', 'present', NULL)
ON CONFLICT (student_id, session_date, period) DO NOTHING;
INSERT INTO public.attendance (id, student_id, session_date, period, status, remarks)
VALUES ('c93f1d12-7ee9-489b-9f9d-cd509fae1f26', 'c6518feb-e30e-4c60-992b-7b67af2efe1a', '2025-08-22', 'full_day', 'present', NULL)
ON CONFLICT (student_id, session_date, period) DO NOTHING;
INSERT INTO public.attendance (id, student_id, session_date, period, status, remarks)
VALUES ('39de9b59-22a7-490b-851b-d4769edf01f5', 'c6518feb-e30e-4c60-992b-7b67af2efe1a', '2025-08-25', 'full_day', 'present', NULL)
ON CONFLICT (student_id, session_date, period) DO NOTHING;
INSERT INTO public.attendance (id, student_id, session_date, period, status, remarks)
VALUES ('a21e897b-a2da-484c-a9f0-17a34a7ccc2e', 'c6518feb-e30e-4c60-992b-7b67af2efe1a', '2025-08-26', 'full_day', 'present', NULL)
ON CONFLICT (student_id, session_date, period) DO NOTHING;
INSERT INTO public.attendance (id, student_id, session_date, period, status, remarks)
VALUES ('232e9c88-5e0d-4410-8ff4-831646951141', 'c6518feb-e30e-4c60-992b-7b67af2efe1a', '2025-08-27', 'full_day', 'present', NULL)
ON CONFLICT (student_id, session_date, period) DO NOTHING;
INSERT INTO public.attendance (id, student_id, session_date, period, status, remarks)
VALUES ('e2f9bfb2-5998-4f4c-8061-60976b387a10', 'c6518feb-e30e-4c60-992b-7b67af2efe1a', '2025-08-28', 'full_day', 'late', 'Morning roll call record')
ON CONFLICT (student_id, session_date, period) DO NOTHING;
INSERT INTO public.attendance (id, student_id, session_date, period, status, remarks)
VALUES ('dcbd57e3-4634-4514-9ac5-ce4a4bbcd9a4', 'c6518feb-e30e-4c60-992b-7b67af2efe1a', '2025-08-29', 'full_day', 'present', NULL)
ON CONFLICT (student_id, session_date, period) DO NOTHING;
INSERT INTO public.attendance (id, student_id, session_date, period, status, remarks)
VALUES ('66f1977a-443f-4f1d-9849-145908f0eef7', 'e3f1d90f-85ed-4367-a618-8604c886458e', '2025-08-01', 'full_day', 'present', NULL)
ON CONFLICT (student_id, session_date, period) DO NOTHING;
INSERT INTO public.attendance (id, student_id, session_date, period, status, remarks)
VALUES ('6fc644bd-6ca7-4938-8a5b-9e927996d506', 'e3f1d90f-85ed-4367-a618-8604c886458e', '2025-08-04', 'full_day', 'present', NULL)
ON CONFLICT (student_id, session_date, period) DO NOTHING;
INSERT INTO public.attendance (id, student_id, session_date, period, status, remarks)
VALUES ('92fc45f8-3c3f-4a4e-b5c5-1d8a9a71d9e0', 'e3f1d90f-85ed-4367-a618-8604c886458e', '2025-08-05', 'full_day', 'present', NULL)
ON CONFLICT (student_id, session_date, period) DO NOTHING;
INSERT INTO public.attendance (id, student_id, session_date, period, status, remarks)
VALUES ('73ae37bb-4197-4f6b-afab-e0e3d9de0824', 'e3f1d90f-85ed-4367-a618-8604c886458e', '2025-08-06', 'full_day', 'present', NULL)
ON CONFLICT (student_id, session_date, period) DO NOTHING;
INSERT INTO public.attendance (id, student_id, session_date, period, status, remarks)
VALUES ('fa0e1177-4455-48e0-a5ab-9d038c51b7c6', 'e3f1d90f-85ed-4367-a618-8604c886458e', '2025-08-07', 'full_day', 'present', NULL)
ON CONFLICT (student_id, session_date, period) DO NOTHING;
INSERT INTO public.attendance (id, student_id, session_date, period, status, remarks)
VALUES ('77dc6e43-73c6-4811-82a4-80fcfcb61142', 'e3f1d90f-85ed-4367-a618-8604c886458e', '2025-08-08', 'full_day', 'present', NULL)
ON CONFLICT (student_id, session_date, period) DO NOTHING;
INSERT INTO public.attendance (id, student_id, session_date, period, status, remarks)
VALUES ('85f17b77-3987-4091-981c-d3c000b4cd67', 'e3f1d90f-85ed-4367-a618-8604c886458e', '2025-08-11', 'full_day', 'present', NULL)
ON CONFLICT (student_id, session_date, period) DO NOTHING;
INSERT INTO public.attendance (id, student_id, session_date, period, status, remarks)
VALUES ('c1e8dec8-e4f1-4fca-a8c7-1c5ad1804b71', 'e3f1d90f-85ed-4367-a618-8604c886458e', '2025-08-12', 'full_day', 'present', NULL)
ON CONFLICT (student_id, session_date, period) DO NOTHING;
INSERT INTO public.attendance (id, student_id, session_date, period, status, remarks)
VALUES ('996049f0-63b0-4525-be0d-16431d510434', 'e3f1d90f-85ed-4367-a618-8604c886458e', '2025-08-13', 'full_day', 'present', NULL)
ON CONFLICT (student_id, session_date, period) DO NOTHING;
INSERT INTO public.attendance (id, student_id, session_date, period, status, remarks)
VALUES ('855e9135-0cc3-49da-bc05-87078b3507c0', 'e3f1d90f-85ed-4367-a618-8604c886458e', '2025-08-14', 'full_day', 'present', NULL)
ON CONFLICT (student_id, session_date, period) DO NOTHING;
INSERT INTO public.attendance (id, student_id, session_date, period, status, remarks)
VALUES ('23ef3cd9-88e0-4860-a18d-8297cd701967', 'e3f1d90f-85ed-4367-a618-8604c886458e', '2025-08-15', 'full_day', 'present', NULL)
ON CONFLICT (student_id, session_date, period) DO NOTHING;
INSERT INTO public.attendance (id, student_id, session_date, period, status, remarks)
VALUES ('a912728e-2d57-4981-b0bd-465b5756b998', 'e3f1d90f-85ed-4367-a618-8604c886458e', '2025-08-18', 'full_day', 'present', NULL)
ON CONFLICT (student_id, session_date, period) DO NOTHING;
INSERT INTO public.attendance (id, student_id, session_date, period, status, remarks)
VALUES ('836a8201-b76d-4b00-b902-e34e5ac07347', 'e3f1d90f-85ed-4367-a618-8604c886458e', '2025-08-19', 'full_day', 'present', NULL)
ON CONFLICT (student_id, session_date, period) DO NOTHING;
INSERT INTO public.attendance (id, student_id, session_date, period, status, remarks)
VALUES ('75a875dc-0172-495a-b7da-ea769ef78193', 'e3f1d90f-85ed-4367-a618-8604c886458e', '2025-08-20', 'full_day', 'present', NULL)
ON CONFLICT (student_id, session_date, period) DO NOTHING;
INSERT INTO public.attendance (id, student_id, session_date, period, status, remarks)
VALUES ('f10382d4-86af-41be-861a-5b889dca9f1e', 'e3f1d90f-85ed-4367-a618-8604c886458e', '2025-08-21', 'full_day', 'present', NULL)
ON CONFLICT (student_id, session_date, period) DO NOTHING;
INSERT INTO public.attendance (id, student_id, session_date, period, status, remarks)
VALUES ('de8a53e0-c90f-46df-bbea-34ecee407b31', 'e3f1d90f-85ed-4367-a618-8604c886458e', '2025-08-22', 'full_day', 'late', 'Morning roll call record')
ON CONFLICT (student_id, session_date, period) DO NOTHING;
INSERT INTO public.attendance (id, student_id, session_date, period, status, remarks)
VALUES ('a5d6bebe-31af-42fd-b3de-205150e519fb', 'e3f1d90f-85ed-4367-a618-8604c886458e', '2025-08-25', 'full_day', 'present', NULL)
ON CONFLICT (student_id, session_date, period) DO NOTHING;
INSERT INTO public.attendance (id, student_id, session_date, period, status, remarks)
VALUES ('c2cc7783-4de2-47a7-8882-d022e63b24c5', 'e3f1d90f-85ed-4367-a618-8604c886458e', '2025-08-26', 'full_day', 'late', 'Morning roll call record')
ON CONFLICT (student_id, session_date, period) DO NOTHING;
INSERT INTO public.attendance (id, student_id, session_date, period, status, remarks)
VALUES ('b762740b-cf22-4bed-87dc-3a8d02f98207', 'e3f1d90f-85ed-4367-a618-8604c886458e', '2025-08-27', 'full_day', 'present', NULL)
ON CONFLICT (student_id, session_date, period) DO NOTHING;
INSERT INTO public.attendance (id, student_id, session_date, period, status, remarks)
VALUES ('42473962-b277-4782-bb58-acbf88225025', 'e3f1d90f-85ed-4367-a618-8604c886458e', '2025-08-28', 'full_day', 'present', NULL)
ON CONFLICT (student_id, session_date, period) DO NOTHING;
INSERT INTO public.attendance (id, student_id, session_date, period, status, remarks)
VALUES ('9bf55210-e3aa-4f00-9e52-2da312fc3a5e', 'e3f1d90f-85ed-4367-a618-8604c886458e', '2025-08-29', 'full_day', 'present', NULL)
ON CONFLICT (student_id, session_date, period) DO NOTHING;
INSERT INTO public.attendance (id, student_id, session_date, period, status, remarks)
VALUES ('d80f3048-80e9-4811-aede-0809bb99e8cb', 'b0d23702-e1d5-4b0a-9bdb-13a4c496dfba', '2025-08-01', 'full_day', 'present', NULL)
ON CONFLICT (student_id, session_date, period) DO NOTHING;
INSERT INTO public.attendance (id, student_id, session_date, period, status, remarks)
VALUES ('d93cd8b7-c01d-4b84-89ee-302fc7c36980', 'b0d23702-e1d5-4b0a-9bdb-13a4c496dfba', '2025-08-04', 'full_day', 'present', NULL)
ON CONFLICT (student_id, session_date, period) DO NOTHING;
INSERT INTO public.attendance (id, student_id, session_date, period, status, remarks)
VALUES ('2b7657aa-e82f-446a-8924-11febb8f4284', 'b0d23702-e1d5-4b0a-9bdb-13a4c496dfba', '2025-08-05', 'full_day', 'late', 'Morning roll call record')
ON CONFLICT (student_id, session_date, period) DO NOTHING;
INSERT INTO public.attendance (id, student_id, session_date, period, status, remarks)
VALUES ('40c96c12-48e9-4ada-9210-e03f4c739dff', 'b0d23702-e1d5-4b0a-9bdb-13a4c496dfba', '2025-08-06', 'full_day', 'present', NULL)
ON CONFLICT (student_id, session_date, period) DO NOTHING;
INSERT INTO public.attendance (id, student_id, session_date, period, status, remarks)
VALUES ('46bf703b-ac9c-4b7f-8c44-bb120b701a44', 'b0d23702-e1d5-4b0a-9bdb-13a4c496dfba', '2025-08-07', 'full_day', 'present', NULL)
ON CONFLICT (student_id, session_date, period) DO NOTHING;
INSERT INTO public.attendance (id, student_id, session_date, period, status, remarks)
VALUES ('c8617a54-b86b-4f12-9e8f-cc57566f45bd', 'b0d23702-e1d5-4b0a-9bdb-13a4c496dfba', '2025-08-08', 'full_day', 'present', NULL)
ON CONFLICT (student_id, session_date, period) DO NOTHING;
INSERT INTO public.attendance (id, student_id, session_date, period, status, remarks)
VALUES ('bb325fe6-09dd-4bac-a515-92c4aa1a233e', 'b0d23702-e1d5-4b0a-9bdb-13a4c496dfba', '2025-08-11', 'full_day', 'present', NULL)
ON CONFLICT (student_id, session_date, period) DO NOTHING;
INSERT INTO public.attendance (id, student_id, session_date, period, status, remarks)
VALUES ('386aee15-1060-48ae-b08f-6900163c2d67', 'b0d23702-e1d5-4b0a-9bdb-13a4c496dfba', '2025-08-12', 'full_day', 'present', NULL)
ON CONFLICT (student_id, session_date, period) DO NOTHING;
INSERT INTO public.attendance (id, student_id, session_date, period, status, remarks)
VALUES ('6883886d-a9f4-4c45-8c57-9d70f3a8d8ee', 'b0d23702-e1d5-4b0a-9bdb-13a4c496dfba', '2025-08-13', 'full_day', 'present', NULL)
ON CONFLICT (student_id, session_date, period) DO NOTHING;
INSERT INTO public.attendance (id, student_id, session_date, period, status, remarks)
VALUES ('7adef25f-6cd7-410d-915d-e383d1a57d56', 'b0d23702-e1d5-4b0a-9bdb-13a4c496dfba', '2025-08-14', 'full_day', 'present', NULL)
ON CONFLICT (student_id, session_date, period) DO NOTHING;
INSERT INTO public.attendance (id, student_id, session_date, period, status, remarks)
VALUES ('3750fbd7-284f-4fbc-84b5-4ee6ec4855a0', 'b0d23702-e1d5-4b0a-9bdb-13a4c496dfba', '2025-08-15', 'full_day', 'present', NULL)
ON CONFLICT (student_id, session_date, period) DO NOTHING;
INSERT INTO public.attendance (id, student_id, session_date, period, status, remarks)
VALUES ('66cd09c1-7be8-4649-a473-fb156ff5e600', 'b0d23702-e1d5-4b0a-9bdb-13a4c496dfba', '2025-08-18', 'full_day', 'present', NULL)
ON CONFLICT (student_id, session_date, period) DO NOTHING;
INSERT INTO public.attendance (id, student_id, session_date, period, status, remarks)
VALUES ('993b6e12-f987-4fcc-aa38-25d877f79e5c', 'b0d23702-e1d5-4b0a-9bdb-13a4c496dfba', '2025-08-19', 'full_day', 'present', NULL)
ON CONFLICT (student_id, session_date, period) DO NOTHING;
INSERT INTO public.attendance (id, student_id, session_date, period, status, remarks)
VALUES ('47758347-f86d-4c74-b915-b43a72ebc896', 'b0d23702-e1d5-4b0a-9bdb-13a4c496dfba', '2025-08-20', 'full_day', 'present', NULL)
ON CONFLICT (student_id, session_date, period) DO NOTHING;
INSERT INTO public.attendance (id, student_id, session_date, period, status, remarks)
VALUES ('9314352e-0628-4d25-a586-d1b3805d65f3', 'b0d23702-e1d5-4b0a-9bdb-13a4c496dfba', '2025-08-21', 'full_day', 'present', NULL)
ON CONFLICT (student_id, session_date, period) DO NOTHING;
INSERT INTO public.attendance (id, student_id, session_date, period, status, remarks)
VALUES ('bad20a82-0920-4ff4-b0b5-002981bb258c', 'b0d23702-e1d5-4b0a-9bdb-13a4c496dfba', '2025-08-22', 'full_day', 'present', NULL)
ON CONFLICT (student_id, session_date, period) DO NOTHING;
INSERT INTO public.attendance (id, student_id, session_date, period, status, remarks)
VALUES ('4e264843-e934-441d-8d0b-5f4e8526a11a', 'b0d23702-e1d5-4b0a-9bdb-13a4c496dfba', '2025-08-25', 'full_day', 'present', NULL)
ON CONFLICT (student_id, session_date, period) DO NOTHING;
INSERT INTO public.attendance (id, student_id, session_date, period, status, remarks)
VALUES ('e112b8de-4bea-4c01-8f26-8dc3f6b44e61', 'b0d23702-e1d5-4b0a-9bdb-13a4c496dfba', '2025-08-26', 'full_day', 'present', NULL)
ON CONFLICT (student_id, session_date, period) DO NOTHING;
INSERT INTO public.attendance (id, student_id, session_date, period, status, remarks)
VALUES ('f228fd38-69e9-40b7-ac42-31832572d365', 'b0d23702-e1d5-4b0a-9bdb-13a4c496dfba', '2025-08-27', 'full_day', 'present', NULL)
ON CONFLICT (student_id, session_date, period) DO NOTHING;
INSERT INTO public.attendance (id, student_id, session_date, period, status, remarks)
VALUES ('3e837d9d-1c2c-4d88-8476-d455e7981c99', 'b0d23702-e1d5-4b0a-9bdb-13a4c496dfba', '2025-08-28', 'full_day', 'present', NULL)
ON CONFLICT (student_id, session_date, period) DO NOTHING;
INSERT INTO public.attendance (id, student_id, session_date, period, status, remarks)
VALUES ('d9997e4b-7d8f-483c-bd1b-a278f09df6de', 'b0d23702-e1d5-4b0a-9bdb-13a4c496dfba', '2025-08-29', 'full_day', 'present', NULL)
ON CONFLICT (student_id, session_date, period) DO NOTHING;
INSERT INTO public.attendance (id, student_id, session_date, period, status, remarks)
VALUES ('516fada0-7af1-4844-a9d9-3105b2bf534f', '82bf37fc-0077-4756-b27a-b23dd1d6ceaa', '2025-08-01', 'full_day', 'present', NULL)
ON CONFLICT (student_id, session_date, period) DO NOTHING;
INSERT INTO public.attendance (id, student_id, session_date, period, status, remarks)
VALUES ('62f9a097-76ea-478c-b66a-fc82110235e2', '82bf37fc-0077-4756-b27a-b23dd1d6ceaa', '2025-08-04', 'full_day', 'present', NULL)
ON CONFLICT (student_id, session_date, period) DO NOTHING;
INSERT INTO public.attendance (id, student_id, session_date, period, status, remarks)
VALUES ('903f1ad6-023d-4b2a-82a6-1629a5065b3b', '82bf37fc-0077-4756-b27a-b23dd1d6ceaa', '2025-08-05', 'full_day', 'present', NULL)
ON CONFLICT (student_id, session_date, period) DO NOTHING;
INSERT INTO public.attendance (id, student_id, session_date, period, status, remarks)
VALUES ('c8e1dffe-2675-4ab3-8ce5-866846466382', '82bf37fc-0077-4756-b27a-b23dd1d6ceaa', '2025-08-06', 'full_day', 'present', NULL)
ON CONFLICT (student_id, session_date, period) DO NOTHING;
INSERT INTO public.attendance (id, student_id, session_date, period, status, remarks)
VALUES ('d7ca5612-186e-4093-a275-cc1aa78cae0d', '82bf37fc-0077-4756-b27a-b23dd1d6ceaa', '2025-08-07', 'full_day', 'present', NULL)
ON CONFLICT (student_id, session_date, period) DO NOTHING;
INSERT INTO public.attendance (id, student_id, session_date, period, status, remarks)
VALUES ('c4641113-82f0-414f-aefb-510e0ba572a7', '82bf37fc-0077-4756-b27a-b23dd1d6ceaa', '2025-08-08', 'full_day', 'present', NULL)
ON CONFLICT (student_id, session_date, period) DO NOTHING;
INSERT INTO public.attendance (id, student_id, session_date, period, status, remarks)
VALUES ('c93b9f5b-b9f1-4f62-b17c-b288cef6f75e', '82bf37fc-0077-4756-b27a-b23dd1d6ceaa', '2025-08-11', 'full_day', 'late', 'Morning roll call record')
ON CONFLICT (student_id, session_date, period) DO NOTHING;
INSERT INTO public.attendance (id, student_id, session_date, period, status, remarks)
VALUES ('42a8a5ef-b6f1-4d63-a93d-ce6808ad9c24', '82bf37fc-0077-4756-b27a-b23dd1d6ceaa', '2025-08-12', 'full_day', 'present', NULL)
ON CONFLICT (student_id, session_date, period) DO NOTHING;
INSERT INTO public.attendance (id, student_id, session_date, period, status, remarks)
VALUES ('3834c9b9-7477-4162-b2c4-fb774c746785', '82bf37fc-0077-4756-b27a-b23dd1d6ceaa', '2025-08-13', 'full_day', 'present', NULL)
ON CONFLICT (student_id, session_date, period) DO NOTHING;
INSERT INTO public.attendance (id, student_id, session_date, period, status, remarks)
VALUES ('ed29767a-ad86-45e0-9ed6-075ca4d149b9', '82bf37fc-0077-4756-b27a-b23dd1d6ceaa', '2025-08-14', 'full_day', 'late', 'Morning roll call record')
ON CONFLICT (student_id, session_date, period) DO NOTHING;
INSERT INTO public.attendance (id, student_id, session_date, period, status, remarks)
VALUES ('4e984a96-fbb0-4435-8b4b-fe4947f38d3f', '82bf37fc-0077-4756-b27a-b23dd1d6ceaa', '2025-08-15', 'full_day', 'absent', 'Morning roll call record')
ON CONFLICT (student_id, session_date, period) DO NOTHING;
INSERT INTO public.attendance (id, student_id, session_date, period, status, remarks)
VALUES ('ce610858-4160-4bb2-8900-2eb88ce153e5', '82bf37fc-0077-4756-b27a-b23dd1d6ceaa', '2025-08-18', 'full_day', 'present', NULL)
ON CONFLICT (student_id, session_date, period) DO NOTHING;
INSERT INTO public.attendance (id, student_id, session_date, period, status, remarks)
VALUES ('d6ed0644-6714-4ec1-97c2-5e8516676ee9', '82bf37fc-0077-4756-b27a-b23dd1d6ceaa', '2025-08-19', 'full_day', 'present', NULL)
ON CONFLICT (student_id, session_date, period) DO NOTHING;
INSERT INTO public.attendance (id, student_id, session_date, period, status, remarks)
VALUES ('d6f5c66f-99b0-495a-b36b-98130e3bf619', '82bf37fc-0077-4756-b27a-b23dd1d6ceaa', '2025-08-20', 'full_day', 'present', NULL)
ON CONFLICT (student_id, session_date, period) DO NOTHING;
INSERT INTO public.attendance (id, student_id, session_date, period, status, remarks)
VALUES ('ac0ce4cd-766b-4dad-8b97-826a67cb7b11', '82bf37fc-0077-4756-b27a-b23dd1d6ceaa', '2025-08-21', 'full_day', 'present', NULL)
ON CONFLICT (student_id, session_date, period) DO NOTHING;
INSERT INTO public.attendance (id, student_id, session_date, period, status, remarks)
VALUES ('608f9591-8c09-48b1-a5b5-8283fb48e867', '82bf37fc-0077-4756-b27a-b23dd1d6ceaa', '2025-08-22', 'full_day', 'present', NULL)
ON CONFLICT (student_id, session_date, period) DO NOTHING;
INSERT INTO public.attendance (id, student_id, session_date, period, status, remarks)
VALUES ('5343bcd5-9edf-4205-8e00-44ea8400a76a', '82bf37fc-0077-4756-b27a-b23dd1d6ceaa', '2025-08-25', 'full_day', 'present', NULL)
ON CONFLICT (student_id, session_date, period) DO NOTHING;
INSERT INTO public.attendance (id, student_id, session_date, period, status, remarks)
VALUES ('c4437c24-909f-4a75-b6c7-428966aa6a8f', '82bf37fc-0077-4756-b27a-b23dd1d6ceaa', '2025-08-26', 'full_day', 'late', 'Morning roll call record')
ON CONFLICT (student_id, session_date, period) DO NOTHING;
INSERT INTO public.attendance (id, student_id, session_date, period, status, remarks)
VALUES ('e42d2a85-3355-43d3-bc4a-86212cf3bcfe', '82bf37fc-0077-4756-b27a-b23dd1d6ceaa', '2025-08-27', 'full_day', 'present', NULL)
ON CONFLICT (student_id, session_date, period) DO NOTHING;
INSERT INTO public.attendance (id, student_id, session_date, period, status, remarks)
VALUES ('6162bdef-795b-46c2-ad86-220e4026ce88', '82bf37fc-0077-4756-b27a-b23dd1d6ceaa', '2025-08-28', 'full_day', 'present', NULL)
ON CONFLICT (student_id, session_date, period) DO NOTHING;
INSERT INTO public.attendance (id, student_id, session_date, period, status, remarks)
VALUES ('3f94de10-415c-49f2-b0b9-065c4921c688', '82bf37fc-0077-4756-b27a-b23dd1d6ceaa', '2025-08-29', 'full_day', 'present', NULL)
ON CONFLICT (student_id, session_date, period) DO NOTHING;
INSERT INTO public.attendance (id, student_id, session_date, period, status, remarks)
VALUES ('479b97b0-6796-44fe-9678-7542a4c180e5', 'cc13ac1f-cca4-4600-8dd7-f49f124c855d', '2025-08-01', 'full_day', 'present', NULL)
ON CONFLICT (student_id, session_date, period) DO NOTHING;
INSERT INTO public.attendance (id, student_id, session_date, period, status, remarks)
VALUES ('42b2e3c7-8ec4-4793-89b3-f64e52dbf6e5', 'cc13ac1f-cca4-4600-8dd7-f49f124c855d', '2025-08-04', 'full_day', 'present', NULL)
ON CONFLICT (student_id, session_date, period) DO NOTHING;
INSERT INTO public.attendance (id, student_id, session_date, period, status, remarks)
VALUES ('a099ba46-f87e-4d05-943f-c5e374d9326a', 'cc13ac1f-cca4-4600-8dd7-f49f124c855d', '2025-08-05', 'full_day', 'present', NULL)
ON CONFLICT (student_id, session_date, period) DO NOTHING;
INSERT INTO public.attendance (id, student_id, session_date, period, status, remarks)
VALUES ('36780dd6-c8c3-43fe-af65-8f8ec8052c93', 'cc13ac1f-cca4-4600-8dd7-f49f124c855d', '2025-08-06', 'full_day', 'present', NULL)
ON CONFLICT (student_id, session_date, period) DO NOTHING;
INSERT INTO public.attendance (id, student_id, session_date, period, status, remarks)
VALUES ('1b8760d7-0c60-42c1-9a4b-9adb1151fc93', 'cc13ac1f-cca4-4600-8dd7-f49f124c855d', '2025-08-07', 'full_day', 'present', NULL)
ON CONFLICT (student_id, session_date, period) DO NOTHING;
INSERT INTO public.attendance (id, student_id, session_date, period, status, remarks)
VALUES ('786e4e1c-8aa3-4e7c-96e7-6cf30eb8b5a9', 'cc13ac1f-cca4-4600-8dd7-f49f124c855d', '2025-08-08', 'full_day', 'present', NULL)
ON CONFLICT (student_id, session_date, period) DO NOTHING;
INSERT INTO public.attendance (id, student_id, session_date, period, status, remarks)
VALUES ('92cb65e0-dbce-4665-8b15-d0db553404a4', 'cc13ac1f-cca4-4600-8dd7-f49f124c855d', '2025-08-11', 'full_day', 'late', 'Morning roll call record')
ON CONFLICT (student_id, session_date, period) DO NOTHING;
INSERT INTO public.attendance (id, student_id, session_date, period, status, remarks)
VALUES ('7104e5dd-ba5a-4629-9bb3-1858ea2b3f60', 'cc13ac1f-cca4-4600-8dd7-f49f124c855d', '2025-08-12', 'full_day', 'present', NULL)
ON CONFLICT (student_id, session_date, period) DO NOTHING;
INSERT INTO public.attendance (id, student_id, session_date, period, status, remarks)
VALUES ('05e94602-a6be-4b1b-ad33-7ce398c18751', 'cc13ac1f-cca4-4600-8dd7-f49f124c855d', '2025-08-13', 'full_day', 'present', NULL)
ON CONFLICT (student_id, session_date, period) DO NOTHING;
INSERT INTO public.attendance (id, student_id, session_date, period, status, remarks)
VALUES ('bdf5a1fa-9b97-4ccb-b6f2-1f1be3330989', 'cc13ac1f-cca4-4600-8dd7-f49f124c855d', '2025-08-14', 'full_day', 'present', NULL)
ON CONFLICT (student_id, session_date, period) DO NOTHING;
INSERT INTO public.attendance (id, student_id, session_date, period, status, remarks)
VALUES ('f07aca86-72cb-4a50-bc63-d98572efda11', 'cc13ac1f-cca4-4600-8dd7-f49f124c855d', '2025-08-15', 'full_day', 'present', NULL)
ON CONFLICT (student_id, session_date, period) DO NOTHING;
INSERT INTO public.attendance (id, student_id, session_date, period, status, remarks)
VALUES ('f1f8a04c-fc52-40c6-9e58-6f3d1af69ab4', 'cc13ac1f-cca4-4600-8dd7-f49f124c855d', '2025-08-18', 'full_day', 'present', NULL)
ON CONFLICT (student_id, session_date, period) DO NOTHING;
INSERT INTO public.attendance (id, student_id, session_date, period, status, remarks)
VALUES ('00831900-90c3-45a1-82af-2c4d055b3555', 'cc13ac1f-cca4-4600-8dd7-f49f124c855d', '2025-08-19', 'full_day', 'excused', 'Morning roll call record')
ON CONFLICT (student_id, session_date, period) DO NOTHING;
INSERT INTO public.attendance (id, student_id, session_date, period, status, remarks)
VALUES ('989cf476-9625-451a-a299-2ec0f3a9fc78', 'cc13ac1f-cca4-4600-8dd7-f49f124c855d', '2025-08-20', 'full_day', 'present', NULL)
ON CONFLICT (student_id, session_date, period) DO NOTHING;
INSERT INTO public.attendance (id, student_id, session_date, period, status, remarks)
VALUES ('e7c79f88-ce36-4f16-9d78-efdea48dd2b8', 'cc13ac1f-cca4-4600-8dd7-f49f124c855d', '2025-08-21', 'full_day', 'present', NULL)
ON CONFLICT (student_id, session_date, period) DO NOTHING;
INSERT INTO public.attendance (id, student_id, session_date, period, status, remarks)
VALUES ('e641fef6-c031-42d9-95e9-6907d3665ef6', 'cc13ac1f-cca4-4600-8dd7-f49f124c855d', '2025-08-22', 'full_day', 'late', 'Morning roll call record')
ON CONFLICT (student_id, session_date, period) DO NOTHING;
INSERT INTO public.attendance (id, student_id, session_date, period, status, remarks)
VALUES ('1610f5e4-146a-4531-82b3-dff15773a509', 'cc13ac1f-cca4-4600-8dd7-f49f124c855d', '2025-08-25', 'full_day', 'late', 'Morning roll call record')
ON CONFLICT (student_id, session_date, period) DO NOTHING;
INSERT INTO public.attendance (id, student_id, session_date, period, status, remarks)
VALUES ('d6b08e95-3ed8-4c30-a999-de7934122efe', 'cc13ac1f-cca4-4600-8dd7-f49f124c855d', '2025-08-26', 'full_day', 'late', 'Morning roll call record')
ON CONFLICT (student_id, session_date, period) DO NOTHING;
INSERT INTO public.attendance (id, student_id, session_date, period, status, remarks)
VALUES ('83fc1f02-2370-4a52-a90e-c568e0fa498e', 'cc13ac1f-cca4-4600-8dd7-f49f124c855d', '2025-08-27', 'full_day', 'present', NULL)
ON CONFLICT (student_id, session_date, period) DO NOTHING;
INSERT INTO public.attendance (id, student_id, session_date, period, status, remarks)
VALUES ('91ca4eb7-feea-4d84-921c-32126c742e61', 'cc13ac1f-cca4-4600-8dd7-f49f124c855d', '2025-08-28', 'full_day', 'present', NULL)
ON CONFLICT (student_id, session_date, period) DO NOTHING;
INSERT INTO public.attendance (id, student_id, session_date, period, status, remarks)
VALUES ('425ff84f-a7cb-4b58-aaa8-bebb1772120c', 'cc13ac1f-cca4-4600-8dd7-f49f124c855d', '2025-08-29', 'full_day', 'present', NULL)
ON CONFLICT (student_id, session_date, period) DO NOTHING;
INSERT INTO public.attendance (id, student_id, session_date, period, status, remarks)
VALUES ('b5cdd242-f7d6-4456-8e9c-1d9cfc437a39', '338719c7-39d7-4471-919b-13bd4ab61261', '2025-08-01', 'full_day', 'present', NULL)
ON CONFLICT (student_id, session_date, period) DO NOTHING;
INSERT INTO public.attendance (id, student_id, session_date, period, status, remarks)
VALUES ('2b933a76-f573-4c19-8ce2-24ac15271e5f', '338719c7-39d7-4471-919b-13bd4ab61261', '2025-08-04', 'full_day', 'present', NULL)
ON CONFLICT (student_id, session_date, period) DO NOTHING;
INSERT INTO public.attendance (id, student_id, session_date, period, status, remarks)
VALUES ('864e8ffb-bb01-4b81-969c-e95bc0c87eff', '338719c7-39d7-4471-919b-13bd4ab61261', '2025-08-05', 'full_day', 'present', NULL)
ON CONFLICT (student_id, session_date, period) DO NOTHING;
INSERT INTO public.attendance (id, student_id, session_date, period, status, remarks)
VALUES ('9761e943-c0a2-4d79-80fa-e8e1ec79628a', '338719c7-39d7-4471-919b-13bd4ab61261', '2025-08-06', 'full_day', 'present', NULL)
ON CONFLICT (student_id, session_date, period) DO NOTHING;
INSERT INTO public.attendance (id, student_id, session_date, period, status, remarks)
VALUES ('91bca757-c353-4160-b896-4d81e41013a9', '338719c7-39d7-4471-919b-13bd4ab61261', '2025-08-07', 'full_day', 'present', NULL)
ON CONFLICT (student_id, session_date, period) DO NOTHING;
INSERT INTO public.attendance (id, student_id, session_date, period, status, remarks)
VALUES ('c6d21d60-f498-4ff3-9eac-290873a11d6a', '338719c7-39d7-4471-919b-13bd4ab61261', '2025-08-08', 'full_day', 'present', NULL)
ON CONFLICT (student_id, session_date, period) DO NOTHING;
INSERT INTO public.attendance (id, student_id, session_date, period, status, remarks)
VALUES ('8ee455c8-ec11-4866-9e6e-8ba9ef145f21', '338719c7-39d7-4471-919b-13bd4ab61261', '2025-08-11', 'full_day', 'present', NULL)
ON CONFLICT (student_id, session_date, period) DO NOTHING;
INSERT INTO public.attendance (id, student_id, session_date, period, status, remarks)
VALUES ('649566f9-a409-4e24-b7dc-7fb78486481b', '338719c7-39d7-4471-919b-13bd4ab61261', '2025-08-12', 'full_day', 'present', NULL)
ON CONFLICT (student_id, session_date, period) DO NOTHING;
INSERT INTO public.attendance (id, student_id, session_date, period, status, remarks)
VALUES ('1ef2619d-9425-4550-b039-7ab2029e3c0b', '338719c7-39d7-4471-919b-13bd4ab61261', '2025-08-13', 'full_day', 'present', NULL)
ON CONFLICT (student_id, session_date, period) DO NOTHING;
INSERT INTO public.attendance (id, student_id, session_date, period, status, remarks)
VALUES ('15d4bd7d-7980-42b5-87ad-69cc020b7068', '338719c7-39d7-4471-919b-13bd4ab61261', '2025-08-14', 'full_day', 'present', NULL)
ON CONFLICT (student_id, session_date, period) DO NOTHING;
INSERT INTO public.attendance (id, student_id, session_date, period, status, remarks)
VALUES ('f290a073-9bd8-4144-a6b6-4d107506357e', '338719c7-39d7-4471-919b-13bd4ab61261', '2025-08-15', 'full_day', 'present', NULL)
ON CONFLICT (student_id, session_date, period) DO NOTHING;
INSERT INTO public.attendance (id, student_id, session_date, period, status, remarks)
VALUES ('ee362e7f-3fb7-42eb-b9a3-d7cfcc59731a', '338719c7-39d7-4471-919b-13bd4ab61261', '2025-08-18', 'full_day', 'present', NULL)
ON CONFLICT (student_id, session_date, period) DO NOTHING;
INSERT INTO public.attendance (id, student_id, session_date, period, status, remarks)
VALUES ('74b453cd-cc91-416d-893f-c4e75a8d1679', '338719c7-39d7-4471-919b-13bd4ab61261', '2025-08-19', 'full_day', 'present', NULL)
ON CONFLICT (student_id, session_date, period) DO NOTHING;
INSERT INTO public.attendance (id, student_id, session_date, period, status, remarks)
VALUES ('81057718-fe34-45d8-bc47-22860bd38ea3', '338719c7-39d7-4471-919b-13bd4ab61261', '2025-08-20', 'full_day', 'present', NULL)
ON CONFLICT (student_id, session_date, period) DO NOTHING;
INSERT INTO public.attendance (id, student_id, session_date, period, status, remarks)
VALUES ('af2824fd-139b-4ca7-9d1d-6e7a7f56ae00', '338719c7-39d7-4471-919b-13bd4ab61261', '2025-08-21', 'full_day', 'present', NULL)
ON CONFLICT (student_id, session_date, period) DO NOTHING;
INSERT INTO public.attendance (id, student_id, session_date, period, status, remarks)
VALUES ('d9d7d271-dd94-47f7-b529-c73077e93acd', '338719c7-39d7-4471-919b-13bd4ab61261', '2025-08-22', 'full_day', 'present', NULL)
ON CONFLICT (student_id, session_date, period) DO NOTHING;
INSERT INTO public.attendance (id, student_id, session_date, period, status, remarks)
VALUES ('1482d5ca-5f49-486e-a085-edb668e76f01', '338719c7-39d7-4471-919b-13bd4ab61261', '2025-08-25', 'full_day', 'present', NULL)
ON CONFLICT (student_id, session_date, period) DO NOTHING;
INSERT INTO public.attendance (id, student_id, session_date, period, status, remarks)
VALUES ('c83cb918-a062-4657-9968-62b670882089', '338719c7-39d7-4471-919b-13bd4ab61261', '2025-08-26', 'full_day', 'present', NULL)
ON CONFLICT (student_id, session_date, period) DO NOTHING;
INSERT INTO public.attendance (id, student_id, session_date, period, status, remarks)
VALUES ('e35850d2-03ee-4a79-9022-4153c3bff11a', '338719c7-39d7-4471-919b-13bd4ab61261', '2025-08-27', 'full_day', 'present', NULL)
ON CONFLICT (student_id, session_date, period) DO NOTHING;
INSERT INTO public.attendance (id, student_id, session_date, period, status, remarks)
VALUES ('41a87dac-4d0b-4edf-85c1-5f8bc84550f7', '338719c7-39d7-4471-919b-13bd4ab61261', '2025-08-28', 'full_day', 'present', NULL)
ON CONFLICT (student_id, session_date, period) DO NOTHING;
INSERT INTO public.attendance (id, student_id, session_date, period, status, remarks)
VALUES ('eb062d53-0590-4c60-80c2-277261c37423', '338719c7-39d7-4471-919b-13bd4ab61261', '2025-08-29', 'full_day', 'present', NULL)
ON CONFLICT (student_id, session_date, period) DO NOTHING;
INSERT INTO public.attendance (id, student_id, session_date, period, status, remarks)
VALUES ('1f28b30b-2cb7-4c7b-8eed-b1b97246632e', '6c1c4728-a4f1-4c03-bebb-a55afe559ac5', '2025-08-01', 'full_day', 'present', NULL)
ON CONFLICT (student_id, session_date, period) DO NOTHING;
INSERT INTO public.attendance (id, student_id, session_date, period, status, remarks)
VALUES ('e04fab9c-da58-4f26-8bd1-5192d3d033dd', '6c1c4728-a4f1-4c03-bebb-a55afe559ac5', '2025-08-04', 'full_day', 'excused', 'Morning roll call record')
ON CONFLICT (student_id, session_date, period) DO NOTHING;
INSERT INTO public.attendance (id, student_id, session_date, period, status, remarks)
VALUES ('0c37dfbe-29c2-4468-964c-e3f053b5f162', '6c1c4728-a4f1-4c03-bebb-a55afe559ac5', '2025-08-05', 'full_day', 'late', 'Morning roll call record')
ON CONFLICT (student_id, session_date, period) DO NOTHING;
INSERT INTO public.attendance (id, student_id, session_date, period, status, remarks)
VALUES ('bdf2d31a-6565-4e7f-9e51-630a5fe7874e', '6c1c4728-a4f1-4c03-bebb-a55afe559ac5', '2025-08-06', 'full_day', 'present', NULL)
ON CONFLICT (student_id, session_date, period) DO NOTHING;
INSERT INTO public.attendance (id, student_id, session_date, period, status, remarks)
VALUES ('6500bae0-8035-4775-bb91-620efee400ea', '6c1c4728-a4f1-4c03-bebb-a55afe559ac5', '2025-08-07', 'full_day', 'late', 'Morning roll call record')
ON CONFLICT (student_id, session_date, period) DO NOTHING;
INSERT INTO public.attendance (id, student_id, session_date, period, status, remarks)
VALUES ('d3e9c023-c988-4329-8310-46cd1ac8bf36', '6c1c4728-a4f1-4c03-bebb-a55afe559ac5', '2025-08-08', 'full_day', 'present', NULL)
ON CONFLICT (student_id, session_date, period) DO NOTHING;
INSERT INTO public.attendance (id, student_id, session_date, period, status, remarks)
VALUES ('f0ed684d-8fb5-47ae-aec7-167174cd6cd5', '6c1c4728-a4f1-4c03-bebb-a55afe559ac5', '2025-08-11', 'full_day', 'present', NULL)
ON CONFLICT (student_id, session_date, period) DO NOTHING;
INSERT INTO public.attendance (id, student_id, session_date, period, status, remarks)
VALUES ('44953b54-9a0e-4778-b8ba-74c79a311551', '6c1c4728-a4f1-4c03-bebb-a55afe559ac5', '2025-08-12', 'full_day', 'present', NULL)
ON CONFLICT (student_id, session_date, period) DO NOTHING;
INSERT INTO public.attendance (id, student_id, session_date, period, status, remarks)
VALUES ('0fc4ac14-fa31-4341-be4a-f68188966cf4', '6c1c4728-a4f1-4c03-bebb-a55afe559ac5', '2025-08-13', 'full_day', 'present', NULL)
ON CONFLICT (student_id, session_date, period) DO NOTHING;
INSERT INTO public.attendance (id, student_id, session_date, period, status, remarks)
VALUES ('c95ab62e-f661-4674-bd99-e985f9cad57b', '6c1c4728-a4f1-4c03-bebb-a55afe559ac5', '2025-08-14', 'full_day', 'absent', 'Morning roll call record')
ON CONFLICT (student_id, session_date, period) DO NOTHING;
INSERT INTO public.attendance (id, student_id, session_date, period, status, remarks)
VALUES ('31dd5f06-f683-40fc-afa9-d2c3d53eda1a', '6c1c4728-a4f1-4c03-bebb-a55afe559ac5', '2025-08-15', 'full_day', 'present', NULL)
ON CONFLICT (student_id, session_date, period) DO NOTHING;
INSERT INTO public.attendance (id, student_id, session_date, period, status, remarks)
VALUES ('b5920b6c-d57d-4c45-a70a-5f7ab8089240', '6c1c4728-a4f1-4c03-bebb-a55afe559ac5', '2025-08-18', 'full_day', 'present', NULL)
ON CONFLICT (student_id, session_date, period) DO NOTHING;
INSERT INTO public.attendance (id, student_id, session_date, period, status, remarks)
VALUES ('82beb81f-31ec-4527-82a9-b13843ad44e5', '6c1c4728-a4f1-4c03-bebb-a55afe559ac5', '2025-08-19', 'full_day', 'excused', 'Morning roll call record')
ON CONFLICT (student_id, session_date, period) DO NOTHING;
INSERT INTO public.attendance (id, student_id, session_date, period, status, remarks)
VALUES ('76d84a18-b2a7-4011-b75f-3c6f217b7327', '6c1c4728-a4f1-4c03-bebb-a55afe559ac5', '2025-08-20', 'full_day', 'present', NULL)
ON CONFLICT (student_id, session_date, period) DO NOTHING;
INSERT INTO public.attendance (id, student_id, session_date, period, status, remarks)
VALUES ('4fb24e7a-9384-415c-8491-35a624cb0283', '6c1c4728-a4f1-4c03-bebb-a55afe559ac5', '2025-08-21', 'full_day', 'present', NULL)
ON CONFLICT (student_id, session_date, period) DO NOTHING;
INSERT INTO public.attendance (id, student_id, session_date, period, status, remarks)
VALUES ('e74798aa-a16a-4a50-9284-16968c6a66ba', '6c1c4728-a4f1-4c03-bebb-a55afe559ac5', '2025-08-22', 'full_day', 'present', NULL)
ON CONFLICT (student_id, session_date, period) DO NOTHING;
INSERT INTO public.attendance (id, student_id, session_date, period, status, remarks)
VALUES ('3fe57dba-2df5-4851-bc41-0f216a3dc814', '6c1c4728-a4f1-4c03-bebb-a55afe559ac5', '2025-08-25', 'full_day', 'present', NULL)
ON CONFLICT (student_id, session_date, period) DO NOTHING;
INSERT INTO public.attendance (id, student_id, session_date, period, status, remarks)
VALUES ('69283c6d-432b-4e68-9d23-8d1ef80d446b', '6c1c4728-a4f1-4c03-bebb-a55afe559ac5', '2025-08-26', 'full_day', 'present', NULL)
ON CONFLICT (student_id, session_date, period) DO NOTHING;
INSERT INTO public.attendance (id, student_id, session_date, period, status, remarks)
VALUES ('d5c41c5b-68c4-4b11-9629-2f27a3dff20c', '6c1c4728-a4f1-4c03-bebb-a55afe559ac5', '2025-08-27', 'full_day', 'present', NULL)
ON CONFLICT (student_id, session_date, period) DO NOTHING;
INSERT INTO public.attendance (id, student_id, session_date, period, status, remarks)
VALUES ('3d6a424c-e0ca-41fd-bf60-b102eb4b9065', '6c1c4728-a4f1-4c03-bebb-a55afe559ac5', '2025-08-28', 'full_day', 'present', NULL)
ON CONFLICT (student_id, session_date, period) DO NOTHING;
INSERT INTO public.attendance (id, student_id, session_date, period, status, remarks)
VALUES ('68d322b9-8ce1-488f-aed8-97922a116559', '6c1c4728-a4f1-4c03-bebb-a55afe559ac5', '2025-08-29', 'full_day', 'present', NULL)
ON CONFLICT (student_id, session_date, period) DO NOTHING;
INSERT INTO public.attendance (id, student_id, session_date, period, status, remarks)
VALUES ('9c424a15-71ce-4ec8-98b4-0484696c1500', '71149234-66ac-4fba-be76-07ea55d85ae9', '2025-08-01', 'full_day', 'present', NULL)
ON CONFLICT (student_id, session_date, period) DO NOTHING;
INSERT INTO public.attendance (id, student_id, session_date, period, status, remarks)
VALUES ('20e4b646-4d57-4991-b2f0-0bb9ff5ab4f4', '71149234-66ac-4fba-be76-07ea55d85ae9', '2025-08-04', 'full_day', 'present', NULL)
ON CONFLICT (student_id, session_date, period) DO NOTHING;
INSERT INTO public.attendance (id, student_id, session_date, period, status, remarks)
VALUES ('6b718130-6566-439b-9335-15629f528361', '71149234-66ac-4fba-be76-07ea55d85ae9', '2025-08-05', 'full_day', 'present', NULL)
ON CONFLICT (student_id, session_date, period) DO NOTHING;
INSERT INTO public.attendance (id, student_id, session_date, period, status, remarks)
VALUES ('6b15e8d8-e400-4a36-8696-b61a781be459', '71149234-66ac-4fba-be76-07ea55d85ae9', '2025-08-06', 'full_day', 'present', NULL)
ON CONFLICT (student_id, session_date, period) DO NOTHING;
INSERT INTO public.attendance (id, student_id, session_date, period, status, remarks)
VALUES ('3ac0bb11-7bab-408f-80fa-9100e117c17e', '71149234-66ac-4fba-be76-07ea55d85ae9', '2025-08-07', 'full_day', 'absent', 'Morning roll call record')
ON CONFLICT (student_id, session_date, period) DO NOTHING;
INSERT INTO public.attendance (id, student_id, session_date, period, status, remarks)
VALUES ('7f1c5d5f-f242-487d-938e-4857027bc1d7', '71149234-66ac-4fba-be76-07ea55d85ae9', '2025-08-08', 'full_day', 'present', NULL)
ON CONFLICT (student_id, session_date, period) DO NOTHING;
INSERT INTO public.attendance (id, student_id, session_date, period, status, remarks)
VALUES ('6beed95d-2036-496e-b2b2-a2b693a76221', '71149234-66ac-4fba-be76-07ea55d85ae9', '2025-08-11', 'full_day', 'present', NULL)
ON CONFLICT (student_id, session_date, period) DO NOTHING;
INSERT INTO public.attendance (id, student_id, session_date, period, status, remarks)
VALUES ('43174681-6d14-45bf-a102-6558912802bf', '71149234-66ac-4fba-be76-07ea55d85ae9', '2025-08-12', 'full_day', 'present', NULL)
ON CONFLICT (student_id, session_date, period) DO NOTHING;
INSERT INTO public.attendance (id, student_id, session_date, period, status, remarks)
VALUES ('b2306632-55df-4359-a7d0-c841ed48c42c', '71149234-66ac-4fba-be76-07ea55d85ae9', '2025-08-13', 'full_day', 'present', NULL)
ON CONFLICT (student_id, session_date, period) DO NOTHING;
INSERT INTO public.attendance (id, student_id, session_date, period, status, remarks)
VALUES ('bb307a64-7c37-48a9-86ac-c7b04065d561', '71149234-66ac-4fba-be76-07ea55d85ae9', '2025-08-14', 'full_day', 'present', NULL)
ON CONFLICT (student_id, session_date, period) DO NOTHING;
INSERT INTO public.attendance (id, student_id, session_date, period, status, remarks)
VALUES ('9036a355-ad6d-4b63-b087-bdb844a7c909', '71149234-66ac-4fba-be76-07ea55d85ae9', '2025-08-15', 'full_day', 'present', NULL)
ON CONFLICT (student_id, session_date, period) DO NOTHING;
INSERT INTO public.attendance (id, student_id, session_date, period, status, remarks)
VALUES ('55c2ccc7-2ba2-4fa8-871f-bd8a1eb2fad1', '71149234-66ac-4fba-be76-07ea55d85ae9', '2025-08-18', 'full_day', 'present', NULL)
ON CONFLICT (student_id, session_date, period) DO NOTHING;
INSERT INTO public.attendance (id, student_id, session_date, period, status, remarks)
VALUES ('9536bd08-93a5-437a-89fb-cf7bfbced22e', '71149234-66ac-4fba-be76-07ea55d85ae9', '2025-08-19', 'full_day', 'present', NULL)
ON CONFLICT (student_id, session_date, period) DO NOTHING;
INSERT INTO public.attendance (id, student_id, session_date, period, status, remarks)
VALUES ('1d250894-2d2c-4aa0-ba05-0509bf31c0f1', '71149234-66ac-4fba-be76-07ea55d85ae9', '2025-08-20', 'full_day', 'present', NULL)
ON CONFLICT (student_id, session_date, period) DO NOTHING;
INSERT INTO public.attendance (id, student_id, session_date, period, status, remarks)
VALUES ('60ce50e9-317f-4a26-849f-e74a6cef5f73', '71149234-66ac-4fba-be76-07ea55d85ae9', '2025-08-21', 'full_day', 'present', NULL)
ON CONFLICT (student_id, session_date, period) DO NOTHING;
INSERT INTO public.attendance (id, student_id, session_date, period, status, remarks)
VALUES ('55f57688-d599-49a1-bb53-179f16426b9b', '71149234-66ac-4fba-be76-07ea55d85ae9', '2025-08-22', 'full_day', 'present', NULL)
ON CONFLICT (student_id, session_date, period) DO NOTHING;
INSERT INTO public.attendance (id, student_id, session_date, period, status, remarks)
VALUES ('cd7c2386-d02b-4a8b-835b-5b6523f2948e', '71149234-66ac-4fba-be76-07ea55d85ae9', '2025-08-25', 'full_day', 'present', NULL)
ON CONFLICT (student_id, session_date, period) DO NOTHING;
INSERT INTO public.attendance (id, student_id, session_date, period, status, remarks)
VALUES ('4bb23b28-6137-444c-9939-4900635ceee8', '71149234-66ac-4fba-be76-07ea55d85ae9', '2025-08-26', 'full_day', 'present', NULL)
ON CONFLICT (student_id, session_date, period) DO NOTHING;
INSERT INTO public.attendance (id, student_id, session_date, period, status, remarks)
VALUES ('900466f2-f826-4869-b44e-77a3ef48da97', '71149234-66ac-4fba-be76-07ea55d85ae9', '2025-08-27', 'full_day', 'present', NULL)
ON CONFLICT (student_id, session_date, period) DO NOTHING;
INSERT INTO public.attendance (id, student_id, session_date, period, status, remarks)
VALUES ('f6a9ac23-83c5-4538-86c8-fdfbc9fb4fd9', '71149234-66ac-4fba-be76-07ea55d85ae9', '2025-08-28', 'full_day', 'present', NULL)
ON CONFLICT (student_id, session_date, period) DO NOTHING;
INSERT INTO public.attendance (id, student_id, session_date, period, status, remarks)
VALUES ('4cc03b86-2d1e-440d-a2bf-e1c1358f7bc3', '71149234-66ac-4fba-be76-07ea55d85ae9', '2025-08-29', 'full_day', 'present', NULL)
ON CONFLICT (student_id, session_date, period) DO NOTHING;
INSERT INTO public.attendance (id, student_id, session_date, period, status, remarks)
VALUES ('6d87f942-b6b2-44f5-afd4-7a911ad4b62c', 'b2b2a424-b2a2-4cd8-8261-fa53cd7c6397', '2025-08-01', 'full_day', 'present', NULL)
ON CONFLICT (student_id, session_date, period) DO NOTHING;
INSERT INTO public.attendance (id, student_id, session_date, period, status, remarks)
VALUES ('b779e1be-4ad4-40ab-bbef-cc98f4954bf4', 'b2b2a424-b2a2-4cd8-8261-fa53cd7c6397', '2025-08-04', 'full_day', 'present', NULL)
ON CONFLICT (student_id, session_date, period) DO NOTHING;
INSERT INTO public.attendance (id, student_id, session_date, period, status, remarks)
VALUES ('26b8959c-71b3-4986-8a01-0beda75521c8', 'b2b2a424-b2a2-4cd8-8261-fa53cd7c6397', '2025-08-05', 'full_day', 'present', NULL)
ON CONFLICT (student_id, session_date, period) DO NOTHING;
INSERT INTO public.attendance (id, student_id, session_date, period, status, remarks)
VALUES ('23111183-e2ae-4256-917c-6ff51b9d4a35', 'b2b2a424-b2a2-4cd8-8261-fa53cd7c6397', '2025-08-06', 'full_day', 'present', NULL)
ON CONFLICT (student_id, session_date, period) DO NOTHING;
INSERT INTO public.attendance (id, student_id, session_date, period, status, remarks)
VALUES ('618be609-5f02-4959-b7e2-3c46f4b3e3a6', 'b2b2a424-b2a2-4cd8-8261-fa53cd7c6397', '2025-08-07', 'full_day', 'present', NULL)
ON CONFLICT (student_id, session_date, period) DO NOTHING;
INSERT INTO public.attendance (id, student_id, session_date, period, status, remarks)
VALUES ('04ee6fa3-2e5e-4b80-9998-689851e58404', 'b2b2a424-b2a2-4cd8-8261-fa53cd7c6397', '2025-08-08', 'full_day', 'present', NULL)
ON CONFLICT (student_id, session_date, period) DO NOTHING;
INSERT INTO public.attendance (id, student_id, session_date, period, status, remarks)
VALUES ('89e1c732-b492-4a93-a94c-5270a247350f', 'b2b2a424-b2a2-4cd8-8261-fa53cd7c6397', '2025-08-11', 'full_day', 'present', NULL)
ON CONFLICT (student_id, session_date, period) DO NOTHING;
INSERT INTO public.attendance (id, student_id, session_date, period, status, remarks)
VALUES ('cdcb15de-d6d7-4dd0-8be2-37c385570a19', 'b2b2a424-b2a2-4cd8-8261-fa53cd7c6397', '2025-08-12', 'full_day', 'present', NULL)
ON CONFLICT (student_id, session_date, period) DO NOTHING;
INSERT INTO public.attendance (id, student_id, session_date, period, status, remarks)
VALUES ('b8540a30-8668-4647-b540-2c63e4e73ac4', 'b2b2a424-b2a2-4cd8-8261-fa53cd7c6397', '2025-08-13', 'full_day', 'present', NULL)
ON CONFLICT (student_id, session_date, period) DO NOTHING;
INSERT INTO public.attendance (id, student_id, session_date, period, status, remarks)
VALUES ('1c94b530-60de-4a0c-ba8a-a00d614fe691', 'b2b2a424-b2a2-4cd8-8261-fa53cd7c6397', '2025-08-14', 'full_day', 'present', NULL)
ON CONFLICT (student_id, session_date, period) DO NOTHING;
INSERT INTO public.attendance (id, student_id, session_date, period, status, remarks)
VALUES ('1bd7f885-a3c8-41ea-bdeb-58657208b6c1', 'b2b2a424-b2a2-4cd8-8261-fa53cd7c6397', '2025-08-15', 'full_day', 'present', NULL)
ON CONFLICT (student_id, session_date, period) DO NOTHING;
INSERT INTO public.attendance (id, student_id, session_date, period, status, remarks)
VALUES ('21e91179-0491-4798-a4e0-cf32bd9e3901', 'b2b2a424-b2a2-4cd8-8261-fa53cd7c6397', '2025-08-18', 'full_day', 'present', NULL)
ON CONFLICT (student_id, session_date, period) DO NOTHING;
INSERT INTO public.attendance (id, student_id, session_date, period, status, remarks)
VALUES ('cbebcba1-94b5-4ac2-a336-9bd99fb3c1f3', 'b2b2a424-b2a2-4cd8-8261-fa53cd7c6397', '2025-08-19', 'full_day', 'present', NULL)
ON CONFLICT (student_id, session_date, period) DO NOTHING;
INSERT INTO public.attendance (id, student_id, session_date, period, status, remarks)
VALUES ('f0b115b2-a645-4df5-ba04-75e41bd7aed9', 'b2b2a424-b2a2-4cd8-8261-fa53cd7c6397', '2025-08-20', 'full_day', 'present', NULL)
ON CONFLICT (student_id, session_date, period) DO NOTHING;
INSERT INTO public.attendance (id, student_id, session_date, period, status, remarks)
VALUES ('10c32467-768c-46ff-bbad-24d12f85bd90', 'b2b2a424-b2a2-4cd8-8261-fa53cd7c6397', '2025-08-21', 'full_day', 'present', NULL)
ON CONFLICT (student_id, session_date, period) DO NOTHING;
INSERT INTO public.attendance (id, student_id, session_date, period, status, remarks)
VALUES ('61c0f32c-f21c-4cd0-9713-3990b1a1c08c', 'b2b2a424-b2a2-4cd8-8261-fa53cd7c6397', '2025-08-22', 'full_day', 'present', NULL)
ON CONFLICT (student_id, session_date, period) DO NOTHING;
INSERT INTO public.attendance (id, student_id, session_date, period, status, remarks)
VALUES ('dcb78d1e-825e-4d86-8ec2-b9b5d3c65c39', 'b2b2a424-b2a2-4cd8-8261-fa53cd7c6397', '2025-08-25', 'full_day', 'present', NULL)
ON CONFLICT (student_id, session_date, period) DO NOTHING;
INSERT INTO public.attendance (id, student_id, session_date, period, status, remarks)
VALUES ('5d61cd48-4156-4d37-b683-4bedbcb76477', 'b2b2a424-b2a2-4cd8-8261-fa53cd7c6397', '2025-08-26', 'full_day', 'present', NULL)
ON CONFLICT (student_id, session_date, period) DO NOTHING;
INSERT INTO public.attendance (id, student_id, session_date, period, status, remarks)
VALUES ('a778b565-7941-45db-97fe-12388c7bf1b0', 'b2b2a424-b2a2-4cd8-8261-fa53cd7c6397', '2025-08-27', 'full_day', 'present', NULL)
ON CONFLICT (student_id, session_date, period) DO NOTHING;
INSERT INTO public.attendance (id, student_id, session_date, period, status, remarks)
VALUES ('1f6ac36c-20cd-4bcc-92cb-1731a701df9e', 'b2b2a424-b2a2-4cd8-8261-fa53cd7c6397', '2025-08-28', 'full_day', 'present', NULL)
ON CONFLICT (student_id, session_date, period) DO NOTHING;
INSERT INTO public.attendance (id, student_id, session_date, period, status, remarks)
VALUES ('62cbc9ac-d988-4a22-a164-6c4b5cea6f77', 'b2b2a424-b2a2-4cd8-8261-fa53cd7c6397', '2025-08-29', 'full_day', 'present', NULL)
ON CONFLICT (student_id, session_date, period) DO NOTHING;
INSERT INTO public.attendance (id, student_id, session_date, period, status, remarks)
VALUES ('50eedc84-d227-4316-a5be-89e5a639ec65', '4e57e01c-8466-4ce3-b1f6-95cc2c119c64', '2025-08-01', 'full_day', 'present', NULL)
ON CONFLICT (student_id, session_date, period) DO NOTHING;
INSERT INTO public.attendance (id, student_id, session_date, period, status, remarks)
VALUES ('99d9f8ed-d1ff-4f8e-bb6e-7051d0765136', '4e57e01c-8466-4ce3-b1f6-95cc2c119c64', '2025-08-04', 'full_day', 'present', NULL)
ON CONFLICT (student_id, session_date, period) DO NOTHING;
INSERT INTO public.attendance (id, student_id, session_date, period, status, remarks)
VALUES ('6ab4a5b7-6b8a-47a3-9d28-013c6f07089c', '4e57e01c-8466-4ce3-b1f6-95cc2c119c64', '2025-08-05', 'full_day', 'present', NULL)
ON CONFLICT (student_id, session_date, period) DO NOTHING;
INSERT INTO public.attendance (id, student_id, session_date, period, status, remarks)
VALUES ('4ed415c8-99d5-4dd4-bab4-a46e6a7d024c', '4e57e01c-8466-4ce3-b1f6-95cc2c119c64', '2025-08-06', 'full_day', 'present', NULL)
ON CONFLICT (student_id, session_date, period) DO NOTHING;
INSERT INTO public.attendance (id, student_id, session_date, period, status, remarks)
VALUES ('72963c8b-19b0-47ba-b1f7-29b42a44a478', '4e57e01c-8466-4ce3-b1f6-95cc2c119c64', '2025-08-07', 'full_day', 'present', NULL)
ON CONFLICT (student_id, session_date, period) DO NOTHING;
INSERT INTO public.attendance (id, student_id, session_date, period, status, remarks)
VALUES ('8b333028-f4ad-45cc-b14f-575cdf3fc8d1', '4e57e01c-8466-4ce3-b1f6-95cc2c119c64', '2025-08-08', 'full_day', 'present', NULL)
ON CONFLICT (student_id, session_date, period) DO NOTHING;
INSERT INTO public.attendance (id, student_id, session_date, period, status, remarks)
VALUES ('eaf109c5-a0e9-4596-bce8-38781a08168f', '4e57e01c-8466-4ce3-b1f6-95cc2c119c64', '2025-08-11', 'full_day', 'present', NULL)
ON CONFLICT (student_id, session_date, period) DO NOTHING;
INSERT INTO public.attendance (id, student_id, session_date, period, status, remarks)
VALUES ('2520111c-5d24-4cd7-a2be-637f74a0a57b', '4e57e01c-8466-4ce3-b1f6-95cc2c119c64', '2025-08-12', 'full_day', 'present', NULL)
ON CONFLICT (student_id, session_date, period) DO NOTHING;
INSERT INTO public.attendance (id, student_id, session_date, period, status, remarks)
VALUES ('2e29d799-d6c3-45ca-87d5-ce34a4de1816', '4e57e01c-8466-4ce3-b1f6-95cc2c119c64', '2025-08-13', 'full_day', 'present', NULL)
ON CONFLICT (student_id, session_date, period) DO NOTHING;
INSERT INTO public.attendance (id, student_id, session_date, period, status, remarks)
VALUES ('d39ed7aa-7ec9-4303-bc12-01567754e50f', '4e57e01c-8466-4ce3-b1f6-95cc2c119c64', '2025-08-14', 'full_day', 'present', NULL)
ON CONFLICT (student_id, session_date, period) DO NOTHING;
INSERT INTO public.attendance (id, student_id, session_date, period, status, remarks)
VALUES ('ab2b69cd-f6ab-4fb8-af6c-c446565e8f87', '4e57e01c-8466-4ce3-b1f6-95cc2c119c64', '2025-08-15', 'full_day', 'late', 'Morning roll call record')
ON CONFLICT (student_id, session_date, period) DO NOTHING;
INSERT INTO public.attendance (id, student_id, session_date, period, status, remarks)
VALUES ('e658cf24-49eb-43dd-b651-452192271a9d', '4e57e01c-8466-4ce3-b1f6-95cc2c119c64', '2025-08-18', 'full_day', 'present', NULL)
ON CONFLICT (student_id, session_date, period) DO NOTHING;
INSERT INTO public.attendance (id, student_id, session_date, period, status, remarks)
VALUES ('468744c7-2668-4aa6-bec9-4f8d0c9a0761', '4e57e01c-8466-4ce3-b1f6-95cc2c119c64', '2025-08-19', 'full_day', 'present', NULL)
ON CONFLICT (student_id, session_date, period) DO NOTHING;
INSERT INTO public.attendance (id, student_id, session_date, period, status, remarks)
VALUES ('4a24ccd5-4e45-4b78-89cb-e1419ea30010', '4e57e01c-8466-4ce3-b1f6-95cc2c119c64', '2025-08-20', 'full_day', 'present', NULL)
ON CONFLICT (student_id, session_date, period) DO NOTHING;
INSERT INTO public.attendance (id, student_id, session_date, period, status, remarks)
VALUES ('50c9aecc-1598-47a7-bee9-0cac46a4c003', '4e57e01c-8466-4ce3-b1f6-95cc2c119c64', '2025-08-21', 'full_day', 'present', NULL)
ON CONFLICT (student_id, session_date, period) DO NOTHING;
INSERT INTO public.attendance (id, student_id, session_date, period, status, remarks)
VALUES ('1756db0a-8e0c-43d0-9601-886c86774202', '4e57e01c-8466-4ce3-b1f6-95cc2c119c64', '2025-08-22', 'full_day', 'present', NULL)
ON CONFLICT (student_id, session_date, period) DO NOTHING;
INSERT INTO public.attendance (id, student_id, session_date, period, status, remarks)
VALUES ('25e6ccf2-be4a-408c-8831-af50f4e53783', '4e57e01c-8466-4ce3-b1f6-95cc2c119c64', '2025-08-25', 'full_day', 'present', NULL)
ON CONFLICT (student_id, session_date, period) DO NOTHING;
INSERT INTO public.attendance (id, student_id, session_date, period, status, remarks)
VALUES ('8fde9d05-215e-4439-8272-55797a5e65e5', '4e57e01c-8466-4ce3-b1f6-95cc2c119c64', '2025-08-26', 'full_day', 'present', NULL)
ON CONFLICT (student_id, session_date, period) DO NOTHING;
INSERT INTO public.attendance (id, student_id, session_date, period, status, remarks)
VALUES ('690c28f9-dd3f-4265-93da-505c3ce6160b', '4e57e01c-8466-4ce3-b1f6-95cc2c119c64', '2025-08-27', 'full_day', 'present', NULL)
ON CONFLICT (student_id, session_date, period) DO NOTHING;
INSERT INTO public.attendance (id, student_id, session_date, period, status, remarks)
VALUES ('1f9c50f0-60d7-4cec-9e53-2356371128e0', '4e57e01c-8466-4ce3-b1f6-95cc2c119c64', '2025-08-28', 'full_day', 'present', NULL)
ON CONFLICT (student_id, session_date, period) DO NOTHING;
INSERT INTO public.attendance (id, student_id, session_date, period, status, remarks)
VALUES ('81718f3a-e841-401f-8993-b60405c2e78c', '4e57e01c-8466-4ce3-b1f6-95cc2c119c64', '2025-08-29', 'full_day', 'late', 'Morning roll call record')
ON CONFLICT (student_id, session_date, period) DO NOTHING;

-- 3. Insert Synthetic Assessment Evaluations
INSERT INTO public.assessments (id, student_id, title, subject, assessment_type, term, assessment_date, score, max_score, weight_percentage, feedback)
VALUES ('5879799a-db43-4199-bddb-f70da19ae9a3', '0411a66b-943d-46d5-895d-28026b071aab', 'Chemistry Unit Quiz 1', 'Chemistry', 'quiz', 'AY 2024-25 Term 1', '2025-08-15', 9.5, 20.0, 15.0, 'Additional practice recommended.');
INSERT INTO public.assessments (id, student_id, title, subject, assessment_type, term, assessment_date, score, max_score, weight_percentage, feedback)
VALUES ('6b4ce379-f451-42ac-8f8f-1f9848bc45f1', '0411a66b-943d-46d5-895d-28026b071aab', 'History & Civics Unit Quiz 1', 'History & Civics', 'quiz', 'AY 2024-25 Term 1', '2025-08-15', 12.4, 20.0, 15.0, 'Additional practice recommended.');
INSERT INTO public.assessments (id, student_id, title, subject, assessment_type, term, assessment_date, score, max_score, weight_percentage, feedback)
VALUES ('313a5d63-43ab-4649-bf8c-c21a26bb172c', '0411a66b-943d-46d5-895d-28026b071aab', 'Physics Unit Quiz 1', 'Physics', 'quiz', 'AY 2024-25 Term 1', '2025-08-15', 8.9, 20.0, 15.0, 'Additional practice recommended.');
INSERT INTO public.assessments (id, student_id, title, subject, assessment_type, term, assessment_date, score, max_score, weight_percentage, feedback)
VALUES ('38f52179-51e4-48ad-bde5-b6267fdd9efd', '0411a66b-943d-46d5-895d-28026b071aab', 'Computer Science Laboratory Practical 1', 'Computer Science', 'lab', 'AY 2024-25 Term 1', '2025-08-25', 16.0, 25.0, 15.0, 'Additional practice recommended.');
INSERT INTO public.assessments (id, student_id, title, subject, assessment_type, term, assessment_date, score, max_score, weight_percentage, feedback)
VALUES ('e664db9b-e663-4eab-b0f0-a92a19dd98c9', '0411a66b-943d-46d5-895d-28026b071aab', 'Mathematics Laboratory Practical 1', 'Mathematics', 'lab', 'AY 2024-25 Term 1', '2025-08-25', 14.4, 25.0, 15.0, 'Additional practice recommended.');
INSERT INTO public.assessments (id, student_id, title, subject, assessment_type, term, assessment_date, score, max_score, weight_percentage, feedback)
VALUES ('a6cc4f1f-34ad-4293-8f0a-80702d4e9b7b', '0411a66b-943d-46d5-895d-28026b071aab', 'Chemistry Laboratory Practical 1', 'Chemistry', 'lab', 'AY 2024-25 Term 1', '2025-08-25', 15.7, 25.0, 15.0, 'Additional practice recommended.');
INSERT INTO public.assessments (id, student_id, title, subject, assessment_type, term, assessment_date, score, max_score, weight_percentage, feedback)
VALUES ('ae3307ae-a7aa-442d-9830-f3a3c671ac51', '0411a66b-943d-46d5-895d-28026b071aab', 'History & Civics Midterm Examination', 'History & Civics', 'midterm', 'AY 2024-25 Term 1', '2025-09-10', 67.3, 100.0, 15.0, 'Evaluation recorded.');
INSERT INTO public.assessments (id, student_id, title, subject, assessment_type, term, assessment_date, score, max_score, weight_percentage, feedback)
VALUES ('974f945f-2fb5-49ee-9420-82de63319c0a', '0411a66b-943d-46d5-895d-28026b071aab', 'Computer Science Midterm Examination', 'Computer Science', 'midterm', 'AY 2024-25 Term 1', '2025-09-10', 51.8, 100.0, 15.0, 'Additional practice recommended.');
INSERT INTO public.assessments (id, student_id, title, subject, assessment_type, term, assessment_date, score, max_score, weight_percentage, feedback)
VALUES ('400b3da9-fd57-4943-b073-124c2785b579', '0411a66b-943d-46d5-895d-28026b071aab', 'Mathematics Midterm Examination', 'Mathematics', 'midterm', 'AY 2024-25 Term 1', '2025-09-10', 56.4, 100.0, 15.0, 'Additional practice recommended.');
INSERT INTO public.assessments (id, student_id, title, subject, assessment_type, term, assessment_date, score, max_score, weight_percentage, feedback)
VALUES ('9fbe615c-2d48-49d1-99a3-b4a8523cf529', '0411a66b-943d-46d5-895d-28026b071aab', 'History & Civics Unit Assignment 2', 'History & Civics', 'assignment', 'AY 2024-25 Term 1', '2025-09-28', 17.1, 30.0, 15.0, 'Additional practice recommended.');
INSERT INTO public.assessments (id, student_id, title, subject, assessment_type, term, assessment_date, score, max_score, weight_percentage, feedback)
VALUES ('ba79fbe8-989f-4192-b9db-fb815beb0aea', '0411a66b-943d-46d5-895d-28026b071aab', 'English Literature Unit Assignment 2', 'English Literature', 'assignment', 'AY 2024-25 Term 1', '2025-09-28', 18.1, 30.0, 15.0, 'Additional practice recommended.');
INSERT INTO public.assessments (id, student_id, title, subject, assessment_type, term, assessment_date, score, max_score, weight_percentage, feedback)
VALUES ('c69419be-ff8a-420b-a737-b9d9cbaed1f8', '0411a66b-943d-46d5-895d-28026b071aab', 'Chemistry Unit Assignment 2', 'Chemistry', 'assignment', 'AY 2024-25 Term 1', '2025-09-28', 13.0, 30.0, 15.0, 'Additional practice recommended.');
INSERT INTO public.assessments (id, student_id, title, subject, assessment_type, term, assessment_date, score, max_score, weight_percentage, feedback)
VALUES ('471bde66-bc64-4480-a6af-c26090f02a0e', '0411a66b-943d-46d5-895d-28026b071aab', 'Physics Term Project Evaluation', 'Physics', 'project', 'AY 2024-25 Term 1', '2025-10-15', 32.1, 50.0, 15.0, 'Additional practice recommended.');
INSERT INTO public.assessments (id, student_id, title, subject, assessment_type, term, assessment_date, score, max_score, weight_percentage, feedback)
VALUES ('9ef31b7b-207f-4f2c-a9c1-26df25820373', '0411a66b-943d-46d5-895d-28026b071aab', 'Chemistry Term Project Evaluation', 'Chemistry', 'project', 'AY 2024-25 Term 1', '2025-10-15', 32.3, 50.0, 15.0, 'Additional practice recommended.');
INSERT INTO public.assessments (id, student_id, title, subject, assessment_type, term, assessment_date, score, max_score, weight_percentage, feedback)
VALUES ('11235f55-78f4-49b1-ae34-67ec63e80741', '0411a66b-943d-46d5-895d-28026b071aab', 'Mathematics Term Project Evaluation', 'Mathematics', 'project', 'AY 2024-25 Term 1', '2025-10-15', 25.9, 50.0, 15.0, 'Additional practice recommended.');
INSERT INTO public.assessments (id, student_id, title, subject, assessment_type, term, assessment_date, score, max_score, weight_percentage, feedback)
VALUES ('8afd53cb-7a8f-4ad0-bd6b-9947c6587c2d', '0411a66b-943d-46d5-895d-28026b071aab', 'Computer Science Term Final Examination', 'Computer Science', 'final', 'AY 2024-25 Term 1', '2025-11-05', 51.6, 100.0, 35.0, 'Additional practice recommended.');
INSERT INTO public.assessments (id, student_id, title, subject, assessment_type, term, assessment_date, score, max_score, weight_percentage, feedback)
VALUES ('3a16dc5f-faeb-4c00-b75c-604e638e7d4c', '0411a66b-943d-46d5-895d-28026b071aab', 'Chemistry Term Final Examination', 'Chemistry', 'final', 'AY 2024-25 Term 1', '2025-11-05', 47.4, 100.0, 35.0, 'Additional practice recommended.');
INSERT INTO public.assessments (id, student_id, title, subject, assessment_type, term, assessment_date, score, max_score, weight_percentage, feedback)
VALUES ('ad419964-7f25-4b4a-8d10-b0164bf87f0f', '0411a66b-943d-46d5-895d-28026b071aab', 'Physics Term Final Examination', 'Physics', 'final', 'AY 2024-25 Term 1', '2025-11-05', 48.9, 100.0, 35.0, 'Additional practice recommended.');
INSERT INTO public.assessments (id, student_id, title, subject, assessment_type, term, assessment_date, score, max_score, weight_percentage, feedback)
VALUES ('8cb21470-4472-4643-a7b2-9ae0c2fb9a97', 'edd5c0e8-986a-4275-b213-362f1d2e2a5e', 'Chemistry Unit Quiz 1', 'Chemistry', 'quiz', 'AY 2024-25 Term 2', '2025-08-15', 13.1, 20.0, 15.0, 'Additional practice recommended.');
INSERT INTO public.assessments (id, student_id, title, subject, assessment_type, term, assessment_date, score, max_score, weight_percentage, feedback)
VALUES ('7f43319b-7609-4e87-bedf-93fd1789fe76', 'edd5c0e8-986a-4275-b213-362f1d2e2a5e', 'English Literature Unit Quiz 1', 'English Literature', 'quiz', 'AY 2024-25 Term 2', '2025-08-15', 10.5, 20.0, 15.0, 'Additional practice recommended.');
INSERT INTO public.assessments (id, student_id, title, subject, assessment_type, term, assessment_date, score, max_score, weight_percentage, feedback)
VALUES ('e156e9f5-4621-40e4-a4e7-4f685f682650', 'edd5c0e8-986a-4275-b213-362f1d2e2a5e', 'Computer Science Unit Quiz 1', 'Computer Science', 'quiz', 'AY 2024-25 Term 2', '2025-08-15', 9.5, 20.0, 15.0, 'Additional practice recommended.');
INSERT INTO public.assessments (id, student_id, title, subject, assessment_type, term, assessment_date, score, max_score, weight_percentage, feedback)
VALUES ('c84c9840-61ff-4d68-bc9c-2b29b538ab20', 'edd5c0e8-986a-4275-b213-362f1d2e2a5e', 'Physics Laboratory Practical 1', 'Physics', 'lab', 'AY 2024-25 Term 2', '2025-08-25', 11.1, 25.0, 15.0, 'Additional practice recommended.');
INSERT INTO public.assessments (id, student_id, title, subject, assessment_type, term, assessment_date, score, max_score, weight_percentage, feedback)
VALUES ('c4fc2f20-56b5-45ba-ae80-42af2e7cc2f4', 'edd5c0e8-986a-4275-b213-362f1d2e2a5e', 'English Literature Laboratory Practical 1', 'English Literature', 'lab', 'AY 2024-25 Term 2', '2025-08-25', 10.8, 25.0, 15.0, 'Additional practice recommended.');
INSERT INTO public.assessments (id, student_id, title, subject, assessment_type, term, assessment_date, score, max_score, weight_percentage, feedback)
VALUES ('bb4359f0-7786-4bdf-a320-b2f5477b6431', 'edd5c0e8-986a-4275-b213-362f1d2e2a5e', 'Computer Science Laboratory Practical 1', 'Computer Science', 'lab', 'AY 2024-25 Term 2', '2025-08-25', 11.2, 25.0, 15.0, 'Additional practice recommended.');
INSERT INTO public.assessments (id, student_id, title, subject, assessment_type, term, assessment_date, score, max_score, weight_percentage, feedback)
VALUES ('938aa472-425f-4621-9d04-513ba719a9e4', 'edd5c0e8-986a-4275-b213-362f1d2e2a5e', 'History & Civics Midterm Examination', 'History & Civics', 'midterm', 'AY 2024-25 Term 2', '2025-09-10', 57.5, 100.0, 15.0, 'Additional practice recommended.');
INSERT INTO public.assessments (id, student_id, title, subject, assessment_type, term, assessment_date, score, max_score, weight_percentage, feedback)
VALUES ('f613b211-cbb4-4650-b0ae-7e00da086499', 'edd5c0e8-986a-4275-b213-362f1d2e2a5e', 'Physics Midterm Examination', 'Physics', 'midterm', 'AY 2024-25 Term 2', '2025-09-10', 52.0, 100.0, 15.0, 'Additional practice recommended.');
INSERT INTO public.assessments (id, student_id, title, subject, assessment_type, term, assessment_date, score, max_score, weight_percentage, feedback)
VALUES ('d4c2244d-1815-4a46-b8b0-db3e4b7b1f74', 'edd5c0e8-986a-4275-b213-362f1d2e2a5e', 'Computer Science Midterm Examination', 'Computer Science', 'midterm', 'AY 2024-25 Term 2', '2025-09-10', 57.5, 100.0, 15.0, 'Additional practice recommended.');
INSERT INTO public.assessments (id, student_id, title, subject, assessment_type, term, assessment_date, score, max_score, weight_percentage, feedback)
VALUES ('638c28c9-b3ae-45ee-9c16-b561c1c95555', 'edd5c0e8-986a-4275-b213-362f1d2e2a5e', 'Computer Science Unit Assignment 2', 'Computer Science', 'assignment', 'AY 2024-25 Term 2', '2025-09-28', 20.2, 30.0, 15.0, 'Additional practice recommended.');
INSERT INTO public.assessments (id, student_id, title, subject, assessment_type, term, assessment_date, score, max_score, weight_percentage, feedback)
VALUES ('8d44d7cf-2c50-481e-be1c-2e1660d90ae9', 'edd5c0e8-986a-4275-b213-362f1d2e2a5e', 'English Literature Unit Assignment 2', 'English Literature', 'assignment', 'AY 2024-25 Term 2', '2025-09-28', 19.3, 30.0, 15.0, 'Additional practice recommended.');
INSERT INTO public.assessments (id, student_id, title, subject, assessment_type, term, assessment_date, score, max_score, weight_percentage, feedback)
VALUES ('fd78dabb-2f66-45e7-8c3a-6485b4dbc49a', 'edd5c0e8-986a-4275-b213-362f1d2e2a5e', 'Chemistry Unit Assignment 2', 'Chemistry', 'assignment', 'AY 2024-25 Term 2', '2025-09-28', 12.7, 30.0, 15.0, 'Additional practice recommended.');
INSERT INTO public.assessments (id, student_id, title, subject, assessment_type, term, assessment_date, score, max_score, weight_percentage, feedback)
VALUES ('7561ad63-02a7-4c5b-93b9-a95912e19d1f', 'edd5c0e8-986a-4275-b213-362f1d2e2a5e', 'History & Civics Term Project Evaluation', 'History & Civics', 'project', 'AY 2024-25 Term 2', '2025-10-15', 31.0, 50.0, 15.0, 'Additional practice recommended.');
INSERT INTO public.assessments (id, student_id, title, subject, assessment_type, term, assessment_date, score, max_score, weight_percentage, feedback)
VALUES ('9af4e608-a09c-40b7-9400-c5b988754bfe', 'edd5c0e8-986a-4275-b213-362f1d2e2a5e', 'Mathematics Term Project Evaluation', 'Mathematics', 'project', 'AY 2024-25 Term 2', '2025-10-15', 25.4, 50.0, 15.0, 'Additional practice recommended.');
INSERT INTO public.assessments (id, student_id, title, subject, assessment_type, term, assessment_date, score, max_score, weight_percentage, feedback)
VALUES ('35ba2814-822d-4c81-b429-37112c5b27b9', 'edd5c0e8-986a-4275-b213-362f1d2e2a5e', 'Chemistry Term Project Evaluation', 'Chemistry', 'project', 'AY 2024-25 Term 2', '2025-10-15', 24.8, 50.0, 15.0, 'Additional practice recommended.');
INSERT INTO public.assessments (id, student_id, title, subject, assessment_type, term, assessment_date, score, max_score, weight_percentage, feedback)
VALUES ('2f15b785-bd54-4a22-a2f6-b4bf2357daa4', 'edd5c0e8-986a-4275-b213-362f1d2e2a5e', 'Physics Term Final Examination', 'Physics', 'final', 'AY 2024-25 Term 2', '2025-11-05', 66.8, 100.0, 35.0, 'Evaluation recorded.');
INSERT INTO public.assessments (id, student_id, title, subject, assessment_type, term, assessment_date, score, max_score, weight_percentage, feedback)
VALUES ('7f741589-08a9-45c4-bb89-220cd534a1ec', 'edd5c0e8-986a-4275-b213-362f1d2e2a5e', 'Computer Science Term Final Examination', 'Computer Science', 'final', 'AY 2024-25 Term 2', '2025-11-05', 64.8, 100.0, 35.0, 'Evaluation recorded.');
INSERT INTO public.assessments (id, student_id, title, subject, assessment_type, term, assessment_date, score, max_score, weight_percentage, feedback)
VALUES ('d25866b0-8d81-4624-a0d4-04ad91b40ea6', 'edd5c0e8-986a-4275-b213-362f1d2e2a5e', 'Mathematics Term Final Examination', 'Mathematics', 'final', 'AY 2024-25 Term 2', '2025-11-05', 48.8, 100.0, 35.0, 'Additional practice recommended.');
INSERT INTO public.assessments (id, student_id, title, subject, assessment_type, term, assessment_date, score, max_score, weight_percentage, feedback)
VALUES ('a35907a5-25fa-448f-886b-ea2cd451bb78', '06088341-1830-40a1-b648-869368a12a82', 'Computer Science Unit Quiz 1', 'Computer Science', 'quiz', 'AY 2025-26 Term 1', '2025-08-15', 9.8, 20.0, 15.0, 'Additional practice recommended.');
INSERT INTO public.assessments (id, student_id, title, subject, assessment_type, term, assessment_date, score, max_score, weight_percentage, feedback)
VALUES ('ce50ec96-6adf-41bf-81f8-bc569af77d71', '06088341-1830-40a1-b648-869368a12a82', 'English Literature Unit Quiz 1', 'English Literature', 'quiz', 'AY 2025-26 Term 1', '2025-08-15', 12.9, 20.0, 15.0, 'Additional practice recommended.');
INSERT INTO public.assessments (id, student_id, title, subject, assessment_type, term, assessment_date, score, max_score, weight_percentage, feedback)
VALUES ('fa0b888e-9a36-4995-98e0-2d7c3a69d0c5', '06088341-1830-40a1-b648-869368a12a82', 'Physics Unit Quiz 1', 'Physics', 'quiz', 'AY 2025-26 Term 1', '2025-08-15', 10.6, 20.0, 15.0, 'Additional practice recommended.');
INSERT INTO public.assessments (id, student_id, title, subject, assessment_type, term, assessment_date, score, max_score, weight_percentage, feedback)
VALUES ('9870a361-7472-4f45-93bb-871ebc34d928', '06088341-1830-40a1-b648-869368a12a82', 'Physics Laboratory Practical 1', 'Physics', 'lab', 'AY 2025-26 Term 1', '2025-08-25', 15.1, 25.0, 15.0, 'Additional practice recommended.');
INSERT INTO public.assessments (id, student_id, title, subject, assessment_type, term, assessment_date, score, max_score, weight_percentage, feedback)
VALUES ('9a56fa10-13de-49bd-82a8-4ec11add884c', '06088341-1830-40a1-b648-869368a12a82', 'English Literature Laboratory Practical 1', 'English Literature', 'lab', 'AY 2025-26 Term 1', '2025-08-25', 13.1, 25.0, 15.0, 'Additional practice recommended.');
INSERT INTO public.assessments (id, student_id, title, subject, assessment_type, term, assessment_date, score, max_score, weight_percentage, feedback)
VALUES ('b3c1e106-fec6-4e85-ba5f-fccf0ad1842f', '06088341-1830-40a1-b648-869368a12a82', 'History & Civics Laboratory Practical 1', 'History & Civics', 'lab', 'AY 2025-26 Term 1', '2025-08-25', 14.9, 25.0, 15.0, 'Additional practice recommended.');
INSERT INTO public.assessments (id, student_id, title, subject, assessment_type, term, assessment_date, score, max_score, weight_percentage, feedback)
VALUES ('22dee092-af9a-4822-af2f-4075a7b1dada', '06088341-1830-40a1-b648-869368a12a82', 'Chemistry Midterm Examination', 'Chemistry', 'midterm', 'AY 2025-26 Term 1', '2025-09-10', 45.1, 100.0, 15.0, 'Additional practice recommended.');
INSERT INTO public.assessments (id, student_id, title, subject, assessment_type, term, assessment_date, score, max_score, weight_percentage, feedback)
VALUES ('ebe2d7b2-86eb-4fcf-ac61-38c2136cc512', '06088341-1830-40a1-b648-869368a12a82', 'Computer Science Midterm Examination', 'Computer Science', 'midterm', 'AY 2025-26 Term 1', '2025-09-10', 47.8, 100.0, 15.0, 'Additional practice recommended.');
INSERT INTO public.assessments (id, student_id, title, subject, assessment_type, term, assessment_date, score, max_score, weight_percentage, feedback)
VALUES ('7fdce084-4261-492f-8d46-69d38c6d20f6', '06088341-1830-40a1-b648-869368a12a82', 'English Literature Midterm Examination', 'English Literature', 'midterm', 'AY 2025-26 Term 1', '2025-09-10', 50.8, 100.0, 15.0, 'Additional practice recommended.');
INSERT INTO public.assessments (id, student_id, title, subject, assessment_type, term, assessment_date, score, max_score, weight_percentage, feedback)
VALUES ('2ea838cd-b021-4fe0-9cf7-57de9cf362b8', '06088341-1830-40a1-b648-869368a12a82', 'English Literature Unit Assignment 2', 'English Literature', 'assignment', 'AY 2025-26 Term 1', '2025-09-28', 17.2, 30.0, 15.0, 'Additional practice recommended.');
INSERT INTO public.assessments (id, student_id, title, subject, assessment_type, term, assessment_date, score, max_score, weight_percentage, feedback)
VALUES ('109d3f5f-d84c-4eb2-97be-b648515d80f7', '06088341-1830-40a1-b648-869368a12a82', 'History & Civics Unit Assignment 2', 'History & Civics', 'assignment', 'AY 2025-26 Term 1', '2025-09-28', 12.7, 30.0, 15.0, 'Additional practice recommended.');
INSERT INTO public.assessments (id, student_id, title, subject, assessment_type, term, assessment_date, score, max_score, weight_percentage, feedback)
VALUES ('6a3ef799-10d6-477c-b809-0bdf404cc1d4', '06088341-1830-40a1-b648-869368a12a82', 'Physics Unit Assignment 2', 'Physics', 'assignment', 'AY 2025-26 Term 1', '2025-09-28', 18.1, 30.0, 15.0, 'Additional practice recommended.');
INSERT INTO public.assessments (id, student_id, title, subject, assessment_type, term, assessment_date, score, max_score, weight_percentage, feedback)
VALUES ('26d03611-ed91-4df4-8884-f2bc20359126', '06088341-1830-40a1-b648-869368a12a82', 'Mathematics Term Project Evaluation', 'Mathematics', 'project', 'AY 2025-26 Term 1', '2025-10-15', 32.8, 50.0, 15.0, 'Additional practice recommended.');
INSERT INTO public.assessments (id, student_id, title, subject, assessment_type, term, assessment_date, score, max_score, weight_percentage, feedback)
VALUES ('2182dd23-8afb-4575-a2b4-522934465d9b', '06088341-1830-40a1-b648-869368a12a82', 'Physics Term Project Evaluation', 'Physics', 'project', 'AY 2025-26 Term 1', '2025-10-15', 32.2, 50.0, 15.0, 'Additional practice recommended.');
INSERT INTO public.assessments (id, student_id, title, subject, assessment_type, term, assessment_date, score, max_score, weight_percentage, feedback)
VALUES ('69e562c6-1628-4aa1-9d4c-2cd9995e613c', '06088341-1830-40a1-b648-869368a12a82', 'History & Civics Term Project Evaluation', 'History & Civics', 'project', 'AY 2025-26 Term 1', '2025-10-15', 21.9, 50.0, 15.0, 'Additional practice recommended.');
INSERT INTO public.assessments (id, student_id, title, subject, assessment_type, term, assessment_date, score, max_score, weight_percentage, feedback)
VALUES ('41cdeee2-5767-4635-9db8-a0792f356949', '06088341-1830-40a1-b648-869368a12a82', 'Physics Term Final Examination', 'Physics', 'final', 'AY 2025-26 Term 1', '2025-11-05', 47.6, 100.0, 35.0, 'Additional practice recommended.');
INSERT INTO public.assessments (id, student_id, title, subject, assessment_type, term, assessment_date, score, max_score, weight_percentage, feedback)
VALUES ('46f784ff-7282-4702-af6b-35d78c227791', '06088341-1830-40a1-b648-869368a12a82', 'Chemistry Term Final Examination', 'Chemistry', 'final', 'AY 2025-26 Term 1', '2025-11-05', 45.4, 100.0, 35.0, 'Additional practice recommended.');
INSERT INTO public.assessments (id, student_id, title, subject, assessment_type, term, assessment_date, score, max_score, weight_percentage, feedback)
VALUES ('85373590-a933-4c3a-8f06-552097f6a024', '06088341-1830-40a1-b648-869368a12a82', 'Computer Science Term Final Examination', 'Computer Science', 'final', 'AY 2025-26 Term 1', '2025-11-05', 66.3, 100.0, 35.0, 'Evaluation recorded.');
INSERT INTO public.assessments (id, student_id, title, subject, assessment_type, term, assessment_date, score, max_score, weight_percentage, feedback)
VALUES ('360342d3-35d1-49ef-99e8-0c04e7f08278', 'd8bcb8d5-c15c-421a-bc22-29148cd4eefc', 'English Literature Unit Quiz 1', 'English Literature', 'quiz', 'AY 2025-26 Term 2', '2025-08-15', 13.2, 20.0, 15.0, 'Additional practice recommended.');
INSERT INTO public.assessments (id, student_id, title, subject, assessment_type, term, assessment_date, score, max_score, weight_percentage, feedback)
VALUES ('b3a3b5d9-e5d3-4b97-adc9-4c7bab402479', 'd8bcb8d5-c15c-421a-bc22-29148cd4eefc', 'Mathematics Unit Quiz 1', 'Mathematics', 'quiz', 'AY 2025-26 Term 2', '2025-08-15', 12.8, 20.0, 15.0, 'Additional practice recommended.');
INSERT INTO public.assessments (id, student_id, title, subject, assessment_type, term, assessment_date, score, max_score, weight_percentage, feedback)
VALUES ('cc42ea75-308b-4433-ab41-86d35f73dff9', 'd8bcb8d5-c15c-421a-bc22-29148cd4eefc', 'History & Civics Unit Quiz 1', 'History & Civics', 'quiz', 'AY 2025-26 Term 2', '2025-08-15', 9.3, 20.0, 15.0, 'Additional practice recommended.');
INSERT INTO public.assessments (id, student_id, title, subject, assessment_type, term, assessment_date, score, max_score, weight_percentage, feedback)
VALUES ('8a2d9a7c-14b1-4a07-8047-207b2afc8ee1', 'd8bcb8d5-c15c-421a-bc22-29148cd4eefc', 'Computer Science Laboratory Practical 1', 'Computer Science', 'lab', 'AY 2025-26 Term 2', '2025-08-25', 16.1, 25.0, 15.0, 'Additional practice recommended.');
INSERT INTO public.assessments (id, student_id, title, subject, assessment_type, term, assessment_date, score, max_score, weight_percentage, feedback)
VALUES ('50a028e7-336c-4839-9aef-4aa88b9533f2', 'd8bcb8d5-c15c-421a-bc22-29148cd4eefc', 'History & Civics Laboratory Practical 1', 'History & Civics', 'lab', 'AY 2025-26 Term 2', '2025-08-25', 16.4, 25.0, 15.0, 'Additional practice recommended.');
INSERT INTO public.assessments (id, student_id, title, subject, assessment_type, term, assessment_date, score, max_score, weight_percentage, feedback)
VALUES ('e2627ac6-242f-471e-adc9-7d53fe554330', 'd8bcb8d5-c15c-421a-bc22-29148cd4eefc', 'Physics Laboratory Practical 1', 'Physics', 'lab', 'AY 2025-26 Term 2', '2025-08-25', 11.6, 25.0, 15.0, 'Additional practice recommended.');
INSERT INTO public.assessments (id, student_id, title, subject, assessment_type, term, assessment_date, score, max_score, weight_percentage, feedback)
VALUES ('c823750c-2bf4-4adb-871c-b759de725842', 'd8bcb8d5-c15c-421a-bc22-29148cd4eefc', 'Mathematics Midterm Examination', 'Mathematics', 'midterm', 'AY 2025-26 Term 2', '2025-09-10', 66.1, 100.0, 15.0, 'Evaluation recorded.');
INSERT INTO public.assessments (id, student_id, title, subject, assessment_type, term, assessment_date, score, max_score, weight_percentage, feedback)
VALUES ('0bd9ae3a-dc3a-4e76-b32a-ee30d48dce92', 'd8bcb8d5-c15c-421a-bc22-29148cd4eefc', 'Computer Science Midterm Examination', 'Computer Science', 'midterm', 'AY 2025-26 Term 2', '2025-09-10', 62.4, 100.0, 15.0, 'Evaluation recorded.');
INSERT INTO public.assessments (id, student_id, title, subject, assessment_type, term, assessment_date, score, max_score, weight_percentage, feedback)
VALUES ('c09c1daf-d439-4981-88fd-131fc4c7f65c', 'd8bcb8d5-c15c-421a-bc22-29148cd4eefc', 'Chemistry Midterm Examination', 'Chemistry', 'midterm', 'AY 2025-26 Term 2', '2025-09-10', 49.4, 100.0, 15.0, 'Additional practice recommended.');
INSERT INTO public.assessments (id, student_id, title, subject, assessment_type, term, assessment_date, score, max_score, weight_percentage, feedback)
VALUES ('4ce5c7ea-d056-43f0-9f0d-5a63acd0d6be', 'd8bcb8d5-c15c-421a-bc22-29148cd4eefc', 'History & Civics Unit Assignment 2', 'History & Civics', 'assignment', 'AY 2025-26 Term 2', '2025-09-28', 13.8, 30.0, 15.0, 'Additional practice recommended.');
INSERT INTO public.assessments (id, student_id, title, subject, assessment_type, term, assessment_date, score, max_score, weight_percentage, feedback)
VALUES ('cae63617-9ae9-46f5-a530-51c6707cf51a', 'd8bcb8d5-c15c-421a-bc22-29148cd4eefc', 'English Literature Unit Assignment 2', 'English Literature', 'assignment', 'AY 2025-26 Term 2', '2025-09-28', 14.9, 30.0, 15.0, 'Additional practice recommended.');
INSERT INTO public.assessments (id, student_id, title, subject, assessment_type, term, assessment_date, score, max_score, weight_percentage, feedback)
VALUES ('ee654237-8044-4b3f-a072-fac1cf2f131f', 'd8bcb8d5-c15c-421a-bc22-29148cd4eefc', 'Computer Science Unit Assignment 2', 'Computer Science', 'assignment', 'AY 2025-26 Term 2', '2025-09-28', 20.2, 30.0, 15.0, 'Additional practice recommended.');
INSERT INTO public.assessments (id, student_id, title, subject, assessment_type, term, assessment_date, score, max_score, weight_percentage, feedback)
VALUES ('899d5c25-9336-4a39-830c-8dd85cba9a26', 'd8bcb8d5-c15c-421a-bc22-29148cd4eefc', 'English Literature Term Project Evaluation', 'English Literature', 'project', 'AY 2025-26 Term 2', '2025-10-15', 30.7, 50.0, 15.0, 'Additional practice recommended.');
INSERT INTO public.assessments (id, student_id, title, subject, assessment_type, term, assessment_date, score, max_score, weight_percentage, feedback)
VALUES ('d72bc8f3-799a-4a26-81fe-82b2c9784a56', 'd8bcb8d5-c15c-421a-bc22-29148cd4eefc', 'History & Civics Term Project Evaluation', 'History & Civics', 'project', 'AY 2025-26 Term 2', '2025-10-15', 21.7, 50.0, 15.0, 'Additional practice recommended.');
INSERT INTO public.assessments (id, student_id, title, subject, assessment_type, term, assessment_date, score, max_score, weight_percentage, feedback)
VALUES ('bb5dcfeb-2815-432c-a8fe-cc07d384073f', 'd8bcb8d5-c15c-421a-bc22-29148cd4eefc', 'Mathematics Term Project Evaluation', 'Mathematics', 'project', 'AY 2025-26 Term 2', '2025-10-15', 28.6, 50.0, 15.0, 'Additional practice recommended.');
INSERT INTO public.assessments (id, student_id, title, subject, assessment_type, term, assessment_date, score, max_score, weight_percentage, feedback)
VALUES ('e840b833-0197-4f31-b4e6-a445f794efd7', 'd8bcb8d5-c15c-421a-bc22-29148cd4eefc', 'English Literature Term Final Examination', 'English Literature', 'final', 'AY 2025-26 Term 2', '2025-11-05', 43.5, 100.0, 35.0, 'Additional practice recommended.');
INSERT INTO public.assessments (id, student_id, title, subject, assessment_type, term, assessment_date, score, max_score, weight_percentage, feedback)
VALUES ('76e64818-8f84-44e5-91ea-030d100fe99f', 'd8bcb8d5-c15c-421a-bc22-29148cd4eefc', 'History & Civics Term Final Examination', 'History & Civics', 'final', 'AY 2025-26 Term 2', '2025-11-05', 55.2, 100.0, 35.0, 'Additional practice recommended.');
INSERT INTO public.assessments (id, student_id, title, subject, assessment_type, term, assessment_date, score, max_score, weight_percentage, feedback)
VALUES ('ed389752-c91e-4d06-86ba-36e45278aeb4', 'd8bcb8d5-c15c-421a-bc22-29148cd4eefc', 'Physics Term Final Examination', 'Physics', 'final', 'AY 2025-26 Term 2', '2025-11-05', 64.1, 100.0, 35.0, 'Evaluation recorded.');
INSERT INTO public.assessments (id, student_id, title, subject, assessment_type, term, assessment_date, score, max_score, weight_percentage, feedback)
VALUES ('9fdfb637-9b3b-47c3-bb46-0bccc36eb511', '3f043811-1641-4ea6-a8b5-c0da39193232', 'Chemistry Unit Quiz 1', 'Chemistry', 'quiz', 'AY 2024-25 Term 1', '2025-08-15', 10.3, 20.0, 15.0, 'Additional practice recommended.');
INSERT INTO public.assessments (id, student_id, title, subject, assessment_type, term, assessment_date, score, max_score, weight_percentage, feedback)
VALUES ('8cda534c-365d-4ad6-a40f-68853091c567', '3f043811-1641-4ea6-a8b5-c0da39193232', 'Mathematics Unit Quiz 1', 'Mathematics', 'quiz', 'AY 2024-25 Term 1', '2025-08-15', 9.2, 20.0, 15.0, 'Additional practice recommended.');
INSERT INTO public.assessments (id, student_id, title, subject, assessment_type, term, assessment_date, score, max_score, weight_percentage, feedback)
VALUES ('9e7b185e-0e87-46e4-95ab-a75d1834e9fc', '3f043811-1641-4ea6-a8b5-c0da39193232', 'Physics Unit Quiz 1', 'Physics', 'quiz', 'AY 2024-25 Term 1', '2025-08-15', 12.7, 20.0, 15.0, 'Additional practice recommended.');
INSERT INTO public.assessments (id, student_id, title, subject, assessment_type, term, assessment_date, score, max_score, weight_percentage, feedback)
VALUES ('391e3c37-37f6-4c0e-ab54-0f630874654e', '3f043811-1641-4ea6-a8b5-c0da39193232', 'History & Civics Laboratory Practical 1', 'History & Civics', 'lab', 'AY 2024-25 Term 1', '2025-08-25', 14.8, 25.0, 15.0, 'Additional practice recommended.');
INSERT INTO public.assessments (id, student_id, title, subject, assessment_type, term, assessment_date, score, max_score, weight_percentage, feedback)
VALUES ('735f12ed-9d96-4674-b26a-b370534b357e', '3f043811-1641-4ea6-a8b5-c0da39193232', 'Chemistry Laboratory Practical 1', 'Chemistry', 'lab', 'AY 2024-25 Term 1', '2025-08-25', 14.1, 25.0, 15.0, 'Additional practice recommended.');
INSERT INTO public.assessments (id, student_id, title, subject, assessment_type, term, assessment_date, score, max_score, weight_percentage, feedback)
VALUES ('92c74e65-f8e8-4735-9d5f-176f20fac880', '3f043811-1641-4ea6-a8b5-c0da39193232', 'Mathematics Laboratory Practical 1', 'Mathematics', 'lab', 'AY 2024-25 Term 1', '2025-08-25', 16.6, 25.0, 15.0, 'Additional practice recommended.');
INSERT INTO public.assessments (id, student_id, title, subject, assessment_type, term, assessment_date, score, max_score, weight_percentage, feedback)
VALUES ('8c04ab64-21b1-4d5b-9d97-c5b8dbb770d6', '3f043811-1641-4ea6-a8b5-c0da39193232', 'Mathematics Midterm Examination', 'Mathematics', 'midterm', 'AY 2024-25 Term 1', '2025-09-10', 45.0, 100.0, 15.0, 'Additional practice recommended.');
INSERT INTO public.assessments (id, student_id, title, subject, assessment_type, term, assessment_date, score, max_score, weight_percentage, feedback)
VALUES ('e3839dc7-c5e2-4785-903c-56428f432169', '3f043811-1641-4ea6-a8b5-c0da39193232', 'Physics Midterm Examination', 'Physics', 'midterm', 'AY 2024-25 Term 1', '2025-09-10', 44.8, 100.0, 15.0, 'Additional practice recommended.');
INSERT INTO public.assessments (id, student_id, title, subject, assessment_type, term, assessment_date, score, max_score, weight_percentage, feedback)
VALUES ('8aa78fea-4265-4a1b-ac41-4a4ae5bf08c8', '3f043811-1641-4ea6-a8b5-c0da39193232', 'Chemistry Midterm Examination', 'Chemistry', 'midterm', 'AY 2024-25 Term 1', '2025-09-10', 56.4, 100.0, 15.0, 'Additional practice recommended.');
INSERT INTO public.assessments (id, student_id, title, subject, assessment_type, term, assessment_date, score, max_score, weight_percentage, feedback)
VALUES ('157d0090-bd22-4bb4-bc23-32e7b7563497', '3f043811-1641-4ea6-a8b5-c0da39193232', 'Chemistry Unit Assignment 2', 'Chemistry', 'assignment', 'AY 2024-25 Term 1', '2025-09-28', 18.2, 30.0, 15.0, 'Additional practice recommended.');
INSERT INTO public.assessments (id, student_id, title, subject, assessment_type, term, assessment_date, score, max_score, weight_percentage, feedback)
VALUES ('a213a54b-0b8a-47f5-83b1-fb2b239519ac', '3f043811-1641-4ea6-a8b5-c0da39193232', 'History & Civics Unit Assignment 2', 'History & Civics', 'assignment', 'AY 2024-25 Term 1', '2025-09-28', 14.2, 30.0, 15.0, 'Additional practice recommended.');
INSERT INTO public.assessments (id, student_id, title, subject, assessment_type, term, assessment_date, score, max_score, weight_percentage, feedback)
VALUES ('58439aae-3be7-43cb-952f-cb8e7b2a6e11', '3f043811-1641-4ea6-a8b5-c0da39193232', 'Physics Unit Assignment 2', 'Physics', 'assignment', 'AY 2024-25 Term 1', '2025-09-28', 17.5, 30.0, 15.0, 'Additional practice recommended.');
INSERT INTO public.assessments (id, student_id, title, subject, assessment_type, term, assessment_date, score, max_score, weight_percentage, feedback)
VALUES ('1f081808-750e-422c-9686-63d8b7fc59cf', '3f043811-1641-4ea6-a8b5-c0da39193232', 'Chemistry Term Project Evaluation', 'Chemistry', 'project', 'AY 2024-25 Term 1', '2025-10-15', 24.3, 50.0, 15.0, 'Additional practice recommended.');
INSERT INTO public.assessments (id, student_id, title, subject, assessment_type, term, assessment_date, score, max_score, weight_percentage, feedback)
VALUES ('6dcb3900-26cc-4929-8b4d-81f5a59dd1fa', '3f043811-1641-4ea6-a8b5-c0da39193232', 'English Literature Term Project Evaluation', 'English Literature', 'project', 'AY 2024-25 Term 1', '2025-10-15', 32.8, 50.0, 15.0, 'Additional practice recommended.');
INSERT INTO public.assessments (id, student_id, title, subject, assessment_type, term, assessment_date, score, max_score, weight_percentage, feedback)
VALUES ('94d57bc7-5dce-4cf4-a6c9-3e6f860cc1bf', '3f043811-1641-4ea6-a8b5-c0da39193232', 'Computer Science Term Project Evaluation', 'Computer Science', 'project', 'AY 2024-25 Term 1', '2025-10-15', 21.7, 50.0, 15.0, 'Additional practice recommended.');
INSERT INTO public.assessments (id, student_id, title, subject, assessment_type, term, assessment_date, score, max_score, weight_percentage, feedback)
VALUES ('2b684a2f-87e1-4000-9da6-dcb6b853ce1c', '3f043811-1641-4ea6-a8b5-c0da39193232', 'History & Civics Term Final Examination', 'History & Civics', 'final', 'AY 2024-25 Term 1', '2025-11-05', 43.1, 100.0, 35.0, 'Additional practice recommended.');
INSERT INTO public.assessments (id, student_id, title, subject, assessment_type, term, assessment_date, score, max_score, weight_percentage, feedback)
VALUES ('e920af36-5ce3-4d84-9c1e-65cc94b5299d', '3f043811-1641-4ea6-a8b5-c0da39193232', 'Computer Science Term Final Examination', 'Computer Science', 'final', 'AY 2024-25 Term 1', '2025-11-05', 50.7, 100.0, 35.0, 'Additional practice recommended.');
INSERT INTO public.assessments (id, student_id, title, subject, assessment_type, term, assessment_date, score, max_score, weight_percentage, feedback)
VALUES ('ba974980-6158-4c4c-9e45-52d1d5bd395b', '3f043811-1641-4ea6-a8b5-c0da39193232', 'Chemistry Term Final Examination', 'Chemistry', 'final', 'AY 2024-25 Term 1', '2025-11-05', 45.4, 100.0, 35.0, 'Additional practice recommended.');
INSERT INTO public.assessments (id, student_id, title, subject, assessment_type, term, assessment_date, score, max_score, weight_percentage, feedback)
VALUES ('0333b644-c3ce-4e55-9fa2-b2445566f1b0', 'b208e78a-2f96-4e70-bc46-99e51f4d6543', 'Physics Unit Quiz 1', 'Physics', 'quiz', 'AY 2024-25 Term 2', '2025-08-15', 13.0, 20.0, 15.0, 'Additional practice recommended.');
INSERT INTO public.assessments (id, student_id, title, subject, assessment_type, term, assessment_date, score, max_score, weight_percentage, feedback)
VALUES ('7b2fbe93-4c41-4817-bd6e-01583368a081', 'b208e78a-2f96-4e70-bc46-99e51f4d6543', 'History & Civics Unit Quiz 1', 'History & Civics', 'quiz', 'AY 2024-25 Term 2', '2025-08-15', 8.5, 20.0, 15.0, 'Additional practice recommended.');
INSERT INTO public.assessments (id, student_id, title, subject, assessment_type, term, assessment_date, score, max_score, weight_percentage, feedback)
VALUES ('f246e3c4-cad9-4c83-9ca6-4c43346b4fa1', 'b208e78a-2f96-4e70-bc46-99e51f4d6543', 'English Literature Unit Quiz 1', 'English Literature', 'quiz', 'AY 2024-25 Term 2', '2025-08-15', 12.2, 20.0, 15.0, 'Additional practice recommended.');
INSERT INTO public.assessments (id, student_id, title, subject, assessment_type, term, assessment_date, score, max_score, weight_percentage, feedback)
VALUES ('3f0e3056-e32b-4ce0-852f-22ddc80efd47', 'b208e78a-2f96-4e70-bc46-99e51f4d6543', 'Chemistry Laboratory Practical 1', 'Chemistry', 'lab', 'AY 2024-25 Term 2', '2025-08-25', 12.2, 25.0, 15.0, 'Additional practice recommended.');
INSERT INTO public.assessments (id, student_id, title, subject, assessment_type, term, assessment_date, score, max_score, weight_percentage, feedback)
VALUES ('19bb9562-3afc-47c7-95d6-5f17b01fac90', 'b208e78a-2f96-4e70-bc46-99e51f4d6543', 'Computer Science Laboratory Practical 1', 'Computer Science', 'lab', 'AY 2024-25 Term 2', '2025-08-25', 15.6, 25.0, 15.0, 'Additional practice recommended.');
INSERT INTO public.assessments (id, student_id, title, subject, assessment_type, term, assessment_date, score, max_score, weight_percentage, feedback)
VALUES ('288f8b19-2870-453a-967d-e9789cb300bf', 'b208e78a-2f96-4e70-bc46-99e51f4d6543', 'Physics Laboratory Practical 1', 'Physics', 'lab', 'AY 2024-25 Term 2', '2025-08-25', 11.2, 25.0, 15.0, 'Additional practice recommended.');
INSERT INTO public.assessments (id, student_id, title, subject, assessment_type, term, assessment_date, score, max_score, weight_percentage, feedback)
VALUES ('cc045c1c-983e-45a6-a7dd-c832965db820', 'b208e78a-2f96-4e70-bc46-99e51f4d6543', 'Mathematics Midterm Examination', 'Mathematics', 'midterm', 'AY 2024-25 Term 2', '2025-09-10', 47.2, 100.0, 15.0, 'Additional practice recommended.');
INSERT INTO public.assessments (id, student_id, title, subject, assessment_type, term, assessment_date, score, max_score, weight_percentage, feedback)
VALUES ('5202c467-fe73-41b1-8619-631d38c1cc37', 'b208e78a-2f96-4e70-bc46-99e51f4d6543', 'Computer Science Midterm Examination', 'Computer Science', 'midterm', 'AY 2024-25 Term 2', '2025-09-10', 65.9, 100.0, 15.0, 'Evaluation recorded.');
INSERT INTO public.assessments (id, student_id, title, subject, assessment_type, term, assessment_date, score, max_score, weight_percentage, feedback)
VALUES ('a6ab8956-4028-4975-b12b-2fe55c746ce8', 'b208e78a-2f96-4e70-bc46-99e51f4d6543', 'Physics Midterm Examination', 'Physics', 'midterm', 'AY 2024-25 Term 2', '2025-09-10', 51.1, 100.0, 15.0, 'Additional practice recommended.');
INSERT INTO public.assessments (id, student_id, title, subject, assessment_type, term, assessment_date, score, max_score, weight_percentage, feedback)
VALUES ('b13e8a30-e4df-45d5-9b51-c13a345aa5e9', 'b208e78a-2f96-4e70-bc46-99e51f4d6543', 'Physics Unit Assignment 2', 'Physics', 'assignment', 'AY 2024-25 Term 2', '2025-09-28', 17.7, 30.0, 15.0, 'Additional practice recommended.');
INSERT INTO public.assessments (id, student_id, title, subject, assessment_type, term, assessment_date, score, max_score, weight_percentage, feedback)
VALUES ('7d924a01-4a53-4d4d-9234-7ee356c91dce', 'b208e78a-2f96-4e70-bc46-99e51f4d6543', 'History & Civics Unit Assignment 2', 'History & Civics', 'assignment', 'AY 2024-25 Term 2', '2025-09-28', 15.7, 30.0, 15.0, 'Additional practice recommended.');
INSERT INTO public.assessments (id, student_id, title, subject, assessment_type, term, assessment_date, score, max_score, weight_percentage, feedback)
VALUES ('a8790f1a-81ec-4d95-bb10-b8abbe039565', 'b208e78a-2f96-4e70-bc46-99e51f4d6543', 'Mathematics Unit Assignment 2', 'Mathematics', 'assignment', 'AY 2024-25 Term 2', '2025-09-28', 14.8, 30.0, 15.0, 'Additional practice recommended.');
INSERT INTO public.assessments (id, student_id, title, subject, assessment_type, term, assessment_date, score, max_score, weight_percentage, feedback)
VALUES ('6c8be44e-add4-4db8-8935-54f00751c0c9', 'b208e78a-2f96-4e70-bc46-99e51f4d6543', 'Mathematics Term Project Evaluation', 'Mathematics', 'project', 'AY 2024-25 Term 2', '2025-10-15', 29.3, 50.0, 15.0, 'Additional practice recommended.');
INSERT INTO public.assessments (id, student_id, title, subject, assessment_type, term, assessment_date, score, max_score, weight_percentage, feedback)
VALUES ('6a8219c4-e1b5-4b3e-9b11-28c49b753def', 'b208e78a-2f96-4e70-bc46-99e51f4d6543', 'Chemistry Term Project Evaluation', 'Chemistry', 'project', 'AY 2024-25 Term 2', '2025-10-15', 26.2, 50.0, 15.0, 'Additional practice recommended.');
INSERT INTO public.assessments (id, student_id, title, subject, assessment_type, term, assessment_date, score, max_score, weight_percentage, feedback)
VALUES ('9e88e4ff-369b-4a85-9e37-7ee1063a2a37', 'b208e78a-2f96-4e70-bc46-99e51f4d6543', 'English Literature Term Project Evaluation', 'English Literature', 'project', 'AY 2024-25 Term 2', '2025-10-15', 33.8, 50.0, 15.0, 'Additional practice recommended.');
INSERT INTO public.assessments (id, student_id, title, subject, assessment_type, term, assessment_date, score, max_score, weight_percentage, feedback)
VALUES ('2c1f8e1d-25ba-4cb9-98ec-b91597dded89', 'b208e78a-2f96-4e70-bc46-99e51f4d6543', 'English Literature Term Final Examination', 'English Literature', 'final', 'AY 2024-25 Term 2', '2025-11-05', 45.0, 100.0, 35.0, 'Additional practice recommended.');
INSERT INTO public.assessments (id, student_id, title, subject, assessment_type, term, assessment_date, score, max_score, weight_percentage, feedback)
VALUES ('1c4947e3-c6bf-4cb3-87b1-3bb9edf2a367', 'b208e78a-2f96-4e70-bc46-99e51f4d6543', 'Chemistry Term Final Examination', 'Chemistry', 'final', 'AY 2024-25 Term 2', '2025-11-05', 67.2, 100.0, 35.0, 'Evaluation recorded.');
INSERT INTO public.assessments (id, student_id, title, subject, assessment_type, term, assessment_date, score, max_score, weight_percentage, feedback)
VALUES ('c3231706-2f8d-4891-a6af-15955b26f40f', 'b208e78a-2f96-4e70-bc46-99e51f4d6543', 'Mathematics Term Final Examination', 'Mathematics', 'final', 'AY 2024-25 Term 2', '2025-11-05', 46.6, 100.0, 35.0, 'Additional practice recommended.');
INSERT INTO public.assessments (id, student_id, title, subject, assessment_type, term, assessment_date, score, max_score, weight_percentage, feedback)
VALUES ('92b654d5-8344-49a2-b76c-687bb70ed66c', 'bef6289e-41de-428e-b7bf-13a855d6e54e', 'English Literature Unit Quiz 1', 'English Literature', 'quiz', 'AY 2025-26 Term 1', '2025-08-15', 14.1, 20.0, 15.0, 'Additional practice recommended.');
INSERT INTO public.assessments (id, student_id, title, subject, assessment_type, term, assessment_date, score, max_score, weight_percentage, feedback)
VALUES ('ffba28c0-56ea-4c87-a9e8-641535e0cf93', 'bef6289e-41de-428e-b7bf-13a855d6e54e', 'Physics Unit Quiz 1', 'Physics', 'quiz', 'AY 2025-26 Term 1', '2025-08-15', 16.2, 20.0, 15.0, 'Additional practice recommended.');
INSERT INTO public.assessments (id, student_id, title, subject, assessment_type, term, assessment_date, score, max_score, weight_percentage, feedback)
VALUES ('60dc0aec-ade7-4cb7-b170-6decca1fe3d2', 'bef6289e-41de-428e-b7bf-13a855d6e54e', 'History & Civics Unit Quiz 1', 'History & Civics', 'quiz', 'AY 2025-26 Term 1', '2025-08-15', 15.1, 20.0, 15.0, 'Additional practice recommended.');
INSERT INTO public.assessments (id, student_id, title, subject, assessment_type, term, assessment_date, score, max_score, weight_percentage, feedback)
VALUES ('ff7982b0-8cdd-43b6-b7f4-2d9ecfc88b60', 'bef6289e-41de-428e-b7bf-13a855d6e54e', 'Physics Laboratory Practical 1', 'Physics', 'lab', 'AY 2025-26 Term 1', '2025-08-25', 17.5, 25.0, 15.0, 'Additional practice recommended.');
INSERT INTO public.assessments (id, student_id, title, subject, assessment_type, term, assessment_date, score, max_score, weight_percentage, feedback)
VALUES ('4f1d6117-ecbc-43b2-81ed-fd7f0f608e22', 'bef6289e-41de-428e-b7bf-13a855d6e54e', 'English Literature Laboratory Practical 1', 'English Literature', 'lab', 'AY 2025-26 Term 1', '2025-08-25', 19.7, 25.0, 15.0, 'Additional practice recommended.');
INSERT INTO public.assessments (id, student_id, title, subject, assessment_type, term, assessment_date, score, max_score, weight_percentage, feedback)
VALUES ('d70b45ef-e66b-41f1-b477-550bb3438b68', 'bef6289e-41de-428e-b7bf-13a855d6e54e', 'Chemistry Laboratory Practical 1', 'Chemistry', 'lab', 'AY 2025-26 Term 1', '2025-08-25', 17.0, 25.0, 15.0, 'Additional practice recommended.');
INSERT INTO public.assessments (id, student_id, title, subject, assessment_type, term, assessment_date, score, max_score, weight_percentage, feedback)
VALUES ('4c6539bf-77b1-4c84-8d7b-fcb9b963818c', 'bef6289e-41de-428e-b7bf-13a855d6e54e', 'Physics Midterm Examination', 'Physics', 'midterm', 'AY 2025-26 Term 1', '2025-09-10', 71.3, 100.0, 15.0, 'Evaluation recorded.');
INSERT INTO public.assessments (id, student_id, title, subject, assessment_type, term, assessment_date, score, max_score, weight_percentage, feedback)
VALUES ('4f9ff48d-8628-4238-bf28-81ff8dc962d3', 'bef6289e-41de-428e-b7bf-13a855d6e54e', 'Computer Science Midterm Examination', 'Computer Science', 'midterm', 'AY 2025-26 Term 1', '2025-09-10', 70.8, 100.0, 15.0, 'Evaluation recorded.');
INSERT INTO public.assessments (id, student_id, title, subject, assessment_type, term, assessment_date, score, max_score, weight_percentage, feedback)
VALUES ('e78ab6a7-bd4d-40c9-9af5-fc3cfe4f90ab', 'bef6289e-41de-428e-b7bf-13a855d6e54e', 'Chemistry Midterm Examination', 'Chemistry', 'midterm', 'AY 2025-26 Term 1', '2025-09-10', 66.3, 100.0, 15.0, 'Evaluation recorded.');
INSERT INTO public.assessments (id, student_id, title, subject, assessment_type, term, assessment_date, score, max_score, weight_percentage, feedback)
VALUES ('6c4e9d81-b73f-4e8d-8611-4c6876d4ed78', 'bef6289e-41de-428e-b7bf-13a855d6e54e', 'Computer Science Unit Assignment 2', 'Computer Science', 'assignment', 'AY 2025-26 Term 1', '2025-09-28', 20.3, 30.0, 15.0, 'Additional practice recommended.');
INSERT INTO public.assessments (id, student_id, title, subject, assessment_type, term, assessment_date, score, max_score, weight_percentage, feedback)
VALUES ('02aaee21-46af-4df2-9c2f-8181e2b9e74a', 'bef6289e-41de-428e-b7bf-13a855d6e54e', 'Physics Unit Assignment 2', 'Physics', 'assignment', 'AY 2025-26 Term 1', '2025-09-28', 22.6, 30.0, 15.0, 'Additional practice recommended.');
INSERT INTO public.assessments (id, student_id, title, subject, assessment_type, term, assessment_date, score, max_score, weight_percentage, feedback)
VALUES ('ba742256-a468-4318-96a8-dc000471d377', 'bef6289e-41de-428e-b7bf-13a855d6e54e', 'Mathematics Unit Assignment 2', 'Mathematics', 'assignment', 'AY 2025-26 Term 1', '2025-09-28', 22.3, 30.0, 15.0, 'Additional practice recommended.');
INSERT INTO public.assessments (id, student_id, title, subject, assessment_type, term, assessment_date, score, max_score, weight_percentage, feedback)
VALUES ('9f72e445-53d1-4b70-91e4-935ed11fe10f', 'bef6289e-41de-428e-b7bf-13a855d6e54e', 'Mathematics Term Project Evaluation', 'Mathematics', 'project', 'AY 2025-26 Term 1', '2025-10-15', 33.2, 50.0, 15.0, 'Additional practice recommended.');
INSERT INTO public.assessments (id, student_id, title, subject, assessment_type, term, assessment_date, score, max_score, weight_percentage, feedback)
VALUES ('ed9d8600-710a-40e4-bbcd-3485b1f84440', 'bef6289e-41de-428e-b7bf-13a855d6e54e', 'Physics Term Project Evaluation', 'Physics', 'project', 'AY 2025-26 Term 1', '2025-10-15', 33.0, 50.0, 15.0, 'Additional practice recommended.');
INSERT INTO public.assessments (id, student_id, title, subject, assessment_type, term, assessment_date, score, max_score, weight_percentage, feedback)
VALUES ('31e4f301-9533-4c33-bec7-027214c8c6b2', 'bef6289e-41de-428e-b7bf-13a855d6e54e', 'Chemistry Term Project Evaluation', 'Chemistry', 'project', 'AY 2025-26 Term 1', '2025-10-15', 31.2, 50.0, 15.0, 'Additional practice recommended.');
INSERT INTO public.assessments (id, student_id, title, subject, assessment_type, term, assessment_date, score, max_score, weight_percentage, feedback)
VALUES ('6996dd98-dc8d-4e80-a660-e1846b0dd428', 'bef6289e-41de-428e-b7bf-13a855d6e54e', 'Physics Term Final Examination', 'Physics', 'final', 'AY 2025-26 Term 1', '2025-11-05', 71.1, 100.0, 35.0, 'Evaluation recorded.');
INSERT INTO public.assessments (id, student_id, title, subject, assessment_type, term, assessment_date, score, max_score, weight_percentage, feedback)
VALUES ('eb284653-7350-4478-ad3d-22bf57d12a06', 'bef6289e-41de-428e-b7bf-13a855d6e54e', 'Computer Science Term Final Examination', 'Computer Science', 'final', 'AY 2025-26 Term 1', '2025-11-05', 79.7, 100.0, 35.0, 'Evaluation recorded.');
INSERT INTO public.assessments (id, student_id, title, subject, assessment_type, term, assessment_date, score, max_score, weight_percentage, feedback)
VALUES ('1c2dd090-a9d7-4667-baf5-408f16dd8cc2', 'bef6289e-41de-428e-b7bf-13a855d6e54e', 'Mathematics Term Final Examination', 'Mathematics', 'final', 'AY 2025-26 Term 1', '2025-11-05', 73.5, 100.0, 35.0, 'Evaluation recorded.');
INSERT INTO public.assessments (id, student_id, title, subject, assessment_type, term, assessment_date, score, max_score, weight_percentage, feedback)
VALUES ('f19a690d-38f5-4d2c-9ae1-26e0acc31afe', 'fef234a8-0c9c-468f-9383-f850a6082dc6', 'Computer Science Unit Quiz 1', 'Computer Science', 'quiz', 'AY 2025-26 Term 2', '2025-08-15', 14.2, 20.0, 15.0, 'Additional practice recommended.');
INSERT INTO public.assessments (id, student_id, title, subject, assessment_type, term, assessment_date, score, max_score, weight_percentage, feedback)
VALUES ('a52573cb-a9ed-41ac-b08c-88070cc95907', 'fef234a8-0c9c-468f-9383-f850a6082dc6', 'Physics Unit Quiz 1', 'Physics', 'quiz', 'AY 2025-26 Term 2', '2025-08-15', 15.4, 20.0, 15.0, 'Additional practice recommended.');
INSERT INTO public.assessments (id, student_id, title, subject, assessment_type, term, assessment_date, score, max_score, weight_percentage, feedback)
VALUES ('d86aca7f-ddf3-4300-82f4-7c4c9f3db1c2', 'fef234a8-0c9c-468f-9383-f850a6082dc6', 'History & Civics Unit Quiz 1', 'History & Civics', 'quiz', 'AY 2025-26 Term 2', '2025-08-15', 15.8, 20.0, 15.0, 'Additional practice recommended.');
INSERT INTO public.assessments (id, student_id, title, subject, assessment_type, term, assessment_date, score, max_score, weight_percentage, feedback)
VALUES ('d4eb07a5-0c40-46c6-a5a5-b71308454422', 'fef234a8-0c9c-468f-9383-f850a6082dc6', 'Chemistry Laboratory Practical 1', 'Chemistry', 'lab', 'AY 2025-26 Term 2', '2025-08-25', 18.6, 25.0, 15.0, 'Additional practice recommended.');
INSERT INTO public.assessments (id, student_id, title, subject, assessment_type, term, assessment_date, score, max_score, weight_percentage, feedback)
VALUES ('815b47e4-ef42-4677-b340-87c746501ddd', 'fef234a8-0c9c-468f-9383-f850a6082dc6', 'English Literature Laboratory Practical 1', 'English Literature', 'lab', 'AY 2025-26 Term 2', '2025-08-25', 16.9, 25.0, 15.0, 'Additional practice recommended.');
INSERT INTO public.assessments (id, student_id, title, subject, assessment_type, term, assessment_date, score, max_score, weight_percentage, feedback)
VALUES ('caeae19e-8f5b-44af-9df2-1662429fed1f', 'fef234a8-0c9c-468f-9383-f850a6082dc6', 'Computer Science Laboratory Practical 1', 'Computer Science', 'lab', 'AY 2025-26 Term 2', '2025-08-25', 15.9, 25.0, 15.0, 'Additional practice recommended.');
INSERT INTO public.assessments (id, student_id, title, subject, assessment_type, term, assessment_date, score, max_score, weight_percentage, feedback)
VALUES ('df0d7b6b-1ea3-4429-bffe-42db4e4ade41', 'fef234a8-0c9c-468f-9383-f850a6082dc6', 'Chemistry Midterm Examination', 'Chemistry', 'midterm', 'AY 2025-26 Term 2', '2025-09-10', 68.7, 100.0, 15.0, 'Evaluation recorded.');
INSERT INTO public.assessments (id, student_id, title, subject, assessment_type, term, assessment_date, score, max_score, weight_percentage, feedback)
VALUES ('9c3b0eda-555a-484b-8ab5-161023eaa473', 'fef234a8-0c9c-468f-9383-f850a6082dc6', 'Physics Midterm Examination', 'Physics', 'midterm', 'AY 2025-26 Term 2', '2025-09-10', 79.9, 100.0, 15.0, 'Evaluation recorded.');
INSERT INTO public.assessments (id, student_id, title, subject, assessment_type, term, assessment_date, score, max_score, weight_percentage, feedback)
VALUES ('c671a7f4-5fbe-428a-9ea1-b45e209413d9', 'fef234a8-0c9c-468f-9383-f850a6082dc6', 'History & Civics Midterm Examination', 'History & Civics', 'midterm', 'AY 2025-26 Term 2', '2025-09-10', 63.6, 100.0, 15.0, 'Evaluation recorded.');
INSERT INTO public.assessments (id, student_id, title, subject, assessment_type, term, assessment_date, score, max_score, weight_percentage, feedback)
VALUES ('89c6ea1c-bfdc-40da-b1e1-d14a0942ed41', 'fef234a8-0c9c-468f-9383-f850a6082dc6', 'Physics Unit Assignment 2', 'Physics', 'assignment', 'AY 2025-26 Term 2', '2025-09-28', 22.8, 30.0, 15.0, 'Additional practice recommended.');
INSERT INTO public.assessments (id, student_id, title, subject, assessment_type, term, assessment_date, score, max_score, weight_percentage, feedback)
VALUES ('f7e228f6-bc09-4d5d-8e81-073f97b68c70', 'fef234a8-0c9c-468f-9383-f850a6082dc6', 'History & Civics Unit Assignment 2', 'History & Civics', 'assignment', 'AY 2025-26 Term 2', '2025-09-28', 22.8, 30.0, 15.0, 'Additional practice recommended.');
INSERT INTO public.assessments (id, student_id, title, subject, assessment_type, term, assessment_date, score, max_score, weight_percentage, feedback)
VALUES ('0f6c9830-e869-4377-9d52-857222826819', 'fef234a8-0c9c-468f-9383-f850a6082dc6', 'Computer Science Unit Assignment 2', 'Computer Science', 'assignment', 'AY 2025-26 Term 2', '2025-09-28', 19.0, 30.0, 15.0, 'Additional practice recommended.');
INSERT INTO public.assessments (id, student_id, title, subject, assessment_type, term, assessment_date, score, max_score, weight_percentage, feedback)
VALUES ('ef528a65-cff9-4bfb-aab3-fe04c36864a6', 'fef234a8-0c9c-468f-9383-f850a6082dc6', 'Computer Science Term Project Evaluation', 'Computer Science', 'project', 'AY 2025-26 Term 2', '2025-10-15', 35.2, 50.0, 15.0, 'Additional practice recommended.');
INSERT INTO public.assessments (id, student_id, title, subject, assessment_type, term, assessment_date, score, max_score, weight_percentage, feedback)
VALUES ('09b106f4-c4fc-4529-b135-8ed06d21f506', 'fef234a8-0c9c-468f-9383-f850a6082dc6', 'Chemistry Term Project Evaluation', 'Chemistry', 'project', 'AY 2025-26 Term 2', '2025-10-15', 33.1, 50.0, 15.0, 'Additional practice recommended.');
INSERT INTO public.assessments (id, student_id, title, subject, assessment_type, term, assessment_date, score, max_score, weight_percentage, feedback)
VALUES ('4703e547-4e63-4666-a401-472ea135a70b', 'fef234a8-0c9c-468f-9383-f850a6082dc6', 'History & Civics Term Project Evaluation', 'History & Civics', 'project', 'AY 2025-26 Term 2', '2025-10-15', 35.2, 50.0, 15.0, 'Additional practice recommended.');
INSERT INTO public.assessments (id, student_id, title, subject, assessment_type, term, assessment_date, score, max_score, weight_percentage, feedback)
VALUES ('2e57cf99-7700-4cfb-bc53-a1df722cc656', 'fef234a8-0c9c-468f-9383-f850a6082dc6', 'English Literature Term Final Examination', 'English Literature', 'final', 'AY 2025-26 Term 2', '2025-11-05', 71.5, 100.0, 35.0, 'Evaluation recorded.');
INSERT INTO public.assessments (id, student_id, title, subject, assessment_type, term, assessment_date, score, max_score, weight_percentage, feedback)
VALUES ('fbeff38a-a94b-4ce9-a7a5-738824d4c2aa', 'fef234a8-0c9c-468f-9383-f850a6082dc6', 'Mathematics Term Final Examination', 'Mathematics', 'final', 'AY 2025-26 Term 2', '2025-11-05', 80.9, 100.0, 35.0, 'Evaluation recorded.');
INSERT INTO public.assessments (id, student_id, title, subject, assessment_type, term, assessment_date, score, max_score, weight_percentage, feedback)
VALUES ('76235ed2-501d-4dd4-aec6-e7a3dd91ecc8', 'fef234a8-0c9c-468f-9383-f850a6082dc6', 'Computer Science Term Final Examination', 'Computer Science', 'final', 'AY 2025-26 Term 2', '2025-11-05', 68.0, 100.0, 35.0, 'Evaluation recorded.');
INSERT INTO public.assessments (id, student_id, title, subject, assessment_type, term, assessment_date, score, max_score, weight_percentage, feedback)
VALUES ('92d7f07d-d654-4d0c-8717-71f229aaef84', 'b7263fba-7dd1-48ee-99f4-be591aab11ad', 'Chemistry Unit Quiz 1', 'Chemistry', 'quiz', 'AY 2024-25 Term 1', '2025-08-15', 15.7, 20.0, 15.0, 'Additional practice recommended.');
INSERT INTO public.assessments (id, student_id, title, subject, assessment_type, term, assessment_date, score, max_score, weight_percentage, feedback)
VALUES ('7a64340f-763a-435d-8023-7d8b397e0456', 'b7263fba-7dd1-48ee-99f4-be591aab11ad', 'Computer Science Unit Quiz 1', 'Computer Science', 'quiz', 'AY 2024-25 Term 1', '2025-08-15', 14.3, 20.0, 15.0, 'Additional practice recommended.');
INSERT INTO public.assessments (id, student_id, title, subject, assessment_type, term, assessment_date, score, max_score, weight_percentage, feedback)
VALUES ('73d50fa2-58a4-41cd-8c2c-9517dbfd21db', 'b7263fba-7dd1-48ee-99f4-be591aab11ad', 'History & Civics Unit Quiz 1', 'History & Civics', 'quiz', 'AY 2024-25 Term 1', '2025-08-15', 15.4, 20.0, 15.0, 'Additional practice recommended.');
INSERT INTO public.assessments (id, student_id, title, subject, assessment_type, term, assessment_date, score, max_score, weight_percentage, feedback)
VALUES ('90206084-a586-47b9-859c-689e56fe2b36', 'b7263fba-7dd1-48ee-99f4-be591aab11ad', 'Mathematics Laboratory Practical 1', 'Mathematics', 'lab', 'AY 2024-25 Term 1', '2025-08-25', 18.8, 25.0, 15.0, 'Additional practice recommended.');
INSERT INTO public.assessments (id, student_id, title, subject, assessment_type, term, assessment_date, score, max_score, weight_percentage, feedback)
VALUES ('e309a915-667e-4463-9b06-2246d3e8fe56', 'b7263fba-7dd1-48ee-99f4-be591aab11ad', 'Chemistry Laboratory Practical 1', 'Chemistry', 'lab', 'AY 2024-25 Term 1', '2025-08-25', 19.4, 25.0, 15.0, 'Additional practice recommended.');
INSERT INTO public.assessments (id, student_id, title, subject, assessment_type, term, assessment_date, score, max_score, weight_percentage, feedback)
VALUES ('7f1331b8-76fd-48ff-a2c3-10e2fc8070dc', 'b7263fba-7dd1-48ee-99f4-be591aab11ad', 'Physics Laboratory Practical 1', 'Physics', 'lab', 'AY 2024-25 Term 1', '2025-08-25', 18.8, 25.0, 15.0, 'Additional practice recommended.');
INSERT INTO public.assessments (id, student_id, title, subject, assessment_type, term, assessment_date, score, max_score, weight_percentage, feedback)
VALUES ('564dbe16-a6ae-4bfc-9a9f-156aa62e36fa', 'b7263fba-7dd1-48ee-99f4-be591aab11ad', 'Mathematics Midterm Examination', 'Mathematics', 'midterm', 'AY 2024-25 Term 1', '2025-09-10', 78.8, 100.0, 15.0, 'Evaluation recorded.');
INSERT INTO public.assessments (id, student_id, title, subject, assessment_type, term, assessment_date, score, max_score, weight_percentage, feedback)
VALUES ('8b699e8d-c37a-40a5-bc36-173d25c8bf19', 'b7263fba-7dd1-48ee-99f4-be591aab11ad', 'Physics Midterm Examination', 'Physics', 'midterm', 'AY 2024-25 Term 1', '2025-09-10', 74.4, 100.0, 15.0, 'Evaluation recorded.');
INSERT INTO public.assessments (id, student_id, title, subject, assessment_type, term, assessment_date, score, max_score, weight_percentage, feedback)
VALUES ('e64890e2-5463-4df4-ad56-0eaedd9ca83c', 'b7263fba-7dd1-48ee-99f4-be591aab11ad', 'English Literature Midterm Examination', 'English Literature', 'midterm', 'AY 2024-25 Term 1', '2025-09-10', 66.8, 100.0, 15.0, 'Evaluation recorded.');
INSERT INTO public.assessments (id, student_id, title, subject, assessment_type, term, assessment_date, score, max_score, weight_percentage, feedback)
VALUES ('784291b7-02b4-44e1-8c42-3d0dfb6c4a32', 'b7263fba-7dd1-48ee-99f4-be591aab11ad', 'Computer Science Unit Assignment 2', 'Computer Science', 'assignment', 'AY 2024-25 Term 1', '2025-09-28', 21.4, 30.0, 15.0, 'Additional practice recommended.');
INSERT INTO public.assessments (id, student_id, title, subject, assessment_type, term, assessment_date, score, max_score, weight_percentage, feedback)
VALUES ('eac99a56-498d-42d0-a2c6-05f3425e0a10', 'b7263fba-7dd1-48ee-99f4-be591aab11ad', 'Mathematics Unit Assignment 2', 'Mathematics', 'assignment', 'AY 2024-25 Term 1', '2025-09-28', 20.1, 30.0, 15.0, 'Additional practice recommended.');
INSERT INTO public.assessments (id, student_id, title, subject, assessment_type, term, assessment_date, score, max_score, weight_percentage, feedback)
VALUES ('696db288-28a3-49fd-960d-6dd43a6cdf50', 'b7263fba-7dd1-48ee-99f4-be591aab11ad', 'Physics Unit Assignment 2', 'Physics', 'assignment', 'AY 2024-25 Term 1', '2025-09-28', 20.8, 30.0, 15.0, 'Additional practice recommended.');
INSERT INTO public.assessments (id, student_id, title, subject, assessment_type, term, assessment_date, score, max_score, weight_percentage, feedback)
VALUES ('0f92b4f0-de6a-4cb2-b2f6-a30212fa3b4d', 'b7263fba-7dd1-48ee-99f4-be591aab11ad', 'English Literature Term Project Evaluation', 'English Literature', 'project', 'AY 2024-25 Term 1', '2025-10-15', 38.8, 50.0, 15.0, 'Additional practice recommended.');
INSERT INTO public.assessments (id, student_id, title, subject, assessment_type, term, assessment_date, score, max_score, weight_percentage, feedback)
VALUES ('7e26a833-733c-4611-ad1e-5f43505c1a2a', 'b7263fba-7dd1-48ee-99f4-be591aab11ad', 'History & Civics Term Project Evaluation', 'History & Civics', 'project', 'AY 2024-25 Term 1', '2025-10-15', 32.6, 50.0, 15.0, 'Additional practice recommended.');
INSERT INTO public.assessments (id, student_id, title, subject, assessment_type, term, assessment_date, score, max_score, weight_percentage, feedback)
VALUES ('3bf7aaab-d951-4c39-b8e8-0be2076cc1c4', 'b7263fba-7dd1-48ee-99f4-be591aab11ad', 'Mathematics Term Project Evaluation', 'Mathematics', 'project', 'AY 2024-25 Term 1', '2025-10-15', 34.1, 50.0, 15.0, 'Additional practice recommended.');
INSERT INTO public.assessments (id, student_id, title, subject, assessment_type, term, assessment_date, score, max_score, weight_percentage, feedback)
VALUES ('9b98037f-18e3-4c19-885d-39eff5c8dbdd', 'b7263fba-7dd1-48ee-99f4-be591aab11ad', 'English Literature Term Final Examination', 'English Literature', 'final', 'AY 2024-25 Term 1', '2025-11-05', 73.5, 100.0, 35.0, 'Evaluation recorded.');
INSERT INTO public.assessments (id, student_id, title, subject, assessment_type, term, assessment_date, score, max_score, weight_percentage, feedback)
VALUES ('fc63bb5b-7a1f-4c7f-9796-8579a8a267f0', 'b7263fba-7dd1-48ee-99f4-be591aab11ad', 'Mathematics Term Final Examination', 'Mathematics', 'final', 'AY 2024-25 Term 1', '2025-11-05', 80.2, 100.0, 35.0, 'Evaluation recorded.');
INSERT INTO public.assessments (id, student_id, title, subject, assessment_type, term, assessment_date, score, max_score, weight_percentage, feedback)
VALUES ('f5721f69-887d-4fc6-a974-a19c0a3b2b9c', 'b7263fba-7dd1-48ee-99f4-be591aab11ad', 'Chemistry Term Final Examination', 'Chemistry', 'final', 'AY 2024-25 Term 1', '2025-11-05', 69.5, 100.0, 35.0, 'Evaluation recorded.');
INSERT INTO public.assessments (id, student_id, title, subject, assessment_type, term, assessment_date, score, max_score, weight_percentage, feedback)
VALUES ('3376e48e-7e58-4a3b-b2e8-58e592fbb9e6', 'f76a0ab1-57e1-482c-a611-f09c0932d6b8', 'History & Civics Unit Quiz 1', 'History & Civics', 'quiz', 'AY 2024-25 Term 2', '2025-08-15', 13.7, 20.0, 15.0, 'Additional practice recommended.');
INSERT INTO public.assessments (id, student_id, title, subject, assessment_type, term, assessment_date, score, max_score, weight_percentage, feedback)
VALUES ('fca4e1e1-78b3-424a-b80c-9843b64c3cd6', 'f76a0ab1-57e1-482c-a611-f09c0932d6b8', 'English Literature Unit Quiz 1', 'English Literature', 'quiz', 'AY 2024-25 Term 2', '2025-08-15', 13.4, 20.0, 15.0, 'Additional practice recommended.');
INSERT INTO public.assessments (id, student_id, title, subject, assessment_type, term, assessment_date, score, max_score, weight_percentage, feedback)
VALUES ('f9c0739b-872d-409d-993d-098bea616008', 'f76a0ab1-57e1-482c-a611-f09c0932d6b8', 'Chemistry Unit Quiz 1', 'Chemistry', 'quiz', 'AY 2024-25 Term 2', '2025-08-15', 16.1, 20.0, 15.0, 'Additional practice recommended.');
INSERT INTO public.assessments (id, student_id, title, subject, assessment_type, term, assessment_date, score, max_score, weight_percentage, feedback)
VALUES ('e85940bd-ae5a-4f10-9672-8f5c4f964b8d', 'f76a0ab1-57e1-482c-a611-f09c0932d6b8', 'Chemistry Laboratory Practical 1', 'Chemistry', 'lab', 'AY 2024-25 Term 2', '2025-08-25', 19.3, 25.0, 15.0, 'Additional practice recommended.');
INSERT INTO public.assessments (id, student_id, title, subject, assessment_type, term, assessment_date, score, max_score, weight_percentage, feedback)
VALUES ('76ad3e14-5631-49ca-b830-196aa63e46b7', 'f76a0ab1-57e1-482c-a611-f09c0932d6b8', 'Computer Science Laboratory Practical 1', 'Computer Science', 'lab', 'AY 2024-25 Term 2', '2025-08-25', 18.3, 25.0, 15.0, 'Additional practice recommended.');
INSERT INTO public.assessments (id, student_id, title, subject, assessment_type, term, assessment_date, score, max_score, weight_percentage, feedback)
VALUES ('4cda562f-1246-48c9-a475-7c11de8a8688', 'f76a0ab1-57e1-482c-a611-f09c0932d6b8', 'Physics Laboratory Practical 1', 'Physics', 'lab', 'AY 2024-25 Term 2', '2025-08-25', 18.8, 25.0, 15.0, 'Additional practice recommended.');
INSERT INTO public.assessments (id, student_id, title, subject, assessment_type, term, assessment_date, score, max_score, weight_percentage, feedback)
VALUES ('9c2c684b-885f-471a-ace6-fb8fa3376ead', 'f76a0ab1-57e1-482c-a611-f09c0932d6b8', 'Chemistry Midterm Examination', 'Chemistry', 'midterm', 'AY 2024-25 Term 2', '2025-09-10', 79.0, 100.0, 15.0, 'Evaluation recorded.');
INSERT INTO public.assessments (id, student_id, title, subject, assessment_type, term, assessment_date, score, max_score, weight_percentage, feedback)
VALUES ('01cd3ab2-ec88-4b2e-9782-6e4cdf256f00', 'f76a0ab1-57e1-482c-a611-f09c0932d6b8', 'Mathematics Midterm Examination', 'Mathematics', 'midterm', 'AY 2024-25 Term 2', '2025-09-10', 65.6, 100.0, 15.0, 'Evaluation recorded.');
INSERT INTO public.assessments (id, student_id, title, subject, assessment_type, term, assessment_date, score, max_score, weight_percentage, feedback)
VALUES ('c34fc3ea-ecad-4736-9c8a-85f938fe944f', 'f76a0ab1-57e1-482c-a611-f09c0932d6b8', 'Computer Science Midterm Examination', 'Computer Science', 'midterm', 'AY 2024-25 Term 2', '2025-09-10', 66.2, 100.0, 15.0, 'Evaluation recorded.');
INSERT INTO public.assessments (id, student_id, title, subject, assessment_type, term, assessment_date, score, max_score, weight_percentage, feedback)
VALUES ('387d53ff-6b4c-4cbb-8e52-bb3b93e82ec8', 'f76a0ab1-57e1-482c-a611-f09c0932d6b8', 'Chemistry Unit Assignment 2', 'Chemistry', 'assignment', 'AY 2024-25 Term 2', '2025-09-28', 23.9, 30.0, 15.0, 'Additional practice recommended.');
INSERT INTO public.assessments (id, student_id, title, subject, assessment_type, term, assessment_date, score, max_score, weight_percentage, feedback)
VALUES ('760c9fc6-0600-442a-981e-43718bc2d6e8', 'f76a0ab1-57e1-482c-a611-f09c0932d6b8', 'History & Civics Unit Assignment 2', 'History & Civics', 'assignment', 'AY 2024-25 Term 2', '2025-09-28', 22.8, 30.0, 15.0, 'Additional practice recommended.');
INSERT INTO public.assessments (id, student_id, title, subject, assessment_type, term, assessment_date, score, max_score, weight_percentage, feedback)
VALUES ('d6636ed1-59e8-4be1-808a-c8ebe8e2d019', 'f76a0ab1-57e1-482c-a611-f09c0932d6b8', 'English Literature Unit Assignment 2', 'English Literature', 'assignment', 'AY 2024-25 Term 2', '2025-09-28', 20.3, 30.0, 15.0, 'Additional practice recommended.');
INSERT INTO public.assessments (id, student_id, title, subject, assessment_type, term, assessment_date, score, max_score, weight_percentage, feedback)
VALUES ('bec9b90e-da09-431e-b294-0415a83598b5', 'f76a0ab1-57e1-482c-a611-f09c0932d6b8', 'Mathematics Term Project Evaluation', 'Mathematics', 'project', 'AY 2024-25 Term 2', '2025-10-15', 31.9, 50.0, 15.0, 'Additional practice recommended.');
INSERT INTO public.assessments (id, student_id, title, subject, assessment_type, term, assessment_date, score, max_score, weight_percentage, feedback)
VALUES ('c8e6b924-8aa0-4fbd-8e7d-6db16e178000', 'f76a0ab1-57e1-482c-a611-f09c0932d6b8', 'English Literature Term Project Evaluation', 'English Literature', 'project', 'AY 2024-25 Term 2', '2025-10-15', 38.2, 50.0, 15.0, 'Additional practice recommended.');
INSERT INTO public.assessments (id, student_id, title, subject, assessment_type, term, assessment_date, score, max_score, weight_percentage, feedback)
VALUES ('a3546a95-3c63-4920-8a2c-2a56991c3e35', 'f76a0ab1-57e1-482c-a611-f09c0932d6b8', 'Physics Term Project Evaluation', 'Physics', 'project', 'AY 2024-25 Term 2', '2025-10-15', 35.9, 50.0, 15.0, 'Additional practice recommended.');
INSERT INTO public.assessments (id, student_id, title, subject, assessment_type, term, assessment_date, score, max_score, weight_percentage, feedback)
VALUES ('93a201bc-ef04-48f8-a80c-de361e58f5cd', 'f76a0ab1-57e1-482c-a611-f09c0932d6b8', 'Physics Term Final Examination', 'Physics', 'final', 'AY 2024-25 Term 2', '2025-11-05', 71.0, 100.0, 35.0, 'Evaluation recorded.');
INSERT INTO public.assessments (id, student_id, title, subject, assessment_type, term, assessment_date, score, max_score, weight_percentage, feedback)
VALUES ('044f7e2c-96f5-4868-ab6f-fd762c7b9d9a', 'f76a0ab1-57e1-482c-a611-f09c0932d6b8', 'Computer Science Term Final Examination', 'Computer Science', 'final', 'AY 2024-25 Term 2', '2025-11-05', 62.3, 100.0, 35.0, 'Evaluation recorded.');
INSERT INTO public.assessments (id, student_id, title, subject, assessment_type, term, assessment_date, score, max_score, weight_percentage, feedback)
VALUES ('ca3c00bd-06e3-494f-a170-bd1c595a419d', 'f76a0ab1-57e1-482c-a611-f09c0932d6b8', 'English Literature Term Final Examination', 'English Literature', 'final', 'AY 2024-25 Term 2', '2025-11-05', 67.9, 100.0, 35.0, 'Evaluation recorded.');
INSERT INTO public.assessments (id, student_id, title, subject, assessment_type, term, assessment_date, score, max_score, weight_percentage, feedback)
VALUES ('c80aeeef-7b11-462c-9e05-0a0aa1bc65b2', 'eca115ce-9ee0-4d3c-965d-e0a3a33b40c7', 'History & Civics Unit Quiz 1', 'History & Civics', 'quiz', 'AY 2025-26 Term 1', '2025-08-15', 13.5, 20.0, 15.0, 'Additional practice recommended.');
INSERT INTO public.assessments (id, student_id, title, subject, assessment_type, term, assessment_date, score, max_score, weight_percentage, feedback)
VALUES ('025cb401-c3f4-42df-a7cb-c0add31eeb62', 'eca115ce-9ee0-4d3c-965d-e0a3a33b40c7', 'English Literature Unit Quiz 1', 'English Literature', 'quiz', 'AY 2025-26 Term 1', '2025-08-15', 16.3, 20.0, 15.0, 'Additional practice recommended.');
INSERT INTO public.assessments (id, student_id, title, subject, assessment_type, term, assessment_date, score, max_score, weight_percentage, feedback)
VALUES ('100687c2-c634-4ce2-b498-82e113e71b28', 'eca115ce-9ee0-4d3c-965d-e0a3a33b40c7', 'Physics Unit Quiz 1', 'Physics', 'quiz', 'AY 2025-26 Term 1', '2025-08-15', 14.6, 20.0, 15.0, 'Additional practice recommended.');
INSERT INTO public.assessments (id, student_id, title, subject, assessment_type, term, assessment_date, score, max_score, weight_percentage, feedback)
VALUES ('9213e94b-81f3-4f84-b112-ab3cb623bb17', 'eca115ce-9ee0-4d3c-965d-e0a3a33b40c7', 'History & Civics Laboratory Practical 1', 'History & Civics', 'lab', 'AY 2025-26 Term 1', '2025-08-25', 16.0, 25.0, 15.0, 'Additional practice recommended.');
INSERT INTO public.assessments (id, student_id, title, subject, assessment_type, term, assessment_date, score, max_score, weight_percentage, feedback)
VALUES ('11bebcd0-b71b-423d-9485-3101435ecf32', 'eca115ce-9ee0-4d3c-965d-e0a3a33b40c7', 'Physics Laboratory Practical 1', 'Physics', 'lab', 'AY 2025-26 Term 1', '2025-08-25', 15.6, 25.0, 15.0, 'Additional practice recommended.');
INSERT INTO public.assessments (id, student_id, title, subject, assessment_type, term, assessment_date, score, max_score, weight_percentage, feedback)
VALUES ('3950bf48-ad3e-4d30-9ee5-f87518acc486', 'eca115ce-9ee0-4d3c-965d-e0a3a33b40c7', 'Computer Science Laboratory Practical 1', 'Computer Science', 'lab', 'AY 2025-26 Term 1', '2025-08-25', 16.9, 25.0, 15.0, 'Additional practice recommended.');
INSERT INTO public.assessments (id, student_id, title, subject, assessment_type, term, assessment_date, score, max_score, weight_percentage, feedback)
VALUES ('0271598a-54f6-45f8-9365-e03860fe945a', 'eca115ce-9ee0-4d3c-965d-e0a3a33b40c7', 'Computer Science Midterm Examination', 'Computer Science', 'midterm', 'AY 2025-26 Term 1', '2025-09-10', 65.7, 100.0, 15.0, 'Evaluation recorded.');
INSERT INTO public.assessments (id, student_id, title, subject, assessment_type, term, assessment_date, score, max_score, weight_percentage, feedback)
VALUES ('bb7d38ce-fe13-4f61-825f-76c29ee32949', 'eca115ce-9ee0-4d3c-965d-e0a3a33b40c7', 'History & Civics Midterm Examination', 'History & Civics', 'midterm', 'AY 2025-26 Term 1', '2025-09-10', 63.0, 100.0, 15.0, 'Evaluation recorded.');
INSERT INTO public.assessments (id, student_id, title, subject, assessment_type, term, assessment_date, score, max_score, weight_percentage, feedback)
VALUES ('37b86165-8b99-43e2-99b8-2101ff2ee20c', 'eca115ce-9ee0-4d3c-965d-e0a3a33b40c7', 'Chemistry Midterm Examination', 'Chemistry', 'midterm', 'AY 2025-26 Term 1', '2025-09-10', 80.8, 100.0, 15.0, 'Evaluation recorded.');
INSERT INTO public.assessments (id, student_id, title, subject, assessment_type, term, assessment_date, score, max_score, weight_percentage, feedback)
VALUES ('c0b81979-ef79-4a49-80b3-f15661b8b41f', 'eca115ce-9ee0-4d3c-965d-e0a3a33b40c7', 'Computer Science Unit Assignment 2', 'Computer Science', 'assignment', 'AY 2025-26 Term 1', '2025-09-28', 21.0, 30.0, 15.0, 'Additional practice recommended.');
INSERT INTO public.assessments (id, student_id, title, subject, assessment_type, term, assessment_date, score, max_score, weight_percentage, feedback)
VALUES ('a76c7257-1b00-4776-a447-274981467793', 'eca115ce-9ee0-4d3c-965d-e0a3a33b40c7', 'Mathematics Unit Assignment 2', 'Mathematics', 'assignment', 'AY 2025-26 Term 1', '2025-09-28', 19.0, 30.0, 15.0, 'Additional practice recommended.');
INSERT INTO public.assessments (id, student_id, title, subject, assessment_type, term, assessment_date, score, max_score, weight_percentage, feedback)
VALUES ('95c30bbf-2382-42c4-b645-44d836844d46', 'eca115ce-9ee0-4d3c-965d-e0a3a33b40c7', 'English Literature Unit Assignment 2', 'English Literature', 'assignment', 'AY 2025-26 Term 1', '2025-09-28', 22.4, 30.0, 15.0, 'Additional practice recommended.');
INSERT INTO public.assessments (id, student_id, title, subject, assessment_type, term, assessment_date, score, max_score, weight_percentage, feedback)
VALUES ('07f8ab2e-d851-4386-8e04-6ec700913e74', 'eca115ce-9ee0-4d3c-965d-e0a3a33b40c7', 'Mathematics Term Project Evaluation', 'Mathematics', 'project', 'AY 2025-26 Term 1', '2025-10-15', 39.1, 50.0, 15.0, 'Additional practice recommended.');
INSERT INTO public.assessments (id, student_id, title, subject, assessment_type, term, assessment_date, score, max_score, weight_percentage, feedback)
VALUES ('028dbb91-b318-47e7-844a-e2cbd6c54ac9', 'eca115ce-9ee0-4d3c-965d-e0a3a33b40c7', 'Physics Term Project Evaluation', 'Physics', 'project', 'AY 2025-26 Term 1', '2025-10-15', 40.5, 50.0, 15.0, 'Additional practice recommended.');
INSERT INTO public.assessments (id, student_id, title, subject, assessment_type, term, assessment_date, score, max_score, weight_percentage, feedback)
VALUES ('4106ce85-a678-40a4-89d7-03cad19055ad', 'eca115ce-9ee0-4d3c-965d-e0a3a33b40c7', 'English Literature Term Project Evaluation', 'English Literature', 'project', 'AY 2025-26 Term 1', '2025-10-15', 31.9, 50.0, 15.0, 'Additional practice recommended.');
INSERT INTO public.assessments (id, student_id, title, subject, assessment_type, term, assessment_date, score, max_score, weight_percentage, feedback)
VALUES ('7c614831-d8d6-4ae3-b6b1-7c101080e359', 'eca115ce-9ee0-4d3c-965d-e0a3a33b40c7', 'Physics Term Final Examination', 'Physics', 'final', 'AY 2025-26 Term 1', '2025-11-05', 74.1, 100.0, 35.0, 'Evaluation recorded.');
INSERT INTO public.assessments (id, student_id, title, subject, assessment_type, term, assessment_date, score, max_score, weight_percentage, feedback)
VALUES ('4f5861f4-9768-46e6-b577-b57fb19a0477', 'eca115ce-9ee0-4d3c-965d-e0a3a33b40c7', 'Mathematics Term Final Examination', 'Mathematics', 'final', 'AY 2025-26 Term 1', '2025-11-05', 77.8, 100.0, 35.0, 'Evaluation recorded.');
INSERT INTO public.assessments (id, student_id, title, subject, assessment_type, term, assessment_date, score, max_score, weight_percentage, feedback)
VALUES ('ccf18b36-d7b0-4259-b6b0-d49428ade5d5', 'eca115ce-9ee0-4d3c-965d-e0a3a33b40c7', 'Computer Science Term Final Examination', 'Computer Science', 'final', 'AY 2025-26 Term 1', '2025-11-05', 66.5, 100.0, 35.0, 'Evaluation recorded.');
INSERT INTO public.assessments (id, student_id, title, subject, assessment_type, term, assessment_date, score, max_score, weight_percentage, feedback)
VALUES ('ed890594-24b4-4dc2-befa-0a39c18a3623', '06024d12-eb44-4417-8688-5eb60d3cff12', 'Physics Unit Quiz 1', 'Physics', 'quiz', 'AY 2025-26 Term 2', '2025-08-15', 14.6, 20.0, 15.0, 'Additional practice recommended.');
INSERT INTO public.assessments (id, student_id, title, subject, assessment_type, term, assessment_date, score, max_score, weight_percentage, feedback)
VALUES ('b3128b7f-8176-46a1-a1d3-184babea9a0c', '06024d12-eb44-4417-8688-5eb60d3cff12', 'Computer Science Unit Quiz 1', 'Computer Science', 'quiz', 'AY 2025-26 Term 2', '2025-08-15', 15.0, 20.0, 15.0, 'Additional practice recommended.');
INSERT INTO public.assessments (id, student_id, title, subject, assessment_type, term, assessment_date, score, max_score, weight_percentage, feedback)
VALUES ('48ef90bd-8a78-413c-a9b6-427e34b6e169', '06024d12-eb44-4417-8688-5eb60d3cff12', 'Mathematics Unit Quiz 1', 'Mathematics', 'quiz', 'AY 2025-26 Term 2', '2025-08-15', 16.0, 20.0, 15.0, 'Additional practice recommended.');
INSERT INTO public.assessments (id, student_id, title, subject, assessment_type, term, assessment_date, score, max_score, weight_percentage, feedback)
VALUES ('7a75ce6f-abc5-41e7-8314-e12918bfe957', '06024d12-eb44-4417-8688-5eb60d3cff12', 'Physics Laboratory Practical 1', 'Physics', 'lab', 'AY 2025-26 Term 2', '2025-08-25', 16.3, 25.0, 15.0, 'Additional practice recommended.');
INSERT INTO public.assessments (id, student_id, title, subject, assessment_type, term, assessment_date, score, max_score, weight_percentage, feedback)
VALUES ('04aa9507-e63a-4a58-b37a-91a0883e2008', '06024d12-eb44-4417-8688-5eb60d3cff12', 'Mathematics Laboratory Practical 1', 'Mathematics', 'lab', 'AY 2025-26 Term 2', '2025-08-25', 17.0, 25.0, 15.0, 'Additional practice recommended.');
INSERT INTO public.assessments (id, student_id, title, subject, assessment_type, term, assessment_date, score, max_score, weight_percentage, feedback)
VALUES ('cc28ceb6-03e3-4c19-8a8c-ee3a96e46d54', '06024d12-eb44-4417-8688-5eb60d3cff12', 'English Literature Laboratory Practical 1', 'English Literature', 'lab', 'AY 2025-26 Term 2', '2025-08-25', 19.2, 25.0, 15.0, 'Additional practice recommended.');
INSERT INTO public.assessments (id, student_id, title, subject, assessment_type, term, assessment_date, score, max_score, weight_percentage, feedback)
VALUES ('90c45718-121c-4526-9b93-3747dbcc5ae3', '06024d12-eb44-4417-8688-5eb60d3cff12', 'English Literature Midterm Examination', 'English Literature', 'midterm', 'AY 2025-26 Term 2', '2025-09-10', 64.5, 100.0, 15.0, 'Evaluation recorded.');
INSERT INTO public.assessments (id, student_id, title, subject, assessment_type, term, assessment_date, score, max_score, weight_percentage, feedback)
VALUES ('e3e94e54-4495-4dd5-aee5-adc77ea11508', '06024d12-eb44-4417-8688-5eb60d3cff12', 'Chemistry Midterm Examination', 'Chemistry', 'midterm', 'AY 2025-26 Term 2', '2025-09-10', 75.8, 100.0, 15.0, 'Evaluation recorded.');
INSERT INTO public.assessments (id, student_id, title, subject, assessment_type, term, assessment_date, score, max_score, weight_percentage, feedback)
VALUES ('08adf4bb-4927-4ce9-ac44-cdaf57b54c25', '06024d12-eb44-4417-8688-5eb60d3cff12', 'Computer Science Midterm Examination', 'Computer Science', 'midterm', 'AY 2025-26 Term 2', '2025-09-10', 76.0, 100.0, 15.0, 'Evaluation recorded.');
INSERT INTO public.assessments (id, student_id, title, subject, assessment_type, term, assessment_date, score, max_score, weight_percentage, feedback)
VALUES ('1d39a6b9-6618-49c3-8549-b8c596e66841', '06024d12-eb44-4417-8688-5eb60d3cff12', 'Chemistry Unit Assignment 2', 'Chemistry', 'assignment', 'AY 2025-26 Term 2', '2025-09-28', 21.2, 30.0, 15.0, 'Additional practice recommended.');
INSERT INTO public.assessments (id, student_id, title, subject, assessment_type, term, assessment_date, score, max_score, weight_percentage, feedback)
VALUES ('712fac1f-6284-4b5a-a65a-a9aa1e07b7f1', '06024d12-eb44-4417-8688-5eb60d3cff12', 'English Literature Unit Assignment 2', 'English Literature', 'assignment', 'AY 2025-26 Term 2', '2025-09-28', 22.2, 30.0, 15.0, 'Additional practice recommended.');
INSERT INTO public.assessments (id, student_id, title, subject, assessment_type, term, assessment_date, score, max_score, weight_percentage, feedback)
VALUES ('3f6eaba6-48b9-43c3-b38c-622904b52847', '06024d12-eb44-4417-8688-5eb60d3cff12', 'Computer Science Unit Assignment 2', 'Computer Science', 'assignment', 'AY 2025-26 Term 2', '2025-09-28', 23.9, 30.0, 15.0, 'Additional practice recommended.');
INSERT INTO public.assessments (id, student_id, title, subject, assessment_type, term, assessment_date, score, max_score, weight_percentage, feedback)
VALUES ('976faf27-464d-4f24-a27c-6b3dde0997c8', '06024d12-eb44-4417-8688-5eb60d3cff12', 'History & Civics Term Project Evaluation', 'History & Civics', 'project', 'AY 2025-26 Term 2', '2025-10-15', 31.3, 50.0, 15.0, 'Additional practice recommended.');
INSERT INTO public.assessments (id, student_id, title, subject, assessment_type, term, assessment_date, score, max_score, weight_percentage, feedback)
VALUES ('d63da24e-feee-442e-94b2-e9c00eee1776', '06024d12-eb44-4417-8688-5eb60d3cff12', 'Chemistry Term Project Evaluation', 'Chemistry', 'project', 'AY 2025-26 Term 2', '2025-10-15', 33.3, 50.0, 15.0, 'Additional practice recommended.');
INSERT INTO public.assessments (id, student_id, title, subject, assessment_type, term, assessment_date, score, max_score, weight_percentage, feedback)
VALUES ('78e32e67-6579-4a1b-9f0e-c14c20db12dd', '06024d12-eb44-4417-8688-5eb60d3cff12', 'English Literature Term Project Evaluation', 'English Literature', 'project', 'AY 2025-26 Term 2', '2025-10-15', 37.7, 50.0, 15.0, 'Additional practice recommended.');
INSERT INTO public.assessments (id, student_id, title, subject, assessment_type, term, assessment_date, score, max_score, weight_percentage, feedback)
VALUES ('ffbaf12b-40c7-4959-b27e-026888284f14', '06024d12-eb44-4417-8688-5eb60d3cff12', 'English Literature Term Final Examination', 'English Literature', 'final', 'AY 2025-26 Term 2', '2025-11-05', 82.0, 100.0, 35.0, 'Evaluation recorded.');
INSERT INTO public.assessments (id, student_id, title, subject, assessment_type, term, assessment_date, score, max_score, weight_percentage, feedback)
VALUES ('018a0b3b-ceec-4598-a307-456367f308a2', '06024d12-eb44-4417-8688-5eb60d3cff12', 'History & Civics Term Final Examination', 'History & Civics', 'final', 'AY 2025-26 Term 2', '2025-11-05', 75.4, 100.0, 35.0, 'Evaluation recorded.');
INSERT INTO public.assessments (id, student_id, title, subject, assessment_type, term, assessment_date, score, max_score, weight_percentage, feedback)
VALUES ('567ae0b1-d0e3-4423-b638-6eaf4b9f2d50', '06024d12-eb44-4417-8688-5eb60d3cff12', 'Mathematics Term Final Examination', 'Mathematics', 'final', 'AY 2025-26 Term 2', '2025-11-05', 67.4, 100.0, 35.0, 'Evaluation recorded.');
INSERT INTO public.assessments (id, student_id, title, subject, assessment_type, term, assessment_date, score, max_score, weight_percentage, feedback)
VALUES ('4d3a56a8-98ce-4f36-9b70-a81ad68a0936', '0ed0d835-d441-45ea-98da-efe44480ad7a', 'English Literature Unit Quiz 1', 'English Literature', 'quiz', 'AY 2024-25 Term 1', '2025-08-15', 12.6, 20.0, 15.0, 'Additional practice recommended.');
INSERT INTO public.assessments (id, student_id, title, subject, assessment_type, term, assessment_date, score, max_score, weight_percentage, feedback)
VALUES ('03cd75b6-ea4b-455e-9fb1-e52b9d0dfe83', '0ed0d835-d441-45ea-98da-efe44480ad7a', 'Computer Science Unit Quiz 1', 'Computer Science', 'quiz', 'AY 2024-25 Term 1', '2025-08-15', 14.5, 20.0, 15.0, 'Additional practice recommended.');
INSERT INTO public.assessments (id, student_id, title, subject, assessment_type, term, assessment_date, score, max_score, weight_percentage, feedback)
VALUES ('1c462a6c-1cd2-4bcc-a834-5039493dbba6', '0ed0d835-d441-45ea-98da-efe44480ad7a', 'History & Civics Unit Quiz 1', 'History & Civics', 'quiz', 'AY 2024-25 Term 1', '2025-08-15', 14.9, 20.0, 15.0, 'Additional practice recommended.');
INSERT INTO public.assessments (id, student_id, title, subject, assessment_type, term, assessment_date, score, max_score, weight_percentage, feedback)
VALUES ('b1fbcf1f-e7ae-432a-bc1d-a36592b92504', '0ed0d835-d441-45ea-98da-efe44480ad7a', 'Computer Science Laboratory Practical 1', 'Computer Science', 'lab', 'AY 2024-25 Term 1', '2025-08-25', 16.5, 25.0, 15.0, 'Additional practice recommended.');
INSERT INTO public.assessments (id, student_id, title, subject, assessment_type, term, assessment_date, score, max_score, weight_percentage, feedback)
VALUES ('605e123f-abf9-4a42-b8c4-853665d812af', '0ed0d835-d441-45ea-98da-efe44480ad7a', 'History & Civics Laboratory Practical 1', 'History & Civics', 'lab', 'AY 2024-25 Term 1', '2025-08-25', 18.2, 25.0, 15.0, 'Additional practice recommended.');
INSERT INTO public.assessments (id, student_id, title, subject, assessment_type, term, assessment_date, score, max_score, weight_percentage, feedback)
VALUES ('0bd8238d-72db-4815-98ff-1590a1e55948', '0ed0d835-d441-45ea-98da-efe44480ad7a', 'Mathematics Laboratory Practical 1', 'Mathematics', 'lab', 'AY 2024-25 Term 1', '2025-08-25', 20.1, 25.0, 15.0, 'Additional practice recommended.');
INSERT INTO public.assessments (id, student_id, title, subject, assessment_type, term, assessment_date, score, max_score, weight_percentage, feedback)
VALUES ('b0ada452-2450-40ef-b106-6469101625f0', '0ed0d835-d441-45ea-98da-efe44480ad7a', 'Computer Science Midterm Examination', 'Computer Science', 'midterm', 'AY 2024-25 Term 1', '2025-09-10', 62.6, 100.0, 15.0, 'Evaluation recorded.');
INSERT INTO public.assessments (id, student_id, title, subject, assessment_type, term, assessment_date, score, max_score, weight_percentage, feedback)
VALUES ('0a189241-1923-4ad7-8797-ee01383acf8e', '0ed0d835-d441-45ea-98da-efe44480ad7a', 'History & Civics Midterm Examination', 'History & Civics', 'midterm', 'AY 2024-25 Term 1', '2025-09-10', 74.6, 100.0, 15.0, 'Evaluation recorded.');
INSERT INTO public.assessments (id, student_id, title, subject, assessment_type, term, assessment_date, score, max_score, weight_percentage, feedback)
VALUES ('5f24bd9f-0b59-4048-9289-642983709650', '0ed0d835-d441-45ea-98da-efe44480ad7a', 'Mathematics Midterm Examination', 'Mathematics', 'midterm', 'AY 2024-25 Term 1', '2025-09-10', 78.0, 100.0, 15.0, 'Evaluation recorded.');
INSERT INTO public.assessments (id, student_id, title, subject, assessment_type, term, assessment_date, score, max_score, weight_percentage, feedback)
VALUES ('15dbf749-884c-4982-a402-c78c2e23098b', '0ed0d835-d441-45ea-98da-efe44480ad7a', 'History & Civics Unit Assignment 2', 'History & Civics', 'assignment', 'AY 2024-25 Term 1', '2025-09-28', 21.9, 30.0, 15.0, 'Additional practice recommended.');
INSERT INTO public.assessments (id, student_id, title, subject, assessment_type, term, assessment_date, score, max_score, weight_percentage, feedback)
VALUES ('f12e0518-06bb-4145-af8d-7c49d4a6309a', '0ed0d835-d441-45ea-98da-efe44480ad7a', 'Physics Unit Assignment 2', 'Physics', 'assignment', 'AY 2024-25 Term 1', '2025-09-28', 21.9, 30.0, 15.0, 'Additional practice recommended.');
INSERT INTO public.assessments (id, student_id, title, subject, assessment_type, term, assessment_date, score, max_score, weight_percentage, feedback)
VALUES ('4670ff91-3b36-4217-9293-076f4a7fb84b', '0ed0d835-d441-45ea-98da-efe44480ad7a', 'Chemistry Unit Assignment 2', 'Chemistry', 'assignment', 'AY 2024-25 Term 1', '2025-09-28', 19.2, 30.0, 15.0, 'Additional practice recommended.');
INSERT INTO public.assessments (id, student_id, title, subject, assessment_type, term, assessment_date, score, max_score, weight_percentage, feedback)
VALUES ('62247390-ad83-4226-8ab3-8553ec1e803f', '0ed0d835-d441-45ea-98da-efe44480ad7a', 'Mathematics Term Project Evaluation', 'Mathematics', 'project', 'AY 2024-25 Term 1', '2025-10-15', 37.5, 50.0, 15.0, 'Additional practice recommended.');
INSERT INTO public.assessments (id, student_id, title, subject, assessment_type, term, assessment_date, score, max_score, weight_percentage, feedback)
VALUES ('08aafb52-b727-45c2-81c9-49cd2b710138', '0ed0d835-d441-45ea-98da-efe44480ad7a', 'Computer Science Term Project Evaluation', 'Computer Science', 'project', 'AY 2024-25 Term 1', '2025-10-15', 32.5, 50.0, 15.0, 'Additional practice recommended.');
INSERT INTO public.assessments (id, student_id, title, subject, assessment_type, term, assessment_date, score, max_score, weight_percentage, feedback)
VALUES ('2e899273-d5a5-4043-8753-4aa9cc41da90', '0ed0d835-d441-45ea-98da-efe44480ad7a', 'History & Civics Term Project Evaluation', 'History & Civics', 'project', 'AY 2024-25 Term 1', '2025-10-15', 40.3, 50.0, 15.0, 'Additional practice recommended.');
INSERT INTO public.assessments (id, student_id, title, subject, assessment_type, term, assessment_date, score, max_score, weight_percentage, feedback)
VALUES ('0d38fe57-4d67-4114-b174-7dd000e2af64', '0ed0d835-d441-45ea-98da-efe44480ad7a', 'Chemistry Term Final Examination', 'Chemistry', 'final', 'AY 2024-25 Term 1', '2025-11-05', 70.3, 100.0, 35.0, 'Evaluation recorded.');
INSERT INTO public.assessments (id, student_id, title, subject, assessment_type, term, assessment_date, score, max_score, weight_percentage, feedback)
VALUES ('b4f9fe4b-f31f-4dc5-ad1a-bc7cb7cff22d', '0ed0d835-d441-45ea-98da-efe44480ad7a', 'English Literature Term Final Examination', 'English Literature', 'final', 'AY 2024-25 Term 1', '2025-11-05', 71.6, 100.0, 35.0, 'Evaluation recorded.');
INSERT INTO public.assessments (id, student_id, title, subject, assessment_type, term, assessment_date, score, max_score, weight_percentage, feedback)
VALUES ('2e59b2ee-41c4-4da3-a699-164a4fe7eb31', '0ed0d835-d441-45ea-98da-efe44480ad7a', 'History & Civics Term Final Examination', 'History & Civics', 'final', 'AY 2024-25 Term 1', '2025-11-05', 71.4, 100.0, 35.0, 'Evaluation recorded.');
INSERT INTO public.assessments (id, student_id, title, subject, assessment_type, term, assessment_date, score, max_score, weight_percentage, feedback)
VALUES ('4b201723-d573-43ab-a5f9-85504a8de2d4', '23c7c2fc-8dec-42bf-b8c2-a1b7a497a8e6', 'Physics Unit Quiz 1', 'Physics', 'quiz', 'AY 2024-25 Term 2', '2025-08-15', 13.7, 20.0, 15.0, 'Additional practice recommended.');
INSERT INTO public.assessments (id, student_id, title, subject, assessment_type, term, assessment_date, score, max_score, weight_percentage, feedback)
VALUES ('ad5f5949-8463-438a-ad9b-277eb4a34821', '23c7c2fc-8dec-42bf-b8c2-a1b7a497a8e6', 'Computer Science Unit Quiz 1', 'Computer Science', 'quiz', 'AY 2024-25 Term 2', '2025-08-15', 14.3, 20.0, 15.0, 'Additional practice recommended.');
INSERT INTO public.assessments (id, student_id, title, subject, assessment_type, term, assessment_date, score, max_score, weight_percentage, feedback)
VALUES ('0b3916fe-86c4-46f8-b5f1-830e49111b18', '23c7c2fc-8dec-42bf-b8c2-a1b7a497a8e6', 'Mathematics Unit Quiz 1', 'Mathematics', 'quiz', 'AY 2024-25 Term 2', '2025-08-15', 16.1, 20.0, 15.0, 'Additional practice recommended.');
INSERT INTO public.assessments (id, student_id, title, subject, assessment_type, term, assessment_date, score, max_score, weight_percentage, feedback)
VALUES ('ebd79d6a-3a06-47f6-8026-04df9d9c0337', '23c7c2fc-8dec-42bf-b8c2-a1b7a497a8e6', 'Computer Science Laboratory Practical 1', 'Computer Science', 'lab', 'AY 2024-25 Term 2', '2025-08-25', 18.0, 25.0, 15.0, 'Additional practice recommended.');
INSERT INTO public.assessments (id, student_id, title, subject, assessment_type, term, assessment_date, score, max_score, weight_percentage, feedback)
VALUES ('6a9a9d03-6f0c-4b10-b783-26472d06d3db', '23c7c2fc-8dec-42bf-b8c2-a1b7a497a8e6', 'History & Civics Laboratory Practical 1', 'History & Civics', 'lab', 'AY 2024-25 Term 2', '2025-08-25', 15.7, 25.0, 15.0, 'Additional practice recommended.');
INSERT INTO public.assessments (id, student_id, title, subject, assessment_type, term, assessment_date, score, max_score, weight_percentage, feedback)
VALUES ('57bf3431-8666-49be-90f0-586adca81d53', '23c7c2fc-8dec-42bf-b8c2-a1b7a497a8e6', 'Physics Laboratory Practical 1', 'Physics', 'lab', 'AY 2024-25 Term 2', '2025-08-25', 18.0, 25.0, 15.0, 'Additional practice recommended.');
INSERT INTO public.assessments (id, student_id, title, subject, assessment_type, term, assessment_date, score, max_score, weight_percentage, feedback)
VALUES ('7442bed7-1213-4c4b-818a-58bec4bc538f', '23c7c2fc-8dec-42bf-b8c2-a1b7a497a8e6', 'English Literature Midterm Examination', 'English Literature', 'midterm', 'AY 2024-25 Term 2', '2025-09-10', 79.5, 100.0, 15.0, 'Evaluation recorded.');
INSERT INTO public.assessments (id, student_id, title, subject, assessment_type, term, assessment_date, score, max_score, weight_percentage, feedback)
VALUES ('50e5dd0b-0336-45a4-8d99-076f16adbf83', '23c7c2fc-8dec-42bf-b8c2-a1b7a497a8e6', 'Chemistry Midterm Examination', 'Chemistry', 'midterm', 'AY 2024-25 Term 2', '2025-09-10', 70.8, 100.0, 15.0, 'Evaluation recorded.');
INSERT INTO public.assessments (id, student_id, title, subject, assessment_type, term, assessment_date, score, max_score, weight_percentage, feedback)
VALUES ('ac94c948-fa6f-4116-ba85-ef7b5a780aa9', '23c7c2fc-8dec-42bf-b8c2-a1b7a497a8e6', 'Mathematics Midterm Examination', 'Mathematics', 'midterm', 'AY 2024-25 Term 2', '2025-09-10', 72.5, 100.0, 15.0, 'Evaluation recorded.');
INSERT INTO public.assessments (id, student_id, title, subject, assessment_type, term, assessment_date, score, max_score, weight_percentage, feedback)
VALUES ('e19e6108-1af2-4ad1-b2c9-b11e6b96ea32', '23c7c2fc-8dec-42bf-b8c2-a1b7a497a8e6', 'Computer Science Unit Assignment 2', 'Computer Science', 'assignment', 'AY 2024-25 Term 2', '2025-09-28', 21.1, 30.0, 15.0, 'Additional practice recommended.');
INSERT INTO public.assessments (id, student_id, title, subject, assessment_type, term, assessment_date, score, max_score, weight_percentage, feedback)
VALUES ('6b2ebeeb-7c2e-47c0-a769-c54c6d917557', '23c7c2fc-8dec-42bf-b8c2-a1b7a497a8e6', 'Mathematics Unit Assignment 2', 'Mathematics', 'assignment', 'AY 2024-25 Term 2', '2025-09-28', 22.5, 30.0, 15.0, 'Additional practice recommended.');
INSERT INTO public.assessments (id, student_id, title, subject, assessment_type, term, assessment_date, score, max_score, weight_percentage, feedback)
VALUES ('9cb46d5a-e68c-4c19-801d-ed5194acbbaa', '23c7c2fc-8dec-42bf-b8c2-a1b7a497a8e6', 'Physics Unit Assignment 2', 'Physics', 'assignment', 'AY 2024-25 Term 2', '2025-09-28', 19.5, 30.0, 15.0, 'Additional practice recommended.');
INSERT INTO public.assessments (id, student_id, title, subject, assessment_type, term, assessment_date, score, max_score, weight_percentage, feedback)
VALUES ('11de0bfb-ec48-4a2f-9521-77751020b3df', '23c7c2fc-8dec-42bf-b8c2-a1b7a497a8e6', 'Computer Science Term Project Evaluation', 'Computer Science', 'project', 'AY 2024-25 Term 2', '2025-10-15', 37.2, 50.0, 15.0, 'Additional practice recommended.');
INSERT INTO public.assessments (id, student_id, title, subject, assessment_type, term, assessment_date, score, max_score, weight_percentage, feedback)
VALUES ('e788db74-b405-4f28-b0bd-1bff78cffd4a', '23c7c2fc-8dec-42bf-b8c2-a1b7a497a8e6', 'Chemistry Term Project Evaluation', 'Chemistry', 'project', 'AY 2024-25 Term 2', '2025-10-15', 35.0, 50.0, 15.0, 'Additional practice recommended.');
INSERT INTO public.assessments (id, student_id, title, subject, assessment_type, term, assessment_date, score, max_score, weight_percentage, feedback)
VALUES ('5ab1b401-2f63-46d8-9d75-710b083a56fe', '23c7c2fc-8dec-42bf-b8c2-a1b7a497a8e6', 'English Literature Term Project Evaluation', 'English Literature', 'project', 'AY 2024-25 Term 2', '2025-10-15', 31.8, 50.0, 15.0, 'Additional practice recommended.');
INSERT INTO public.assessments (id, student_id, title, subject, assessment_type, term, assessment_date, score, max_score, weight_percentage, feedback)
VALUES ('c982b86b-3ecc-41da-8673-785909187482', '23c7c2fc-8dec-42bf-b8c2-a1b7a497a8e6', 'Chemistry Term Final Examination', 'Chemistry', 'final', 'AY 2024-25 Term 2', '2025-11-05', 81.1, 100.0, 35.0, 'Evaluation recorded.');
INSERT INTO public.assessments (id, student_id, title, subject, assessment_type, term, assessment_date, score, max_score, weight_percentage, feedback)
VALUES ('e8b705eb-fb37-4e88-a911-281b101280b1', '23c7c2fc-8dec-42bf-b8c2-a1b7a497a8e6', 'English Literature Term Final Examination', 'English Literature', 'final', 'AY 2024-25 Term 2', '2025-11-05', 74.5, 100.0, 35.0, 'Evaluation recorded.');
INSERT INTO public.assessments (id, student_id, title, subject, assessment_type, term, assessment_date, score, max_score, weight_percentage, feedback)
VALUES ('ef3b5491-d023-4ef9-aadd-2ba6faa1770a', '23c7c2fc-8dec-42bf-b8c2-a1b7a497a8e6', 'Computer Science Term Final Examination', 'Computer Science', 'final', 'AY 2024-25 Term 2', '2025-11-05', 79.7, 100.0, 35.0, 'Evaluation recorded.');
INSERT INTO public.assessments (id, student_id, title, subject, assessment_type, term, assessment_date, score, max_score, weight_percentage, feedback)
VALUES ('e946a312-325e-48c9-a4ba-429ab4b8c1a4', '91ce6ee5-9509-461e-ae83-f443631a3016', 'History & Civics Unit Quiz 1', 'History & Civics', 'quiz', 'AY 2025-26 Term 1', '2025-08-15', 16.5, 20.0, 15.0, 'Additional practice recommended.');
INSERT INTO public.assessments (id, student_id, title, subject, assessment_type, term, assessment_date, score, max_score, weight_percentage, feedback)
VALUES ('a23c20ae-5f99-4222-9203-987a5bbf91ce', '91ce6ee5-9509-461e-ae83-f443631a3016', 'Chemistry Unit Quiz 1', 'Chemistry', 'quiz', 'AY 2025-26 Term 1', '2025-08-15', 15.6, 20.0, 15.0, 'Additional practice recommended.');
INSERT INTO public.assessments (id, student_id, title, subject, assessment_type, term, assessment_date, score, max_score, weight_percentage, feedback)
VALUES ('7e8fee4a-7794-4085-aaf8-4496f6977845', '91ce6ee5-9509-461e-ae83-f443631a3016', 'Computer Science Unit Quiz 1', 'Computer Science', 'quiz', 'AY 2025-26 Term 1', '2025-08-15', 18.5, 20.0, 15.0, 'Additional practice recommended.');
INSERT INTO public.assessments (id, student_id, title, subject, assessment_type, term, assessment_date, score, max_score, weight_percentage, feedback)
VALUES ('c6bb77bc-574f-4751-8594-266a9344e5d6', '91ce6ee5-9509-461e-ae83-f443631a3016', 'Chemistry Laboratory Practical 1', 'Chemistry', 'lab', 'AY 2025-26 Term 1', '2025-08-25', 19.8, 25.0, 15.0, 'Additional practice recommended.');
INSERT INTO public.assessments (id, student_id, title, subject, assessment_type, term, assessment_date, score, max_score, weight_percentage, feedback)
VALUES ('bb604e70-d0ee-4da9-86fe-5dd6081cae77', '91ce6ee5-9509-461e-ae83-f443631a3016', 'English Literature Laboratory Practical 1', 'English Literature', 'lab', 'AY 2025-26 Term 1', '2025-08-25', 23.8, 25.0, 15.0, 'Additional practice recommended.');
INSERT INTO public.assessments (id, student_id, title, subject, assessment_type, term, assessment_date, score, max_score, weight_percentage, feedback)
VALUES ('d2ca365b-c84e-4479-970c-aabc57d43651', '91ce6ee5-9509-461e-ae83-f443631a3016', 'Physics Laboratory Practical 1', 'Physics', 'lab', 'AY 2025-26 Term 1', '2025-08-25', 23.9, 25.0, 15.0, 'Additional practice recommended.');
INSERT INTO public.assessments (id, student_id, title, subject, assessment_type, term, assessment_date, score, max_score, weight_percentage, feedback)
VALUES ('f69e0952-8b85-4667-a183-42c59c73e951', '91ce6ee5-9509-461e-ae83-f443631a3016', 'Chemistry Midterm Examination', 'Chemistry', 'midterm', 'AY 2025-26 Term 1', '2025-09-10', 86.2, 100.0, 15.0, 'Evaluation recorded.');
INSERT INTO public.assessments (id, student_id, title, subject, assessment_type, term, assessment_date, score, max_score, weight_percentage, feedback)
VALUES ('da52e58e-433d-473d-87f3-1647ed9ecd31', '91ce6ee5-9509-461e-ae83-f443631a3016', 'Computer Science Midterm Examination', 'Computer Science', 'midterm', 'AY 2025-26 Term 1', '2025-09-10', 83.4, 100.0, 15.0, 'Evaluation recorded.');
INSERT INTO public.assessments (id, student_id, title, subject, assessment_type, term, assessment_date, score, max_score, weight_percentage, feedback)
VALUES ('aa2a8b0c-9925-4223-990c-e80869737268', '91ce6ee5-9509-461e-ae83-f443631a3016', 'History & Civics Midterm Examination', 'History & Civics', 'midterm', 'AY 2025-26 Term 1', '2025-09-10', 96.0, 100.0, 15.0, 'Evaluation recorded.');
INSERT INTO public.assessments (id, student_id, title, subject, assessment_type, term, assessment_date, score, max_score, weight_percentage, feedback)
VALUES ('d3fc29d4-49cf-4ab7-9d9a-a1173ed8591a', '91ce6ee5-9509-461e-ae83-f443631a3016', 'Computer Science Unit Assignment 2', 'Computer Science', 'assignment', 'AY 2025-26 Term 1', '2025-09-28', 25.5, 30.0, 15.0, 'Additional practice recommended.');
INSERT INTO public.assessments (id, student_id, title, subject, assessment_type, term, assessment_date, score, max_score, weight_percentage, feedback)
VALUES ('58b121db-6090-4ba9-bf3d-3f5eef0667b2', '91ce6ee5-9509-461e-ae83-f443631a3016', 'Mathematics Unit Assignment 2', 'Mathematics', 'assignment', 'AY 2025-26 Term 1', '2025-09-28', 25.3, 30.0, 15.0, 'Additional practice recommended.');
INSERT INTO public.assessments (id, student_id, title, subject, assessment_type, term, assessment_date, score, max_score, weight_percentage, feedback)
VALUES ('095a7712-00ba-4af2-a3dd-9ef2c3ffd6fe', '91ce6ee5-9509-461e-ae83-f443631a3016', 'Physics Unit Assignment 2', 'Physics', 'assignment', 'AY 2025-26 Term 1', '2025-09-28', 25.0, 30.0, 15.0, 'Additional practice recommended.');
INSERT INTO public.assessments (id, student_id, title, subject, assessment_type, term, assessment_date, score, max_score, weight_percentage, feedback)
VALUES ('4d4799bc-d8f6-499f-b3ba-1d3e91f5a7f8', '91ce6ee5-9509-461e-ae83-f443631a3016', 'History & Civics Term Project Evaluation', 'History & Civics', 'project', 'AY 2025-26 Term 1', '2025-10-15', 47.8, 50.0, 15.0, 'Additional practice recommended.');
INSERT INTO public.assessments (id, student_id, title, subject, assessment_type, term, assessment_date, score, max_score, weight_percentage, feedback)
VALUES ('83ea8b0d-62ef-4f64-b251-6b6e8bdd29db', '91ce6ee5-9509-461e-ae83-f443631a3016', 'Chemistry Term Project Evaluation', 'Chemistry', 'project', 'AY 2025-26 Term 1', '2025-10-15', 44.9, 50.0, 15.0, 'Additional practice recommended.');
INSERT INTO public.assessments (id, student_id, title, subject, assessment_type, term, assessment_date, score, max_score, weight_percentage, feedback)
VALUES ('cd6ad51c-2ea8-4a04-ac89-6ef694f64ca2', '91ce6ee5-9509-461e-ae83-f443631a3016', 'Mathematics Term Project Evaluation', 'Mathematics', 'project', 'AY 2025-26 Term 1', '2025-10-15', 41.5, 50.0, 15.0, 'Additional practice recommended.');
INSERT INTO public.assessments (id, student_id, title, subject, assessment_type, term, assessment_date, score, max_score, weight_percentage, feedback)
VALUES ('ada9a98e-3af9-4148-8a25-1718f1299a6f', '91ce6ee5-9509-461e-ae83-f443631a3016', 'English Literature Term Final Examination', 'English Literature', 'final', 'AY 2025-26 Term 1', '2025-11-05', 93.0, 100.0, 35.0, 'Evaluation recorded.');
INSERT INTO public.assessments (id, student_id, title, subject, assessment_type, term, assessment_date, score, max_score, weight_percentage, feedback)
VALUES ('cecba9cf-3030-4b66-a0c4-60932b5e58de', '91ce6ee5-9509-461e-ae83-f443631a3016', 'Mathematics Term Final Examination', 'Mathematics', 'final', 'AY 2025-26 Term 1', '2025-11-05', 94.3, 100.0, 35.0, 'Evaluation recorded.');
INSERT INTO public.assessments (id, student_id, title, subject, assessment_type, term, assessment_date, score, max_score, weight_percentage, feedback)
VALUES ('76c16123-232f-446d-a35c-225730ac37c2', '91ce6ee5-9509-461e-ae83-f443631a3016', 'Computer Science Term Final Examination', 'Computer Science', 'final', 'AY 2025-26 Term 1', '2025-11-05', 92.0, 100.0, 35.0, 'Evaluation recorded.');
INSERT INTO public.assessments (id, student_id, title, subject, assessment_type, term, assessment_date, score, max_score, weight_percentage, feedback)
VALUES ('e07cd896-29ad-4ddd-8aff-87ee32824bbc', '689593b4-7c6c-42a3-a041-16f1ac029f06', 'Chemistry Unit Quiz 1', 'Chemistry', 'quiz', 'AY 2025-26 Term 2', '2025-08-15', 19.1, 20.0, 15.0, 'Additional practice recommended.');
INSERT INTO public.assessments (id, student_id, title, subject, assessment_type, term, assessment_date, score, max_score, weight_percentage, feedback)
VALUES ('a8fc4012-4802-4e10-8179-c6abb25ce8df', '689593b4-7c6c-42a3-a041-16f1ac029f06', 'Mathematics Unit Quiz 1', 'Mathematics', 'quiz', 'AY 2025-26 Term 2', '2025-08-15', 16.1, 20.0, 15.0, 'Additional practice recommended.');
INSERT INTO public.assessments (id, student_id, title, subject, assessment_type, term, assessment_date, score, max_score, weight_percentage, feedback)
VALUES ('426a9050-6344-499c-a430-a59236dbab1c', '689593b4-7c6c-42a3-a041-16f1ac029f06', 'Computer Science Unit Quiz 1', 'Computer Science', 'quiz', 'AY 2025-26 Term 2', '2025-08-15', 19.1, 20.0, 15.0, 'Additional practice recommended.');
INSERT INTO public.assessments (id, student_id, title, subject, assessment_type, term, assessment_date, score, max_score, weight_percentage, feedback)
VALUES ('eca2bf59-e401-48cf-a3cc-11a7e27bb34b', '689593b4-7c6c-42a3-a041-16f1ac029f06', 'History & Civics Laboratory Practical 1', 'History & Civics', 'lab', 'AY 2025-26 Term 2', '2025-08-25', 19.9, 25.0, 15.0, 'Additional practice recommended.');
INSERT INTO public.assessments (id, student_id, title, subject, assessment_type, term, assessment_date, score, max_score, weight_percentage, feedback)
VALUES ('94f903b8-d02f-4629-aa63-033675ca3d7b', '689593b4-7c6c-42a3-a041-16f1ac029f06', 'Computer Science Laboratory Practical 1', 'Computer Science', 'lab', 'AY 2025-26 Term 2', '2025-08-25', 21.3, 25.0, 15.0, 'Additional practice recommended.');
INSERT INTO public.assessments (id, student_id, title, subject, assessment_type, term, assessment_date, score, max_score, weight_percentage, feedback)
VALUES ('581d4415-936a-4e47-9ce2-866d51ef5a8a', '689593b4-7c6c-42a3-a041-16f1ac029f06', 'Chemistry Laboratory Practical 1', 'Chemistry', 'lab', 'AY 2025-26 Term 2', '2025-08-25', 20.7, 25.0, 15.0, 'Additional practice recommended.');
INSERT INTO public.assessments (id, student_id, title, subject, assessment_type, term, assessment_date, score, max_score, weight_percentage, feedback)
VALUES ('2701c530-e5de-48d9-96a6-84dfb529e74d', '689593b4-7c6c-42a3-a041-16f1ac029f06', 'Mathematics Midterm Examination', 'Mathematics', 'midterm', 'AY 2025-26 Term 2', '2025-09-10', 90.1, 100.0, 15.0, 'Evaluation recorded.');
INSERT INTO public.assessments (id, student_id, title, subject, assessment_type, term, assessment_date, score, max_score, weight_percentage, feedback)
VALUES ('f974e253-4fc6-4b06-a2fc-ee895f9148d6', '689593b4-7c6c-42a3-a041-16f1ac029f06', 'Computer Science Midterm Examination', 'Computer Science', 'midterm', 'AY 2025-26 Term 2', '2025-09-10', 90.1, 100.0, 15.0, 'Evaluation recorded.');
INSERT INTO public.assessments (id, student_id, title, subject, assessment_type, term, assessment_date, score, max_score, weight_percentage, feedback)
VALUES ('13353477-d26a-4064-ae1f-e50cd91a7e14', '689593b4-7c6c-42a3-a041-16f1ac029f06', 'Chemistry Midterm Examination', 'Chemistry', 'midterm', 'AY 2025-26 Term 2', '2025-09-10', 88.5, 100.0, 15.0, 'Evaluation recorded.');
INSERT INTO public.assessments (id, student_id, title, subject, assessment_type, term, assessment_date, score, max_score, weight_percentage, feedback)
VALUES ('eceec77a-d27c-41ac-a46e-2467e11a6b60', '689593b4-7c6c-42a3-a041-16f1ac029f06', 'History & Civics Unit Assignment 2', 'History & Civics', 'assignment', 'AY 2025-26 Term 2', '2025-09-28', 27.0, 30.0, 15.0, 'Additional practice recommended.');
INSERT INTO public.assessments (id, student_id, title, subject, assessment_type, term, assessment_date, score, max_score, weight_percentage, feedback)
VALUES ('98d10363-b0cd-44bc-b3a5-711b9b127175', '689593b4-7c6c-42a3-a041-16f1ac029f06', 'Chemistry Unit Assignment 2', 'Chemistry', 'assignment', 'AY 2025-26 Term 2', '2025-09-28', 25.9, 30.0, 15.0, 'Additional practice recommended.');
INSERT INTO public.assessments (id, student_id, title, subject, assessment_type, term, assessment_date, score, max_score, weight_percentage, feedback)
VALUES ('14a6e7e3-c5ea-4e56-a403-5dab4f133487', '689593b4-7c6c-42a3-a041-16f1ac029f06', 'Mathematics Unit Assignment 2', 'Mathematics', 'assignment', 'AY 2025-26 Term 2', '2025-09-28', 26.7, 30.0, 15.0, 'Additional practice recommended.');
INSERT INTO public.assessments (id, student_id, title, subject, assessment_type, term, assessment_date, score, max_score, weight_percentage, feedback)
VALUES ('53545b90-a095-4f03-a6dd-20d10b5e58d2', '689593b4-7c6c-42a3-a041-16f1ac029f06', 'English Literature Term Project Evaluation', 'English Literature', 'project', 'AY 2025-26 Term 2', '2025-10-15', 44.8, 50.0, 15.0, 'Additional practice recommended.');
INSERT INTO public.assessments (id, student_id, title, subject, assessment_type, term, assessment_date, score, max_score, weight_percentage, feedback)
VALUES ('9d08c893-25fb-4886-8e71-53a85fdde082', '689593b4-7c6c-42a3-a041-16f1ac029f06', 'Chemistry Term Project Evaluation', 'Chemistry', 'project', 'AY 2025-26 Term 2', '2025-10-15', 44.7, 50.0, 15.0, 'Additional practice recommended.');
INSERT INTO public.assessments (id, student_id, title, subject, assessment_type, term, assessment_date, score, max_score, weight_percentage, feedback)
VALUES ('aace8786-4159-484d-8baa-eda3c5055116', '689593b4-7c6c-42a3-a041-16f1ac029f06', 'Physics Term Project Evaluation', 'Physics', 'project', 'AY 2025-26 Term 2', '2025-10-15', 43.2, 50.0, 15.0, 'Additional practice recommended.');
INSERT INTO public.assessments (id, student_id, title, subject, assessment_type, term, assessment_date, score, max_score, weight_percentage, feedback)
VALUES ('0f9d4786-c68f-40f6-b24c-eb53b51f3d11', '689593b4-7c6c-42a3-a041-16f1ac029f06', 'History & Civics Term Final Examination', 'History & Civics', 'final', 'AY 2025-26 Term 2', '2025-11-05', 80.1, 100.0, 35.0, 'Evaluation recorded.');
INSERT INTO public.assessments (id, student_id, title, subject, assessment_type, term, assessment_date, score, max_score, weight_percentage, feedback)
VALUES ('363ade81-80ed-40f3-abed-064927d490d7', '689593b4-7c6c-42a3-a041-16f1ac029f06', 'Chemistry Term Final Examination', 'Chemistry', 'final', 'AY 2025-26 Term 2', '2025-11-05', 78.8, 100.0, 35.0, 'Evaluation recorded.');
INSERT INTO public.assessments (id, student_id, title, subject, assessment_type, term, assessment_date, score, max_score, weight_percentage, feedback)
VALUES ('761122bc-2123-499e-abfa-071ea9e4b082', '689593b4-7c6c-42a3-a041-16f1ac029f06', 'Computer Science Term Final Examination', 'Computer Science', 'final', 'AY 2025-26 Term 2', '2025-11-05', 78.7, 100.0, 35.0, 'Evaluation recorded.');
INSERT INTO public.assessments (id, student_id, title, subject, assessment_type, term, assessment_date, score, max_score, weight_percentage, feedback)
VALUES ('35691b41-cfcf-4754-8032-7a65490c9d99', '20d07c0c-ac56-4b30-8e9c-f79cad701de3', 'Chemistry Unit Quiz 1', 'Chemistry', 'quiz', 'AY 2024-25 Term 1', '2025-08-15', 19.0, 20.0, 15.0, 'Additional practice recommended.');
INSERT INTO public.assessments (id, student_id, title, subject, assessment_type, term, assessment_date, score, max_score, weight_percentage, feedback)
VALUES ('7565d654-1771-4c7a-a1d6-9d95af0cec13', '20d07c0c-ac56-4b30-8e9c-f79cad701de3', 'Physics Unit Quiz 1', 'Physics', 'quiz', 'AY 2024-25 Term 1', '2025-08-15', 18.6, 20.0, 15.0, 'Additional practice recommended.');
INSERT INTO public.assessments (id, student_id, title, subject, assessment_type, term, assessment_date, score, max_score, weight_percentage, feedback)
VALUES ('73c082b8-d36b-4511-91c1-9fab00b6a34e', '20d07c0c-ac56-4b30-8e9c-f79cad701de3', 'Mathematics Unit Quiz 1', 'Mathematics', 'quiz', 'AY 2024-25 Term 1', '2025-08-15', 15.9, 20.0, 15.0, 'Additional practice recommended.');
INSERT INTO public.assessments (id, student_id, title, subject, assessment_type, term, assessment_date, score, max_score, weight_percentage, feedback)
VALUES ('2645eb98-c224-461c-9f33-aaac24f01888', '20d07c0c-ac56-4b30-8e9c-f79cad701de3', 'Physics Laboratory Practical 1', 'Physics', 'lab', 'AY 2024-25 Term 1', '2025-08-25', 19.7, 25.0, 15.0, 'Additional practice recommended.');
INSERT INTO public.assessments (id, student_id, title, subject, assessment_type, term, assessment_date, score, max_score, weight_percentage, feedback)
VALUES ('1f6496f1-7c88-47b1-b6b1-1fb2b21583d7', '20d07c0c-ac56-4b30-8e9c-f79cad701de3', 'English Literature Laboratory Practical 1', 'English Literature', 'lab', 'AY 2024-25 Term 1', '2025-08-25', 21.0, 25.0, 15.0, 'Additional practice recommended.');
INSERT INTO public.assessments (id, student_id, title, subject, assessment_type, term, assessment_date, score, max_score, weight_percentage, feedback)
VALUES ('ec97cf3d-d422-4345-bed1-cd5c2b7e19b4', '20d07c0c-ac56-4b30-8e9c-f79cad701de3', 'Mathematics Laboratory Practical 1', 'Mathematics', 'lab', 'AY 2024-25 Term 1', '2025-08-25', 23.9, 25.0, 15.0, 'Additional practice recommended.');
INSERT INTO public.assessments (id, student_id, title, subject, assessment_type, term, assessment_date, score, max_score, weight_percentage, feedback)
VALUES ('62dad4e7-bfc6-4a5e-a82c-22bc5a91c962', '20d07c0c-ac56-4b30-8e9c-f79cad701de3', 'English Literature Midterm Examination', 'English Literature', 'midterm', 'AY 2024-25 Term 1', '2025-09-10', 92.9, 100.0, 15.0, 'Evaluation recorded.');
INSERT INTO public.assessments (id, student_id, title, subject, assessment_type, term, assessment_date, score, max_score, weight_percentage, feedback)
VALUES ('59d73d37-9541-4b88-8e85-85bf03d6249c', '20d07c0c-ac56-4b30-8e9c-f79cad701de3', 'Physics Midterm Examination', 'Physics', 'midterm', 'AY 2024-25 Term 1', '2025-09-10', 88.0, 100.0, 15.0, 'Evaluation recorded.');
INSERT INTO public.assessments (id, student_id, title, subject, assessment_type, term, assessment_date, score, max_score, weight_percentage, feedback)
VALUES ('22f576d2-217c-49c9-a58b-b9c4e87e5955', '20d07c0c-ac56-4b30-8e9c-f79cad701de3', 'Mathematics Midterm Examination', 'Mathematics', 'midterm', 'AY 2024-25 Term 1', '2025-09-10', 88.6, 100.0, 15.0, 'Evaluation recorded.');
INSERT INTO public.assessments (id, student_id, title, subject, assessment_type, term, assessment_date, score, max_score, weight_percentage, feedback)
VALUES ('d850576d-4c9b-415d-b76e-0c2cafa6aa2f', '20d07c0c-ac56-4b30-8e9c-f79cad701de3', 'Physics Unit Assignment 2', 'Physics', 'assignment', 'AY 2024-25 Term 1', '2025-09-28', 27.7, 30.0, 15.0, 'Additional practice recommended.');
INSERT INTO public.assessments (id, student_id, title, subject, assessment_type, term, assessment_date, score, max_score, weight_percentage, feedback)
VALUES ('5a6eb30f-72ac-49f8-b130-0acd79bb2aa9', '20d07c0c-ac56-4b30-8e9c-f79cad701de3', 'Chemistry Unit Assignment 2', 'Chemistry', 'assignment', 'AY 2024-25 Term 1', '2025-09-28', 26.6, 30.0, 15.0, 'Additional practice recommended.');
INSERT INTO public.assessments (id, student_id, title, subject, assessment_type, term, assessment_date, score, max_score, weight_percentage, feedback)
VALUES ('629bc9ee-24d9-4263-9977-c337e73736b4', '20d07c0c-ac56-4b30-8e9c-f79cad701de3', 'History & Civics Unit Assignment 2', 'History & Civics', 'assignment', 'AY 2024-25 Term 1', '2025-09-28', 24.9, 30.0, 15.0, 'Additional practice recommended.');
INSERT INTO public.assessments (id, student_id, title, subject, assessment_type, term, assessment_date, score, max_score, weight_percentage, feedback)
VALUES ('98eac0bf-c215-4bab-b71e-c0693b8c1784', '20d07c0c-ac56-4b30-8e9c-f79cad701de3', 'Physics Term Project Evaluation', 'Physics', 'project', 'AY 2024-25 Term 1', '2025-10-15', 46.2, 50.0, 15.0, 'Additional practice recommended.');
INSERT INTO public.assessments (id, student_id, title, subject, assessment_type, term, assessment_date, score, max_score, weight_percentage, feedback)
VALUES ('5aacc979-6901-453c-8d37-46b41e70fed6', '20d07c0c-ac56-4b30-8e9c-f79cad701de3', 'History & Civics Term Project Evaluation', 'History & Civics', 'project', 'AY 2024-25 Term 1', '2025-10-15', 40.0, 50.0, 15.0, 'Additional practice recommended.');
INSERT INTO public.assessments (id, student_id, title, subject, assessment_type, term, assessment_date, score, max_score, weight_percentage, feedback)
VALUES ('af3ac4dc-c041-4462-b1ac-b8fa814117f4', '20d07c0c-ac56-4b30-8e9c-f79cad701de3', 'Chemistry Term Project Evaluation', 'Chemistry', 'project', 'AY 2024-25 Term 1', '2025-10-15', 46.8, 50.0, 15.0, 'Additional practice recommended.');
INSERT INTO public.assessments (id, student_id, title, subject, assessment_type, term, assessment_date, score, max_score, weight_percentage, feedback)
VALUES ('76e45f40-3b74-4c15-a3eb-caeee90bc79c', '20d07c0c-ac56-4b30-8e9c-f79cad701de3', 'Physics Term Final Examination', 'Physics', 'final', 'AY 2024-25 Term 1', '2025-11-05', 92.2, 100.0, 35.0, 'Evaluation recorded.');
INSERT INTO public.assessments (id, student_id, title, subject, assessment_type, term, assessment_date, score, max_score, weight_percentage, feedback)
VALUES ('c9c8ba97-74c0-4a41-ac45-b444e59439c9', '20d07c0c-ac56-4b30-8e9c-f79cad701de3', 'Mathematics Term Final Examination', 'Mathematics', 'final', 'AY 2024-25 Term 1', '2025-11-05', 82.3, 100.0, 35.0, 'Evaluation recorded.');
INSERT INTO public.assessments (id, student_id, title, subject, assessment_type, term, assessment_date, score, max_score, weight_percentage, feedback)
VALUES ('b6de5ee8-91be-4a2c-99ef-68e1c0377b3e', '20d07c0c-ac56-4b30-8e9c-f79cad701de3', 'Chemistry Term Final Examination', 'Chemistry', 'final', 'AY 2024-25 Term 1', '2025-11-05', 83.8, 100.0, 35.0, 'Evaluation recorded.');
INSERT INTO public.assessments (id, student_id, title, subject, assessment_type, term, assessment_date, score, max_score, weight_percentage, feedback)
VALUES ('f538ec62-0f1e-484d-8e8a-7aaacd6f3519', '04bdc67a-42d0-4872-b096-afdd8e4549db', 'Mathematics Unit Quiz 1', 'Mathematics', 'quiz', 'AY 2024-25 Term 2', '2025-08-15', 17.8, 20.0, 15.0, 'Additional practice recommended.');
INSERT INTO public.assessments (id, student_id, title, subject, assessment_type, term, assessment_date, score, max_score, weight_percentage, feedback)
VALUES ('04a24592-6b3e-4fef-b8cb-94000cd61851', '04bdc67a-42d0-4872-b096-afdd8e4549db', 'Physics Unit Quiz 1', 'Physics', 'quiz', 'AY 2024-25 Term 2', '2025-08-15', 17.7, 20.0, 15.0, 'Additional practice recommended.');
INSERT INTO public.assessments (id, student_id, title, subject, assessment_type, term, assessment_date, score, max_score, weight_percentage, feedback)
VALUES ('af606443-370e-403b-a313-85ff28b1bbee', '04bdc67a-42d0-4872-b096-afdd8e4549db', 'Chemistry Unit Quiz 1', 'Chemistry', 'quiz', 'AY 2024-25 Term 2', '2025-08-15', 18.2, 20.0, 15.0, 'Additional practice recommended.');
INSERT INTO public.assessments (id, student_id, title, subject, assessment_type, term, assessment_date, score, max_score, weight_percentage, feedback)
VALUES ('593628d0-1967-4d13-8686-3c8cca1790ef', '04bdc67a-42d0-4872-b096-afdd8e4549db', 'Computer Science Laboratory Practical 1', 'Computer Science', 'lab', 'AY 2024-25 Term 2', '2025-08-25', 21.5, 25.0, 15.0, 'Additional practice recommended.');
INSERT INTO public.assessments (id, student_id, title, subject, assessment_type, term, assessment_date, score, max_score, weight_percentage, feedback)
VALUES ('771274fb-ce8e-4fc9-b661-bda803f9440c', '04bdc67a-42d0-4872-b096-afdd8e4549db', 'English Literature Laboratory Practical 1', 'English Literature', 'lab', 'AY 2024-25 Term 2', '2025-08-25', 22.2, 25.0, 15.0, 'Additional practice recommended.');
INSERT INTO public.assessments (id, student_id, title, subject, assessment_type, term, assessment_date, score, max_score, weight_percentage, feedback)
VALUES ('5da461ea-ce13-4719-95d6-f752675d6930', '04bdc67a-42d0-4872-b096-afdd8e4549db', 'Chemistry Laboratory Practical 1', 'Chemistry', 'lab', 'AY 2024-25 Term 2', '2025-08-25', 19.9, 25.0, 15.0, 'Additional practice recommended.');
INSERT INTO public.assessments (id, student_id, title, subject, assessment_type, term, assessment_date, score, max_score, weight_percentage, feedback)
VALUES ('028d94d8-0f24-429d-990c-99412a34fa9c', '04bdc67a-42d0-4872-b096-afdd8e4549db', 'History & Civics Midterm Examination', 'History & Civics', 'midterm', 'AY 2024-25 Term 2', '2025-09-10', 85.7, 100.0, 15.0, 'Evaluation recorded.');
INSERT INTO public.assessments (id, student_id, title, subject, assessment_type, term, assessment_date, score, max_score, weight_percentage, feedback)
VALUES ('e60b1f99-d06d-4cb5-af53-7f848d6bef00', '04bdc67a-42d0-4872-b096-afdd8e4549db', 'Mathematics Midterm Examination', 'Mathematics', 'midterm', 'AY 2024-25 Term 2', '2025-09-10', 94.0, 100.0, 15.0, 'Evaluation recorded.');
INSERT INTO public.assessments (id, student_id, title, subject, assessment_type, term, assessment_date, score, max_score, weight_percentage, feedback)
VALUES ('d4aa2a2d-6823-4d67-90d4-69ae6a87211b', '04bdc67a-42d0-4872-b096-afdd8e4549db', 'Physics Midterm Examination', 'Physics', 'midterm', 'AY 2024-25 Term 2', '2025-09-10', 85.4, 100.0, 15.0, 'Evaluation recorded.');
INSERT INTO public.assessments (id, student_id, title, subject, assessment_type, term, assessment_date, score, max_score, weight_percentage, feedback)
VALUES ('7e62ea9d-75b4-40f6-9c56-10fa54932ea0', '04bdc67a-42d0-4872-b096-afdd8e4549db', 'Computer Science Unit Assignment 2', 'Computer Science', 'assignment', 'AY 2024-25 Term 2', '2025-09-28', 27.3, 30.0, 15.0, 'Additional practice recommended.');
INSERT INTO public.assessments (id, student_id, title, subject, assessment_type, term, assessment_date, score, max_score, weight_percentage, feedback)
VALUES ('b15f9c75-0469-408e-8e1d-23f4a1418afa', '04bdc67a-42d0-4872-b096-afdd8e4549db', 'History & Civics Unit Assignment 2', 'History & Civics', 'assignment', 'AY 2024-25 Term 2', '2025-09-28', 25.1, 30.0, 15.0, 'Additional practice recommended.');
INSERT INTO public.assessments (id, student_id, title, subject, assessment_type, term, assessment_date, score, max_score, weight_percentage, feedback)
VALUES ('5767c91d-fb7b-4dda-aa67-16cfb19d9167', '04bdc67a-42d0-4872-b096-afdd8e4549db', 'English Literature Unit Assignment 2', 'English Literature', 'assignment', 'AY 2024-25 Term 2', '2025-09-28', 25.1, 30.0, 15.0, 'Additional practice recommended.');
INSERT INTO public.assessments (id, student_id, title, subject, assessment_type, term, assessment_date, score, max_score, weight_percentage, feedback)
VALUES ('a7b10dee-a278-4678-adef-bf08f42ce32d', '04bdc67a-42d0-4872-b096-afdd8e4549db', 'Chemistry Term Project Evaluation', 'Chemistry', 'project', 'AY 2024-25 Term 2', '2025-10-15', 45.2, 50.0, 15.0, 'Additional practice recommended.');
INSERT INTO public.assessments (id, student_id, title, subject, assessment_type, term, assessment_date, score, max_score, weight_percentage, feedback)
VALUES ('3e101e02-ac3c-46af-8e35-b3312be340b3', '04bdc67a-42d0-4872-b096-afdd8e4549db', 'History & Civics Term Project Evaluation', 'History & Civics', 'project', 'AY 2024-25 Term 2', '2025-10-15', 43.3, 50.0, 15.0, 'Additional practice recommended.');
INSERT INTO public.assessments (id, student_id, title, subject, assessment_type, term, assessment_date, score, max_score, weight_percentage, feedback)
VALUES ('7ab4ddc9-2c49-44ac-a397-e9c2684ba954', '04bdc67a-42d0-4872-b096-afdd8e4549db', 'Physics Term Project Evaluation', 'Physics', 'project', 'AY 2024-25 Term 2', '2025-10-15', 39.8, 50.0, 15.0, 'Additional practice recommended.');
INSERT INTO public.assessments (id, student_id, title, subject, assessment_type, term, assessment_date, score, max_score, weight_percentage, feedback)
VALUES ('270c029e-3567-4bef-a7fd-ac2f337b0f45', '04bdc67a-42d0-4872-b096-afdd8e4549db', 'Mathematics Term Final Examination', 'Mathematics', 'final', 'AY 2024-25 Term 2', '2025-11-05', 79.7, 100.0, 35.0, 'Evaluation recorded.');
INSERT INTO public.assessments (id, student_id, title, subject, assessment_type, term, assessment_date, score, max_score, weight_percentage, feedback)
VALUES ('577c2800-d485-449a-8ffd-49cad8cbd233', '04bdc67a-42d0-4872-b096-afdd8e4549db', 'History & Civics Term Final Examination', 'History & Civics', 'final', 'AY 2024-25 Term 2', '2025-11-05', 91.3, 100.0, 35.0, 'Evaluation recorded.');
INSERT INTO public.assessments (id, student_id, title, subject, assessment_type, term, assessment_date, score, max_score, weight_percentage, feedback)
VALUES ('14c61a0f-2faf-4183-9023-af9162c1aa0b', '04bdc67a-42d0-4872-b096-afdd8e4549db', 'Computer Science Term Final Examination', 'Computer Science', 'final', 'AY 2024-25 Term 2', '2025-11-05', 92.6, 100.0, 35.0, 'Evaluation recorded.');
INSERT INTO public.assessments (id, student_id, title, subject, assessment_type, term, assessment_date, score, max_score, weight_percentage, feedback)
VALUES ('900a9fb4-61d8-4d72-bbc0-c406c1181334', 'e89ca679-ca93-4c30-9621-450664c5b826', 'History & Civics Unit Quiz 1', 'History & Civics', 'quiz', 'AY 2025-26 Term 1', '2025-08-15', 17.8, 20.0, 15.0, 'Additional practice recommended.');
INSERT INTO public.assessments (id, student_id, title, subject, assessment_type, term, assessment_date, score, max_score, weight_percentage, feedback)
VALUES ('389fd839-bc86-4688-8ded-6098f66bfc72', 'e89ca679-ca93-4c30-9621-450664c5b826', 'English Literature Unit Quiz 1', 'English Literature', 'quiz', 'AY 2025-26 Term 1', '2025-08-15', 18.0, 20.0, 15.0, 'Additional practice recommended.');
INSERT INTO public.assessments (id, student_id, title, subject, assessment_type, term, assessment_date, score, max_score, weight_percentage, feedback)
VALUES ('c855677e-bc5c-4382-b85e-2991e80d243b', 'e89ca679-ca93-4c30-9621-450664c5b826', 'Mathematics Unit Quiz 1', 'Mathematics', 'quiz', 'AY 2025-26 Term 1', '2025-08-15', 18.1, 20.0, 15.0, 'Additional practice recommended.');
INSERT INTO public.assessments (id, student_id, title, subject, assessment_type, term, assessment_date, score, max_score, weight_percentage, feedback)
VALUES ('928de9a3-1d7a-4733-ac21-0b30cc4c7491', 'e89ca679-ca93-4c30-9621-450664c5b826', 'Mathematics Laboratory Practical 1', 'Mathematics', 'lab', 'AY 2025-26 Term 1', '2025-08-25', 22.7, 25.0, 15.0, 'Additional practice recommended.');
INSERT INTO public.assessments (id, student_id, title, subject, assessment_type, term, assessment_date, score, max_score, weight_percentage, feedback)
VALUES ('15329310-fd7c-4622-8de2-b57f2f406af6', 'e89ca679-ca93-4c30-9621-450664c5b826', 'Physics Laboratory Practical 1', 'Physics', 'lab', 'AY 2025-26 Term 1', '2025-08-25', 20.9, 25.0, 15.0, 'Additional practice recommended.');
INSERT INTO public.assessments (id, student_id, title, subject, assessment_type, term, assessment_date, score, max_score, weight_percentage, feedback)
VALUES ('414b936b-d2df-491e-a765-14f761239db9', 'e89ca679-ca93-4c30-9621-450664c5b826', 'Chemistry Laboratory Practical 1', 'Chemistry', 'lab', 'AY 2025-26 Term 1', '2025-08-25', 21.0, 25.0, 15.0, 'Additional practice recommended.');
INSERT INTO public.assessments (id, student_id, title, subject, assessment_type, term, assessment_date, score, max_score, weight_percentage, feedback)
VALUES ('ebb691cf-d408-44f8-a8ef-68bb9fdbf3e6', 'e89ca679-ca93-4c30-9621-450664c5b826', 'Mathematics Midterm Examination', 'Mathematics', 'midterm', 'AY 2025-26 Term 1', '2025-09-10', 88.2, 100.0, 15.0, 'Evaluation recorded.');
INSERT INTO public.assessments (id, student_id, title, subject, assessment_type, term, assessment_date, score, max_score, weight_percentage, feedback)
VALUES ('ac66b16c-6edc-4671-a06d-c0021ef55646', 'e89ca679-ca93-4c30-9621-450664c5b826', 'Physics Midterm Examination', 'Physics', 'midterm', 'AY 2025-26 Term 1', '2025-09-10', 85.2, 100.0, 15.0, 'Evaluation recorded.');
INSERT INTO public.assessments (id, student_id, title, subject, assessment_type, term, assessment_date, score, max_score, weight_percentage, feedback)
VALUES ('637ed3b8-4118-4cbd-b4b2-3b19e00dd0c9', 'e89ca679-ca93-4c30-9621-450664c5b826', 'English Literature Midterm Examination', 'English Literature', 'midterm', 'AY 2025-26 Term 1', '2025-09-10', 80.6, 100.0, 15.0, 'Evaluation recorded.');
INSERT INTO public.assessments (id, student_id, title, subject, assessment_type, term, assessment_date, score, max_score, weight_percentage, feedback)
VALUES ('be993fd2-f9c8-47ac-b164-2a40719066cc', 'e89ca679-ca93-4c30-9621-450664c5b826', 'History & Civics Unit Assignment 2', 'History & Civics', 'assignment', 'AY 2025-26 Term 1', '2025-09-28', 27.4, 30.0, 15.0, 'Additional practice recommended.');
INSERT INTO public.assessments (id, student_id, title, subject, assessment_type, term, assessment_date, score, max_score, weight_percentage, feedback)
VALUES ('0c32b58c-ff5f-4d2b-9c03-1b170d4a74d1', 'e89ca679-ca93-4c30-9621-450664c5b826', 'Mathematics Unit Assignment 2', 'Mathematics', 'assignment', 'AY 2025-26 Term 1', '2025-09-28', 24.6, 30.0, 15.0, 'Additional practice recommended.');
INSERT INTO public.assessments (id, student_id, title, subject, assessment_type, term, assessment_date, score, max_score, weight_percentage, feedback)
VALUES ('66cb0449-33e8-45e6-ab72-fc167ff688de', 'e89ca679-ca93-4c30-9621-450664c5b826', 'English Literature Unit Assignment 2', 'English Literature', 'assignment', 'AY 2025-26 Term 1', '2025-09-28', 25.7, 30.0, 15.0, 'Additional practice recommended.');
INSERT INTO public.assessments (id, student_id, title, subject, assessment_type, term, assessment_date, score, max_score, weight_percentage, feedback)
VALUES ('78476958-94ca-4195-91f6-097e155ce7f4', 'e89ca679-ca93-4c30-9621-450664c5b826', 'Chemistry Term Project Evaluation', 'Chemistry', 'project', 'AY 2025-26 Term 1', '2025-10-15', 41.8, 50.0, 15.0, 'Additional practice recommended.');
INSERT INTO public.assessments (id, student_id, title, subject, assessment_type, term, assessment_date, score, max_score, weight_percentage, feedback)
VALUES ('10442206-7d5b-45cb-bb6c-71c402f25f6f', 'e89ca679-ca93-4c30-9621-450664c5b826', 'Physics Term Project Evaluation', 'Physics', 'project', 'AY 2025-26 Term 1', '2025-10-15', 41.9, 50.0, 15.0, 'Additional practice recommended.');
INSERT INTO public.assessments (id, student_id, title, subject, assessment_type, term, assessment_date, score, max_score, weight_percentage, feedback)
VALUES ('dcd8cf58-d686-4273-ae5f-22605f95e5f6', 'e89ca679-ca93-4c30-9621-450664c5b826', 'History & Civics Term Project Evaluation', 'History & Civics', 'project', 'AY 2025-26 Term 1', '2025-10-15', 47.5, 50.0, 15.0, 'Additional practice recommended.');
INSERT INTO public.assessments (id, student_id, title, subject, assessment_type, term, assessment_date, score, max_score, weight_percentage, feedback)
VALUES ('7a222d8b-b526-4f1d-a44d-e8c75a610940', 'e89ca679-ca93-4c30-9621-450664c5b826', 'English Literature Term Final Examination', 'English Literature', 'final', 'AY 2025-26 Term 1', '2025-11-05', 80.8, 100.0, 35.0, 'Evaluation recorded.');
INSERT INTO public.assessments (id, student_id, title, subject, assessment_type, term, assessment_date, score, max_score, weight_percentage, feedback)
VALUES ('f5f411ec-e876-4a8d-a1b9-37241ae48cc6', 'e89ca679-ca93-4c30-9621-450664c5b826', 'Mathematics Term Final Examination', 'Mathematics', 'final', 'AY 2025-26 Term 1', '2025-11-05', 91.6, 100.0, 35.0, 'Evaluation recorded.');
INSERT INTO public.assessments (id, student_id, title, subject, assessment_type, term, assessment_date, score, max_score, weight_percentage, feedback)
VALUES ('070e7832-c96b-4b1f-bd09-94321f320af4', 'e89ca679-ca93-4c30-9621-450664c5b826', 'History & Civics Term Final Examination', 'History & Civics', 'final', 'AY 2025-26 Term 1', '2025-11-05', 78.9, 100.0, 35.0, 'Evaluation recorded.');
INSERT INTO public.assessments (id, student_id, title, subject, assessment_type, term, assessment_date, score, max_score, weight_percentage, feedback)
VALUES ('dc28ca9a-46f6-44f4-9c22-5bb0372ed358', '23bae913-0d5d-498a-88c5-5bd5bfcc2901', 'English Literature Unit Quiz 1', 'English Literature', 'quiz', 'AY 2025-26 Term 2', '2025-08-15', 17.0, 20.0, 15.0, 'Additional practice recommended.');
INSERT INTO public.assessments (id, student_id, title, subject, assessment_type, term, assessment_date, score, max_score, weight_percentage, feedback)
VALUES ('0ecdef91-c38a-4cfe-9a41-d0169388ab93', '23bae913-0d5d-498a-88c5-5bd5bfcc2901', 'Chemistry Unit Quiz 1', 'Chemistry', 'quiz', 'AY 2025-26 Term 2', '2025-08-15', 18.3, 20.0, 15.0, 'Additional practice recommended.');
INSERT INTO public.assessments (id, student_id, title, subject, assessment_type, term, assessment_date, score, max_score, weight_percentage, feedback)
VALUES ('a11b653b-5646-4430-8f54-1f37db30741a', '23bae913-0d5d-498a-88c5-5bd5bfcc2901', 'Mathematics Unit Quiz 1', 'Mathematics', 'quiz', 'AY 2025-26 Term 2', '2025-08-15', 17.2, 20.0, 15.0, 'Additional practice recommended.');
INSERT INTO public.assessments (id, student_id, title, subject, assessment_type, term, assessment_date, score, max_score, weight_percentage, feedback)
VALUES ('2b16e92f-7b1c-4f78-9f64-34249b5c270b', '23bae913-0d5d-498a-88c5-5bd5bfcc2901', 'Computer Science Laboratory Practical 1', 'Computer Science', 'lab', 'AY 2025-26 Term 2', '2025-08-25', 22.1, 25.0, 15.0, 'Additional practice recommended.');
INSERT INTO public.assessments (id, student_id, title, subject, assessment_type, term, assessment_date, score, max_score, weight_percentage, feedback)
VALUES ('40e7c571-8587-4c8e-adb1-5f05127b5b0d', '23bae913-0d5d-498a-88c5-5bd5bfcc2901', 'Mathematics Laboratory Practical 1', 'Mathematics', 'lab', 'AY 2025-26 Term 2', '2025-08-25', 22.1, 25.0, 15.0, 'Additional practice recommended.');
INSERT INTO public.assessments (id, student_id, title, subject, assessment_type, term, assessment_date, score, max_score, weight_percentage, feedback)
VALUES ('c87a6f42-b01c-497c-a3e2-002ec6705a70', '23bae913-0d5d-498a-88c5-5bd5bfcc2901', 'Chemistry Laboratory Practical 1', 'Chemistry', 'lab', 'AY 2025-26 Term 2', '2025-08-25', 22.7, 25.0, 15.0, 'Additional practice recommended.');
INSERT INTO public.assessments (id, student_id, title, subject, assessment_type, term, assessment_date, score, max_score, weight_percentage, feedback)
VALUES ('a7a93ef6-f009-4d86-bd4d-56fe8f4dff66', '23bae913-0d5d-498a-88c5-5bd5bfcc2901', 'Computer Science Midterm Examination', 'Computer Science', 'midterm', 'AY 2025-26 Term 2', '2025-09-10', 85.3, 100.0, 15.0, 'Evaluation recorded.');
INSERT INTO public.assessments (id, student_id, title, subject, assessment_type, term, assessment_date, score, max_score, weight_percentage, feedback)
VALUES ('b42d5d6d-ca22-4f1e-ae31-fe9266b3adfc', '23bae913-0d5d-498a-88c5-5bd5bfcc2901', 'Chemistry Midterm Examination', 'Chemistry', 'midterm', 'AY 2025-26 Term 2', '2025-09-10', 95.4, 100.0, 15.0, 'Evaluation recorded.');
INSERT INTO public.assessments (id, student_id, title, subject, assessment_type, term, assessment_date, score, max_score, weight_percentage, feedback)
VALUES ('a5cff8e9-6346-438c-9865-d513cf0a7513', '23bae913-0d5d-498a-88c5-5bd5bfcc2901', 'Mathematics Midterm Examination', 'Mathematics', 'midterm', 'AY 2025-26 Term 2', '2025-09-10', 81.1, 100.0, 15.0, 'Evaluation recorded.');
INSERT INTO public.assessments (id, student_id, title, subject, assessment_type, term, assessment_date, score, max_score, weight_percentage, feedback)
VALUES ('9fa67a95-a46d-4ef9-be01-7a0dce0263d7', '23bae913-0d5d-498a-88c5-5bd5bfcc2901', 'English Literature Unit Assignment 2', 'English Literature', 'assignment', 'AY 2025-26 Term 2', '2025-09-28', 23.9, 30.0, 15.0, 'Additional practice recommended.');
INSERT INTO public.assessments (id, student_id, title, subject, assessment_type, term, assessment_date, score, max_score, weight_percentage, feedback)
VALUES ('fc54bcfa-4e7b-46b9-b517-5ac64528d9c3', '23bae913-0d5d-498a-88c5-5bd5bfcc2901', 'Computer Science Unit Assignment 2', 'Computer Science', 'assignment', 'AY 2025-26 Term 2', '2025-09-28', 28.0, 30.0, 15.0, 'Additional practice recommended.');
INSERT INTO public.assessments (id, student_id, title, subject, assessment_type, term, assessment_date, score, max_score, weight_percentage, feedback)
VALUES ('a64d58ad-2aa3-42da-9cf3-3cf57dbc3d5d', '23bae913-0d5d-498a-88c5-5bd5bfcc2901', 'Chemistry Unit Assignment 2', 'Chemistry', 'assignment', 'AY 2025-26 Term 2', '2025-09-28', 24.7, 30.0, 15.0, 'Additional practice recommended.');
INSERT INTO public.assessments (id, student_id, title, subject, assessment_type, term, assessment_date, score, max_score, weight_percentage, feedback)
VALUES ('4704f251-1bf0-4307-94ed-145d5318e74f', '23bae913-0d5d-498a-88c5-5bd5bfcc2901', 'English Literature Term Project Evaluation', 'English Literature', 'project', 'AY 2025-26 Term 2', '2025-10-15', 42.6, 50.0, 15.0, 'Additional practice recommended.');
INSERT INTO public.assessments (id, student_id, title, subject, assessment_type, term, assessment_date, score, max_score, weight_percentage, feedback)
VALUES ('b622ed66-a424-4b16-a87a-c96c697b0b56', '23bae913-0d5d-498a-88c5-5bd5bfcc2901', 'Computer Science Term Project Evaluation', 'Computer Science', 'project', 'AY 2025-26 Term 2', '2025-10-15', 41.8, 50.0, 15.0, 'Additional practice recommended.');
INSERT INTO public.assessments (id, student_id, title, subject, assessment_type, term, assessment_date, score, max_score, weight_percentage, feedback)
VALUES ('24500853-5ec5-42b7-9e72-0cee254818d0', '23bae913-0d5d-498a-88c5-5bd5bfcc2901', 'Mathematics Term Project Evaluation', 'Mathematics', 'project', 'AY 2025-26 Term 2', '2025-10-15', 42.1, 50.0, 15.0, 'Additional practice recommended.');
INSERT INTO public.assessments (id, student_id, title, subject, assessment_type, term, assessment_date, score, max_score, weight_percentage, feedback)
VALUES ('c2e8fe3b-07f9-42dd-ac57-5164e26c6d2d', '23bae913-0d5d-498a-88c5-5bd5bfcc2901', 'Chemistry Term Final Examination', 'Chemistry', 'final', 'AY 2025-26 Term 2', '2025-11-05', 87.2, 100.0, 35.0, 'Evaluation recorded.');
INSERT INTO public.assessments (id, student_id, title, subject, assessment_type, term, assessment_date, score, max_score, weight_percentage, feedback)
VALUES ('e34ed5c6-51f3-4c5c-bf76-e94343a9a882', '23bae913-0d5d-498a-88c5-5bd5bfcc2901', 'Physics Term Final Examination', 'Physics', 'final', 'AY 2025-26 Term 2', '2025-11-05', 80.1, 100.0, 35.0, 'Evaluation recorded.');
INSERT INTO public.assessments (id, student_id, title, subject, assessment_type, term, assessment_date, score, max_score, weight_percentage, feedback)
VALUES ('ce9656d2-ea8d-4002-ad52-0bc5fd29a477', '23bae913-0d5d-498a-88c5-5bd5bfcc2901', 'Mathematics Term Final Examination', 'Mathematics', 'final', 'AY 2025-26 Term 2', '2025-11-05', 87.2, 100.0, 35.0, 'Evaluation recorded.');
INSERT INTO public.assessments (id, student_id, title, subject, assessment_type, term, assessment_date, score, max_score, weight_percentage, feedback)
VALUES ('ca8683b9-f757-4166-98bf-78be7645cf00', '05089772-5251-4ee4-83ce-87f21ae73662', 'English Literature Unit Quiz 1', 'English Literature', 'quiz', 'AY 2024-25 Term 1', '2025-08-15', 17.3, 20.0, 15.0, 'Additional practice recommended.');
INSERT INTO public.assessments (id, student_id, title, subject, assessment_type, term, assessment_date, score, max_score, weight_percentage, feedback)
VALUES ('96e81f40-da08-44af-8462-2a9e1915664e', '05089772-5251-4ee4-83ce-87f21ae73662', 'Mathematics Unit Quiz 1', 'Mathematics', 'quiz', 'AY 2024-25 Term 1', '2025-08-15', 15.7, 20.0, 15.0, 'Additional practice recommended.');
INSERT INTO public.assessments (id, student_id, title, subject, assessment_type, term, assessment_date, score, max_score, weight_percentage, feedback)
VALUES ('90d399e0-7385-46e9-81d6-9a5fe39f536a', '05089772-5251-4ee4-83ce-87f21ae73662', 'Chemistry Unit Quiz 1', 'Chemistry', 'quiz', 'AY 2024-25 Term 1', '2025-08-15', 16.9, 20.0, 15.0, 'Additional practice recommended.');
INSERT INTO public.assessments (id, student_id, title, subject, assessment_type, term, assessment_date, score, max_score, weight_percentage, feedback)
VALUES ('b0becce7-435c-4823-8a1e-63ef4b44baa3', '05089772-5251-4ee4-83ce-87f21ae73662', 'Chemistry Laboratory Practical 1', 'Chemistry', 'lab', 'AY 2024-25 Term 1', '2025-08-25', 22.3, 25.0, 15.0, 'Additional practice recommended.');
INSERT INTO public.assessments (id, student_id, title, subject, assessment_type, term, assessment_date, score, max_score, weight_percentage, feedback)
VALUES ('c6cd0207-a126-48db-bf46-358592776cc9', '05089772-5251-4ee4-83ce-87f21ae73662', 'Mathematics Laboratory Practical 1', 'Mathematics', 'lab', 'AY 2024-25 Term 1', '2025-08-25', 21.8, 25.0, 15.0, 'Additional practice recommended.');
INSERT INTO public.assessments (id, student_id, title, subject, assessment_type, term, assessment_date, score, max_score, weight_percentage, feedback)
VALUES ('1caa0bff-5f73-4d74-b09a-1041bdb627aa', '05089772-5251-4ee4-83ce-87f21ae73662', 'English Literature Laboratory Practical 1', 'English Literature', 'lab', 'AY 2024-25 Term 1', '2025-08-25', 21.6, 25.0, 15.0, 'Additional practice recommended.');
INSERT INTO public.assessments (id, student_id, title, subject, assessment_type, term, assessment_date, score, max_score, weight_percentage, feedback)
VALUES ('dbcb99f8-a0ef-43bc-9eef-390c6f794c7e', '05089772-5251-4ee4-83ce-87f21ae73662', 'English Literature Midterm Examination', 'English Literature', 'midterm', 'AY 2024-25 Term 1', '2025-09-10', 94.4, 100.0, 15.0, 'Evaluation recorded.');
INSERT INTO public.assessments (id, student_id, title, subject, assessment_type, term, assessment_date, score, max_score, weight_percentage, feedback)
VALUES ('1cc9aced-41f4-4542-b1be-1a54f0e2bdb2', '05089772-5251-4ee4-83ce-87f21ae73662', 'Mathematics Midterm Examination', 'Mathematics', 'midterm', 'AY 2024-25 Term 1', '2025-09-10', 88.3, 100.0, 15.0, 'Evaluation recorded.');
INSERT INTO public.assessments (id, student_id, title, subject, assessment_type, term, assessment_date, score, max_score, weight_percentage, feedback)
VALUES ('f7e0e82f-340f-4d14-93db-e4cddeb31070', '05089772-5251-4ee4-83ce-87f21ae73662', 'Computer Science Midterm Examination', 'Computer Science', 'midterm', 'AY 2024-25 Term 1', '2025-09-10', 81.4, 100.0, 15.0, 'Evaluation recorded.');
INSERT INTO public.assessments (id, student_id, title, subject, assessment_type, term, assessment_date, score, max_score, weight_percentage, feedback)
VALUES ('f1f6ce46-cb55-4d02-b079-8b2c6c52aada', '05089772-5251-4ee4-83ce-87f21ae73662', 'English Literature Unit Assignment 2', 'English Literature', 'assignment', 'AY 2024-25 Term 1', '2025-09-28', 28.6, 30.0, 15.0, 'Additional practice recommended.');
INSERT INTO public.assessments (id, student_id, title, subject, assessment_type, term, assessment_date, score, max_score, weight_percentage, feedback)
VALUES ('c93b7c6e-486a-4607-ac3f-16c1bb209eb4', '05089772-5251-4ee4-83ce-87f21ae73662', 'Computer Science Unit Assignment 2', 'Computer Science', 'assignment', 'AY 2024-25 Term 1', '2025-09-28', 25.8, 30.0, 15.0, 'Additional practice recommended.');
INSERT INTO public.assessments (id, student_id, title, subject, assessment_type, term, assessment_date, score, max_score, weight_percentage, feedback)
VALUES ('6a6de2b3-475a-4981-b5ed-ac0717d1156c', '05089772-5251-4ee4-83ce-87f21ae73662', 'Physics Unit Assignment 2', 'Physics', 'assignment', 'AY 2024-25 Term 1', '2025-09-28', 27.8, 30.0, 15.0, 'Additional practice recommended.');
INSERT INTO public.assessments (id, student_id, title, subject, assessment_type, term, assessment_date, score, max_score, weight_percentage, feedback)
VALUES ('6b232983-3bfe-4856-9004-f380217489fb', '05089772-5251-4ee4-83ce-87f21ae73662', 'Chemistry Term Project Evaluation', 'Chemistry', 'project', 'AY 2024-25 Term 1', '2025-10-15', 39.4, 50.0, 15.0, 'Additional practice recommended.');
INSERT INTO public.assessments (id, student_id, title, subject, assessment_type, term, assessment_date, score, max_score, weight_percentage, feedback)
VALUES ('f85f257a-da1d-4ada-9296-926a85143002', '05089772-5251-4ee4-83ce-87f21ae73662', 'Mathematics Term Project Evaluation', 'Mathematics', 'project', 'AY 2024-25 Term 1', '2025-10-15', 45.4, 50.0, 15.0, 'Additional practice recommended.');
INSERT INTO public.assessments (id, student_id, title, subject, assessment_type, term, assessment_date, score, max_score, weight_percentage, feedback)
VALUES ('233f77a4-599b-4a23-809f-41081eb78c0c', '05089772-5251-4ee4-83ce-87f21ae73662', 'Physics Term Project Evaluation', 'Physics', 'project', 'AY 2024-25 Term 1', '2025-10-15', 47.9, 50.0, 15.0, 'Additional practice recommended.');
INSERT INTO public.assessments (id, student_id, title, subject, assessment_type, term, assessment_date, score, max_score, weight_percentage, feedback)
VALUES ('305f798b-1be3-48b6-92e1-11c20bb62bb2', '05089772-5251-4ee4-83ce-87f21ae73662', 'English Literature Term Final Examination', 'English Literature', 'final', 'AY 2024-25 Term 1', '2025-11-05', 84.6, 100.0, 35.0, 'Evaluation recorded.');
INSERT INTO public.assessments (id, student_id, title, subject, assessment_type, term, assessment_date, score, max_score, weight_percentage, feedback)
VALUES ('7e55bbd4-2326-4b3d-9ab2-7ec4421cb89c', '05089772-5251-4ee4-83ce-87f21ae73662', 'History & Civics Term Final Examination', 'History & Civics', 'final', 'AY 2024-25 Term 1', '2025-11-05', 94.5, 100.0, 35.0, 'Evaluation recorded.');
INSERT INTO public.assessments (id, student_id, title, subject, assessment_type, term, assessment_date, score, max_score, weight_percentage, feedback)
VALUES ('7e7d7f50-95bb-4d40-b1c6-11605d70a592', '05089772-5251-4ee4-83ce-87f21ae73662', 'Physics Term Final Examination', 'Physics', 'final', 'AY 2024-25 Term 1', '2025-11-05', 85.0, 100.0, 35.0, 'Evaluation recorded.');
INSERT INTO public.assessments (id, student_id, title, subject, assessment_type, term, assessment_date, score, max_score, weight_percentage, feedback)
VALUES ('4e960609-2b57-479b-8885-47039a94a74e', '78e7fd7b-5932-428e-9786-3195e157ae0e', 'History & Civics Unit Quiz 1', 'History & Civics', 'quiz', 'AY 2024-25 Term 2', '2025-08-15', 17.9, 20.0, 15.0, 'Additional practice recommended.');
INSERT INTO public.assessments (id, student_id, title, subject, assessment_type, term, assessment_date, score, max_score, weight_percentage, feedback)
VALUES ('fd198bb4-c47d-4a23-b155-90126edcc7ea', '78e7fd7b-5932-428e-9786-3195e157ae0e', 'English Literature Unit Quiz 1', 'English Literature', 'quiz', 'AY 2024-25 Term 2', '2025-08-15', 17.1, 20.0, 15.0, 'Additional practice recommended.');
INSERT INTO public.assessments (id, student_id, title, subject, assessment_type, term, assessment_date, score, max_score, weight_percentage, feedback)
VALUES ('fa28f070-669c-4413-bf65-844900005c23', '78e7fd7b-5932-428e-9786-3195e157ae0e', 'Mathematics Unit Quiz 1', 'Mathematics', 'quiz', 'AY 2024-25 Term 2', '2025-08-15', 16.9, 20.0, 15.0, 'Additional practice recommended.');
INSERT INTO public.assessments (id, student_id, title, subject, assessment_type, term, assessment_date, score, max_score, weight_percentage, feedback)
VALUES ('c2f58474-4ced-4400-9208-7f47c10e4bb2', '78e7fd7b-5932-428e-9786-3195e157ae0e', 'Chemistry Laboratory Practical 1', 'Chemistry', 'lab', 'AY 2024-25 Term 2', '2025-08-25', 23.8, 25.0, 15.0, 'Additional practice recommended.');
INSERT INTO public.assessments (id, student_id, title, subject, assessment_type, term, assessment_date, score, max_score, weight_percentage, feedback)
VALUES ('bca46c6b-29f5-4655-88a1-0109b837c89b', '78e7fd7b-5932-428e-9786-3195e157ae0e', 'History & Civics Laboratory Practical 1', 'History & Civics', 'lab', 'AY 2024-25 Term 2', '2025-08-25', 21.0, 25.0, 15.0, 'Additional practice recommended.');
INSERT INTO public.assessments (id, student_id, title, subject, assessment_type, term, assessment_date, score, max_score, weight_percentage, feedback)
VALUES ('cb7a7d47-929e-47f2-a83a-038ec705037c', '78e7fd7b-5932-428e-9786-3195e157ae0e', 'Physics Laboratory Practical 1', 'Physics', 'lab', 'AY 2024-25 Term 2', '2025-08-25', 22.9, 25.0, 15.0, 'Additional practice recommended.');
INSERT INTO public.assessments (id, student_id, title, subject, assessment_type, term, assessment_date, score, max_score, weight_percentage, feedback)
VALUES ('b9746fef-ce71-4e3a-88db-cbdfb17ac23d', '78e7fd7b-5932-428e-9786-3195e157ae0e', 'Physics Midterm Examination', 'Physics', 'midterm', 'AY 2024-25 Term 2', '2025-09-10', 80.8, 100.0, 15.0, 'Evaluation recorded.');
INSERT INTO public.assessments (id, student_id, title, subject, assessment_type, term, assessment_date, score, max_score, weight_percentage, feedback)
VALUES ('0ad49394-fafa-459c-9685-85d01d96f7ad', '78e7fd7b-5932-428e-9786-3195e157ae0e', 'History & Civics Midterm Examination', 'History & Civics', 'midterm', 'AY 2024-25 Term 2', '2025-09-10', 83.3, 100.0, 15.0, 'Evaluation recorded.');
INSERT INTO public.assessments (id, student_id, title, subject, assessment_type, term, assessment_date, score, max_score, weight_percentage, feedback)
VALUES ('7f4917e2-a3f4-4eb1-8d2d-f05dea12dafd', '78e7fd7b-5932-428e-9786-3195e157ae0e', 'English Literature Midterm Examination', 'English Literature', 'midterm', 'AY 2024-25 Term 2', '2025-09-10', 92.2, 100.0, 15.0, 'Evaluation recorded.');
INSERT INTO public.assessments (id, student_id, title, subject, assessment_type, term, assessment_date, score, max_score, weight_percentage, feedback)
VALUES ('f9179021-8da6-4867-9688-5625848204ed', '78e7fd7b-5932-428e-9786-3195e157ae0e', 'English Literature Unit Assignment 2', 'English Literature', 'assignment', 'AY 2024-25 Term 2', '2025-09-28', 27.0, 30.0, 15.0, 'Additional practice recommended.');
INSERT INTO public.assessments (id, student_id, title, subject, assessment_type, term, assessment_date, score, max_score, weight_percentage, feedback)
VALUES ('738544ae-7c61-4f23-b7be-655d465cb4ac', '78e7fd7b-5932-428e-9786-3195e157ae0e', 'History & Civics Unit Assignment 2', 'History & Civics', 'assignment', 'AY 2024-25 Term 2', '2025-09-28', 28.1, 30.0, 15.0, 'Additional practice recommended.');
INSERT INTO public.assessments (id, student_id, title, subject, assessment_type, term, assessment_date, score, max_score, weight_percentage, feedback)
VALUES ('d4b2716d-bac1-4ecd-ab7d-c30e884aef1b', '78e7fd7b-5932-428e-9786-3195e157ae0e', 'Mathematics Unit Assignment 2', 'Mathematics', 'assignment', 'AY 2024-25 Term 2', '2025-09-28', 26.7, 30.0, 15.0, 'Additional practice recommended.');
INSERT INTO public.assessments (id, student_id, title, subject, assessment_type, term, assessment_date, score, max_score, weight_percentage, feedback)
VALUES ('e028a48f-c785-4da6-a0e9-614bf6f7eb84', '78e7fd7b-5932-428e-9786-3195e157ae0e', 'English Literature Term Project Evaluation', 'English Literature', 'project', 'AY 2024-25 Term 2', '2025-10-15', 40.5, 50.0, 15.0, 'Additional practice recommended.');
INSERT INTO public.assessments (id, student_id, title, subject, assessment_type, term, assessment_date, score, max_score, weight_percentage, feedback)
VALUES ('15a56fa0-a7c3-441c-99d3-e370ef6c3c59', '78e7fd7b-5932-428e-9786-3195e157ae0e', 'Computer Science Term Project Evaluation', 'Computer Science', 'project', 'AY 2024-25 Term 2', '2025-10-15', 46.5, 50.0, 15.0, 'Additional practice recommended.');
INSERT INTO public.assessments (id, student_id, title, subject, assessment_type, term, assessment_date, score, max_score, weight_percentage, feedback)
VALUES ('0592002a-d3db-49c5-926b-df552755f03f', '78e7fd7b-5932-428e-9786-3195e157ae0e', 'Physics Term Project Evaluation', 'Physics', 'project', 'AY 2024-25 Term 2', '2025-10-15', 45.9, 50.0, 15.0, 'Additional practice recommended.');
INSERT INTO public.assessments (id, student_id, title, subject, assessment_type, term, assessment_date, score, max_score, weight_percentage, feedback)
VALUES ('eb4854f4-280c-451e-89a8-b0fd4b8a9b2f', '78e7fd7b-5932-428e-9786-3195e157ae0e', 'Physics Term Final Examination', 'Physics', 'final', 'AY 2024-25 Term 2', '2025-11-05', 85.4, 100.0, 35.0, 'Evaluation recorded.');
INSERT INTO public.assessments (id, student_id, title, subject, assessment_type, term, assessment_date, score, max_score, weight_percentage, feedback)
VALUES ('5a64d67a-269b-49ea-8361-ffea18c4a1c6', '78e7fd7b-5932-428e-9786-3195e157ae0e', 'Computer Science Term Final Examination', 'Computer Science', 'final', 'AY 2024-25 Term 2', '2025-11-05', 90.2, 100.0, 35.0, 'Evaluation recorded.');
INSERT INTO public.assessments (id, student_id, title, subject, assessment_type, term, assessment_date, score, max_score, weight_percentage, feedback)
VALUES ('f7fb993c-7a9d-4118-86eb-843bad89bf17', '78e7fd7b-5932-428e-9786-3195e157ae0e', 'Mathematics Term Final Examination', 'Mathematics', 'final', 'AY 2024-25 Term 2', '2025-11-05', 82.3, 100.0, 35.0, 'Evaluation recorded.');
INSERT INTO public.assessments (id, student_id, title, subject, assessment_type, term, assessment_date, score, max_score, weight_percentage, feedback)
VALUES ('6f8d0ebb-6185-4f15-b148-ebcaf0cadcb5', 'f45c2d18-420f-4a52-98a6-f8f5b8211c51', 'Mathematics Unit Quiz 1', 'Mathematics', 'quiz', 'AY 2025-26 Term 1', '2025-08-15', 17.2, 20.0, 15.0, 'Additional practice recommended.');
INSERT INTO public.assessments (id, student_id, title, subject, assessment_type, term, assessment_date, score, max_score, weight_percentage, feedback)
VALUES ('68ee9392-d989-4844-96ea-76c35713b17c', 'f45c2d18-420f-4a52-98a6-f8f5b8211c51', 'Physics Unit Quiz 1', 'Physics', 'quiz', 'AY 2025-26 Term 1', '2025-08-15', 17.4, 20.0, 15.0, 'Additional practice recommended.');
INSERT INTO public.assessments (id, student_id, title, subject, assessment_type, term, assessment_date, score, max_score, weight_percentage, feedback)
VALUES ('4a430dfa-9f2c-4db9-9f21-964ec3451fe6', 'f45c2d18-420f-4a52-98a6-f8f5b8211c51', 'Chemistry Unit Quiz 1', 'Chemistry', 'quiz', 'AY 2025-26 Term 1', '2025-08-15', 18.6, 20.0, 15.0, 'Additional practice recommended.');
INSERT INTO public.assessments (id, student_id, title, subject, assessment_type, term, assessment_date, score, max_score, weight_percentage, feedback)
VALUES ('6c3467c0-197b-492a-9b22-c0d319a20a02', 'f45c2d18-420f-4a52-98a6-f8f5b8211c51', 'Mathematics Laboratory Practical 1', 'Mathematics', 'lab', 'AY 2025-26 Term 1', '2025-08-25', 23.5, 25.0, 15.0, 'Additional practice recommended.');
INSERT INTO public.assessments (id, student_id, title, subject, assessment_type, term, assessment_date, score, max_score, weight_percentage, feedback)
VALUES ('f090992d-0e32-443c-891d-9827e90a711e', 'f45c2d18-420f-4a52-98a6-f8f5b8211c51', 'Physics Laboratory Practical 1', 'Physics', 'lab', 'AY 2025-26 Term 1', '2025-08-25', 23.7, 25.0, 15.0, 'Additional practice recommended.');
INSERT INTO public.assessments (id, student_id, title, subject, assessment_type, term, assessment_date, score, max_score, weight_percentage, feedback)
VALUES ('d885f9bf-539c-4e90-aba8-2fb1e64e8236', 'f45c2d18-420f-4a52-98a6-f8f5b8211c51', 'Computer Science Laboratory Practical 1', 'Computer Science', 'lab', 'AY 2025-26 Term 1', '2025-08-25', 21.4, 25.0, 15.0, 'Additional practice recommended.');
INSERT INTO public.assessments (id, student_id, title, subject, assessment_type, term, assessment_date, score, max_score, weight_percentage, feedback)
VALUES ('95f2b43e-1c35-42d4-aa13-82309c877359', 'f45c2d18-420f-4a52-98a6-f8f5b8211c51', 'Computer Science Midterm Examination', 'Computer Science', 'midterm', 'AY 2025-26 Term 1', '2025-09-10', 82.2, 100.0, 15.0, 'Evaluation recorded.');
INSERT INTO public.assessments (id, student_id, title, subject, assessment_type, term, assessment_date, score, max_score, weight_percentage, feedback)
VALUES ('82c3654c-56f4-4393-8836-0400e17eb267', 'f45c2d18-420f-4a52-98a6-f8f5b8211c51', 'English Literature Midterm Examination', 'English Literature', 'midterm', 'AY 2025-26 Term 1', '2025-09-10', 95.9, 100.0, 15.0, 'Evaluation recorded.');
INSERT INTO public.assessments (id, student_id, title, subject, assessment_type, term, assessment_date, score, max_score, weight_percentage, feedback)
VALUES ('d1cec511-1784-4c0c-93be-78bdb65015e0', 'f45c2d18-420f-4a52-98a6-f8f5b8211c51', 'Chemistry Midterm Examination', 'Chemistry', 'midterm', 'AY 2025-26 Term 1', '2025-09-10', 84.7, 100.0, 15.0, 'Evaluation recorded.');
INSERT INTO public.assessments (id, student_id, title, subject, assessment_type, term, assessment_date, score, max_score, weight_percentage, feedback)
VALUES ('a9e15f65-6c37-4f61-aefe-d593498fcb69', 'f45c2d18-420f-4a52-98a6-f8f5b8211c51', 'Mathematics Unit Assignment 2', 'Mathematics', 'assignment', 'AY 2025-26 Term 1', '2025-09-28', 27.9, 30.0, 15.0, 'Additional practice recommended.');
INSERT INTO public.assessments (id, student_id, title, subject, assessment_type, term, assessment_date, score, max_score, weight_percentage, feedback)
VALUES ('e712ddc9-a74e-40ad-831b-6280bc27de0d', 'f45c2d18-420f-4a52-98a6-f8f5b8211c51', 'Chemistry Unit Assignment 2', 'Chemistry', 'assignment', 'AY 2025-26 Term 1', '2025-09-28', 26.9, 30.0, 15.0, 'Additional practice recommended.');
INSERT INTO public.assessments (id, student_id, title, subject, assessment_type, term, assessment_date, score, max_score, weight_percentage, feedback)
VALUES ('4ed5cabf-4723-4e35-8d95-296c8282a639', 'f45c2d18-420f-4a52-98a6-f8f5b8211c51', 'History & Civics Unit Assignment 2', 'History & Civics', 'assignment', 'AY 2025-26 Term 1', '2025-09-28', 27.7, 30.0, 15.0, 'Additional practice recommended.');
INSERT INTO public.assessments (id, student_id, title, subject, assessment_type, term, assessment_date, score, max_score, weight_percentage, feedback)
VALUES ('c1143e93-4097-4fb0-baf9-22ec01cc9438', 'f45c2d18-420f-4a52-98a6-f8f5b8211c51', 'Physics Term Project Evaluation', 'Physics', 'project', 'AY 2025-26 Term 1', '2025-10-15', 47.3, 50.0, 15.0, 'Additional practice recommended.');
INSERT INTO public.assessments (id, student_id, title, subject, assessment_type, term, assessment_date, score, max_score, weight_percentage, feedback)
VALUES ('6f23395e-7346-4dd5-a94c-7429719957a8', 'f45c2d18-420f-4a52-98a6-f8f5b8211c51', 'Mathematics Term Project Evaluation', 'Mathematics', 'project', 'AY 2025-26 Term 1', '2025-10-15', 43.3, 50.0, 15.0, 'Additional practice recommended.');
INSERT INTO public.assessments (id, student_id, title, subject, assessment_type, term, assessment_date, score, max_score, weight_percentage, feedback)
VALUES ('d331e24c-74f8-4a73-a5bc-afb1db88163e', 'f45c2d18-420f-4a52-98a6-f8f5b8211c51', 'Chemistry Term Project Evaluation', 'Chemistry', 'project', 'AY 2025-26 Term 1', '2025-10-15', 46.5, 50.0, 15.0, 'Additional practice recommended.');
INSERT INTO public.assessments (id, student_id, title, subject, assessment_type, term, assessment_date, score, max_score, weight_percentage, feedback)
VALUES ('8f159b10-0716-4b6c-a8b9-05d1f1753b9e', 'f45c2d18-420f-4a52-98a6-f8f5b8211c51', 'History & Civics Term Final Examination', 'History & Civics', 'final', 'AY 2025-26 Term 1', '2025-11-05', 89.1, 100.0, 35.0, 'Evaluation recorded.');
INSERT INTO public.assessments (id, student_id, title, subject, assessment_type, term, assessment_date, score, max_score, weight_percentage, feedback)
VALUES ('414fe74c-5fad-4ca1-991c-a81223f0ecab', 'f45c2d18-420f-4a52-98a6-f8f5b8211c51', 'Computer Science Term Final Examination', 'Computer Science', 'final', 'AY 2025-26 Term 1', '2025-11-05', 94.3, 100.0, 35.0, 'Evaluation recorded.');
INSERT INTO public.assessments (id, student_id, title, subject, assessment_type, term, assessment_date, score, max_score, weight_percentage, feedback)
VALUES ('56fe9627-9c20-4efb-b9f7-df09fba758bf', 'f45c2d18-420f-4a52-98a6-f8f5b8211c51', 'English Literature Term Final Examination', 'English Literature', 'final', 'AY 2025-26 Term 1', '2025-11-05', 78.3, 100.0, 35.0, 'Evaluation recorded.');
INSERT INTO public.assessments (id, student_id, title, subject, assessment_type, term, assessment_date, score, max_score, weight_percentage, feedback)
VALUES ('cecb4bad-bbc3-49ba-8fec-ca2e4c9c225a', 'a5859586-17fe-40e2-89df-e2adbaeb7e3f', 'English Literature Unit Quiz 1', 'English Literature', 'quiz', 'AY 2025-26 Term 2', '2025-08-15', 17.0, 20.0, 15.0, 'Additional practice recommended.');
INSERT INTO public.assessments (id, student_id, title, subject, assessment_type, term, assessment_date, score, max_score, weight_percentage, feedback)
VALUES ('117fe43f-02ad-4c3e-9936-fad87cf98385', 'a5859586-17fe-40e2-89df-e2adbaeb7e3f', 'History & Civics Unit Quiz 1', 'History & Civics', 'quiz', 'AY 2025-26 Term 2', '2025-08-15', 17.3, 20.0, 15.0, 'Additional practice recommended.');
INSERT INTO public.assessments (id, student_id, title, subject, assessment_type, term, assessment_date, score, max_score, weight_percentage, feedback)
VALUES ('751eb601-e5e4-4526-955d-d5b220e1a26a', 'a5859586-17fe-40e2-89df-e2adbaeb7e3f', 'Mathematics Unit Quiz 1', 'Mathematics', 'quiz', 'AY 2025-26 Term 2', '2025-08-15', 17.9, 20.0, 15.0, 'Additional practice recommended.');
INSERT INTO public.assessments (id, student_id, title, subject, assessment_type, term, assessment_date, score, max_score, weight_percentage, feedback)
VALUES ('3d14dae9-dc52-4aa1-9b61-57ad3d3afe5d', 'a5859586-17fe-40e2-89df-e2adbaeb7e3f', 'Chemistry Laboratory Practical 1', 'Chemistry', 'lab', 'AY 2025-26 Term 2', '2025-08-25', 21.1, 25.0, 15.0, 'Additional practice recommended.');
INSERT INTO public.assessments (id, student_id, title, subject, assessment_type, term, assessment_date, score, max_score, weight_percentage, feedback)
VALUES ('4d3e9d74-c783-489f-8ed6-7f1670767cec', 'a5859586-17fe-40e2-89df-e2adbaeb7e3f', 'History & Civics Laboratory Practical 1', 'History & Civics', 'lab', 'AY 2025-26 Term 2', '2025-08-25', 19.8, 25.0, 15.0, 'Additional practice recommended.');
INSERT INTO public.assessments (id, student_id, title, subject, assessment_type, term, assessment_date, score, max_score, weight_percentage, feedback)
VALUES ('bdfed27d-aa48-4e70-9471-39fbf6b585b0', 'a5859586-17fe-40e2-89df-e2adbaeb7e3f', 'Mathematics Laboratory Practical 1', 'Mathematics', 'lab', 'AY 2025-26 Term 2', '2025-08-25', 20.6, 25.0, 15.0, 'Additional practice recommended.');
INSERT INTO public.assessments (id, student_id, title, subject, assessment_type, term, assessment_date, score, max_score, weight_percentage, feedback)
VALUES ('1266f4c9-2a49-49fa-8664-08d7a4bef1a5', 'a5859586-17fe-40e2-89df-e2adbaeb7e3f', 'History & Civics Midterm Examination', 'History & Civics', 'midterm', 'AY 2025-26 Term 2', '2025-09-10', 80.4, 100.0, 15.0, 'Evaluation recorded.');
INSERT INTO public.assessments (id, student_id, title, subject, assessment_type, term, assessment_date, score, max_score, weight_percentage, feedback)
VALUES ('bfd376bb-abe0-48fe-aeac-5590523a1e10', 'a5859586-17fe-40e2-89df-e2adbaeb7e3f', 'Mathematics Midterm Examination', 'Mathematics', 'midterm', 'AY 2025-26 Term 2', '2025-09-10', 84.3, 100.0, 15.0, 'Evaluation recorded.');
INSERT INTO public.assessments (id, student_id, title, subject, assessment_type, term, assessment_date, score, max_score, weight_percentage, feedback)
VALUES ('527796c7-96f9-4416-b888-7e64dff7b738', 'a5859586-17fe-40e2-89df-e2adbaeb7e3f', 'Chemistry Midterm Examination', 'Chemistry', 'midterm', 'AY 2025-26 Term 2', '2025-09-10', 84.1, 100.0, 15.0, 'Evaluation recorded.');
INSERT INTO public.assessments (id, student_id, title, subject, assessment_type, term, assessment_date, score, max_score, weight_percentage, feedback)
VALUES ('9985bada-2576-4f25-ade4-e78e7060b841', 'a5859586-17fe-40e2-89df-e2adbaeb7e3f', 'History & Civics Unit Assignment 2', 'History & Civics', 'assignment', 'AY 2025-26 Term 2', '2025-09-28', 28.7, 30.0, 15.0, 'Additional practice recommended.');
INSERT INTO public.assessments (id, student_id, title, subject, assessment_type, term, assessment_date, score, max_score, weight_percentage, feedback)
VALUES ('9edb7f20-7d74-4523-9bc7-61d249a0365f', 'a5859586-17fe-40e2-89df-e2adbaeb7e3f', 'Physics Unit Assignment 2', 'Physics', 'assignment', 'AY 2025-26 Term 2', '2025-09-28', 26.0, 30.0, 15.0, 'Additional practice recommended.');
INSERT INTO public.assessments (id, student_id, title, subject, assessment_type, term, assessment_date, score, max_score, weight_percentage, feedback)
VALUES ('13b71700-7ab8-4691-9371-6a9bf5188f48', 'a5859586-17fe-40e2-89df-e2adbaeb7e3f', 'Computer Science Unit Assignment 2', 'Computer Science', 'assignment', 'AY 2025-26 Term 2', '2025-09-28', 24.4, 30.0, 15.0, 'Additional practice recommended.');
INSERT INTO public.assessments (id, student_id, title, subject, assessment_type, term, assessment_date, score, max_score, weight_percentage, feedback)
VALUES ('53e19875-f606-4f90-98ae-5cb32f917b60', 'a5859586-17fe-40e2-89df-e2adbaeb7e3f', 'Physics Term Project Evaluation', 'Physics', 'project', 'AY 2025-26 Term 2', '2025-10-15', 39.3, 50.0, 15.0, 'Additional practice recommended.');
INSERT INTO public.assessments (id, student_id, title, subject, assessment_type, term, assessment_date, score, max_score, weight_percentage, feedback)
VALUES ('2c14edff-0317-4ba3-a4f7-55f014e2ab13', 'a5859586-17fe-40e2-89df-e2adbaeb7e3f', 'Mathematics Term Project Evaluation', 'Mathematics', 'project', 'AY 2025-26 Term 2', '2025-10-15', 40.8, 50.0, 15.0, 'Additional practice recommended.');
INSERT INTO public.assessments (id, student_id, title, subject, assessment_type, term, assessment_date, score, max_score, weight_percentage, feedback)
VALUES ('631e3180-7f6a-4190-b3e8-75b960313ce2', 'a5859586-17fe-40e2-89df-e2adbaeb7e3f', 'Computer Science Term Project Evaluation', 'Computer Science', 'project', 'AY 2025-26 Term 2', '2025-10-15', 46.1, 50.0, 15.0, 'Additional practice recommended.');
INSERT INTO public.assessments (id, student_id, title, subject, assessment_type, term, assessment_date, score, max_score, weight_percentage, feedback)
VALUES ('125c087e-c0ef-4e97-b874-88ce693e9a21', 'a5859586-17fe-40e2-89df-e2adbaeb7e3f', 'Mathematics Term Final Examination', 'Mathematics', 'final', 'AY 2025-26 Term 2', '2025-11-05', 87.3, 100.0, 35.0, 'Evaluation recorded.');
INSERT INTO public.assessments (id, student_id, title, subject, assessment_type, term, assessment_date, score, max_score, weight_percentage, feedback)
VALUES ('7d3befa9-0343-4879-88bb-5c1fd7ad034d', 'a5859586-17fe-40e2-89df-e2adbaeb7e3f', 'Chemistry Term Final Examination', 'Chemistry', 'final', 'AY 2025-26 Term 2', '2025-11-05', 95.8, 100.0, 35.0, 'Evaluation recorded.');
INSERT INTO public.assessments (id, student_id, title, subject, assessment_type, term, assessment_date, score, max_score, weight_percentage, feedback)
VALUES ('af2a1cb2-cada-4468-b3e2-8c6f92387270', 'a5859586-17fe-40e2-89df-e2adbaeb7e3f', 'English Literature Term Final Examination', 'English Literature', 'final', 'AY 2025-26 Term 2', '2025-11-05', 87.8, 100.0, 35.0, 'Evaluation recorded.');
INSERT INTO public.assessments (id, student_id, title, subject, assessment_type, term, assessment_date, score, max_score, weight_percentage, feedback)
VALUES ('35fc4a48-98d3-4dae-9fde-1a4e270269bd', '4a0b911a-abfd-4139-b18d-eb21fb120991', 'Chemistry Unit Quiz 1', 'Chemistry', 'quiz', 'AY 2024-25 Term 1', '2025-08-15', 16.2, 20.0, 15.0, 'Additional practice recommended.');
INSERT INTO public.assessments (id, student_id, title, subject, assessment_type, term, assessment_date, score, max_score, weight_percentage, feedback)
VALUES ('fd88f9d7-0c69-48cf-84fd-28643d15bcd8', '4a0b911a-abfd-4139-b18d-eb21fb120991', 'Computer Science Unit Quiz 1', 'Computer Science', 'quiz', 'AY 2024-25 Term 1', '2025-08-15', 17.2, 20.0, 15.0, 'Additional practice recommended.');
INSERT INTO public.assessments (id, student_id, title, subject, assessment_type, term, assessment_date, score, max_score, weight_percentage, feedback)
VALUES ('31860555-c764-4858-ba76-aa1bd1ce00f5', '4a0b911a-abfd-4139-b18d-eb21fb120991', 'English Literature Unit Quiz 1', 'English Literature', 'quiz', 'AY 2024-25 Term 1', '2025-08-15', 17.2, 20.0, 15.0, 'Additional practice recommended.');
INSERT INTO public.assessments (id, student_id, title, subject, assessment_type, term, assessment_date, score, max_score, weight_percentage, feedback)
VALUES ('98d784ef-ccb0-4aac-947c-64bc77747950', '4a0b911a-abfd-4139-b18d-eb21fb120991', 'History & Civics Laboratory Practical 1', 'History & Civics', 'lab', 'AY 2024-25 Term 1', '2025-08-25', 20.7, 25.0, 15.0, 'Additional practice recommended.');
INSERT INTO public.assessments (id, student_id, title, subject, assessment_type, term, assessment_date, score, max_score, weight_percentage, feedback)
VALUES ('1fff373c-e8ff-4ecd-9186-eab09689d491', '4a0b911a-abfd-4139-b18d-eb21fb120991', 'Chemistry Laboratory Practical 1', 'Chemistry', 'lab', 'AY 2024-25 Term 1', '2025-08-25', 23.9, 25.0, 15.0, 'Additional practice recommended.');
INSERT INTO public.assessments (id, student_id, title, subject, assessment_type, term, assessment_date, score, max_score, weight_percentage, feedback)
VALUES ('c5309dbf-0515-4240-89e2-c296f89d3522', '4a0b911a-abfd-4139-b18d-eb21fb120991', 'Computer Science Laboratory Practical 1', 'Computer Science', 'lab', 'AY 2024-25 Term 1', '2025-08-25', 23.8, 25.0, 15.0, 'Additional practice recommended.');
INSERT INTO public.assessments (id, student_id, title, subject, assessment_type, term, assessment_date, score, max_score, weight_percentage, feedback)
VALUES ('ebb2c928-377e-4ed7-988f-4df416526373', '4a0b911a-abfd-4139-b18d-eb21fb120991', 'Mathematics Midterm Examination', 'Mathematics', 'midterm', 'AY 2024-25 Term 1', '2025-09-10', 87.2, 100.0, 15.0, 'Evaluation recorded.');
INSERT INTO public.assessments (id, student_id, title, subject, assessment_type, term, assessment_date, score, max_score, weight_percentage, feedback)
VALUES ('041fd8cd-fd70-4e1f-be49-e0b624bcdf18', '4a0b911a-abfd-4139-b18d-eb21fb120991', 'Computer Science Midterm Examination', 'Computer Science', 'midterm', 'AY 2024-25 Term 1', '2025-09-10', 91.5, 100.0, 15.0, 'Evaluation recorded.');
INSERT INTO public.assessments (id, student_id, title, subject, assessment_type, term, assessment_date, score, max_score, weight_percentage, feedback)
VALUES ('b7dcda4f-8745-43cd-98d4-bd5ac6c6684d', '4a0b911a-abfd-4139-b18d-eb21fb120991', 'Chemistry Midterm Examination', 'Chemistry', 'midterm', 'AY 2024-25 Term 1', '2025-09-10', 80.9, 100.0, 15.0, 'Evaluation recorded.');
INSERT INTO public.assessments (id, student_id, title, subject, assessment_type, term, assessment_date, score, max_score, weight_percentage, feedback)
VALUES ('82ae6a87-199e-4d20-83f2-9ad507bc626c', '4a0b911a-abfd-4139-b18d-eb21fb120991', 'Mathematics Unit Assignment 2', 'Mathematics', 'assignment', 'AY 2024-25 Term 1', '2025-09-28', 23.6, 30.0, 15.0, 'Additional practice recommended.');
INSERT INTO public.assessments (id, student_id, title, subject, assessment_type, term, assessment_date, score, max_score, weight_percentage, feedback)
VALUES ('81067ae6-8915-4992-a33b-3f4bc44e95f2', '4a0b911a-abfd-4139-b18d-eb21fb120991', 'Physics Unit Assignment 2', 'Physics', 'assignment', 'AY 2024-25 Term 1', '2025-09-28', 23.8, 30.0, 15.0, 'Additional practice recommended.');
INSERT INTO public.assessments (id, student_id, title, subject, assessment_type, term, assessment_date, score, max_score, weight_percentage, feedback)
VALUES ('9e287f87-15ee-4ad6-a8ee-0139691df422', '4a0b911a-abfd-4139-b18d-eb21fb120991', 'Computer Science Unit Assignment 2', 'Computer Science', 'assignment', 'AY 2024-25 Term 1', '2025-09-28', 27.6, 30.0, 15.0, 'Additional practice recommended.');
INSERT INTO public.assessments (id, student_id, title, subject, assessment_type, term, assessment_date, score, max_score, weight_percentage, feedback)
VALUES ('040fd29d-a5d4-4b98-ad10-90d09424af92', '4a0b911a-abfd-4139-b18d-eb21fb120991', 'Chemistry Term Project Evaluation', 'Chemistry', 'project', 'AY 2024-25 Term 1', '2025-10-15', 47.5, 50.0, 15.0, 'Additional practice recommended.');
INSERT INTO public.assessments (id, student_id, title, subject, assessment_type, term, assessment_date, score, max_score, weight_percentage, feedback)
VALUES ('94331ed5-fd7d-4aa5-8ab5-1842b4a3dca8', '4a0b911a-abfd-4139-b18d-eb21fb120991', 'History & Civics Term Project Evaluation', 'History & Civics', 'project', 'AY 2024-25 Term 1', '2025-10-15', 39.3, 50.0, 15.0, 'Additional practice recommended.');
INSERT INTO public.assessments (id, student_id, title, subject, assessment_type, term, assessment_date, score, max_score, weight_percentage, feedback)
VALUES ('c66bf410-77db-4031-9634-a9de68e4e836', '4a0b911a-abfd-4139-b18d-eb21fb120991', 'Computer Science Term Project Evaluation', 'Computer Science', 'project', 'AY 2024-25 Term 1', '2025-10-15', 40.4, 50.0, 15.0, 'Additional practice recommended.');
INSERT INTO public.assessments (id, student_id, title, subject, assessment_type, term, assessment_date, score, max_score, weight_percentage, feedback)
VALUES ('7b7cd5e1-5405-4ed7-a1a1-38d78eb52b76', '4a0b911a-abfd-4139-b18d-eb21fb120991', 'Computer Science Term Final Examination', 'Computer Science', 'final', 'AY 2024-25 Term 1', '2025-11-05', 86.0, 100.0, 35.0, 'Evaluation recorded.');
INSERT INTO public.assessments (id, student_id, title, subject, assessment_type, term, assessment_date, score, max_score, weight_percentage, feedback)
VALUES ('b199a2bd-b5f4-442e-b354-ef0679649cd5', '4a0b911a-abfd-4139-b18d-eb21fb120991', 'Chemistry Term Final Examination', 'Chemistry', 'final', 'AY 2024-25 Term 1', '2025-11-05', 79.4, 100.0, 35.0, 'Evaluation recorded.');
INSERT INTO public.assessments (id, student_id, title, subject, assessment_type, term, assessment_date, score, max_score, weight_percentage, feedback)
VALUES ('804c1e48-1882-428e-adff-aa6edaa1363e', '4a0b911a-abfd-4139-b18d-eb21fb120991', 'English Literature Term Final Examination', 'English Literature', 'final', 'AY 2024-25 Term 1', '2025-11-05', 80.5, 100.0, 35.0, 'Evaluation recorded.');
INSERT INTO public.assessments (id, student_id, title, subject, assessment_type, term, assessment_date, score, max_score, weight_percentage, feedback)
VALUES ('dd3ec0fa-6ff1-4b6b-a1fe-b65f2e301887', 'd7bb4c48-ee9b-41d9-b303-68427673dd14', 'Chemistry Unit Quiz 1', 'Chemistry', 'quiz', 'AY 2024-25 Term 2', '2025-08-15', 18.5, 20.0, 15.0, 'Additional practice recommended.');
INSERT INTO public.assessments (id, student_id, title, subject, assessment_type, term, assessment_date, score, max_score, weight_percentage, feedback)
VALUES ('88e26d33-7763-4af1-972d-c6d52a52506d', 'd7bb4c48-ee9b-41d9-b303-68427673dd14', 'Physics Unit Quiz 1', 'Physics', 'quiz', 'AY 2024-25 Term 2', '2025-08-15', 17.4, 20.0, 15.0, 'Additional practice recommended.');
INSERT INTO public.assessments (id, student_id, title, subject, assessment_type, term, assessment_date, score, max_score, weight_percentage, feedback)
VALUES ('422ec585-2268-4d3a-97d7-b6b65d14dd0b', 'd7bb4c48-ee9b-41d9-b303-68427673dd14', 'English Literature Unit Quiz 1', 'English Literature', 'quiz', 'AY 2024-25 Term 2', '2025-08-15', 16.0, 20.0, 15.0, 'Additional practice recommended.');
INSERT INTO public.assessments (id, student_id, title, subject, assessment_type, term, assessment_date, score, max_score, weight_percentage, feedback)
VALUES ('a9dabed1-5564-4a8b-b4a3-ee4893d6c874', 'd7bb4c48-ee9b-41d9-b303-68427673dd14', 'Physics Laboratory Practical 1', 'Physics', 'lab', 'AY 2024-25 Term 2', '2025-08-25', 23.1, 25.0, 15.0, 'Additional practice recommended.');
INSERT INTO public.assessments (id, student_id, title, subject, assessment_type, term, assessment_date, score, max_score, weight_percentage, feedback)
VALUES ('5f989319-4fe9-4256-a919-c4b3b70b4f8a', 'd7bb4c48-ee9b-41d9-b303-68427673dd14', 'History & Civics Laboratory Practical 1', 'History & Civics', 'lab', 'AY 2024-25 Term 2', '2025-08-25', 19.6, 25.0, 15.0, 'Additional practice recommended.');
INSERT INTO public.assessments (id, student_id, title, subject, assessment_type, term, assessment_date, score, max_score, weight_percentage, feedback)
VALUES ('f6a5f61f-72fd-4488-9490-4da051895de0', 'd7bb4c48-ee9b-41d9-b303-68427673dd14', 'English Literature Laboratory Practical 1', 'English Literature', 'lab', 'AY 2024-25 Term 2', '2025-08-25', 22.0, 25.0, 15.0, 'Additional practice recommended.');
INSERT INTO public.assessments (id, student_id, title, subject, assessment_type, term, assessment_date, score, max_score, weight_percentage, feedback)
VALUES ('7a0cdb6d-f141-41d8-8783-3194bd00c231', 'd7bb4c48-ee9b-41d9-b303-68427673dd14', 'Chemistry Midterm Examination', 'Chemistry', 'midterm', 'AY 2024-25 Term 2', '2025-09-10', 89.0, 100.0, 15.0, 'Evaluation recorded.');
INSERT INTO public.assessments (id, student_id, title, subject, assessment_type, term, assessment_date, score, max_score, weight_percentage, feedback)
VALUES ('3aa199b9-2e5c-40e0-b5e7-cda2f4c9e96e', 'd7bb4c48-ee9b-41d9-b303-68427673dd14', 'Computer Science Midterm Examination', 'Computer Science', 'midterm', 'AY 2024-25 Term 2', '2025-09-10', 79.6, 100.0, 15.0, 'Evaluation recorded.');
INSERT INTO public.assessments (id, student_id, title, subject, assessment_type, term, assessment_date, score, max_score, weight_percentage, feedback)
VALUES ('b9e7e649-0e5b-43b3-b31c-dc2c8df5736a', 'd7bb4c48-ee9b-41d9-b303-68427673dd14', 'Physics Midterm Examination', 'Physics', 'midterm', 'AY 2024-25 Term 2', '2025-09-10', 83.6, 100.0, 15.0, 'Evaluation recorded.');
INSERT INTO public.assessments (id, student_id, title, subject, assessment_type, term, assessment_date, score, max_score, weight_percentage, feedback)
VALUES ('1d725683-c5ef-45ca-86c6-aba00400b831', 'd7bb4c48-ee9b-41d9-b303-68427673dd14', 'History & Civics Unit Assignment 2', 'History & Civics', 'assignment', 'AY 2024-25 Term 2', '2025-09-28', 27.6, 30.0, 15.0, 'Additional practice recommended.');
INSERT INTO public.assessments (id, student_id, title, subject, assessment_type, term, assessment_date, score, max_score, weight_percentage, feedback)
VALUES ('8961944e-a3e2-4b6b-b33b-48aa290a5f9d', 'd7bb4c48-ee9b-41d9-b303-68427673dd14', 'Computer Science Unit Assignment 2', 'Computer Science', 'assignment', 'AY 2024-25 Term 2', '2025-09-28', 27.8, 30.0, 15.0, 'Additional practice recommended.');
INSERT INTO public.assessments (id, student_id, title, subject, assessment_type, term, assessment_date, score, max_score, weight_percentage, feedback)
VALUES ('143e0a7f-7972-4450-8f47-96e3bdcfc63d', 'd7bb4c48-ee9b-41d9-b303-68427673dd14', 'English Literature Unit Assignment 2', 'English Literature', 'assignment', 'AY 2024-25 Term 2', '2025-09-28', 23.8, 30.0, 15.0, 'Additional practice recommended.');
INSERT INTO public.assessments (id, student_id, title, subject, assessment_type, term, assessment_date, score, max_score, weight_percentage, feedback)
VALUES ('2c0f3caf-8f07-4484-a52f-1f75d512e6f2', 'd7bb4c48-ee9b-41d9-b303-68427673dd14', 'Chemistry Term Project Evaluation', 'Chemistry', 'project', 'AY 2024-25 Term 2', '2025-10-15', 43.2, 50.0, 15.0, 'Additional practice recommended.');
INSERT INTO public.assessments (id, student_id, title, subject, assessment_type, term, assessment_date, score, max_score, weight_percentage, feedback)
VALUES ('65984acc-f17c-4ca9-be72-66e904a26496', 'd7bb4c48-ee9b-41d9-b303-68427673dd14', 'Mathematics Term Project Evaluation', 'Mathematics', 'project', 'AY 2024-25 Term 2', '2025-10-15', 43.7, 50.0, 15.0, 'Additional practice recommended.');
INSERT INTO public.assessments (id, student_id, title, subject, assessment_type, term, assessment_date, score, max_score, weight_percentage, feedback)
VALUES ('33a22cbb-8788-4ff8-9005-5dc7d907b20b', 'd7bb4c48-ee9b-41d9-b303-68427673dd14', 'Computer Science Term Project Evaluation', 'Computer Science', 'project', 'AY 2024-25 Term 2', '2025-10-15', 40.2, 50.0, 15.0, 'Additional practice recommended.');
INSERT INTO public.assessments (id, student_id, title, subject, assessment_type, term, assessment_date, score, max_score, weight_percentage, feedback)
VALUES ('e528c1fa-ad42-4d21-8616-d4cfece65a7a', 'd7bb4c48-ee9b-41d9-b303-68427673dd14', 'English Literature Term Final Examination', 'English Literature', 'final', 'AY 2024-25 Term 2', '2025-11-05', 91.8, 100.0, 35.0, 'Evaluation recorded.');
INSERT INTO public.assessments (id, student_id, title, subject, assessment_type, term, assessment_date, score, max_score, weight_percentage, feedback)
VALUES ('e975f042-0195-41f9-84b1-70a486916c14', 'd7bb4c48-ee9b-41d9-b303-68427673dd14', 'History & Civics Term Final Examination', 'History & Civics', 'final', 'AY 2024-25 Term 2', '2025-11-05', 80.3, 100.0, 35.0, 'Evaluation recorded.');
INSERT INTO public.assessments (id, student_id, title, subject, assessment_type, term, assessment_date, score, max_score, weight_percentage, feedback)
VALUES ('9f8930f7-c5ed-46a1-a708-8694ca94a294', 'd7bb4c48-ee9b-41d9-b303-68427673dd14', 'Physics Term Final Examination', 'Physics', 'final', 'AY 2024-25 Term 2', '2025-11-05', 87.1, 100.0, 35.0, 'Evaluation recorded.');
INSERT INTO public.assessments (id, student_id, title, subject, assessment_type, term, assessment_date, score, max_score, weight_percentage, feedback)
VALUES ('fe00857e-6524-4846-a1be-276ea3de822f', 'c6518feb-e30e-4c60-992b-7b67af2efe1a', 'Mathematics Unit Quiz 1', 'Mathematics', 'quiz', 'AY 2025-26 Term 1', '2025-08-15', 19.0, 20.0, 15.0, 'Additional practice recommended.');
INSERT INTO public.assessments (id, student_id, title, subject, assessment_type, term, assessment_date, score, max_score, weight_percentage, feedback)
VALUES ('233ec391-a5c8-4107-a78d-f70d87a075ee', 'c6518feb-e30e-4c60-992b-7b67af2efe1a', 'History & Civics Unit Quiz 1', 'History & Civics', 'quiz', 'AY 2025-26 Term 1', '2025-08-15', 18.4, 20.0, 15.0, 'Additional practice recommended.');
INSERT INTO public.assessments (id, student_id, title, subject, assessment_type, term, assessment_date, score, max_score, weight_percentage, feedback)
VALUES ('0c4030f6-ae98-4df1-9cca-3ed247717ac4', 'c6518feb-e30e-4c60-992b-7b67af2efe1a', 'English Literature Unit Quiz 1', 'English Literature', 'quiz', 'AY 2025-26 Term 1', '2025-08-15', 16.6, 20.0, 15.0, 'Additional practice recommended.');
INSERT INTO public.assessments (id, student_id, title, subject, assessment_type, term, assessment_date, score, max_score, weight_percentage, feedback)
VALUES ('dcc49d3d-177c-4d1a-87d9-9a5f6c323552', 'c6518feb-e30e-4c60-992b-7b67af2efe1a', 'Physics Laboratory Practical 1', 'Physics', 'lab', 'AY 2025-26 Term 1', '2025-08-25', 22.3, 25.0, 15.0, 'Additional practice recommended.');
INSERT INTO public.assessments (id, student_id, title, subject, assessment_type, term, assessment_date, score, max_score, weight_percentage, feedback)
VALUES ('2d99f21c-111c-4f93-a4db-1b66bc0daad9', 'c6518feb-e30e-4c60-992b-7b67af2efe1a', 'English Literature Laboratory Practical 1', 'English Literature', 'lab', 'AY 2025-26 Term 1', '2025-08-25', 19.6, 25.0, 15.0, 'Additional practice recommended.');
INSERT INTO public.assessments (id, student_id, title, subject, assessment_type, term, assessment_date, score, max_score, weight_percentage, feedback)
VALUES ('10a3e4f2-6359-4231-bb34-cc6cc657ef4b', 'c6518feb-e30e-4c60-992b-7b67af2efe1a', 'Computer Science Laboratory Practical 1', 'Computer Science', 'lab', 'AY 2025-26 Term 1', '2025-08-25', 23.5, 25.0, 15.0, 'Additional practice recommended.');
INSERT INTO public.assessments (id, student_id, title, subject, assessment_type, term, assessment_date, score, max_score, weight_percentage, feedback)
VALUES ('9169a637-d693-4b5d-9084-6f0356adac15', 'c6518feb-e30e-4c60-992b-7b67af2efe1a', 'English Literature Midterm Examination', 'English Literature', 'midterm', 'AY 2025-26 Term 1', '2025-09-10', 86.7, 100.0, 15.0, 'Evaluation recorded.');
INSERT INTO public.assessments (id, student_id, title, subject, assessment_type, term, assessment_date, score, max_score, weight_percentage, feedback)
VALUES ('9f2caaca-84d7-423b-8e1c-00d5aad71915', 'c6518feb-e30e-4c60-992b-7b67af2efe1a', 'Chemistry Midterm Examination', 'Chemistry', 'midterm', 'AY 2025-26 Term 1', '2025-09-10', 92.5, 100.0, 15.0, 'Evaluation recorded.');
INSERT INTO public.assessments (id, student_id, title, subject, assessment_type, term, assessment_date, score, max_score, weight_percentage, feedback)
VALUES ('101db356-d9ef-43b6-870b-f1b27c63976e', 'c6518feb-e30e-4c60-992b-7b67af2efe1a', 'History & Civics Midterm Examination', 'History & Civics', 'midterm', 'AY 2025-26 Term 1', '2025-09-10', 90.3, 100.0, 15.0, 'Evaluation recorded.');
INSERT INTO public.assessments (id, student_id, title, subject, assessment_type, term, assessment_date, score, max_score, weight_percentage, feedback)
VALUES ('45a6e44f-b3ae-4d00-8d4e-c231f501519b', 'c6518feb-e30e-4c60-992b-7b67af2efe1a', 'Chemistry Unit Assignment 2', 'Chemistry', 'assignment', 'AY 2025-26 Term 1', '2025-09-28', 27.1, 30.0, 15.0, 'Additional practice recommended.');
INSERT INTO public.assessments (id, student_id, title, subject, assessment_type, term, assessment_date, score, max_score, weight_percentage, feedback)
VALUES ('ec5a1f20-97a0-4b74-ad8c-ca3b17171d0b', 'c6518feb-e30e-4c60-992b-7b67af2efe1a', 'Computer Science Unit Assignment 2', 'Computer Science', 'assignment', 'AY 2025-26 Term 1', '2025-09-28', 24.3, 30.0, 15.0, 'Additional practice recommended.');
INSERT INTO public.assessments (id, student_id, title, subject, assessment_type, term, assessment_date, score, max_score, weight_percentage, feedback)
VALUES ('cfc1b01a-f230-41c0-9b57-4a1bb2a9c02f', 'c6518feb-e30e-4c60-992b-7b67af2efe1a', 'Mathematics Unit Assignment 2', 'Mathematics', 'assignment', 'AY 2025-26 Term 1', '2025-09-28', 25.6, 30.0, 15.0, 'Additional practice recommended.');
INSERT INTO public.assessments (id, student_id, title, subject, assessment_type, term, assessment_date, score, max_score, weight_percentage, feedback)
VALUES ('1598d2fc-4a3e-48a2-bdfc-0e5bbb0991cd', 'c6518feb-e30e-4c60-992b-7b67af2efe1a', 'Computer Science Term Project Evaluation', 'Computer Science', 'project', 'AY 2025-26 Term 1', '2025-10-15', 44.5, 50.0, 15.0, 'Additional practice recommended.');
INSERT INTO public.assessments (id, student_id, title, subject, assessment_type, term, assessment_date, score, max_score, weight_percentage, feedback)
VALUES ('811d169f-0b24-4e26-a283-42aff780415c', 'c6518feb-e30e-4c60-992b-7b67af2efe1a', 'Physics Term Project Evaluation', 'Physics', 'project', 'AY 2025-26 Term 1', '2025-10-15', 41.8, 50.0, 15.0, 'Additional practice recommended.');
INSERT INTO public.assessments (id, student_id, title, subject, assessment_type, term, assessment_date, score, max_score, weight_percentage, feedback)
VALUES ('0bc1eebf-3c05-4abc-b13f-d03d00a3040b', 'c6518feb-e30e-4c60-992b-7b67af2efe1a', 'Chemistry Term Project Evaluation', 'Chemistry', 'project', 'AY 2025-26 Term 1', '2025-10-15', 45.5, 50.0, 15.0, 'Additional practice recommended.');
INSERT INTO public.assessments (id, student_id, title, subject, assessment_type, term, assessment_date, score, max_score, weight_percentage, feedback)
VALUES ('5673df56-d2ec-4116-8dd9-9d45337a651a', 'c6518feb-e30e-4c60-992b-7b67af2efe1a', 'History & Civics Term Final Examination', 'History & Civics', 'final', 'AY 2025-26 Term 1', '2025-11-05', 80.4, 100.0, 35.0, 'Evaluation recorded.');
INSERT INTO public.assessments (id, student_id, title, subject, assessment_type, term, assessment_date, score, max_score, weight_percentage, feedback)
VALUES ('a6b5a097-ebae-45e1-87c9-c1d397d23423', 'c6518feb-e30e-4c60-992b-7b67af2efe1a', 'Chemistry Term Final Examination', 'Chemistry', 'final', 'AY 2025-26 Term 1', '2025-11-05', 84.7, 100.0, 35.0, 'Evaluation recorded.');
INSERT INTO public.assessments (id, student_id, title, subject, assessment_type, term, assessment_date, score, max_score, weight_percentage, feedback)
VALUES ('181d58c1-ddf5-4c7f-9de4-2157cd4b0280', 'c6518feb-e30e-4c60-992b-7b67af2efe1a', 'Computer Science Term Final Examination', 'Computer Science', 'final', 'AY 2025-26 Term 1', '2025-11-05', 88.1, 100.0, 35.0, 'Evaluation recorded.');
INSERT INTO public.assessments (id, student_id, title, subject, assessment_type, term, assessment_date, score, max_score, weight_percentage, feedback)
VALUES ('93353aaf-dae1-4dcd-b34c-822bb082386b', 'e3f1d90f-85ed-4367-a618-8604c886458e', 'Computer Science Unit Quiz 1', 'Computer Science', 'quiz', 'AY 2025-26 Term 2', '2025-08-15', 16.6, 20.0, 15.0, 'Additional practice recommended.');
INSERT INTO public.assessments (id, student_id, title, subject, assessment_type, term, assessment_date, score, max_score, weight_percentage, feedback)
VALUES ('31a8724e-e97c-49ab-a264-88ee8ea575cf', 'e3f1d90f-85ed-4367-a618-8604c886458e', 'English Literature Unit Quiz 1', 'English Literature', 'quiz', 'AY 2025-26 Term 2', '2025-08-15', 15.6, 20.0, 15.0, 'Additional practice recommended.');
INSERT INTO public.assessments (id, student_id, title, subject, assessment_type, term, assessment_date, score, max_score, weight_percentage, feedback)
VALUES ('d2593b11-f38a-4d1e-bf44-9d02efcb245b', 'e3f1d90f-85ed-4367-a618-8604c886458e', 'History & Civics Unit Quiz 1', 'History & Civics', 'quiz', 'AY 2025-26 Term 2', '2025-08-15', 16.0, 20.0, 15.0, 'Additional practice recommended.');
INSERT INTO public.assessments (id, student_id, title, subject, assessment_type, term, assessment_date, score, max_score, weight_percentage, feedback)
VALUES ('1f8c52ae-24b8-4afd-bed9-113bb6f3b792', 'e3f1d90f-85ed-4367-a618-8604c886458e', 'Physics Laboratory Practical 1', 'Physics', 'lab', 'AY 2025-26 Term 2', '2025-08-25', 22.9, 25.0, 15.0, 'Additional practice recommended.');
INSERT INTO public.assessments (id, student_id, title, subject, assessment_type, term, assessment_date, score, max_score, weight_percentage, feedback)
VALUES ('15fe0143-490d-4074-8e12-4caf52dedbf4', 'e3f1d90f-85ed-4367-a618-8604c886458e', 'Chemistry Laboratory Practical 1', 'Chemistry', 'lab', 'AY 2025-26 Term 2', '2025-08-25', 21.1, 25.0, 15.0, 'Additional practice recommended.');
INSERT INTO public.assessments (id, student_id, title, subject, assessment_type, term, assessment_date, score, max_score, weight_percentage, feedback)
VALUES ('c23d94c9-cf9d-4d5a-af5d-f916bb0c7f1d', 'e3f1d90f-85ed-4367-a618-8604c886458e', 'English Literature Laboratory Practical 1', 'English Literature', 'lab', 'AY 2025-26 Term 2', '2025-08-25', 21.3, 25.0, 15.0, 'Additional practice recommended.');
INSERT INTO public.assessments (id, student_id, title, subject, assessment_type, term, assessment_date, score, max_score, weight_percentage, feedback)
VALUES ('ed99bd36-465d-4e05-bfc5-441a404c5dba', 'e3f1d90f-85ed-4367-a618-8604c886458e', 'English Literature Midterm Examination', 'English Literature', 'midterm', 'AY 2025-26 Term 2', '2025-09-10', 84.5, 100.0, 15.0, 'Evaluation recorded.');
INSERT INTO public.assessments (id, student_id, title, subject, assessment_type, term, assessment_date, score, max_score, weight_percentage, feedback)
VALUES ('2fa882d8-c36c-4600-83bd-a99a95819c5a', 'e3f1d90f-85ed-4367-a618-8604c886458e', 'History & Civics Midterm Examination', 'History & Civics', 'midterm', 'AY 2025-26 Term 2', '2025-09-10', 83.2, 100.0, 15.0, 'Evaluation recorded.');
INSERT INTO public.assessments (id, student_id, title, subject, assessment_type, term, assessment_date, score, max_score, weight_percentage, feedback)
VALUES ('7cc8dd38-2547-4590-94be-ac170fa1eac4', 'e3f1d90f-85ed-4367-a618-8604c886458e', 'Physics Midterm Examination', 'Physics', 'midterm', 'AY 2025-26 Term 2', '2025-09-10', 85.0, 100.0, 15.0, 'Evaluation recorded.');
INSERT INTO public.assessments (id, student_id, title, subject, assessment_type, term, assessment_date, score, max_score, weight_percentage, feedback)
VALUES ('76a8f927-f53b-43ab-a08b-47568052c4b6', 'e3f1d90f-85ed-4367-a618-8604c886458e', 'Computer Science Unit Assignment 2', 'Computer Science', 'assignment', 'AY 2025-26 Term 2', '2025-09-28', 27.9, 30.0, 15.0, 'Additional practice recommended.');
INSERT INTO public.assessments (id, student_id, title, subject, assessment_type, term, assessment_date, score, max_score, weight_percentage, feedback)
VALUES ('7568aa58-c9df-4b3c-a8ed-59104df37722', 'e3f1d90f-85ed-4367-a618-8604c886458e', 'English Literature Unit Assignment 2', 'English Literature', 'assignment', 'AY 2025-26 Term 2', '2025-09-28', 26.8, 30.0, 15.0, 'Additional practice recommended.');
INSERT INTO public.assessments (id, student_id, title, subject, assessment_type, term, assessment_date, score, max_score, weight_percentage, feedback)
VALUES ('7c6d1b48-4177-4aae-a168-e7823b593305', 'e3f1d90f-85ed-4367-a618-8604c886458e', 'Chemistry Unit Assignment 2', 'Chemistry', 'assignment', 'AY 2025-26 Term 2', '2025-09-28', 26.7, 30.0, 15.0, 'Additional practice recommended.');
INSERT INTO public.assessments (id, student_id, title, subject, assessment_type, term, assessment_date, score, max_score, weight_percentage, feedback)
VALUES ('fa9a5c1e-77e7-406e-a3aa-ecbdf63a7d5e', 'e3f1d90f-85ed-4367-a618-8604c886458e', 'Physics Term Project Evaluation', 'Physics', 'project', 'AY 2025-26 Term 2', '2025-10-15', 42.4, 50.0, 15.0, 'Additional practice recommended.');
INSERT INTO public.assessments (id, student_id, title, subject, assessment_type, term, assessment_date, score, max_score, weight_percentage, feedback)
VALUES ('a720ddcd-0169-4e3b-b826-7f3016eceae0', 'e3f1d90f-85ed-4367-a618-8604c886458e', 'Mathematics Term Project Evaluation', 'Mathematics', 'project', 'AY 2025-26 Term 2', '2025-10-15', 47.9, 50.0, 15.0, 'Additional practice recommended.');
INSERT INTO public.assessments (id, student_id, title, subject, assessment_type, term, assessment_date, score, max_score, weight_percentage, feedback)
VALUES ('c56d670a-d927-49f6-b835-ca79d0714622', 'e3f1d90f-85ed-4367-a618-8604c886458e', 'Computer Science Term Project Evaluation', 'Computer Science', 'project', 'AY 2025-26 Term 2', '2025-10-15', 44.0, 50.0, 15.0, 'Additional practice recommended.');
INSERT INTO public.assessments (id, student_id, title, subject, assessment_type, term, assessment_date, score, max_score, weight_percentage, feedback)
VALUES ('e30bce6b-fc53-4cfc-a0c0-52d608370bf4', 'e3f1d90f-85ed-4367-a618-8604c886458e', 'Chemistry Term Final Examination', 'Chemistry', 'final', 'AY 2025-26 Term 2', '2025-11-05', 88.8, 100.0, 35.0, 'Evaluation recorded.');
INSERT INTO public.assessments (id, student_id, title, subject, assessment_type, term, assessment_date, score, max_score, weight_percentage, feedback)
VALUES ('6aa7af07-e44d-41a1-be46-83d607150fd4', 'e3f1d90f-85ed-4367-a618-8604c886458e', 'Physics Term Final Examination', 'Physics', 'final', 'AY 2025-26 Term 2', '2025-11-05', 85.2, 100.0, 35.0, 'Evaluation recorded.');
INSERT INTO public.assessments (id, student_id, title, subject, assessment_type, term, assessment_date, score, max_score, weight_percentage, feedback)
VALUES ('81629f69-5809-4bf2-b9a4-38694bd2c244', 'e3f1d90f-85ed-4367-a618-8604c886458e', 'English Literature Term Final Examination', 'English Literature', 'final', 'AY 2025-26 Term 2', '2025-11-05', 78.7, 100.0, 35.0, 'Evaluation recorded.');
INSERT INTO public.assessments (id, student_id, title, subject, assessment_type, term, assessment_date, score, max_score, weight_percentage, feedback)
VALUES ('6d60548f-3525-4f4d-ae7b-950fea7759dd', 'b0d23702-e1d5-4b0a-9bdb-13a4c496dfba', 'English Literature Unit Quiz 1', 'English Literature', 'quiz', 'AY 2024-25 Term 1', '2025-08-15', 19.1, 20.0, 15.0, 'Additional practice recommended.');
INSERT INTO public.assessments (id, student_id, title, subject, assessment_type, term, assessment_date, score, max_score, weight_percentage, feedback)
VALUES ('7c3a3de9-1809-4a68-a832-d0e82ddc8cc8', 'b0d23702-e1d5-4b0a-9bdb-13a4c496dfba', 'Computer Science Unit Quiz 1', 'Computer Science', 'quiz', 'AY 2024-25 Term 1', '2025-08-15', 18.4, 20.0, 15.0, 'Additional practice recommended.');
INSERT INTO public.assessments (id, student_id, title, subject, assessment_type, term, assessment_date, score, max_score, weight_percentage, feedback)
VALUES ('d5980a1a-4297-48b8-9d59-ae6c1fddc40d', 'b0d23702-e1d5-4b0a-9bdb-13a4c496dfba', 'Chemistry Unit Quiz 1', 'Chemistry', 'quiz', 'AY 2024-25 Term 1', '2025-08-15', 18.4, 20.0, 15.0, 'Additional practice recommended.');
INSERT INTO public.assessments (id, student_id, title, subject, assessment_type, term, assessment_date, score, max_score, weight_percentage, feedback)
VALUES ('db1e3ff2-3075-4cc7-985b-2ebcdc355669', 'b0d23702-e1d5-4b0a-9bdb-13a4c496dfba', 'English Literature Laboratory Practical 1', 'English Literature', 'lab', 'AY 2024-25 Term 1', '2025-08-25', 22.1, 25.0, 15.0, 'Additional practice recommended.');
INSERT INTO public.assessments (id, student_id, title, subject, assessment_type, term, assessment_date, score, max_score, weight_percentage, feedback)
VALUES ('4eff2d13-345a-449b-b993-32f314a56f57', 'b0d23702-e1d5-4b0a-9bdb-13a4c496dfba', 'Physics Laboratory Practical 1', 'Physics', 'lab', 'AY 2024-25 Term 1', '2025-08-25', 20.3, 25.0, 15.0, 'Additional practice recommended.');
INSERT INTO public.assessments (id, student_id, title, subject, assessment_type, term, assessment_date, score, max_score, weight_percentage, feedback)
VALUES ('84a37285-cade-40df-a518-6303a8c33166', 'b0d23702-e1d5-4b0a-9bdb-13a4c496dfba', 'Mathematics Laboratory Practical 1', 'Mathematics', 'lab', 'AY 2024-25 Term 1', '2025-08-25', 22.3, 25.0, 15.0, 'Additional practice recommended.');
INSERT INTO public.assessments (id, student_id, title, subject, assessment_type, term, assessment_date, score, max_score, weight_percentage, feedback)
VALUES ('005de8fd-b14b-440e-805e-11a240386cf2', 'b0d23702-e1d5-4b0a-9bdb-13a4c496dfba', 'English Literature Midterm Examination', 'English Literature', 'midterm', 'AY 2024-25 Term 1', '2025-09-10', 92.8, 100.0, 15.0, 'Evaluation recorded.');
INSERT INTO public.assessments (id, student_id, title, subject, assessment_type, term, assessment_date, score, max_score, weight_percentage, feedback)
VALUES ('bdf30fb1-9f90-4e92-9e6b-d622d22510a8', 'b0d23702-e1d5-4b0a-9bdb-13a4c496dfba', 'Computer Science Midterm Examination', 'Computer Science', 'midterm', 'AY 2024-25 Term 1', '2025-09-10', 82.4, 100.0, 15.0, 'Evaluation recorded.');
INSERT INTO public.assessments (id, student_id, title, subject, assessment_type, term, assessment_date, score, max_score, weight_percentage, feedback)
VALUES ('956c0217-fd29-4e5c-9906-a118be910a93', 'b0d23702-e1d5-4b0a-9bdb-13a4c496dfba', 'Physics Midterm Examination', 'Physics', 'midterm', 'AY 2024-25 Term 1', '2025-09-10', 88.3, 100.0, 15.0, 'Evaluation recorded.');
INSERT INTO public.assessments (id, student_id, title, subject, assessment_type, term, assessment_date, score, max_score, weight_percentage, feedback)
VALUES ('3b714f93-8724-41f2-a89a-fccb94b42c36', 'b0d23702-e1d5-4b0a-9bdb-13a4c496dfba', 'History & Civics Unit Assignment 2', 'History & Civics', 'assignment', 'AY 2024-25 Term 1', '2025-09-28', 23.5, 30.0, 15.0, 'Additional practice recommended.');
INSERT INTO public.assessments (id, student_id, title, subject, assessment_type, term, assessment_date, score, max_score, weight_percentage, feedback)
VALUES ('5bf33d7c-d729-4d28-82bc-e72f3653cd61', 'b0d23702-e1d5-4b0a-9bdb-13a4c496dfba', 'Mathematics Unit Assignment 2', 'Mathematics', 'assignment', 'AY 2024-25 Term 1', '2025-09-28', 25.1, 30.0, 15.0, 'Additional practice recommended.');
INSERT INTO public.assessments (id, student_id, title, subject, assessment_type, term, assessment_date, score, max_score, weight_percentage, feedback)
VALUES ('36ed4632-971d-4329-84cb-04df0c976c13', 'b0d23702-e1d5-4b0a-9bdb-13a4c496dfba', 'Physics Unit Assignment 2', 'Physics', 'assignment', 'AY 2024-25 Term 1', '2025-09-28', 24.2, 30.0, 15.0, 'Additional practice recommended.');
INSERT INTO public.assessments (id, student_id, title, subject, assessment_type, term, assessment_date, score, max_score, weight_percentage, feedback)
VALUES ('781b51a0-ab09-4c1c-8eda-26d38e2b4bdf', 'b0d23702-e1d5-4b0a-9bdb-13a4c496dfba', 'History & Civics Term Project Evaluation', 'History & Civics', 'project', 'AY 2024-25 Term 1', '2025-10-15', 43.5, 50.0, 15.0, 'Additional practice recommended.');
INSERT INTO public.assessments (id, student_id, title, subject, assessment_type, term, assessment_date, score, max_score, weight_percentage, feedback)
VALUES ('b8f86b3c-c56e-4c79-9c03-f3b55ddb8f06', 'b0d23702-e1d5-4b0a-9bdb-13a4c496dfba', 'Physics Term Project Evaluation', 'Physics', 'project', 'AY 2024-25 Term 1', '2025-10-15', 44.5, 50.0, 15.0, 'Additional practice recommended.');
INSERT INTO public.assessments (id, student_id, title, subject, assessment_type, term, assessment_date, score, max_score, weight_percentage, feedback)
VALUES ('f728e181-d5cc-40f8-90f4-58757f92397a', 'b0d23702-e1d5-4b0a-9bdb-13a4c496dfba', 'Computer Science Term Project Evaluation', 'Computer Science', 'project', 'AY 2024-25 Term 1', '2025-10-15', 43.2, 50.0, 15.0, 'Additional practice recommended.');
INSERT INTO public.assessments (id, student_id, title, subject, assessment_type, term, assessment_date, score, max_score, weight_percentage, feedback)
VALUES ('379a83a7-25cc-423c-8e2e-18846ab4b25d', 'b0d23702-e1d5-4b0a-9bdb-13a4c496dfba', 'History & Civics Term Final Examination', 'History & Civics', 'final', 'AY 2024-25 Term 1', '2025-11-05', 87.3, 100.0, 35.0, 'Evaluation recorded.');
INSERT INTO public.assessments (id, student_id, title, subject, assessment_type, term, assessment_date, score, max_score, weight_percentage, feedback)
VALUES ('81497889-0136-41fa-ad3d-31afb702c184', 'b0d23702-e1d5-4b0a-9bdb-13a4c496dfba', 'Mathematics Term Final Examination', 'Mathematics', 'final', 'AY 2024-25 Term 1', '2025-11-05', 88.1, 100.0, 35.0, 'Evaluation recorded.');
INSERT INTO public.assessments (id, student_id, title, subject, assessment_type, term, assessment_date, score, max_score, weight_percentage, feedback)
VALUES ('a9a3f5da-9c1e-47d4-a6fa-707a62be15f3', 'b0d23702-e1d5-4b0a-9bdb-13a4c496dfba', 'Physics Term Final Examination', 'Physics', 'final', 'AY 2024-25 Term 1', '2025-11-05', 96.0, 100.0, 35.0, 'Evaluation recorded.');
INSERT INTO public.assessments (id, student_id, title, subject, assessment_type, term, assessment_date, score, max_score, weight_percentage, feedback)
VALUES ('3923239e-0b66-4229-9071-d745a218bf65', '82bf37fc-0077-4756-b27a-b23dd1d6ceaa', 'English Literature Unit Quiz 1', 'English Literature', 'quiz', 'AY 2024-25 Term 2', '2025-08-15', 18.5, 20.0, 15.0, 'Additional practice recommended.');
INSERT INTO public.assessments (id, student_id, title, subject, assessment_type, term, assessment_date, score, max_score, weight_percentage, feedback)
VALUES ('b33fbce8-0e13-4df8-8064-40f4a335cee9', '82bf37fc-0077-4756-b27a-b23dd1d6ceaa', 'Computer Science Unit Quiz 1', 'Computer Science', 'quiz', 'AY 2024-25 Term 2', '2025-08-15', 19.0, 20.0, 15.0, 'Additional practice recommended.');
INSERT INTO public.assessments (id, student_id, title, subject, assessment_type, term, assessment_date, score, max_score, weight_percentage, feedback)
VALUES ('d63430a6-2c9f-48d8-861a-8e4fb6d4cbea', '82bf37fc-0077-4756-b27a-b23dd1d6ceaa', 'History & Civics Unit Quiz 1', 'History & Civics', 'quiz', 'AY 2024-25 Term 2', '2025-08-15', 18.5, 20.0, 15.0, 'Additional practice recommended.');
INSERT INTO public.assessments (id, student_id, title, subject, assessment_type, term, assessment_date, score, max_score, weight_percentage, feedback)
VALUES ('622427a1-43eb-470f-9e70-c6410f950fb1', '82bf37fc-0077-4756-b27a-b23dd1d6ceaa', 'Chemistry Laboratory Practical 1', 'Chemistry', 'lab', 'AY 2024-25 Term 2', '2025-08-25', 23.8, 25.0, 15.0, 'Additional practice recommended.');
INSERT INTO public.assessments (id, student_id, title, subject, assessment_type, term, assessment_date, score, max_score, weight_percentage, feedback)
VALUES ('4b3a5780-818c-4905-bd3f-7cde6985221f', '82bf37fc-0077-4756-b27a-b23dd1d6ceaa', 'Mathematics Laboratory Practical 1', 'Mathematics', 'lab', 'AY 2024-25 Term 2', '2025-08-25', 19.9, 25.0, 15.0, 'Additional practice recommended.');
INSERT INTO public.assessments (id, student_id, title, subject, assessment_type, term, assessment_date, score, max_score, weight_percentage, feedback)
VALUES ('c9f29eaa-ba7a-433c-ae13-e737d68f6baa', '82bf37fc-0077-4756-b27a-b23dd1d6ceaa', 'History & Civics Laboratory Practical 1', 'History & Civics', 'lab', 'AY 2024-25 Term 2', '2025-08-25', 23.7, 25.0, 15.0, 'Additional practice recommended.');
INSERT INTO public.assessments (id, student_id, title, subject, assessment_type, term, assessment_date, score, max_score, weight_percentage, feedback)
VALUES ('a2da09e0-8cc9-4366-9bd6-32cdc4276ac1', '82bf37fc-0077-4756-b27a-b23dd1d6ceaa', 'History & Civics Midterm Examination', 'History & Civics', 'midterm', 'AY 2024-25 Term 2', '2025-09-10', 81.9, 100.0, 15.0, 'Evaluation recorded.');
INSERT INTO public.assessments (id, student_id, title, subject, assessment_type, term, assessment_date, score, max_score, weight_percentage, feedback)
VALUES ('4f204316-de7c-4ccb-abaa-b5750117fe77', '82bf37fc-0077-4756-b27a-b23dd1d6ceaa', 'Chemistry Midterm Examination', 'Chemistry', 'midterm', 'AY 2024-25 Term 2', '2025-09-10', 92.9, 100.0, 15.0, 'Evaluation recorded.');
INSERT INTO public.assessments (id, student_id, title, subject, assessment_type, term, assessment_date, score, max_score, weight_percentage, feedback)
VALUES ('3d87c9dc-9ed7-42a9-9bc2-a8fa478fc8bf', '82bf37fc-0077-4756-b27a-b23dd1d6ceaa', 'Computer Science Midterm Examination', 'Computer Science', 'midterm', 'AY 2024-25 Term 2', '2025-09-10', 82.9, 100.0, 15.0, 'Evaluation recorded.');
INSERT INTO public.assessments (id, student_id, title, subject, assessment_type, term, assessment_date, score, max_score, weight_percentage, feedback)
VALUES ('20107a84-cc16-40b5-8e65-7ef100031be4', '82bf37fc-0077-4756-b27a-b23dd1d6ceaa', 'English Literature Unit Assignment 2', 'English Literature', 'assignment', 'AY 2024-25 Term 2', '2025-09-28', 24.0, 30.0, 15.0, 'Additional practice recommended.');
INSERT INTO public.assessments (id, student_id, title, subject, assessment_type, term, assessment_date, score, max_score, weight_percentage, feedback)
VALUES ('3837b651-384a-49f7-bedc-682895b2ea93', '82bf37fc-0077-4756-b27a-b23dd1d6ceaa', 'Chemistry Unit Assignment 2', 'Chemistry', 'assignment', 'AY 2024-25 Term 2', '2025-09-28', 27.4, 30.0, 15.0, 'Additional practice recommended.');
INSERT INTO public.assessments (id, student_id, title, subject, assessment_type, term, assessment_date, score, max_score, weight_percentage, feedback)
VALUES ('84590d7f-17fa-4e0d-999d-11779c7c76f6', '82bf37fc-0077-4756-b27a-b23dd1d6ceaa', 'Physics Unit Assignment 2', 'Physics', 'assignment', 'AY 2024-25 Term 2', '2025-09-28', 24.7, 30.0, 15.0, 'Additional practice recommended.');
INSERT INTO public.assessments (id, student_id, title, subject, assessment_type, term, assessment_date, score, max_score, weight_percentage, feedback)
VALUES ('587f512e-f9a2-4103-9b8b-412d12a63dfa', '82bf37fc-0077-4756-b27a-b23dd1d6ceaa', 'Mathematics Term Project Evaluation', 'Mathematics', 'project', 'AY 2024-25 Term 2', '2025-10-15', 44.7, 50.0, 15.0, 'Additional practice recommended.');
INSERT INTO public.assessments (id, student_id, title, subject, assessment_type, term, assessment_date, score, max_score, weight_percentage, feedback)
VALUES ('81c44411-91dc-4846-ba79-a687b883b681', '82bf37fc-0077-4756-b27a-b23dd1d6ceaa', 'English Literature Term Project Evaluation', 'English Literature', 'project', 'AY 2024-25 Term 2', '2025-10-15', 39.5, 50.0, 15.0, 'Additional practice recommended.');
INSERT INTO public.assessments (id, student_id, title, subject, assessment_type, term, assessment_date, score, max_score, weight_percentage, feedback)
VALUES ('a793b56e-a3ba-48cd-b8db-bd6c397cd491', '82bf37fc-0077-4756-b27a-b23dd1d6ceaa', 'Physics Term Project Evaluation', 'Physics', 'project', 'AY 2024-25 Term 2', '2025-10-15', 42.7, 50.0, 15.0, 'Additional practice recommended.');
INSERT INTO public.assessments (id, student_id, title, subject, assessment_type, term, assessment_date, score, max_score, weight_percentage, feedback)
VALUES ('22c9c87d-2c44-4cea-9c1c-9b2885d211bc', '82bf37fc-0077-4756-b27a-b23dd1d6ceaa', 'History & Civics Term Final Examination', 'History & Civics', 'final', 'AY 2024-25 Term 2', '2025-11-05', 90.3, 100.0, 35.0, 'Evaluation recorded.');
INSERT INTO public.assessments (id, student_id, title, subject, assessment_type, term, assessment_date, score, max_score, weight_percentage, feedback)
VALUES ('c9ba2606-8bb5-4dcc-893b-b4bea870d456', '82bf37fc-0077-4756-b27a-b23dd1d6ceaa', 'Computer Science Term Final Examination', 'Computer Science', 'final', 'AY 2024-25 Term 2', '2025-11-05', 80.5, 100.0, 35.0, 'Evaluation recorded.');
INSERT INTO public.assessments (id, student_id, title, subject, assessment_type, term, assessment_date, score, max_score, weight_percentage, feedback)
VALUES ('655491df-8ecd-41bd-aa88-c59d413e765b', '82bf37fc-0077-4756-b27a-b23dd1d6ceaa', 'Mathematics Term Final Examination', 'Mathematics', 'final', 'AY 2024-25 Term 2', '2025-11-05', 95.4, 100.0, 35.0, 'Evaluation recorded.');
INSERT INTO public.assessments (id, student_id, title, subject, assessment_type, term, assessment_date, score, max_score, weight_percentage, feedback)
VALUES ('a5cf09fb-898d-4e2b-9ad0-a71c04a44f33', 'cc13ac1f-cca4-4600-8dd7-f49f124c855d', 'Mathematics Unit Quiz 1', 'Mathematics', 'quiz', 'AY 2025-26 Term 1', '2025-08-15', 17.2, 20.0, 15.0, 'Additional practice recommended.');
INSERT INTO public.assessments (id, student_id, title, subject, assessment_type, term, assessment_date, score, max_score, weight_percentage, feedback)
VALUES ('38649829-9f9e-460c-bed1-26d11ea6a964', 'cc13ac1f-cca4-4600-8dd7-f49f124c855d', 'Chemistry Unit Quiz 1', 'Chemistry', 'quiz', 'AY 2025-26 Term 1', '2025-08-15', 17.9, 20.0, 15.0, 'Additional practice recommended.');
INSERT INTO public.assessments (id, student_id, title, subject, assessment_type, term, assessment_date, score, max_score, weight_percentage, feedback)
VALUES ('b29810cd-3912-4a44-8724-1c7c0bd93c1f', 'cc13ac1f-cca4-4600-8dd7-f49f124c855d', 'English Literature Unit Quiz 1', 'English Literature', 'quiz', 'AY 2025-26 Term 1', '2025-08-15', 17.5, 20.0, 15.0, 'Additional practice recommended.');
INSERT INTO public.assessments (id, student_id, title, subject, assessment_type, term, assessment_date, score, max_score, weight_percentage, feedback)
VALUES ('32034eea-7e0c-499c-aa2a-ab6915c11abd', 'cc13ac1f-cca4-4600-8dd7-f49f124c855d', 'Physics Laboratory Practical 1', 'Physics', 'lab', 'AY 2025-26 Term 1', '2025-08-25', 20.7, 25.0, 15.0, 'Additional practice recommended.');
INSERT INTO public.assessments (id, student_id, title, subject, assessment_type, term, assessment_date, score, max_score, weight_percentage, feedback)
VALUES ('80e99dbb-7005-47d0-a186-078faeedabd8', 'cc13ac1f-cca4-4600-8dd7-f49f124c855d', 'English Literature Laboratory Practical 1', 'English Literature', 'lab', 'AY 2025-26 Term 1', '2025-08-25', 23.1, 25.0, 15.0, 'Additional practice recommended.');
INSERT INTO public.assessments (id, student_id, title, subject, assessment_type, term, assessment_date, score, max_score, weight_percentage, feedback)
VALUES ('9353c119-b35e-4669-a0c0-024d07ec2808', 'cc13ac1f-cca4-4600-8dd7-f49f124c855d', 'Computer Science Laboratory Practical 1', 'Computer Science', 'lab', 'AY 2025-26 Term 1', '2025-08-25', 21.0, 25.0, 15.0, 'Additional practice recommended.');
INSERT INTO public.assessments (id, student_id, title, subject, assessment_type, term, assessment_date, score, max_score, weight_percentage, feedback)
VALUES ('1b3c3d6d-b445-49e1-987b-ae62edfb8136', 'cc13ac1f-cca4-4600-8dd7-f49f124c855d', 'History & Civics Midterm Examination', 'History & Civics', 'midterm', 'AY 2025-26 Term 1', '2025-09-10', 90.9, 100.0, 15.0, 'Evaluation recorded.');
INSERT INTO public.assessments (id, student_id, title, subject, assessment_type, term, assessment_date, score, max_score, weight_percentage, feedback)
VALUES ('8b8354f6-e073-4cc4-87da-76835c5ffbb3', 'cc13ac1f-cca4-4600-8dd7-f49f124c855d', 'Computer Science Midterm Examination', 'Computer Science', 'midterm', 'AY 2025-26 Term 1', '2025-09-10', 78.3, 100.0, 15.0, 'Evaluation recorded.');
INSERT INTO public.assessments (id, student_id, title, subject, assessment_type, term, assessment_date, score, max_score, weight_percentage, feedback)
VALUES ('4d6dead7-8411-4345-b4c0-525785b2dbf2', 'cc13ac1f-cca4-4600-8dd7-f49f124c855d', 'Chemistry Midterm Examination', 'Chemistry', 'midterm', 'AY 2025-26 Term 1', '2025-09-10', 84.1, 100.0, 15.0, 'Evaluation recorded.');
INSERT INTO public.assessments (id, student_id, title, subject, assessment_type, term, assessment_date, score, max_score, weight_percentage, feedback)
VALUES ('05cd384d-84bb-4bdd-938c-a76175003332', 'cc13ac1f-cca4-4600-8dd7-f49f124c855d', 'Chemistry Unit Assignment 2', 'Chemistry', 'assignment', 'AY 2025-26 Term 1', '2025-09-28', 24.3, 30.0, 15.0, 'Additional practice recommended.');
INSERT INTO public.assessments (id, student_id, title, subject, assessment_type, term, assessment_date, score, max_score, weight_percentage, feedback)
VALUES ('dd60955b-1d65-4e90-9fd9-c80bd22c2d44', 'cc13ac1f-cca4-4600-8dd7-f49f124c855d', 'English Literature Unit Assignment 2', 'English Literature', 'assignment', 'AY 2025-26 Term 1', '2025-09-28', 28.0, 30.0, 15.0, 'Additional practice recommended.');
INSERT INTO public.assessments (id, student_id, title, subject, assessment_type, term, assessment_date, score, max_score, weight_percentage, feedback)
VALUES ('9956fc92-70fa-41fc-afcc-d0692477ed7f', 'cc13ac1f-cca4-4600-8dd7-f49f124c855d', 'Physics Unit Assignment 2', 'Physics', 'assignment', 'AY 2025-26 Term 1', '2025-09-28', 28.2, 30.0, 15.0, 'Additional practice recommended.');
INSERT INTO public.assessments (id, student_id, title, subject, assessment_type, term, assessment_date, score, max_score, weight_percentage, feedback)
VALUES ('7ebee89d-fc96-4e00-88c5-a97bc820bde0', 'cc13ac1f-cca4-4600-8dd7-f49f124c855d', 'Computer Science Term Project Evaluation', 'Computer Science', 'project', 'AY 2025-26 Term 1', '2025-10-15', 39.8, 50.0, 15.0, 'Additional practice recommended.');
INSERT INTO public.assessments (id, student_id, title, subject, assessment_type, term, assessment_date, score, max_score, weight_percentage, feedback)
VALUES ('7be6f498-1e1c-4ddf-8f84-4909076b61aa', 'cc13ac1f-cca4-4600-8dd7-f49f124c855d', 'English Literature Term Project Evaluation', 'English Literature', 'project', 'AY 2025-26 Term 1', '2025-10-15', 45.0, 50.0, 15.0, 'Additional practice recommended.');
INSERT INTO public.assessments (id, student_id, title, subject, assessment_type, term, assessment_date, score, max_score, weight_percentage, feedback)
VALUES ('88384ae8-69ac-44a0-95a9-619edc53b9b0', 'cc13ac1f-cca4-4600-8dd7-f49f124c855d', 'Chemistry Term Project Evaluation', 'Chemistry', 'project', 'AY 2025-26 Term 1', '2025-10-15', 40.7, 50.0, 15.0, 'Additional practice recommended.');
INSERT INTO public.assessments (id, student_id, title, subject, assessment_type, term, assessment_date, score, max_score, weight_percentage, feedback)
VALUES ('36f4eec6-3b30-4feb-996c-a7b74defec90', 'cc13ac1f-cca4-4600-8dd7-f49f124c855d', 'Physics Term Final Examination', 'Physics', 'final', 'AY 2025-26 Term 1', '2025-11-05', 94.8, 100.0, 35.0, 'Evaluation recorded.');
INSERT INTO public.assessments (id, student_id, title, subject, assessment_type, term, assessment_date, score, max_score, weight_percentage, feedback)
VALUES ('e489486d-86fb-4845-b43e-6c5ff578a676', 'cc13ac1f-cca4-4600-8dd7-f49f124c855d', 'Computer Science Term Final Examination', 'Computer Science', 'final', 'AY 2025-26 Term 1', '2025-11-05', 78.1, 100.0, 35.0, 'Evaluation recorded.');
INSERT INTO public.assessments (id, student_id, title, subject, assessment_type, term, assessment_date, score, max_score, weight_percentage, feedback)
VALUES ('cbfaad97-e5b9-44f9-8b40-4ffad51d0e04', 'cc13ac1f-cca4-4600-8dd7-f49f124c855d', 'Chemistry Term Final Examination', 'Chemistry', 'final', 'AY 2025-26 Term 1', '2025-11-05', 84.9, 100.0, 35.0, 'Evaluation recorded.');
INSERT INTO public.assessments (id, student_id, title, subject, assessment_type, term, assessment_date, score, max_score, weight_percentage, feedback)
VALUES ('b0d01892-0ace-4c61-ad42-afaadcabc201', '338719c7-39d7-4471-919b-13bd4ab61261', 'History & Civics Unit Quiz 1', 'History & Civics', 'quiz', 'AY 2025-26 Term 2', '2025-08-15', 18.0, 20.0, 15.0, 'Additional practice recommended.');
INSERT INTO public.assessments (id, student_id, title, subject, assessment_type, term, assessment_date, score, max_score, weight_percentage, feedback)
VALUES ('a14559a3-93d7-4dc9-a10d-735a55f3edba', '338719c7-39d7-4471-919b-13bd4ab61261', 'Physics Unit Quiz 1', 'Physics', 'quiz', 'AY 2025-26 Term 2', '2025-08-15', 17.7, 20.0, 15.0, 'Additional practice recommended.');
INSERT INTO public.assessments (id, student_id, title, subject, assessment_type, term, assessment_date, score, max_score, weight_percentage, feedback)
VALUES ('655ee4e6-9ded-485e-aa30-d9b8f51a69db', '338719c7-39d7-4471-919b-13bd4ab61261', 'English Literature Unit Quiz 1', 'English Literature', 'quiz', 'AY 2025-26 Term 2', '2025-08-15', 18.4, 20.0, 15.0, 'Additional practice recommended.');
INSERT INTO public.assessments (id, student_id, title, subject, assessment_type, term, assessment_date, score, max_score, weight_percentage, feedback)
VALUES ('ac55ec7b-b870-4850-855c-192c3d8eb287', '338719c7-39d7-4471-919b-13bd4ab61261', 'English Literature Laboratory Practical 1', 'English Literature', 'lab', 'AY 2025-26 Term 2', '2025-08-25', 19.9, 25.0, 15.0, 'Additional practice recommended.');
INSERT INTO public.assessments (id, student_id, title, subject, assessment_type, term, assessment_date, score, max_score, weight_percentage, feedback)
VALUES ('2861ff1e-2957-4afa-8e59-49b0220df640', '338719c7-39d7-4471-919b-13bd4ab61261', 'Computer Science Laboratory Practical 1', 'Computer Science', 'lab', 'AY 2025-26 Term 2', '2025-08-25', 22.0, 25.0, 15.0, 'Additional practice recommended.');
INSERT INTO public.assessments (id, student_id, title, subject, assessment_type, term, assessment_date, score, max_score, weight_percentage, feedback)
VALUES ('3c2a847f-5516-475e-adb6-3e69adfea3b3', '338719c7-39d7-4471-919b-13bd4ab61261', 'Chemistry Laboratory Practical 1', 'Chemistry', 'lab', 'AY 2025-26 Term 2', '2025-08-25', 19.8, 25.0, 15.0, 'Additional practice recommended.');
INSERT INTO public.assessments (id, student_id, title, subject, assessment_type, term, assessment_date, score, max_score, weight_percentage, feedback)
VALUES ('a3ee4222-ff1b-4b13-ab3e-0c9bc27a7d29', '338719c7-39d7-4471-919b-13bd4ab61261', 'English Literature Midterm Examination', 'English Literature', 'midterm', 'AY 2025-26 Term 2', '2025-09-10', 88.3, 100.0, 15.0, 'Evaluation recorded.');
INSERT INTO public.assessments (id, student_id, title, subject, assessment_type, term, assessment_date, score, max_score, weight_percentage, feedback)
VALUES ('d326e42d-bbc8-4224-a24c-c116a4551e3e', '338719c7-39d7-4471-919b-13bd4ab61261', 'History & Civics Midterm Examination', 'History & Civics', 'midterm', 'AY 2025-26 Term 2', '2025-09-10', 80.7, 100.0, 15.0, 'Evaluation recorded.');
INSERT INTO public.assessments (id, student_id, title, subject, assessment_type, term, assessment_date, score, max_score, weight_percentage, feedback)
VALUES ('b4307e77-e8a6-471a-b976-67c23dd22b3c', '338719c7-39d7-4471-919b-13bd4ab61261', 'Physics Midterm Examination', 'Physics', 'midterm', 'AY 2025-26 Term 2', '2025-09-10', 83.9, 100.0, 15.0, 'Evaluation recorded.');
INSERT INTO public.assessments (id, student_id, title, subject, assessment_type, term, assessment_date, score, max_score, weight_percentage, feedback)
VALUES ('535fdfa8-c008-4fec-af00-cb874420bad2', '338719c7-39d7-4471-919b-13bd4ab61261', 'English Literature Unit Assignment 2', 'English Literature', 'assignment', 'AY 2025-26 Term 2', '2025-09-28', 27.1, 30.0, 15.0, 'Additional practice recommended.');
INSERT INTO public.assessments (id, student_id, title, subject, assessment_type, term, assessment_date, score, max_score, weight_percentage, feedback)
VALUES ('85278f79-be22-4329-9c5a-95549f13bbf1', '338719c7-39d7-4471-919b-13bd4ab61261', 'Computer Science Unit Assignment 2', 'Computer Science', 'assignment', 'AY 2025-26 Term 2', '2025-09-28', 27.3, 30.0, 15.0, 'Additional practice recommended.');
INSERT INTO public.assessments (id, student_id, title, subject, assessment_type, term, assessment_date, score, max_score, weight_percentage, feedback)
VALUES ('a6eb751d-bd68-435f-ab0d-5d37024b0a57', '338719c7-39d7-4471-919b-13bd4ab61261', 'Mathematics Unit Assignment 2', 'Mathematics', 'assignment', 'AY 2025-26 Term 2', '2025-09-28', 26.0, 30.0, 15.0, 'Additional practice recommended.');
INSERT INTO public.assessments (id, student_id, title, subject, assessment_type, term, assessment_date, score, max_score, weight_percentage, feedback)
VALUES ('328dda23-ea0d-4424-a8b0-e6539b1cc352', '338719c7-39d7-4471-919b-13bd4ab61261', 'English Literature Term Project Evaluation', 'English Literature', 'project', 'AY 2025-26 Term 2', '2025-10-15', 43.1, 50.0, 15.0, 'Additional practice recommended.');
INSERT INTO public.assessments (id, student_id, title, subject, assessment_type, term, assessment_date, score, max_score, weight_percentage, feedback)
VALUES ('652ef728-904c-459a-af18-09375e8b3930', '338719c7-39d7-4471-919b-13bd4ab61261', 'Computer Science Term Project Evaluation', 'Computer Science', 'project', 'AY 2025-26 Term 2', '2025-10-15', 43.6, 50.0, 15.0, 'Additional practice recommended.');
INSERT INTO public.assessments (id, student_id, title, subject, assessment_type, term, assessment_date, score, max_score, weight_percentage, feedback)
VALUES ('81829277-38be-4dd9-a329-fb0c96e91560', '338719c7-39d7-4471-919b-13bd4ab61261', 'Mathematics Term Project Evaluation', 'Mathematics', 'project', 'AY 2025-26 Term 2', '2025-10-15', 43.1, 50.0, 15.0, 'Additional practice recommended.');
INSERT INTO public.assessments (id, student_id, title, subject, assessment_type, term, assessment_date, score, max_score, weight_percentage, feedback)
VALUES ('730c1712-6242-4366-a476-19866270be98', '338719c7-39d7-4471-919b-13bd4ab61261', 'Mathematics Term Final Examination', 'Mathematics', 'final', 'AY 2025-26 Term 2', '2025-11-05', 90.1, 100.0, 35.0, 'Evaluation recorded.');
INSERT INTO public.assessments (id, student_id, title, subject, assessment_type, term, assessment_date, score, max_score, weight_percentage, feedback)
VALUES ('a223e43a-9592-4bd9-95bf-7932b052c10f', '338719c7-39d7-4471-919b-13bd4ab61261', 'English Literature Term Final Examination', 'English Literature', 'final', 'AY 2025-26 Term 2', '2025-11-05', 83.5, 100.0, 35.0, 'Evaluation recorded.');
INSERT INTO public.assessments (id, student_id, title, subject, assessment_type, term, assessment_date, score, max_score, weight_percentage, feedback)
VALUES ('614da6db-8218-4647-9c64-43f0fa31fa09', '338719c7-39d7-4471-919b-13bd4ab61261', 'Computer Science Term Final Examination', 'Computer Science', 'final', 'AY 2025-26 Term 2', '2025-11-05', 78.4, 100.0, 35.0, 'Evaluation recorded.');
INSERT INTO public.assessments (id, student_id, title, subject, assessment_type, term, assessment_date, score, max_score, weight_percentage, feedback)
VALUES ('fb37249e-2774-45fe-bd39-786d6f9afc5f', '6c1c4728-a4f1-4c03-bebb-a55afe559ac5', 'Chemistry Unit Quiz 1', 'Chemistry', 'quiz', 'AY 2024-25 Term 1', '2025-08-15', 19.2, 20.0, 15.0, 'Additional practice recommended.');
INSERT INTO public.assessments (id, student_id, title, subject, assessment_type, term, assessment_date, score, max_score, weight_percentage, feedback)
VALUES ('211d2c68-39a5-45fc-9760-a44967656c47', '6c1c4728-a4f1-4c03-bebb-a55afe559ac5', 'Mathematics Unit Quiz 1', 'Mathematics', 'quiz', 'AY 2024-25 Term 1', '2025-08-15', 17.0, 20.0, 15.0, 'Additional practice recommended.');
INSERT INTO public.assessments (id, student_id, title, subject, assessment_type, term, assessment_date, score, max_score, weight_percentage, feedback)
VALUES ('70773129-aaa9-4e39-9d08-48ec2e8314b5', '6c1c4728-a4f1-4c03-bebb-a55afe559ac5', 'Physics Unit Quiz 1', 'Physics', 'quiz', 'AY 2024-25 Term 1', '2025-08-15', 16.1, 20.0, 15.0, 'Additional practice recommended.');
INSERT INTO public.assessments (id, student_id, title, subject, assessment_type, term, assessment_date, score, max_score, weight_percentage, feedback)
VALUES ('f272dde1-5899-4953-a03b-3dd5e9935ecc', '6c1c4728-a4f1-4c03-bebb-a55afe559ac5', 'Physics Laboratory Practical 1', 'Physics', 'lab', 'AY 2024-25 Term 1', '2025-08-25', 23.9, 25.0, 15.0, 'Additional practice recommended.');
INSERT INTO public.assessments (id, student_id, title, subject, assessment_type, term, assessment_date, score, max_score, weight_percentage, feedback)
VALUES ('a3747059-47d0-405c-b1e1-46dccb7c3e82', '6c1c4728-a4f1-4c03-bebb-a55afe559ac5', 'Mathematics Laboratory Practical 1', 'Mathematics', 'lab', 'AY 2024-25 Term 1', '2025-08-25', 21.6, 25.0, 15.0, 'Additional practice recommended.');
INSERT INTO public.assessments (id, student_id, title, subject, assessment_type, term, assessment_date, score, max_score, weight_percentage, feedback)
VALUES ('01a7b77c-0d1c-444c-8b0f-bcb32dba696e', '6c1c4728-a4f1-4c03-bebb-a55afe559ac5', 'English Literature Laboratory Practical 1', 'English Literature', 'lab', 'AY 2024-25 Term 1', '2025-08-25', 22.7, 25.0, 15.0, 'Additional practice recommended.');
INSERT INTO public.assessments (id, student_id, title, subject, assessment_type, term, assessment_date, score, max_score, weight_percentage, feedback)
VALUES ('f1b66c41-a863-4708-9916-e0e75e9ec0ee', '6c1c4728-a4f1-4c03-bebb-a55afe559ac5', 'Computer Science Midterm Examination', 'Computer Science', 'midterm', 'AY 2024-25 Term 1', '2025-09-10', 92.8, 100.0, 15.0, 'Evaluation recorded.');
INSERT INTO public.assessments (id, student_id, title, subject, assessment_type, term, assessment_date, score, max_score, weight_percentage, feedback)
VALUES ('54baa587-c161-42a1-830b-3005f31185e3', '6c1c4728-a4f1-4c03-bebb-a55afe559ac5', 'English Literature Midterm Examination', 'English Literature', 'midterm', 'AY 2024-25 Term 1', '2025-09-10', 82.5, 100.0, 15.0, 'Evaluation recorded.');
INSERT INTO public.assessments (id, student_id, title, subject, assessment_type, term, assessment_date, score, max_score, weight_percentage, feedback)
VALUES ('4bb8ed29-6dc0-479e-bc02-dbac0a6d74df', '6c1c4728-a4f1-4c03-bebb-a55afe559ac5', 'History & Civics Midterm Examination', 'History & Civics', 'midterm', 'AY 2024-25 Term 1', '2025-09-10', 84.2, 100.0, 15.0, 'Evaluation recorded.');
INSERT INTO public.assessments (id, student_id, title, subject, assessment_type, term, assessment_date, score, max_score, weight_percentage, feedback)
VALUES ('82fda27e-a344-457c-a62b-ac1a3129e768', '6c1c4728-a4f1-4c03-bebb-a55afe559ac5', 'Chemistry Unit Assignment 2', 'Chemistry', 'assignment', 'AY 2024-25 Term 1', '2025-09-28', 23.6, 30.0, 15.0, 'Additional practice recommended.');
INSERT INTO public.assessments (id, student_id, title, subject, assessment_type, term, assessment_date, score, max_score, weight_percentage, feedback)
VALUES ('08e96226-0591-4564-88f9-9a8c3ef62d19', '6c1c4728-a4f1-4c03-bebb-a55afe559ac5', 'Physics Unit Assignment 2', 'Physics', 'assignment', 'AY 2024-25 Term 1', '2025-09-28', 27.0, 30.0, 15.0, 'Additional practice recommended.');
INSERT INTO public.assessments (id, student_id, title, subject, assessment_type, term, assessment_date, score, max_score, weight_percentage, feedback)
VALUES ('dc313604-e26b-47a1-9693-55437f874576', '6c1c4728-a4f1-4c03-bebb-a55afe559ac5', 'Mathematics Unit Assignment 2', 'Mathematics', 'assignment', 'AY 2024-25 Term 1', '2025-09-28', 26.7, 30.0, 15.0, 'Additional practice recommended.');
INSERT INTO public.assessments (id, student_id, title, subject, assessment_type, term, assessment_date, score, max_score, weight_percentage, feedback)
VALUES ('1315ee45-c93e-40f9-821f-59c1b5fe79c2', '6c1c4728-a4f1-4c03-bebb-a55afe559ac5', 'Mathematics Term Project Evaluation', 'Mathematics', 'project', 'AY 2024-25 Term 1', '2025-10-15', 39.6, 50.0, 15.0, 'Additional practice recommended.');
INSERT INTO public.assessments (id, student_id, title, subject, assessment_type, term, assessment_date, score, max_score, weight_percentage, feedback)
VALUES ('02c64c60-b253-42dd-bbb4-6b6fc1ec2114', '6c1c4728-a4f1-4c03-bebb-a55afe559ac5', 'Physics Term Project Evaluation', 'Physics', 'project', 'AY 2024-25 Term 1', '2025-10-15', 44.3, 50.0, 15.0, 'Additional practice recommended.');
INSERT INTO public.assessments (id, student_id, title, subject, assessment_type, term, assessment_date, score, max_score, weight_percentage, feedback)
VALUES ('a18410e5-f802-48de-b486-87fa40621ac1', '6c1c4728-a4f1-4c03-bebb-a55afe559ac5', 'English Literature Term Project Evaluation', 'English Literature', 'project', 'AY 2024-25 Term 1', '2025-10-15', 43.0, 50.0, 15.0, 'Additional practice recommended.');
INSERT INTO public.assessments (id, student_id, title, subject, assessment_type, term, assessment_date, score, max_score, weight_percentage, feedback)
VALUES ('f8cec2c4-f908-4c69-8ef2-fee1c75e64e8', '6c1c4728-a4f1-4c03-bebb-a55afe559ac5', 'History & Civics Term Final Examination', 'History & Civics', 'final', 'AY 2024-25 Term 1', '2025-11-05', 91.3, 100.0, 35.0, 'Evaluation recorded.');
INSERT INTO public.assessments (id, student_id, title, subject, assessment_type, term, assessment_date, score, max_score, weight_percentage, feedback)
VALUES ('27db0b81-1d50-433f-98b9-e76809951ad5', '6c1c4728-a4f1-4c03-bebb-a55afe559ac5', 'Mathematics Term Final Examination', 'Mathematics', 'final', 'AY 2024-25 Term 1', '2025-11-05', 85.2, 100.0, 35.0, 'Evaluation recorded.');
INSERT INTO public.assessments (id, student_id, title, subject, assessment_type, term, assessment_date, score, max_score, weight_percentage, feedback)
VALUES ('3c0294ca-090b-42b7-a0af-073cd596f834', '6c1c4728-a4f1-4c03-bebb-a55afe559ac5', 'Physics Term Final Examination', 'Physics', 'final', 'AY 2024-25 Term 1', '2025-11-05', 82.2, 100.0, 35.0, 'Evaluation recorded.');
INSERT INTO public.assessments (id, student_id, title, subject, assessment_type, term, assessment_date, score, max_score, weight_percentage, feedback)
VALUES ('b49a39fa-5369-4c9e-9d4a-a9ac0ba87b5c', '71149234-66ac-4fba-be76-07ea55d85ae9', 'Chemistry Unit Quiz 1', 'Chemistry', 'quiz', 'AY 2024-25 Term 2', '2025-08-15', 18.3, 20.0, 15.0, 'Additional practice recommended.');
INSERT INTO public.assessments (id, student_id, title, subject, assessment_type, term, assessment_date, score, max_score, weight_percentage, feedback)
VALUES ('28ec9711-7c9d-49e3-8d88-3ee611247622', '71149234-66ac-4fba-be76-07ea55d85ae9', 'Computer Science Unit Quiz 1', 'Computer Science', 'quiz', 'AY 2024-25 Term 2', '2025-08-15', 17.3, 20.0, 15.0, 'Additional practice recommended.');
INSERT INTO public.assessments (id, student_id, title, subject, assessment_type, term, assessment_date, score, max_score, weight_percentage, feedback)
VALUES ('e04b098a-d411-4e76-b82a-660d41ca6641', '71149234-66ac-4fba-be76-07ea55d85ae9', 'Physics Unit Quiz 1', 'Physics', 'quiz', 'AY 2024-25 Term 2', '2025-08-15', 18.7, 20.0, 15.0, 'Additional practice recommended.');
INSERT INTO public.assessments (id, student_id, title, subject, assessment_type, term, assessment_date, score, max_score, weight_percentage, feedback)
VALUES ('e61024ec-aebf-425a-9cd6-5489084f34c2', '71149234-66ac-4fba-be76-07ea55d85ae9', 'Chemistry Laboratory Practical 1', 'Chemistry', 'lab', 'AY 2024-25 Term 2', '2025-08-25', 23.6, 25.0, 15.0, 'Additional practice recommended.');
INSERT INTO public.assessments (id, student_id, title, subject, assessment_type, term, assessment_date, score, max_score, weight_percentage, feedback)
VALUES ('3e104261-9988-4860-8113-d2ce906b7163', '71149234-66ac-4fba-be76-07ea55d85ae9', 'Physics Laboratory Practical 1', 'Physics', 'lab', 'AY 2024-25 Term 2', '2025-08-25', 22.0, 25.0, 15.0, 'Additional practice recommended.');
INSERT INTO public.assessments (id, student_id, title, subject, assessment_type, term, assessment_date, score, max_score, weight_percentage, feedback)
VALUES ('5617e027-2bc4-400e-bf15-ca0d0afaa1c3', '71149234-66ac-4fba-be76-07ea55d85ae9', 'Computer Science Laboratory Practical 1', 'Computer Science', 'lab', 'AY 2024-25 Term 2', '2025-08-25', 23.9, 25.0, 15.0, 'Additional practice recommended.');
INSERT INTO public.assessments (id, student_id, title, subject, assessment_type, term, assessment_date, score, max_score, weight_percentage, feedback)
VALUES ('2fdca345-f543-4741-a231-f6af0a421623', '71149234-66ac-4fba-be76-07ea55d85ae9', 'English Literature Midterm Examination', 'English Literature', 'midterm', 'AY 2024-25 Term 2', '2025-09-10', 85.0, 100.0, 15.0, 'Evaluation recorded.');
INSERT INTO public.assessments (id, student_id, title, subject, assessment_type, term, assessment_date, score, max_score, weight_percentage, feedback)
VALUES ('9abc9d46-34ff-43be-9a75-3caf092a1ba3', '71149234-66ac-4fba-be76-07ea55d85ae9', 'History & Civics Midterm Examination', 'History & Civics', 'midterm', 'AY 2024-25 Term 2', '2025-09-10', 82.6, 100.0, 15.0, 'Evaluation recorded.');
INSERT INTO public.assessments (id, student_id, title, subject, assessment_type, term, assessment_date, score, max_score, weight_percentage, feedback)
VALUES ('a5e11e5a-a035-459e-8023-11ebd8379bdb', '71149234-66ac-4fba-be76-07ea55d85ae9', 'Physics Midterm Examination', 'Physics', 'midterm', 'AY 2024-25 Term 2', '2025-09-10', 83.9, 100.0, 15.0, 'Evaluation recorded.');
INSERT INTO public.assessments (id, student_id, title, subject, assessment_type, term, assessment_date, score, max_score, weight_percentage, feedback)
VALUES ('8c94151e-b283-4460-9f99-c32e9b240bdc', '71149234-66ac-4fba-be76-07ea55d85ae9', 'Mathematics Unit Assignment 2', 'Mathematics', 'assignment', 'AY 2024-25 Term 2', '2025-09-28', 23.9, 30.0, 15.0, 'Additional practice recommended.');
INSERT INTO public.assessments (id, student_id, title, subject, assessment_type, term, assessment_date, score, max_score, weight_percentage, feedback)
VALUES ('bd3e331f-0207-4d93-a62a-39b1dd868a24', '71149234-66ac-4fba-be76-07ea55d85ae9', 'Computer Science Unit Assignment 2', 'Computer Science', 'assignment', 'AY 2024-25 Term 2', '2025-09-28', 27.3, 30.0, 15.0, 'Additional practice recommended.');
INSERT INTO public.assessments (id, student_id, title, subject, assessment_type, term, assessment_date, score, max_score, weight_percentage, feedback)
VALUES ('3443df6c-dcff-466a-8e68-40ae616f4ecb', '71149234-66ac-4fba-be76-07ea55d85ae9', 'Chemistry Unit Assignment 2', 'Chemistry', 'assignment', 'AY 2024-25 Term 2', '2025-09-28', 24.4, 30.0, 15.0, 'Additional practice recommended.');
INSERT INTO public.assessments (id, student_id, title, subject, assessment_type, term, assessment_date, score, max_score, weight_percentage, feedback)
VALUES ('a0b47bfe-4300-4a73-a95f-1c5e658fd32f', '71149234-66ac-4fba-be76-07ea55d85ae9', 'Chemistry Term Project Evaluation', 'Chemistry', 'project', 'AY 2024-25 Term 2', '2025-10-15', 46.9, 50.0, 15.0, 'Additional practice recommended.');
INSERT INTO public.assessments (id, student_id, title, subject, assessment_type, term, assessment_date, score, max_score, weight_percentage, feedback)
VALUES ('03e268eb-d53f-4ab1-ae0b-e1843a11e83c', '71149234-66ac-4fba-be76-07ea55d85ae9', 'Computer Science Term Project Evaluation', 'Computer Science', 'project', 'AY 2024-25 Term 2', '2025-10-15', 40.7, 50.0, 15.0, 'Additional practice recommended.');
INSERT INTO public.assessments (id, student_id, title, subject, assessment_type, term, assessment_date, score, max_score, weight_percentage, feedback)
VALUES ('f1a3d48e-001b-488d-82fb-63c8b7a2c40c', '71149234-66ac-4fba-be76-07ea55d85ae9', 'Mathematics Term Project Evaluation', 'Mathematics', 'project', 'AY 2024-25 Term 2', '2025-10-15', 45.9, 50.0, 15.0, 'Additional practice recommended.');
INSERT INTO public.assessments (id, student_id, title, subject, assessment_type, term, assessment_date, score, max_score, weight_percentage, feedback)
VALUES ('e61e12ac-4fa4-4d45-be79-1834691addf8', '71149234-66ac-4fba-be76-07ea55d85ae9', 'History & Civics Term Final Examination', 'History & Civics', 'final', 'AY 2024-25 Term 2', '2025-11-05', 86.6, 100.0, 35.0, 'Evaluation recorded.');
INSERT INTO public.assessments (id, student_id, title, subject, assessment_type, term, assessment_date, score, max_score, weight_percentage, feedback)
VALUES ('78a67489-ab87-4949-93bf-f8f19c4b7944', '71149234-66ac-4fba-be76-07ea55d85ae9', 'English Literature Term Final Examination', 'English Literature', 'final', 'AY 2024-25 Term 2', '2025-11-05', 93.7, 100.0, 35.0, 'Evaluation recorded.');
INSERT INTO public.assessments (id, student_id, title, subject, assessment_type, term, assessment_date, score, max_score, weight_percentage, feedback)
VALUES ('1513ea13-53c0-458d-b3dc-dc440abed044', '71149234-66ac-4fba-be76-07ea55d85ae9', 'Physics Term Final Examination', 'Physics', 'final', 'AY 2024-25 Term 2', '2025-11-05', 84.0, 100.0, 35.0, 'Evaluation recorded.');
INSERT INTO public.assessments (id, student_id, title, subject, assessment_type, term, assessment_date, score, max_score, weight_percentage, feedback)
VALUES ('075f1d0a-7956-4b06-9176-c1601f176c5a', 'b2b2a424-b2a2-4cd8-8261-fa53cd7c6397', 'History & Civics Unit Quiz 1', 'History & Civics', 'quiz', 'AY 2025-26 Term 1', '2025-08-15', 16.1, 20.0, 15.0, 'Additional practice recommended.');
INSERT INTO public.assessments (id, student_id, title, subject, assessment_type, term, assessment_date, score, max_score, weight_percentage, feedback)
VALUES ('18316eee-84cf-4743-9404-8ea1b22e03cf', 'b2b2a424-b2a2-4cd8-8261-fa53cd7c6397', 'Computer Science Unit Quiz 1', 'Computer Science', 'quiz', 'AY 2025-26 Term 1', '2025-08-15', 16.8, 20.0, 15.0, 'Additional practice recommended.');
INSERT INTO public.assessments (id, student_id, title, subject, assessment_type, term, assessment_date, score, max_score, weight_percentage, feedback)
VALUES ('5d5e9300-09a5-4869-8644-5135c3f4d298', 'b2b2a424-b2a2-4cd8-8261-fa53cd7c6397', 'Chemistry Unit Quiz 1', 'Chemistry', 'quiz', 'AY 2025-26 Term 1', '2025-08-15', 17.0, 20.0, 15.0, 'Additional practice recommended.');
INSERT INTO public.assessments (id, student_id, title, subject, assessment_type, term, assessment_date, score, max_score, weight_percentage, feedback)
VALUES ('732a52c3-d69b-4e15-86d1-fb8f4f310aa9', 'b2b2a424-b2a2-4cd8-8261-fa53cd7c6397', 'Physics Laboratory Practical 1', 'Physics', 'lab', 'AY 2025-26 Term 1', '2025-08-25', 20.7, 25.0, 15.0, 'Additional practice recommended.');
INSERT INTO public.assessments (id, student_id, title, subject, assessment_type, term, assessment_date, score, max_score, weight_percentage, feedback)
VALUES ('a54065a4-f17c-4007-9e55-0b760254a3a8', 'b2b2a424-b2a2-4cd8-8261-fa53cd7c6397', 'Computer Science Laboratory Practical 1', 'Computer Science', 'lab', 'AY 2025-26 Term 1', '2025-08-25', 23.2, 25.0, 15.0, 'Additional practice recommended.');
INSERT INTO public.assessments (id, student_id, title, subject, assessment_type, term, assessment_date, score, max_score, weight_percentage, feedback)
VALUES ('552e2a4b-d377-4735-bb80-1aa36d8e3564', 'b2b2a424-b2a2-4cd8-8261-fa53cd7c6397', 'Chemistry Laboratory Practical 1', 'Chemistry', 'lab', 'AY 2025-26 Term 1', '2025-08-25', 23.8, 25.0, 15.0, 'Additional practice recommended.');
INSERT INTO public.assessments (id, student_id, title, subject, assessment_type, term, assessment_date, score, max_score, weight_percentage, feedback)
VALUES ('db10c3c4-51ac-47f8-b4ba-ed718ef32f50', 'b2b2a424-b2a2-4cd8-8261-fa53cd7c6397', 'History & Civics Midterm Examination', 'History & Civics', 'midterm', 'AY 2025-26 Term 1', '2025-09-10', 81.0, 100.0, 15.0, 'Evaluation recorded.');
INSERT INTO public.assessments (id, student_id, title, subject, assessment_type, term, assessment_date, score, max_score, weight_percentage, feedback)
VALUES ('b9c4baa0-f0f6-4284-bc1e-9b5388cc7ba5', 'b2b2a424-b2a2-4cd8-8261-fa53cd7c6397', 'Computer Science Midterm Examination', 'Computer Science', 'midterm', 'AY 2025-26 Term 1', '2025-09-10', 92.3, 100.0, 15.0, 'Evaluation recorded.');
INSERT INTO public.assessments (id, student_id, title, subject, assessment_type, term, assessment_date, score, max_score, weight_percentage, feedback)
VALUES ('fb31b1f3-e832-4869-8e4b-e4d2343842fd', 'b2b2a424-b2a2-4cd8-8261-fa53cd7c6397', 'English Literature Midterm Examination', 'English Literature', 'midterm', 'AY 2025-26 Term 1', '2025-09-10', 81.0, 100.0, 15.0, 'Evaluation recorded.');
INSERT INTO public.assessments (id, student_id, title, subject, assessment_type, term, assessment_date, score, max_score, weight_percentage, feedback)
VALUES ('cb8e7dbd-7886-4084-a4f8-33f6ab8449da', 'b2b2a424-b2a2-4cd8-8261-fa53cd7c6397', 'History & Civics Unit Assignment 2', 'History & Civics', 'assignment', 'AY 2025-26 Term 1', '2025-09-28', 24.4, 30.0, 15.0, 'Additional practice recommended.');
INSERT INTO public.assessments (id, student_id, title, subject, assessment_type, term, assessment_date, score, max_score, weight_percentage, feedback)
VALUES ('f8f489a5-c44a-4add-a723-1c3271199c4c', 'b2b2a424-b2a2-4cd8-8261-fa53cd7c6397', 'English Literature Unit Assignment 2', 'English Literature', 'assignment', 'AY 2025-26 Term 1', '2025-09-28', 28.2, 30.0, 15.0, 'Additional practice recommended.');
INSERT INTO public.assessments (id, student_id, title, subject, assessment_type, term, assessment_date, score, max_score, weight_percentage, feedback)
VALUES ('8f82ed21-d8f4-469c-b7af-2e7f4032b150', 'b2b2a424-b2a2-4cd8-8261-fa53cd7c6397', 'Computer Science Unit Assignment 2', 'Computer Science', 'assignment', 'AY 2025-26 Term 1', '2025-09-28', 28.7, 30.0, 15.0, 'Additional practice recommended.');
INSERT INTO public.assessments (id, student_id, title, subject, assessment_type, term, assessment_date, score, max_score, weight_percentage, feedback)
VALUES ('d18df4c1-205d-435f-ad3d-be929de58904', 'b2b2a424-b2a2-4cd8-8261-fa53cd7c6397', 'Mathematics Term Project Evaluation', 'Mathematics', 'project', 'AY 2025-26 Term 1', '2025-10-15', 46.6, 50.0, 15.0, 'Additional practice recommended.');
INSERT INTO public.assessments (id, student_id, title, subject, assessment_type, term, assessment_date, score, max_score, weight_percentage, feedback)
VALUES ('dcf08787-b356-430f-bd0b-7e4909b950e5', 'b2b2a424-b2a2-4cd8-8261-fa53cd7c6397', 'English Literature Term Project Evaluation', 'English Literature', 'project', 'AY 2025-26 Term 1', '2025-10-15', 39.7, 50.0, 15.0, 'Additional practice recommended.');
INSERT INTO public.assessments (id, student_id, title, subject, assessment_type, term, assessment_date, score, max_score, weight_percentage, feedback)
VALUES ('6f93cae4-6067-43de-b9b9-9e5ea46b7d3f', 'b2b2a424-b2a2-4cd8-8261-fa53cd7c6397', 'History & Civics Term Project Evaluation', 'History & Civics', 'project', 'AY 2025-26 Term 1', '2025-10-15', 46.4, 50.0, 15.0, 'Additional practice recommended.');
INSERT INTO public.assessments (id, student_id, title, subject, assessment_type, term, assessment_date, score, max_score, weight_percentage, feedback)
VALUES ('a818029a-68d2-459f-8c3b-8385246cfbbd', 'b2b2a424-b2a2-4cd8-8261-fa53cd7c6397', 'Mathematics Term Final Examination', 'Mathematics', 'final', 'AY 2025-26 Term 1', '2025-11-05', 80.5, 100.0, 35.0, 'Evaluation recorded.');
INSERT INTO public.assessments (id, student_id, title, subject, assessment_type, term, assessment_date, score, max_score, weight_percentage, feedback)
VALUES ('7f85be80-5241-4483-a41b-ccab35b0316f', 'b2b2a424-b2a2-4cd8-8261-fa53cd7c6397', 'History & Civics Term Final Examination', 'History & Civics', 'final', 'AY 2025-26 Term 1', '2025-11-05', 89.4, 100.0, 35.0, 'Evaluation recorded.');
INSERT INTO public.assessments (id, student_id, title, subject, assessment_type, term, assessment_date, score, max_score, weight_percentage, feedback)
VALUES ('3ab7a5f7-c112-4c62-a18e-ff69eba62fb4', 'b2b2a424-b2a2-4cd8-8261-fa53cd7c6397', 'Computer Science Term Final Examination', 'Computer Science', 'final', 'AY 2025-26 Term 1', '2025-11-05', 79.2, 100.0, 35.0, 'Evaluation recorded.');
INSERT INTO public.assessments (id, student_id, title, subject, assessment_type, term, assessment_date, score, max_score, weight_percentage, feedback)
VALUES ('fe5a4370-af8d-4cac-bcc9-fa1b90cd4528', '4e57e01c-8466-4ce3-b1f6-95cc2c119c64', 'Computer Science Unit Quiz 1', 'Computer Science', 'quiz', 'AY 2025-26 Term 2', '2025-08-15', 19.2, 20.0, 15.0, 'Additional practice recommended.');
INSERT INTO public.assessments (id, student_id, title, subject, assessment_type, term, assessment_date, score, max_score, weight_percentage, feedback)
VALUES ('0aa4c7cc-ad83-4fab-a381-073cd45754e0', '4e57e01c-8466-4ce3-b1f6-95cc2c119c64', 'English Literature Unit Quiz 1', 'English Literature', 'quiz', 'AY 2025-26 Term 2', '2025-08-15', 16.4, 20.0, 15.0, 'Additional practice recommended.');
INSERT INTO public.assessments (id, student_id, title, subject, assessment_type, term, assessment_date, score, max_score, weight_percentage, feedback)
VALUES ('d4a4e24c-6b18-458f-b254-5e71eed41c3d', '4e57e01c-8466-4ce3-b1f6-95cc2c119c64', 'Physics Unit Quiz 1', 'Physics', 'quiz', 'AY 2025-26 Term 2', '2025-08-15', 18.1, 20.0, 15.0, 'Additional practice recommended.');
INSERT INTO public.assessments (id, student_id, title, subject, assessment_type, term, assessment_date, score, max_score, weight_percentage, feedback)
VALUES ('f908fd00-4ee8-40f2-adf0-b6bedcf2f85d', '4e57e01c-8466-4ce3-b1f6-95cc2c119c64', 'Mathematics Laboratory Practical 1', 'Mathematics', 'lab', 'AY 2025-26 Term 2', '2025-08-25', 21.3, 25.0, 15.0, 'Additional practice recommended.');
INSERT INTO public.assessments (id, student_id, title, subject, assessment_type, term, assessment_date, score, max_score, weight_percentage, feedback)
VALUES ('55c5f367-3aa0-43f0-a38b-42df0f076076', '4e57e01c-8466-4ce3-b1f6-95cc2c119c64', 'History & Civics Laboratory Practical 1', 'History & Civics', 'lab', 'AY 2025-26 Term 2', '2025-08-25', 21.2, 25.0, 15.0, 'Additional practice recommended.');
INSERT INTO public.assessments (id, student_id, title, subject, assessment_type, term, assessment_date, score, max_score, weight_percentage, feedback)
VALUES ('b84fe671-25ac-4a86-843d-16f72a1b9b73', '4e57e01c-8466-4ce3-b1f6-95cc2c119c64', 'English Literature Laboratory Practical 1', 'English Literature', 'lab', 'AY 2025-26 Term 2', '2025-08-25', 21.6, 25.0, 15.0, 'Additional practice recommended.');
INSERT INTO public.assessments (id, student_id, title, subject, assessment_type, term, assessment_date, score, max_score, weight_percentage, feedback)
VALUES ('90e932bb-6108-43b3-9350-aded9e90582f', '4e57e01c-8466-4ce3-b1f6-95cc2c119c64', 'History & Civics Midterm Examination', 'History & Civics', 'midterm', 'AY 2025-26 Term 2', '2025-09-10', 79.5, 100.0, 15.0, 'Evaluation recorded.');
INSERT INTO public.assessments (id, student_id, title, subject, assessment_type, term, assessment_date, score, max_score, weight_percentage, feedback)
VALUES ('52268a32-7f1d-4626-9aad-a4ee9ff00066', '4e57e01c-8466-4ce3-b1f6-95cc2c119c64', 'Mathematics Midterm Examination', 'Mathematics', 'midterm', 'AY 2025-26 Term 2', '2025-09-10', 93.2, 100.0, 15.0, 'Evaluation recorded.');
INSERT INTO public.assessments (id, student_id, title, subject, assessment_type, term, assessment_date, score, max_score, weight_percentage, feedback)
VALUES ('aaeab60f-c765-41bd-8dab-729097a7bb38', '4e57e01c-8466-4ce3-b1f6-95cc2c119c64', 'Physics Midterm Examination', 'Physics', 'midterm', 'AY 2025-26 Term 2', '2025-09-10', 89.6, 100.0, 15.0, 'Evaluation recorded.');
INSERT INTO public.assessments (id, student_id, title, subject, assessment_type, term, assessment_date, score, max_score, weight_percentage, feedback)
VALUES ('b7a53dcb-1d54-4e04-8620-3d9e86a8961d', '4e57e01c-8466-4ce3-b1f6-95cc2c119c64', 'Chemistry Unit Assignment 2', 'Chemistry', 'assignment', 'AY 2025-26 Term 2', '2025-09-28', 28.2, 30.0, 15.0, 'Additional practice recommended.');
INSERT INTO public.assessments (id, student_id, title, subject, assessment_type, term, assessment_date, score, max_score, weight_percentage, feedback)
VALUES ('7b3c25be-4b18-470c-8006-6f860c173dbc', '4e57e01c-8466-4ce3-b1f6-95cc2c119c64', 'English Literature Unit Assignment 2', 'English Literature', 'assignment', 'AY 2025-26 Term 2', '2025-09-28', 28.4, 30.0, 15.0, 'Additional practice recommended.');
INSERT INTO public.assessments (id, student_id, title, subject, assessment_type, term, assessment_date, score, max_score, weight_percentage, feedback)
VALUES ('96cf100c-bca5-48f3-a2a2-6701a11ae7f1', '4e57e01c-8466-4ce3-b1f6-95cc2c119c64', 'Mathematics Unit Assignment 2', 'Mathematics', 'assignment', 'AY 2025-26 Term 2', '2025-09-28', 24.6, 30.0, 15.0, 'Additional practice recommended.');
INSERT INTO public.assessments (id, student_id, title, subject, assessment_type, term, assessment_date, score, max_score, weight_percentage, feedback)
VALUES ('c6deab81-4e34-4faf-af87-142af810e0f8', '4e57e01c-8466-4ce3-b1f6-95cc2c119c64', 'History & Civics Term Project Evaluation', 'History & Civics', 'project', 'AY 2025-26 Term 2', '2025-10-15', 41.4, 50.0, 15.0, 'Additional practice recommended.');
INSERT INTO public.assessments (id, student_id, title, subject, assessment_type, term, assessment_date, score, max_score, weight_percentage, feedback)
VALUES ('7f077ba9-6f31-4005-9594-55cd494d115e', '4e57e01c-8466-4ce3-b1f6-95cc2c119c64', 'English Literature Term Project Evaluation', 'English Literature', 'project', 'AY 2025-26 Term 2', '2025-10-15', 47.3, 50.0, 15.0, 'Additional practice recommended.');
INSERT INTO public.assessments (id, student_id, title, subject, assessment_type, term, assessment_date, score, max_score, weight_percentage, feedback)
VALUES ('a1795ba4-acf7-41be-97d0-62c8e8b6740c', '4e57e01c-8466-4ce3-b1f6-95cc2c119c64', 'Computer Science Term Project Evaluation', 'Computer Science', 'project', 'AY 2025-26 Term 2', '2025-10-15', 45.2, 50.0, 15.0, 'Additional practice recommended.');
INSERT INTO public.assessments (id, student_id, title, subject, assessment_type, term, assessment_date, score, max_score, weight_percentage, feedback)
VALUES ('4557ba31-99b5-4705-aec3-418dae0ae8c7', '4e57e01c-8466-4ce3-b1f6-95cc2c119c64', 'Chemistry Term Final Examination', 'Chemistry', 'final', 'AY 2025-26 Term 2', '2025-11-05', 81.2, 100.0, 35.0, 'Evaluation recorded.');
INSERT INTO public.assessments (id, student_id, title, subject, assessment_type, term, assessment_date, score, max_score, weight_percentage, feedback)
VALUES ('58c5c4fc-5026-420f-be1b-250dcc9135ec', '4e57e01c-8466-4ce3-b1f6-95cc2c119c64', 'English Literature Term Final Examination', 'English Literature', 'final', 'AY 2025-26 Term 2', '2025-11-05', 93.3, 100.0, 35.0, 'Evaluation recorded.');
INSERT INTO public.assessments (id, student_id, title, subject, assessment_type, term, assessment_date, score, max_score, weight_percentage, feedback)
VALUES ('97d37228-6380-4811-8446-310187fdf1ce', '4e57e01c-8466-4ce3-b1f6-95cc2c119c64', 'Mathematics Term Final Examination', 'Mathematics', 'final', 'AY 2025-26 Term 2', '2025-11-05', 78.3, 100.0, 35.0, 'Evaluation recorded.');

-- 4. Insert Engagement Events
INSERT INTO public.engagement_events (id, student_id, event_type, title, description, duration_minutes, event_timestamp, metadata)
VALUES ('3c466fee-6c7a-400e-bb0b-82dd984ab185', '0411a66b-943d-46d5-895d-28026b071aab', 'lms_login', 'Portal Study Session', 'Logged participation for Aarav.', 45, '2025-09-22 10:00:00+00:00', '{"platform": "EduNexus LMS v2", "verified": true}'::jsonb);
INSERT INTO public.engagement_events (id, student_id, event_type, title, description, duration_minutes, event_timestamp, metadata)
VALUES ('ff8c64e9-d327-4935-b262-e5999ce88475', '0411a66b-943d-46d5-895d-28026b071aab', 'library_visit', 'Reference Library Check-out', 'Logged participation for Aarav.', 30, '2025-09-20 11:00:00+00:00', '{"platform": "EduNexus LMS v2", "verified": true}'::jsonb);
INSERT INTO public.engagement_events (id, student_id, event_type, title, description, duration_minutes, event_timestamp, metadata)
VALUES ('cbac8980-326e-4714-a157-bd894b8d4c99', '0411a66b-943d-46d5-895d-28026b071aab', 'peer_study', 'Collaborative Group Study', 'Logged participation for Aarav.', 60, '2025-09-18 12:00:00+00:00', '{"platform": "EduNexus LMS v2", "verified": true}'::jsonb);
INSERT INTO public.engagement_events (id, student_id, event_type, title, description, duration_minutes, event_timestamp, metadata)
VALUES ('a19875bf-22f2-4f41-9ac9-10a835df2e0c', '0411a66b-943d-46d5-895d-28026b071aab', 'workshop', 'Career & Study Skills Workshop', 'Logged participation for Aarav.', 90, '2025-09-06 16:00:00+00:00', '{"platform": "EduNexus LMS v2", "verified": true}'::jsonb);
INSERT INTO public.engagement_events (id, student_id, event_type, title, description, duration_minutes, event_timestamp, metadata)
VALUES ('7287057b-30b3-4de3-a3b4-a3272489b7d7', 'edd5c0e8-986a-4275-b213-362f1d2e2a5e', 'lms_login', 'Portal Study Session', 'Logged participation for Diya.', 45, '2025-09-17 11:00:00+00:00', '{"platform": "EduNexus LMS v2", "verified": true}'::jsonb);
INSERT INTO public.engagement_events (id, student_id, event_type, title, description, duration_minutes, event_timestamp, metadata)
VALUES ('cb63fe1e-634f-426e-9f54-adae1b3b5745', 'edd5c0e8-986a-4275-b213-362f1d2e2a5e', 'library_visit', 'Reference Library Check-out', 'Logged participation for Diya.', 30, '2025-09-17 10:00:00+00:00', '{"platform": "EduNexus LMS v2", "verified": true}'::jsonb);
INSERT INTO public.engagement_events (id, student_id, event_type, title, description, duration_minutes, event_timestamp, metadata)
VALUES ('b2097d6e-358e-4686-9deb-8d43eca3e041', 'edd5c0e8-986a-4275-b213-362f1d2e2a5e', 'peer_study', 'Collaborative Group Study', 'Logged participation for Diya.', 60, '2025-09-28 13:00:00+00:00', '{"platform": "EduNexus LMS v2", "verified": true}'::jsonb);
INSERT INTO public.engagement_events (id, student_id, event_type, title, description, duration_minutes, event_timestamp, metadata)
VALUES ('b28be68e-abd9-424b-88e9-dd9ccd79c275', 'edd5c0e8-986a-4275-b213-362f1d2e2a5e', 'workshop', 'Career & Study Skills Workshop', 'Logged participation for Diya.', 90, '2025-09-27 17:00:00+00:00', '{"platform": "EduNexus LMS v2", "verified": true}'::jsonb);
INSERT INTO public.engagement_events (id, student_id, event_type, title, description, duration_minutes, event_timestamp, metadata)
VALUES ('a3fe4c65-cf1d-4b48-a8e1-fc729fe1d184', '06088341-1830-40a1-b648-869368a12a82', 'lms_login', 'Portal Study Session', 'Logged participation for Rohan.', 45, '2025-09-19 16:00:00+00:00', '{"platform": "EduNexus LMS v2", "verified": true}'::jsonb);
INSERT INTO public.engagement_events (id, student_id, event_type, title, description, duration_minutes, event_timestamp, metadata)
VALUES ('26e041c6-f9de-447e-814e-bca60b387016', '06088341-1830-40a1-b648-869368a12a82', 'library_visit', 'Reference Library Check-out', 'Logged participation for Rohan.', 30, '2025-09-08 16:00:00+00:00', '{"platform": "EduNexus LMS v2", "verified": true}'::jsonb);
INSERT INTO public.engagement_events (id, student_id, event_type, title, description, duration_minutes, event_timestamp, metadata)
VALUES ('3a8e46f6-2990-4a5c-b998-9607080dd5fd', '06088341-1830-40a1-b648-869368a12a82', 'peer_study', 'Collaborative Group Study', 'Logged participation for Rohan.', 60, '2025-09-26 15:00:00+00:00', '{"platform": "EduNexus LMS v2", "verified": true}'::jsonb);
INSERT INTO public.engagement_events (id, student_id, event_type, title, description, duration_minutes, event_timestamp, metadata)
VALUES ('38f00081-5f42-408d-bbcd-a8461875ca0d', '06088341-1830-40a1-b648-869368a12a82', 'workshop', 'Career & Study Skills Workshop', 'Logged participation for Rohan.', 90, '2025-09-07 10:00:00+00:00', '{"platform": "EduNexus LMS v2", "verified": true}'::jsonb);
INSERT INTO public.engagement_events (id, student_id, event_type, title, description, duration_minutes, event_timestamp, metadata)
VALUES ('3b11e57f-1167-4724-a8b0-32bd94c8109e', 'd8bcb8d5-c15c-421a-bc22-29148cd4eefc', 'lms_login', 'Portal Study Session', 'Logged participation for Ananya.', 45, '2025-09-03 10:00:00+00:00', '{"platform": "EduNexus LMS v2", "verified": true}'::jsonb);
INSERT INTO public.engagement_events (id, student_id, event_type, title, description, duration_minutes, event_timestamp, metadata)
VALUES ('4f4cef32-7fb8-4cc8-aa63-44e8433f116b', 'd8bcb8d5-c15c-421a-bc22-29148cd4eefc', 'library_visit', 'Reference Library Check-out', 'Logged participation for Ananya.', 30, '2025-09-22 12:00:00+00:00', '{"platform": "EduNexus LMS v2", "verified": true}'::jsonb);
INSERT INTO public.engagement_events (id, student_id, event_type, title, description, duration_minutes, event_timestamp, metadata)
VALUES ('73cf5781-1a6a-4e83-8eca-ae0ee10e4ff2', 'd8bcb8d5-c15c-421a-bc22-29148cd4eefc', 'peer_study', 'Collaborative Group Study', 'Logged participation for Ananya.', 60, '2025-09-13 10:00:00+00:00', '{"platform": "EduNexus LMS v2", "verified": true}'::jsonb);
INSERT INTO public.engagement_events (id, student_id, event_type, title, description, duration_minutes, event_timestamp, metadata)
VALUES ('7fa6b201-27b4-4030-b515-902702f04158', 'd8bcb8d5-c15c-421a-bc22-29148cd4eefc', 'workshop', 'Career & Study Skills Workshop', 'Logged participation for Ananya.', 90, '2025-09-19 12:00:00+00:00', '{"platform": "EduNexus LMS v2", "verified": true}'::jsonb);
INSERT INTO public.engagement_events (id, student_id, event_type, title, description, duration_minutes, event_timestamp, metadata)
VALUES ('7038a47f-355b-44fb-8adc-36be4b070adb', '3f043811-1641-4ea6-a8b5-c0da39193232', 'lms_login', 'Portal Study Session', 'Logged participation for Vikram.', 45, '2025-09-09 11:00:00+00:00', '{"platform": "EduNexus LMS v2", "verified": true}'::jsonb);
INSERT INTO public.engagement_events (id, student_id, event_type, title, description, duration_minutes, event_timestamp, metadata)
VALUES ('1f4c9f97-5588-46ca-b5a3-980928050bc9', '3f043811-1641-4ea6-a8b5-c0da39193232', 'library_visit', 'Reference Library Check-out', 'Logged participation for Vikram.', 30, '2025-09-24 16:00:00+00:00', '{"platform": "EduNexus LMS v2", "verified": true}'::jsonb);
INSERT INTO public.engagement_events (id, student_id, event_type, title, description, duration_minutes, event_timestamp, metadata)
VALUES ('70e44dde-080f-4965-a3f3-b034d6349059', '3f043811-1641-4ea6-a8b5-c0da39193232', 'peer_study', 'Collaborative Group Study', 'Logged participation for Vikram.', 60, '2025-09-18 15:00:00+00:00', '{"platform": "EduNexus LMS v2", "verified": true}'::jsonb);
INSERT INTO public.engagement_events (id, student_id, event_type, title, description, duration_minutes, event_timestamp, metadata)
VALUES ('cae4fad2-72cc-479a-9025-ac6f2ba5931b', '3f043811-1641-4ea6-a8b5-c0da39193232', 'workshop', 'Career & Study Skills Workshop', 'Logged participation for Vikram.', 90, '2025-09-18 09:00:00+00:00', '{"platform": "EduNexus LMS v2", "verified": true}'::jsonb);
INSERT INTO public.engagement_events (id, student_id, event_type, title, description, duration_minutes, event_timestamp, metadata)
VALUES ('7a2b9bac-2aa2-47bb-a629-5502034e6461', 'b208e78a-2f96-4e70-bc46-99e51f4d6543', 'lms_login', 'Portal Study Session', 'Logged participation for Ishita.', 45, '2025-09-09 09:00:00+00:00', '{"platform": "EduNexus LMS v2", "verified": true}'::jsonb);
INSERT INTO public.engagement_events (id, student_id, event_type, title, description, duration_minutes, event_timestamp, metadata)
VALUES ('dac10094-d1b4-4521-8689-bd01e6a6b209', 'b208e78a-2f96-4e70-bc46-99e51f4d6543', 'library_visit', 'Reference Library Check-out', 'Logged participation for Ishita.', 30, '2025-09-04 15:00:00+00:00', '{"platform": "EduNexus LMS v2", "verified": true}'::jsonb);
INSERT INTO public.engagement_events (id, student_id, event_type, title, description, duration_minutes, event_timestamp, metadata)
VALUES ('a8c27940-067e-4c5d-bd7d-1f7320cc89a7', 'b208e78a-2f96-4e70-bc46-99e51f4d6543', 'peer_study', 'Collaborative Group Study', 'Logged participation for Ishita.', 60, '2025-09-12 14:00:00+00:00', '{"platform": "EduNexus LMS v2", "verified": true}'::jsonb);
INSERT INTO public.engagement_events (id, student_id, event_type, title, description, duration_minutes, event_timestamp, metadata)
VALUES ('464000bc-c83a-48c1-ae5a-a350e764ac83', 'b208e78a-2f96-4e70-bc46-99e51f4d6543', 'workshop', 'Career & Study Skills Workshop', 'Logged participation for Ishita.', 90, '2025-09-14 17:00:00+00:00', '{"platform": "EduNexus LMS v2", "verified": true}'::jsonb);
INSERT INTO public.engagement_events (id, student_id, event_type, title, description, duration_minutes, event_timestamp, metadata)
VALUES ('04e3074e-cf3e-4d32-97a6-16d0ddba7a43', 'bef6289e-41de-428e-b7bf-13a855d6e54e', 'lms_login', 'Portal Study Session', 'Logged participation for Kabir.', 45, '2025-09-23 15:00:00+00:00', '{"platform": "EduNexus LMS v2", "verified": true}'::jsonb);
INSERT INTO public.engagement_events (id, student_id, event_type, title, description, duration_minutes, event_timestamp, metadata)
VALUES ('4ba826c7-31b0-4c62-b460-4212c3bef2af', 'bef6289e-41de-428e-b7bf-13a855d6e54e', 'library_visit', 'Reference Library Check-out', 'Logged participation for Kabir.', 30, '2025-09-16 15:00:00+00:00', '{"platform": "EduNexus LMS v2", "verified": true}'::jsonb);
INSERT INTO public.engagement_events (id, student_id, event_type, title, description, duration_minutes, event_timestamp, metadata)
VALUES ('03406b99-558c-4e6d-9f68-c8100e2e5935', 'bef6289e-41de-428e-b7bf-13a855d6e54e', 'peer_study', 'Collaborative Group Study', 'Logged participation for Kabir.', 60, '2025-09-08 11:00:00+00:00', '{"platform": "EduNexus LMS v2", "verified": true}'::jsonb);
INSERT INTO public.engagement_events (id, student_id, event_type, title, description, duration_minutes, event_timestamp, metadata)
VALUES ('019c47a9-275b-46d4-9d2b-042c1e14315e', 'bef6289e-41de-428e-b7bf-13a855d6e54e', 'workshop', 'Career & Study Skills Workshop', 'Logged participation for Kabir.', 90, '2025-09-21 09:00:00+00:00', '{"platform": "EduNexus LMS v2", "verified": true}'::jsonb);
INSERT INTO public.engagement_events (id, student_id, event_type, title, description, duration_minutes, event_timestamp, metadata)
VALUES ('2aff328d-4330-4d4d-bda9-d285cea2ea19', 'fef234a8-0c9c-468f-9383-f850a6082dc6', 'lms_login', 'Portal Study Session', 'Logged participation for Meera.', 45, '2025-09-13 15:00:00+00:00', '{"platform": "EduNexus LMS v2", "verified": true}'::jsonb);
INSERT INTO public.engagement_events (id, student_id, event_type, title, description, duration_minutes, event_timestamp, metadata)
VALUES ('6e323cc5-834e-4cd8-96ad-1fa35a34a731', 'fef234a8-0c9c-468f-9383-f850a6082dc6', 'library_visit', 'Reference Library Check-out', 'Logged participation for Meera.', 30, '2025-09-18 17:00:00+00:00', '{"platform": "EduNexus LMS v2", "verified": true}'::jsonb);
INSERT INTO public.engagement_events (id, student_id, event_type, title, description, duration_minutes, event_timestamp, metadata)
VALUES ('444f0b92-8ce8-4837-859f-2457f6b09d27', 'fef234a8-0c9c-468f-9383-f850a6082dc6', 'peer_study', 'Collaborative Group Study', 'Logged participation for Meera.', 60, '2025-09-26 12:00:00+00:00', '{"platform": "EduNexus LMS v2", "verified": true}'::jsonb);
INSERT INTO public.engagement_events (id, student_id, event_type, title, description, duration_minutes, event_timestamp, metadata)
VALUES ('9ae36149-d0b8-4042-a5b3-76b7fb2bdf3b', 'fef234a8-0c9c-468f-9383-f850a6082dc6', 'workshop', 'Career & Study Skills Workshop', 'Logged participation for Meera.', 90, '2025-09-16 12:00:00+00:00', '{"platform": "EduNexus LMS v2", "verified": true}'::jsonb);
INSERT INTO public.engagement_events (id, student_id, event_type, title, description, duration_minutes, event_timestamp, metadata)
VALUES ('e5780851-7b77-45da-b4dc-7bed2ccba709', 'b7263fba-7dd1-48ee-99f4-be591aab11ad', 'lms_login', 'Portal Study Session', 'Logged participation for Aditya.', 45, '2025-09-23 12:00:00+00:00', '{"platform": "EduNexus LMS v2", "verified": true}'::jsonb);
INSERT INTO public.engagement_events (id, student_id, event_type, title, description, duration_minutes, event_timestamp, metadata)
VALUES ('5d6f64ad-d6ad-49a6-ad0e-3ef0d9f58f6d', 'b7263fba-7dd1-48ee-99f4-be591aab11ad', 'library_visit', 'Reference Library Check-out', 'Logged participation for Aditya.', 30, '2025-09-03 12:00:00+00:00', '{"platform": "EduNexus LMS v2", "verified": true}'::jsonb);
INSERT INTO public.engagement_events (id, student_id, event_type, title, description, duration_minutes, event_timestamp, metadata)
VALUES ('87e879ed-f519-47b1-b1a7-3adf383ab871', 'b7263fba-7dd1-48ee-99f4-be591aab11ad', 'peer_study', 'Collaborative Group Study', 'Logged participation for Aditya.', 60, '2025-09-04 13:00:00+00:00', '{"platform": "EduNexus LMS v2", "verified": true}'::jsonb);
INSERT INTO public.engagement_events (id, student_id, event_type, title, description, duration_minutes, event_timestamp, metadata)
VALUES ('97d468a8-d121-42d8-abbe-e17bde82f661', 'b7263fba-7dd1-48ee-99f4-be591aab11ad', 'workshop', 'Career & Study Skills Workshop', 'Logged participation for Aditya.', 90, '2025-09-28 10:00:00+00:00', '{"platform": "EduNexus LMS v2", "verified": true}'::jsonb);
INSERT INTO public.engagement_events (id, student_id, event_type, title, description, duration_minutes, event_timestamp, metadata)
VALUES ('9366d7d9-162c-4bb7-aa9b-ef95c5c4cb82', 'f76a0ab1-57e1-482c-a611-f09c0932d6b8', 'lms_login', 'Portal Study Session', 'Logged participation for Pooja.', 45, '2025-09-13 12:00:00+00:00', '{"platform": "EduNexus LMS v2", "verified": true}'::jsonb);
INSERT INTO public.engagement_events (id, student_id, event_type, title, description, duration_minutes, event_timestamp, metadata)
VALUES ('b3dfd565-8744-4b94-b565-67bf4adbfa36', 'f76a0ab1-57e1-482c-a611-f09c0932d6b8', 'library_visit', 'Reference Library Check-out', 'Logged participation for Pooja.', 30, '2025-09-10 14:00:00+00:00', '{"platform": "EduNexus LMS v2", "verified": true}'::jsonb);
INSERT INTO public.engagement_events (id, student_id, event_type, title, description, duration_minutes, event_timestamp, metadata)
VALUES ('89e3603d-4f57-410a-9b03-a2a34d037523', 'f76a0ab1-57e1-482c-a611-f09c0932d6b8', 'peer_study', 'Collaborative Group Study', 'Logged participation for Pooja.', 60, '2025-09-16 17:00:00+00:00', '{"platform": "EduNexus LMS v2", "verified": true}'::jsonb);
INSERT INTO public.engagement_events (id, student_id, event_type, title, description, duration_minutes, event_timestamp, metadata)
VALUES ('87b977eb-abd0-4d66-a3cf-82eab5b13dcd', 'f76a0ab1-57e1-482c-a611-f09c0932d6b8', 'workshop', 'Career & Study Skills Workshop', 'Logged participation for Pooja.', 90, '2025-09-17 14:00:00+00:00', '{"platform": "EduNexus LMS v2", "verified": true}'::jsonb);
INSERT INTO public.engagement_events (id, student_id, event_type, title, description, duration_minutes, event_timestamp, metadata)
VALUES ('08c05b7f-2847-4cc6-9758-f213ff6d3247', 'eca115ce-9ee0-4d3c-965d-e0a3a33b40c7', 'lms_login', 'Portal Study Session', 'Logged participation for Arjun.', 45, '2025-09-17 15:00:00+00:00', '{"platform": "EduNexus LMS v2", "verified": true}'::jsonb);
INSERT INTO public.engagement_events (id, student_id, event_type, title, description, duration_minutes, event_timestamp, metadata)
VALUES ('71a729a0-a591-4009-b03c-92f3c0539c4f', 'eca115ce-9ee0-4d3c-965d-e0a3a33b40c7', 'library_visit', 'Reference Library Check-out', 'Logged participation for Arjun.', 30, '2025-09-15 16:00:00+00:00', '{"platform": "EduNexus LMS v2", "verified": true}'::jsonb);
INSERT INTO public.engagement_events (id, student_id, event_type, title, description, duration_minutes, event_timestamp, metadata)
VALUES ('8ad2a427-5ee0-4140-8df8-2d753d0cb86f', 'eca115ce-9ee0-4d3c-965d-e0a3a33b40c7', 'peer_study', 'Collaborative Group Study', 'Logged participation for Arjun.', 60, '2025-09-10 15:00:00+00:00', '{"platform": "EduNexus LMS v2", "verified": true}'::jsonb);
INSERT INTO public.engagement_events (id, student_id, event_type, title, description, duration_minutes, event_timestamp, metadata)
VALUES ('3a86f5db-d6a5-40dd-a060-29fce7df4bc7', 'eca115ce-9ee0-4d3c-965d-e0a3a33b40c7', 'workshop', 'Career & Study Skills Workshop', 'Logged participation for Arjun.', 90, '2025-09-10 09:00:00+00:00', '{"platform": "EduNexus LMS v2", "verified": true}'::jsonb);
INSERT INTO public.engagement_events (id, student_id, event_type, title, description, duration_minutes, event_timestamp, metadata)
VALUES ('c1bec510-d2da-4aec-946d-1977645264fc', '06024d12-eb44-4417-8688-5eb60d3cff12', 'lms_login', 'Portal Study Session', 'Logged participation for Sneha.', 45, '2025-09-02 11:00:00+00:00', '{"platform": "EduNexus LMS v2", "verified": true}'::jsonb);
INSERT INTO public.engagement_events (id, student_id, event_type, title, description, duration_minutes, event_timestamp, metadata)
VALUES ('97650a1f-58bd-4ce8-83cf-8a94732bd1f8', '06024d12-eb44-4417-8688-5eb60d3cff12', 'library_visit', 'Reference Library Check-out', 'Logged participation for Sneha.', 30, '2025-09-16 17:00:00+00:00', '{"platform": "EduNexus LMS v2", "verified": true}'::jsonb);
INSERT INTO public.engagement_events (id, student_id, event_type, title, description, duration_minutes, event_timestamp, metadata)
VALUES ('8cbb756c-1f5b-4ce9-9e96-0d78aa3b026f', '06024d12-eb44-4417-8688-5eb60d3cff12', 'peer_study', 'Collaborative Group Study', 'Logged participation for Sneha.', 60, '2025-09-21 16:00:00+00:00', '{"platform": "EduNexus LMS v2", "verified": true}'::jsonb);
INSERT INTO public.engagement_events (id, student_id, event_type, title, description, duration_minutes, event_timestamp, metadata)
VALUES ('2f15e6cd-0dd9-4e25-9713-e8d8c0f14299', '06024d12-eb44-4417-8688-5eb60d3cff12', 'workshop', 'Career & Study Skills Workshop', 'Logged participation for Sneha.', 90, '2025-09-09 11:00:00+00:00', '{"platform": "EduNexus LMS v2", "verified": true}'::jsonb);
INSERT INTO public.engagement_events (id, student_id, event_type, title, description, duration_minutes, event_timestamp, metadata)
VALUES ('62a86525-0e1e-4778-ba55-44b64ccfe3ae', '0ed0d835-d441-45ea-98da-efe44480ad7a', 'lms_login', 'Portal Study Session', 'Logged participation for Karan.', 45, '2025-09-15 17:00:00+00:00', '{"platform": "EduNexus LMS v2", "verified": true}'::jsonb);
INSERT INTO public.engagement_events (id, student_id, event_type, title, description, duration_minutes, event_timestamp, metadata)
VALUES ('c42c3403-49d5-4dd3-b495-47a269ac7f35', '0ed0d835-d441-45ea-98da-efe44480ad7a', 'library_visit', 'Reference Library Check-out', 'Logged participation for Karan.', 30, '2025-09-05 15:00:00+00:00', '{"platform": "EduNexus LMS v2", "verified": true}'::jsonb);
INSERT INTO public.engagement_events (id, student_id, event_type, title, description, duration_minutes, event_timestamp, metadata)
VALUES ('1902a4e6-65cd-4208-a984-691c4699a222', '0ed0d835-d441-45ea-98da-efe44480ad7a', 'peer_study', 'Collaborative Group Study', 'Logged participation for Karan.', 60, '2025-09-07 17:00:00+00:00', '{"platform": "EduNexus LMS v2", "verified": true}'::jsonb);
INSERT INTO public.engagement_events (id, student_id, event_type, title, description, duration_minutes, event_timestamp, metadata)
VALUES ('c96ee7ef-349d-4994-b87c-5ef55c17f40a', '0ed0d835-d441-45ea-98da-efe44480ad7a', 'workshop', 'Career & Study Skills Workshop', 'Logged participation for Karan.', 90, '2025-09-24 11:00:00+00:00', '{"platform": "EduNexus LMS v2", "verified": true}'::jsonb);
INSERT INTO public.engagement_events (id, student_id, event_type, title, description, duration_minutes, event_timestamp, metadata)
VALUES ('ec6cc7e4-da56-4650-95d6-180eacc60ee2', '23c7c2fc-8dec-42bf-b8c2-a1b7a497a8e6', 'lms_login', 'Portal Study Session', 'Logged participation for Tanvi.', 45, '2025-09-16 17:00:00+00:00', '{"platform": "EduNexus LMS v2", "verified": true}'::jsonb);
INSERT INTO public.engagement_events (id, student_id, event_type, title, description, duration_minutes, event_timestamp, metadata)
VALUES ('e01432ae-464e-49ef-9c81-a2e92e224217', '23c7c2fc-8dec-42bf-b8c2-a1b7a497a8e6', 'library_visit', 'Reference Library Check-out', 'Logged participation for Tanvi.', 30, '2025-09-02 10:00:00+00:00', '{"platform": "EduNexus LMS v2", "verified": true}'::jsonb);
INSERT INTO public.engagement_events (id, student_id, event_type, title, description, duration_minutes, event_timestamp, metadata)
VALUES ('42f7d751-eedb-4e03-a5e3-46afb8afed38', '23c7c2fc-8dec-42bf-b8c2-a1b7a497a8e6', 'peer_study', 'Collaborative Group Study', 'Logged participation for Tanvi.', 60, '2025-09-08 13:00:00+00:00', '{"platform": "EduNexus LMS v2", "verified": true}'::jsonb);
INSERT INTO public.engagement_events (id, student_id, event_type, title, description, duration_minutes, event_timestamp, metadata)
VALUES ('7eea3790-a730-4ed7-b7ca-5a3845bf71a8', '23c7c2fc-8dec-42bf-b8c2-a1b7a497a8e6', 'workshop', 'Career & Study Skills Workshop', 'Logged participation for Tanvi.', 90, '2025-09-08 10:00:00+00:00', '{"platform": "EduNexus LMS v2", "verified": true}'::jsonb);
INSERT INTO public.engagement_events (id, student_id, event_type, title, description, duration_minutes, event_timestamp, metadata)
VALUES ('74b4e0ed-cdcc-4c37-869d-2dc3df0a7040', '91ce6ee5-9509-461e-ae83-f443631a3016', 'lms_login', 'Portal Study Session', 'Logged participation for Nikhil.', 45, '2025-09-08 14:00:00+00:00', '{"platform": "EduNexus LMS v2", "verified": true}'::jsonb);
INSERT INTO public.engagement_events (id, student_id, event_type, title, description, duration_minutes, event_timestamp, metadata)
VALUES ('33c707b8-1ec8-4644-a1c4-f4e032b9cb85', '91ce6ee5-9509-461e-ae83-f443631a3016', 'library_visit', 'Reference Library Check-out', 'Logged participation for Nikhil.', 30, '2025-09-08 12:00:00+00:00', '{"platform": "EduNexus LMS v2", "verified": true}'::jsonb);
INSERT INTO public.engagement_events (id, student_id, event_type, title, description, duration_minutes, event_timestamp, metadata)
VALUES ('01c2e918-d646-48bc-8573-6a4066c399ec', '91ce6ee5-9509-461e-ae83-f443631a3016', 'peer_study', 'Collaborative Group Study', 'Logged participation for Nikhil.', 60, '2025-09-20 13:00:00+00:00', '{"platform": "EduNexus LMS v2", "verified": true}'::jsonb);
INSERT INTO public.engagement_events (id, student_id, event_type, title, description, duration_minutes, event_timestamp, metadata)
VALUES ('0500a16a-adc5-4493-9ddc-df54bdc0465e', '91ce6ee5-9509-461e-ae83-f443631a3016', 'workshop', 'Career & Study Skills Workshop', 'Logged participation for Nikhil.', 90, '2025-09-22 11:00:00+00:00', '{"platform": "EduNexus LMS v2", "verified": true}'::jsonb);
INSERT INTO public.engagement_events (id, student_id, event_type, title, description, duration_minutes, event_timestamp, metadata)
VALUES ('bd16a67b-4f9f-4325-82af-dc0a4aa31cd2', '689593b4-7c6c-42a3-a041-16f1ac029f06', 'lms_login', 'Portal Study Session', 'Logged participation for Priya.', 45, '2025-09-16 10:00:00+00:00', '{"platform": "EduNexus LMS v2", "verified": true}'::jsonb);
INSERT INTO public.engagement_events (id, student_id, event_type, title, description, duration_minutes, event_timestamp, metadata)
VALUES ('3b06b042-1e4e-4d7d-b14f-600817966ca8', '689593b4-7c6c-42a3-a041-16f1ac029f06', 'library_visit', 'Reference Library Check-out', 'Logged participation for Priya.', 30, '2025-09-04 12:00:00+00:00', '{"platform": "EduNexus LMS v2", "verified": true}'::jsonb);
INSERT INTO public.engagement_events (id, student_id, event_type, title, description, duration_minutes, event_timestamp, metadata)
VALUES ('f6e31e30-02f4-429e-a867-638f5050867d', '689593b4-7c6c-42a3-a041-16f1ac029f06', 'peer_study', 'Collaborative Group Study', 'Logged participation for Priya.', 60, '2025-09-18 11:00:00+00:00', '{"platform": "EduNexus LMS v2", "verified": true}'::jsonb);
INSERT INTO public.engagement_events (id, student_id, event_type, title, description, duration_minutes, event_timestamp, metadata)
VALUES ('e5e1ae17-0070-4060-a5b0-e298e486f154', '689593b4-7c6c-42a3-a041-16f1ac029f06', 'workshop', 'Career & Study Skills Workshop', 'Logged participation for Priya.', 90, '2025-09-13 16:00:00+00:00', '{"platform": "EduNexus LMS v2", "verified": true}'::jsonb);
INSERT INTO public.engagement_events (id, student_id, event_type, title, description, duration_minutes, event_timestamp, metadata)
VALUES ('19405f6e-661d-47af-b494-f414c42122f8', '20d07c0c-ac56-4b30-8e9c-f79cad701de3', 'lms_login', 'Portal Study Session', 'Logged participation for Siddharth.', 45, '2025-09-06 13:00:00+00:00', '{"platform": "EduNexus LMS v2", "verified": true}'::jsonb);
INSERT INTO public.engagement_events (id, student_id, event_type, title, description, duration_minutes, event_timestamp, metadata)
VALUES ('d4878fce-fbf6-49d5-9c91-93525b2d3f04', '20d07c0c-ac56-4b30-8e9c-f79cad701de3', 'library_visit', 'Reference Library Check-out', 'Logged participation for Siddharth.', 30, '2025-09-02 11:00:00+00:00', '{"platform": "EduNexus LMS v2", "verified": true}'::jsonb);
INSERT INTO public.engagement_events (id, student_id, event_type, title, description, duration_minutes, event_timestamp, metadata)
VALUES ('15c4368e-baa6-48af-84a7-12a6e331a531', '20d07c0c-ac56-4b30-8e9c-f79cad701de3', 'peer_study', 'Collaborative Group Study', 'Logged participation for Siddharth.', 60, '2025-09-24 15:00:00+00:00', '{"platform": "EduNexus LMS v2", "verified": true}'::jsonb);
INSERT INTO public.engagement_events (id, student_id, event_type, title, description, duration_minutes, event_timestamp, metadata)
VALUES ('d587e403-46d9-496b-9acd-104e17cc657d', '20d07c0c-ac56-4b30-8e9c-f79cad701de3', 'workshop', 'Career & Study Skills Workshop', 'Logged participation for Siddharth.', 90, '2025-09-17 10:00:00+00:00', '{"platform": "EduNexus LMS v2", "verified": true}'::jsonb);
INSERT INTO public.engagement_events (id, student_id, event_type, title, description, duration_minutes, event_timestamp, metadata)
VALUES ('505a2e53-8691-4f89-8a3b-ba69b2170ae9', '04bdc67a-42d0-4872-b096-afdd8e4549db', 'lms_login', 'Portal Study Session', 'Logged participation for Rhea.', 45, '2025-09-18 09:00:00+00:00', '{"platform": "EduNexus LMS v2", "verified": true}'::jsonb);
INSERT INTO public.engagement_events (id, student_id, event_type, title, description, duration_minutes, event_timestamp, metadata)
VALUES ('a6f9f555-9552-4882-bf37-c2500565f9f5', '04bdc67a-42d0-4872-b096-afdd8e4549db', 'library_visit', 'Reference Library Check-out', 'Logged participation for Rhea.', 30, '2025-09-19 17:00:00+00:00', '{"platform": "EduNexus LMS v2", "verified": true}'::jsonb);
INSERT INTO public.engagement_events (id, student_id, event_type, title, description, duration_minutes, event_timestamp, metadata)
VALUES ('1daa8f75-e8fb-4ad3-b110-50d66f938396', '04bdc67a-42d0-4872-b096-afdd8e4549db', 'peer_study', 'Collaborative Group Study', 'Logged participation for Rhea.', 60, '2025-09-18 14:00:00+00:00', '{"platform": "EduNexus LMS v2", "verified": true}'::jsonb);
INSERT INTO public.engagement_events (id, student_id, event_type, title, description, duration_minutes, event_timestamp, metadata)
VALUES ('96b017c6-d707-4c87-9348-c674638997a8', '04bdc67a-42d0-4872-b096-afdd8e4549db', 'workshop', 'Career & Study Skills Workshop', 'Logged participation for Rhea.', 90, '2025-09-22 10:00:00+00:00', '{"platform": "EduNexus LMS v2", "verified": true}'::jsonb);
INSERT INTO public.engagement_events (id, student_id, event_type, title, description, duration_minutes, event_timestamp, metadata)
VALUES ('ad30541a-07ef-497f-990d-936f1d83e43e', 'e89ca679-ca93-4c30-9621-450664c5b826', 'lms_login', 'Portal Study Session', 'Logged participation for Dhruv.', 45, '2025-09-03 13:00:00+00:00', '{"platform": "EduNexus LMS v2", "verified": true}'::jsonb);
INSERT INTO public.engagement_events (id, student_id, event_type, title, description, duration_minutes, event_timestamp, metadata)
VALUES ('256bede1-1d94-41f6-a358-f1ff3b68ebba', 'e89ca679-ca93-4c30-9621-450664c5b826', 'library_visit', 'Reference Library Check-out', 'Logged participation for Dhruv.', 30, '2025-09-15 15:00:00+00:00', '{"platform": "EduNexus LMS v2", "verified": true}'::jsonb);
INSERT INTO public.engagement_events (id, student_id, event_type, title, description, duration_minutes, event_timestamp, metadata)
VALUES ('99e775cb-069e-4a75-85a8-fe85308158a5', 'e89ca679-ca93-4c30-9621-450664c5b826', 'peer_study', 'Collaborative Group Study', 'Logged participation for Dhruv.', 60, '2025-09-16 16:00:00+00:00', '{"platform": "EduNexus LMS v2", "verified": true}'::jsonb);
INSERT INTO public.engagement_events (id, student_id, event_type, title, description, duration_minutes, event_timestamp, metadata)
VALUES ('eb0b32bc-204c-41ce-adb6-c8882d821c92', 'e89ca679-ca93-4c30-9621-450664c5b826', 'workshop', 'Career & Study Skills Workshop', 'Logged participation for Dhruv.', 90, '2025-09-14 13:00:00+00:00', '{"platform": "EduNexus LMS v2", "verified": true}'::jsonb);
INSERT INTO public.engagement_events (id, student_id, event_type, title, description, duration_minutes, event_timestamp, metadata)
VALUES ('07fde0d7-6308-4d46-b194-509117cc1149', '23bae913-0d5d-498a-88c5-5bd5bfcc2901', 'lms_login', 'Portal Study Session', 'Logged participation for Kavya.', 45, '2025-09-25 14:00:00+00:00', '{"platform": "EduNexus LMS v2", "verified": true}'::jsonb);
INSERT INTO public.engagement_events (id, student_id, event_type, title, description, duration_minutes, event_timestamp, metadata)
VALUES ('5171eb17-4b7a-4de7-9b2b-24160e3eb392', '23bae913-0d5d-498a-88c5-5bd5bfcc2901', 'library_visit', 'Reference Library Check-out', 'Logged participation for Kavya.', 30, '2025-09-12 11:00:00+00:00', '{"platform": "EduNexus LMS v2", "verified": true}'::jsonb);
INSERT INTO public.engagement_events (id, student_id, event_type, title, description, duration_minutes, event_timestamp, metadata)
VALUES ('69a1f96f-d49c-4b11-861a-59a121f581f3', '23bae913-0d5d-498a-88c5-5bd5bfcc2901', 'peer_study', 'Collaborative Group Study', 'Logged participation for Kavya.', 60, '2025-09-08 10:00:00+00:00', '{"platform": "EduNexus LMS v2", "verified": true}'::jsonb);
INSERT INTO public.engagement_events (id, student_id, event_type, title, description, duration_minutes, event_timestamp, metadata)
VALUES ('03e6960c-79fb-425c-80aa-a8f04f87615d', '23bae913-0d5d-498a-88c5-5bd5bfcc2901', 'workshop', 'Career & Study Skills Workshop', 'Logged participation for Kavya.', 90, '2025-09-05 13:00:00+00:00', '{"platform": "EduNexus LMS v2", "verified": true}'::jsonb);
INSERT INTO public.engagement_events (id, student_id, event_type, title, description, duration_minutes, event_timestamp, metadata)
VALUES ('80a120a5-348f-455e-8da7-86b5fd3b85e0', '05089772-5251-4ee4-83ce-87f21ae73662', 'lms_login', 'Portal Study Session', 'Logged participation for Rahul.', 45, '2025-09-25 14:00:00+00:00', '{"platform": "EduNexus LMS v2", "verified": true}'::jsonb);
INSERT INTO public.engagement_events (id, student_id, event_type, title, description, duration_minutes, event_timestamp, metadata)
VALUES ('e455f922-d201-4ed5-8c45-ea32a344c896', '05089772-5251-4ee4-83ce-87f21ae73662', 'library_visit', 'Reference Library Check-out', 'Logged participation for Rahul.', 30, '2025-09-22 09:00:00+00:00', '{"platform": "EduNexus LMS v2", "verified": true}'::jsonb);
INSERT INTO public.engagement_events (id, student_id, event_type, title, description, duration_minutes, event_timestamp, metadata)
VALUES ('5095834e-aa3c-4064-9ec8-2081544823c3', '05089772-5251-4ee4-83ce-87f21ae73662', 'peer_study', 'Collaborative Group Study', 'Logged participation for Rahul.', 60, '2025-09-26 14:00:00+00:00', '{"platform": "EduNexus LMS v2", "verified": true}'::jsonb);
INSERT INTO public.engagement_events (id, student_id, event_type, title, description, duration_minutes, event_timestamp, metadata)
VALUES ('31985bc2-1b59-4e5c-9dd1-238122d9a21d', '05089772-5251-4ee4-83ce-87f21ae73662', 'workshop', 'Career & Study Skills Workshop', 'Logged participation for Rahul.', 90, '2025-09-03 14:00:00+00:00', '{"platform": "EduNexus LMS v2", "verified": true}'::jsonb);
INSERT INTO public.engagement_events (id, student_id, event_type, title, description, duration_minutes, event_timestamp, metadata)
VALUES ('5851fcd1-1990-4640-82d7-cafeaa35b1c0', '78e7fd7b-5932-428e-9786-3195e157ae0e', 'lms_login', 'Portal Study Session', 'Logged participation for Neha.', 45, '2025-09-15 13:00:00+00:00', '{"platform": "EduNexus LMS v2", "verified": true}'::jsonb);
INSERT INTO public.engagement_events (id, student_id, event_type, title, description, duration_minutes, event_timestamp, metadata)
VALUES ('4e2deab5-c6e3-4b29-a37c-6c739472966e', '78e7fd7b-5932-428e-9786-3195e157ae0e', 'library_visit', 'Reference Library Check-out', 'Logged participation for Neha.', 30, '2025-09-25 16:00:00+00:00', '{"platform": "EduNexus LMS v2", "verified": true}'::jsonb);
INSERT INTO public.engagement_events (id, student_id, event_type, title, description, duration_minutes, event_timestamp, metadata)
VALUES ('2e0b7128-64a9-419f-b076-393121f3d9fd', '78e7fd7b-5932-428e-9786-3195e157ae0e', 'peer_study', 'Collaborative Group Study', 'Logged participation for Neha.', 60, '2025-09-08 17:00:00+00:00', '{"platform": "EduNexus LMS v2", "verified": true}'::jsonb);
INSERT INTO public.engagement_events (id, student_id, event_type, title, description, duration_minutes, event_timestamp, metadata)
VALUES ('a824b8d0-697a-4068-aee1-99812b5683bb', '78e7fd7b-5932-428e-9786-3195e157ae0e', 'workshop', 'Career & Study Skills Workshop', 'Logged participation for Neha.', 90, '2025-09-08 13:00:00+00:00', '{"platform": "EduNexus LMS v2", "verified": true}'::jsonb);
INSERT INTO public.engagement_events (id, student_id, event_type, title, description, duration_minutes, event_timestamp, metadata)
VALUES ('79b72256-0d7f-4343-bc19-e7c9010cf421', 'f45c2d18-420f-4a52-98a6-f8f5b8211c51', 'lms_login', 'Portal Study Session', 'Logged participation for Varun.', 45, '2025-09-07 11:00:00+00:00', '{"platform": "EduNexus LMS v2", "verified": true}'::jsonb);
INSERT INTO public.engagement_events (id, student_id, event_type, title, description, duration_minutes, event_timestamp, metadata)
VALUES ('8c522dfe-d1fe-467c-9272-8e340f8ad976', 'f45c2d18-420f-4a52-98a6-f8f5b8211c51', 'library_visit', 'Reference Library Check-out', 'Logged participation for Varun.', 30, '2025-09-18 17:00:00+00:00', '{"platform": "EduNexus LMS v2", "verified": true}'::jsonb);
INSERT INTO public.engagement_events (id, student_id, event_type, title, description, duration_minutes, event_timestamp, metadata)
VALUES ('8cadf462-2c75-49b6-b409-d21d7b1c83af', 'f45c2d18-420f-4a52-98a6-f8f5b8211c51', 'peer_study', 'Collaborative Group Study', 'Logged participation for Varun.', 60, '2025-09-14 10:00:00+00:00', '{"platform": "EduNexus LMS v2", "verified": true}'::jsonb);
INSERT INTO public.engagement_events (id, student_id, event_type, title, description, duration_minutes, event_timestamp, metadata)
VALUES ('c96cb6b9-61a9-405d-a28e-2b67dc9fa6fe', 'f45c2d18-420f-4a52-98a6-f8f5b8211c51', 'workshop', 'Career & Study Skills Workshop', 'Logged participation for Varun.', 90, '2025-09-25 13:00:00+00:00', '{"platform": "EduNexus LMS v2", "verified": true}'::jsonb);
INSERT INTO public.engagement_events (id, student_id, event_type, title, description, duration_minutes, event_timestamp, metadata)
VALUES ('ce7ea640-108a-4289-815d-cb4aeea80293', 'a5859586-17fe-40e2-89df-e2adbaeb7e3f', 'lms_login', 'Portal Study Session', 'Logged participation for Simran.', 45, '2025-09-09 09:00:00+00:00', '{"platform": "EduNexus LMS v2", "verified": true}'::jsonb);
INSERT INTO public.engagement_events (id, student_id, event_type, title, description, duration_minutes, event_timestamp, metadata)
VALUES ('6a0c05f8-a855-481f-88b3-2d653c39d677', 'a5859586-17fe-40e2-89df-e2adbaeb7e3f', 'library_visit', 'Reference Library Check-out', 'Logged participation for Simran.', 30, '2025-09-25 12:00:00+00:00', '{"platform": "EduNexus LMS v2", "verified": true}'::jsonb);
INSERT INTO public.engagement_events (id, student_id, event_type, title, description, duration_minutes, event_timestamp, metadata)
VALUES ('75661cc5-31f8-48d5-a626-31bfac92901b', 'a5859586-17fe-40e2-89df-e2adbaeb7e3f', 'peer_study', 'Collaborative Group Study', 'Logged participation for Simran.', 60, '2025-09-10 14:00:00+00:00', '{"platform": "EduNexus LMS v2", "verified": true}'::jsonb);
INSERT INTO public.engagement_events (id, student_id, event_type, title, description, duration_minutes, event_timestamp, metadata)
VALUES ('d1b49a2a-ecba-4544-9c96-b007a6cd940c', 'a5859586-17fe-40e2-89df-e2adbaeb7e3f', 'workshop', 'Career & Study Skills Workshop', 'Logged participation for Simran.', 90, '2025-09-28 09:00:00+00:00', '{"platform": "EduNexus LMS v2", "verified": true}'::jsonb);
INSERT INTO public.engagement_events (id, student_id, event_type, title, description, duration_minutes, event_timestamp, metadata)
VALUES ('b5499e9a-f38b-4cf6-8f23-379fdc498e88', '4a0b911a-abfd-4139-b18d-eb21fb120991', 'lms_login', 'Portal Study Session', 'Logged participation for Manish.', 45, '2025-09-12 15:00:00+00:00', '{"platform": "EduNexus LMS v2", "verified": true}'::jsonb);
INSERT INTO public.engagement_events (id, student_id, event_type, title, description, duration_minutes, event_timestamp, metadata)
VALUES ('34dfe9a4-cc85-4f19-96c4-ff0fc34752b9', '4a0b911a-abfd-4139-b18d-eb21fb120991', 'library_visit', 'Reference Library Check-out', 'Logged participation for Manish.', 30, '2025-09-11 13:00:00+00:00', '{"platform": "EduNexus LMS v2", "verified": true}'::jsonb);
INSERT INTO public.engagement_events (id, student_id, event_type, title, description, duration_minutes, event_timestamp, metadata)
VALUES ('8d7992a1-3212-4a88-b9fb-8116bcfdacce', '4a0b911a-abfd-4139-b18d-eb21fb120991', 'peer_study', 'Collaborative Group Study', 'Logged participation for Manish.', 60, '2025-09-08 10:00:00+00:00', '{"platform": "EduNexus LMS v2", "verified": true}'::jsonb);
INSERT INTO public.engagement_events (id, student_id, event_type, title, description, duration_minutes, event_timestamp, metadata)
VALUES ('6ac934d4-ac93-4010-9909-f2811e49c99a', '4a0b911a-abfd-4139-b18d-eb21fb120991', 'workshop', 'Career & Study Skills Workshop', 'Logged participation for Manish.', 90, '2025-09-01 11:00:00+00:00', '{"platform": "EduNexus LMS v2", "verified": true}'::jsonb);
INSERT INTO public.engagement_events (id, student_id, event_type, title, description, duration_minutes, event_timestamp, metadata)
VALUES ('dff0e728-c7be-4767-81c9-f037805991fc', 'd7bb4c48-ee9b-41d9-b303-68427673dd14', 'lms_login', 'Portal Study Session', 'Logged participation for Shreya.', 45, '2025-09-28 09:00:00+00:00', '{"platform": "EduNexus LMS v2", "verified": true}'::jsonb);
INSERT INTO public.engagement_events (id, student_id, event_type, title, description, duration_minutes, event_timestamp, metadata)
VALUES ('59a7b2cb-ef7a-4e32-8d98-614611610b33', 'd7bb4c48-ee9b-41d9-b303-68427673dd14', 'library_visit', 'Reference Library Check-out', 'Logged participation for Shreya.', 30, '2025-09-27 10:00:00+00:00', '{"platform": "EduNexus LMS v2", "verified": true}'::jsonb);
INSERT INTO public.engagement_events (id, student_id, event_type, title, description, duration_minutes, event_timestamp, metadata)
VALUES ('892c7c03-d2aa-474d-95da-81ba1ac4c779', 'd7bb4c48-ee9b-41d9-b303-68427673dd14', 'peer_study', 'Collaborative Group Study', 'Logged participation for Shreya.', 60, '2025-09-17 11:00:00+00:00', '{"platform": "EduNexus LMS v2", "verified": true}'::jsonb);
INSERT INTO public.engagement_events (id, student_id, event_type, title, description, duration_minutes, event_timestamp, metadata)
VALUES ('1f16ccef-d2ba-41dd-ab55-76a36cccb5ac', 'd7bb4c48-ee9b-41d9-b303-68427673dd14', 'workshop', 'Career & Study Skills Workshop', 'Logged participation for Shreya.', 90, '2025-09-10 11:00:00+00:00', '{"platform": "EduNexus LMS v2", "verified": true}'::jsonb);
INSERT INTO public.engagement_events (id, student_id, event_type, title, description, duration_minutes, event_timestamp, metadata)
VALUES ('1962df0b-bab8-4e5c-9814-7f8d33a8ad02', 'c6518feb-e30e-4c60-992b-7b67af2efe1a', 'lms_login', 'Portal Study Session', 'Logged participation for Akash.', 45, '2025-09-11 12:00:00+00:00', '{"platform": "EduNexus LMS v2", "verified": true}'::jsonb);
INSERT INTO public.engagement_events (id, student_id, event_type, title, description, duration_minutes, event_timestamp, metadata)
VALUES ('0d698f75-fa4b-4428-a421-98631d774b53', 'c6518feb-e30e-4c60-992b-7b67af2efe1a', 'library_visit', 'Reference Library Check-out', 'Logged participation for Akash.', 30, '2025-09-15 10:00:00+00:00', '{"platform": "EduNexus LMS v2", "verified": true}'::jsonb);
INSERT INTO public.engagement_events (id, student_id, event_type, title, description, duration_minutes, event_timestamp, metadata)
VALUES ('56981592-0472-413d-89e9-bcd4a4b389f9', 'c6518feb-e30e-4c60-992b-7b67af2efe1a', 'peer_study', 'Collaborative Group Study', 'Logged participation for Akash.', 60, '2025-09-09 16:00:00+00:00', '{"platform": "EduNexus LMS v2", "verified": true}'::jsonb);
INSERT INTO public.engagement_events (id, student_id, event_type, title, description, duration_minutes, event_timestamp, metadata)
VALUES ('15cd3358-c768-4c66-9c2f-77a396254f7a', 'c6518feb-e30e-4c60-992b-7b67af2efe1a', 'workshop', 'Career & Study Skills Workshop', 'Logged participation for Akash.', 90, '2025-09-08 11:00:00+00:00', '{"platform": "EduNexus LMS v2", "verified": true}'::jsonb);
INSERT INTO public.engagement_events (id, student_id, event_type, title, description, duration_minutes, event_timestamp, metadata)
VALUES ('ca845aff-db02-4227-8056-41420d90138b', 'e3f1d90f-85ed-4367-a618-8604c886458e', 'lms_login', 'Portal Study Session', 'Logged participation for Tara.', 45, '2025-09-02 11:00:00+00:00', '{"platform": "EduNexus LMS v2", "verified": true}'::jsonb);
INSERT INTO public.engagement_events (id, student_id, event_type, title, description, duration_minutes, event_timestamp, metadata)
VALUES ('d4ae4458-f40c-4e48-a6d3-a0c25990657e', 'e3f1d90f-85ed-4367-a618-8604c886458e', 'library_visit', 'Reference Library Check-out', 'Logged participation for Tara.', 30, '2025-09-23 14:00:00+00:00', '{"platform": "EduNexus LMS v2", "verified": true}'::jsonb);
INSERT INTO public.engagement_events (id, student_id, event_type, title, description, duration_minutes, event_timestamp, metadata)
VALUES ('90a76e02-e0c0-47fb-b3ec-91ce2e14f6ad', 'e3f1d90f-85ed-4367-a618-8604c886458e', 'peer_study', 'Collaborative Group Study', 'Logged participation for Tara.', 60, '2025-09-26 16:00:00+00:00', '{"platform": "EduNexus LMS v2", "verified": true}'::jsonb);
INSERT INTO public.engagement_events (id, student_id, event_type, title, description, duration_minutes, event_timestamp, metadata)
VALUES ('3354dc37-ac3e-4903-b011-ef2b8586049c', 'e3f1d90f-85ed-4367-a618-8604c886458e', 'workshop', 'Career & Study Skills Workshop', 'Logged participation for Tara.', 90, '2025-09-17 16:00:00+00:00', '{"platform": "EduNexus LMS v2", "verified": true}'::jsonb);
INSERT INTO public.engagement_events (id, student_id, event_type, title, description, duration_minutes, event_timestamp, metadata)
VALUES ('1f694edf-d663-43c7-b168-bd70bf9df59d', 'b0d23702-e1d5-4b0a-9bdb-13a4c496dfba', 'lms_login', 'Portal Study Session', 'Logged participation for Gaurav.', 45, '2025-09-16 17:00:00+00:00', '{"platform": "EduNexus LMS v2", "verified": true}'::jsonb);
INSERT INTO public.engagement_events (id, student_id, event_type, title, description, duration_minutes, event_timestamp, metadata)
VALUES ('ea3b2c4c-6ee9-47a1-b801-051227f112cb', 'b0d23702-e1d5-4b0a-9bdb-13a4c496dfba', 'library_visit', 'Reference Library Check-out', 'Logged participation for Gaurav.', 30, '2025-09-13 14:00:00+00:00', '{"platform": "EduNexus LMS v2", "verified": true}'::jsonb);
INSERT INTO public.engagement_events (id, student_id, event_type, title, description, duration_minutes, event_timestamp, metadata)
VALUES ('fd47c513-1140-453d-998f-ea56e6974954', 'b0d23702-e1d5-4b0a-9bdb-13a4c496dfba', 'peer_study', 'Collaborative Group Study', 'Logged participation for Gaurav.', 60, '2025-09-06 16:00:00+00:00', '{"platform": "EduNexus LMS v2", "verified": true}'::jsonb);
INSERT INTO public.engagement_events (id, student_id, event_type, title, description, duration_minutes, event_timestamp, metadata)
VALUES ('2eb740fd-1603-4a53-a70c-1b4aa9e2e913', 'b0d23702-e1d5-4b0a-9bdb-13a4c496dfba', 'workshop', 'Career & Study Skills Workshop', 'Logged participation for Gaurav.', 90, '2025-09-18 14:00:00+00:00', '{"platform": "EduNexus LMS v2", "verified": true}'::jsonb);
INSERT INTO public.engagement_events (id, student_id, event_type, title, description, duration_minutes, event_timestamp, metadata)
VALUES ('14b6260b-80a6-4e62-b463-f5ca64c7717d', '82bf37fc-0077-4756-b27a-b23dd1d6ceaa', 'lms_login', 'Portal Study Session', 'Logged participation for Divya.', 45, '2025-09-06 15:00:00+00:00', '{"platform": "EduNexus LMS v2", "verified": true}'::jsonb);
INSERT INTO public.engagement_events (id, student_id, event_type, title, description, duration_minutes, event_timestamp, metadata)
VALUES ('1a383c24-b326-46c1-b510-413d116b55f6', '82bf37fc-0077-4756-b27a-b23dd1d6ceaa', 'library_visit', 'Reference Library Check-out', 'Logged participation for Divya.', 30, '2025-09-21 16:00:00+00:00', '{"platform": "EduNexus LMS v2", "verified": true}'::jsonb);
INSERT INTO public.engagement_events (id, student_id, event_type, title, description, duration_minutes, event_timestamp, metadata)
VALUES ('cdf815b6-7d07-4cb8-96ec-20014528edf1', '82bf37fc-0077-4756-b27a-b23dd1d6ceaa', 'peer_study', 'Collaborative Group Study', 'Logged participation for Divya.', 60, '2025-09-16 12:00:00+00:00', '{"platform": "EduNexus LMS v2", "verified": true}'::jsonb);
INSERT INTO public.engagement_events (id, student_id, event_type, title, description, duration_minutes, event_timestamp, metadata)
VALUES ('34f14f94-2a7f-43db-9208-0270c4bb3b63', '82bf37fc-0077-4756-b27a-b23dd1d6ceaa', 'workshop', 'Career & Study Skills Workshop', 'Logged participation for Divya.', 90, '2025-09-25 13:00:00+00:00', '{"platform": "EduNexus LMS v2", "verified": true}'::jsonb);
INSERT INTO public.engagement_events (id, student_id, event_type, title, description, duration_minutes, event_timestamp, metadata)
VALUES ('99ecb26c-d1b9-492d-a565-298e4e62fb51', 'cc13ac1f-cca4-4600-8dd7-f49f124c855d', 'lms_login', 'Portal Study Session', 'Logged participation for Dev.', 45, '2025-09-15 13:00:00+00:00', '{"platform": "EduNexus LMS v2", "verified": true}'::jsonb);
INSERT INTO public.engagement_events (id, student_id, event_type, title, description, duration_minutes, event_timestamp, metadata)
VALUES ('9acf289e-e0c6-4e2c-bc89-2a4653a5463a', 'cc13ac1f-cca4-4600-8dd7-f49f124c855d', 'library_visit', 'Reference Library Check-out', 'Logged participation for Dev.', 30, '2025-09-11 13:00:00+00:00', '{"platform": "EduNexus LMS v2", "verified": true}'::jsonb);
INSERT INTO public.engagement_events (id, student_id, event_type, title, description, duration_minutes, event_timestamp, metadata)
VALUES ('f59ebdfb-fbf2-448d-8032-d743e7fa2197', 'cc13ac1f-cca4-4600-8dd7-f49f124c855d', 'peer_study', 'Collaborative Group Study', 'Logged participation for Dev.', 60, '2025-09-19 09:00:00+00:00', '{"platform": "EduNexus LMS v2", "verified": true}'::jsonb);
INSERT INTO public.engagement_events (id, student_id, event_type, title, description, duration_minutes, event_timestamp, metadata)
VALUES ('3f9ebaac-774a-463e-a541-1e91babb9f03', 'cc13ac1f-cca4-4600-8dd7-f49f124c855d', 'workshop', 'Career & Study Skills Workshop', 'Logged participation for Dev.', 90, '2025-09-09 14:00:00+00:00', '{"platform": "EduNexus LMS v2", "verified": true}'::jsonb);
INSERT INTO public.engagement_events (id, student_id, event_type, title, description, duration_minutes, event_timestamp, metadata)
VALUES ('dc1da70e-7703-4615-978f-fa434cb6caef', '338719c7-39d7-4471-919b-13bd4ab61261', 'lms_login', 'Portal Study Session', 'Logged participation for Ira.', 45, '2025-09-09 09:00:00+00:00', '{"platform": "EduNexus LMS v2", "verified": true}'::jsonb);
INSERT INTO public.engagement_events (id, student_id, event_type, title, description, duration_minutes, event_timestamp, metadata)
VALUES ('45b1b8db-82b6-45c9-a0d7-647471898d2a', '338719c7-39d7-4471-919b-13bd4ab61261', 'library_visit', 'Reference Library Check-out', 'Logged participation for Ira.', 30, '2025-09-24 12:00:00+00:00', '{"platform": "EduNexus LMS v2", "verified": true}'::jsonb);
INSERT INTO public.engagement_events (id, student_id, event_type, title, description, duration_minutes, event_timestamp, metadata)
VALUES ('7872b867-0ee8-43ff-b296-ab2b4b730a70', '338719c7-39d7-4471-919b-13bd4ab61261', 'peer_study', 'Collaborative Group Study', 'Logged participation for Ira.', 60, '2025-09-19 10:00:00+00:00', '{"platform": "EduNexus LMS v2", "verified": true}'::jsonb);
INSERT INTO public.engagement_events (id, student_id, event_type, title, description, duration_minutes, event_timestamp, metadata)
VALUES ('67ddafce-a705-4942-ab8b-e08b472deb64', '338719c7-39d7-4471-919b-13bd4ab61261', 'workshop', 'Career & Study Skills Workshop', 'Logged participation for Ira.', 90, '2025-09-02 15:00:00+00:00', '{"platform": "EduNexus LMS v2", "verified": true}'::jsonb);
INSERT INTO public.engagement_events (id, student_id, event_type, title, description, duration_minutes, event_timestamp, metadata)
VALUES ('c6330593-e7a3-4152-b344-43f416b45bfc', '6c1c4728-a4f1-4c03-bebb-a55afe559ac5', 'lms_login', 'Portal Study Session', 'Logged participation for Harsh.', 45, '2025-09-07 09:00:00+00:00', '{"platform": "EduNexus LMS v2", "verified": true}'::jsonb);
INSERT INTO public.engagement_events (id, student_id, event_type, title, description, duration_minutes, event_timestamp, metadata)
VALUES ('a9c7fcdc-ef8f-4e4c-b603-c481b0395b4b', '6c1c4728-a4f1-4c03-bebb-a55afe559ac5', 'library_visit', 'Reference Library Check-out', 'Logged participation for Harsh.', 30, '2025-09-05 17:00:00+00:00', '{"platform": "EduNexus LMS v2", "verified": true}'::jsonb);
INSERT INTO public.engagement_events (id, student_id, event_type, title, description, duration_minutes, event_timestamp, metadata)
VALUES ('36d4638b-3eda-45a6-9806-f347eaeaa60b', '6c1c4728-a4f1-4c03-bebb-a55afe559ac5', 'peer_study', 'Collaborative Group Study', 'Logged participation for Harsh.', 60, '2025-09-10 12:00:00+00:00', '{"platform": "EduNexus LMS v2", "verified": true}'::jsonb);
INSERT INTO public.engagement_events (id, student_id, event_type, title, description, duration_minutes, event_timestamp, metadata)
VALUES ('111f1975-96ca-47b2-9a7d-650f29b46167', '6c1c4728-a4f1-4c03-bebb-a55afe559ac5', 'workshop', 'Career & Study Skills Workshop', 'Logged participation for Harsh.', 90, '2025-09-27 14:00:00+00:00', '{"platform": "EduNexus LMS v2", "verified": true}'::jsonb);
INSERT INTO public.engagement_events (id, student_id, event_type, title, description, duration_minutes, event_timestamp, metadata)
VALUES ('cf555bd3-3db0-42c3-9a19-be0a02e7d4d8', '71149234-66ac-4fba-be76-07ea55d85ae9', 'lms_login', 'Portal Study Session', 'Logged participation for Aditi.', 45, '2025-09-01 12:00:00+00:00', '{"platform": "EduNexus LMS v2", "verified": true}'::jsonb);
INSERT INTO public.engagement_events (id, student_id, event_type, title, description, duration_minutes, event_timestamp, metadata)
VALUES ('8e9269e6-ed4f-4468-9d29-e59176d5c37b', '71149234-66ac-4fba-be76-07ea55d85ae9', 'library_visit', 'Reference Library Check-out', 'Logged participation for Aditi.', 30, '2025-09-07 10:00:00+00:00', '{"platform": "EduNexus LMS v2", "verified": true}'::jsonb);
INSERT INTO public.engagement_events (id, student_id, event_type, title, description, duration_minutes, event_timestamp, metadata)
VALUES ('220db211-5c76-47e7-a767-1b563a9ecfac', '71149234-66ac-4fba-be76-07ea55d85ae9', 'peer_study', 'Collaborative Group Study', 'Logged participation for Aditi.', 60, '2025-09-24 16:00:00+00:00', '{"platform": "EduNexus LMS v2", "verified": true}'::jsonb);
INSERT INTO public.engagement_events (id, student_id, event_type, title, description, duration_minutes, event_timestamp, metadata)
VALUES ('937f2211-e6f3-4ec8-accb-a8aa7d20301f', '71149234-66ac-4fba-be76-07ea55d85ae9', 'workshop', 'Career & Study Skills Workshop', 'Logged participation for Aditi.', 90, '2025-09-08 12:00:00+00:00', '{"platform": "EduNexus LMS v2", "verified": true}'::jsonb);
INSERT INTO public.engagement_events (id, student_id, event_type, title, description, duration_minutes, event_timestamp, metadata)
VALUES ('29f2c72f-b7d5-4236-91b0-d3172739a076', 'b2b2a424-b2a2-4cd8-8261-fa53cd7c6397', 'lms_login', 'Portal Study Session', 'Logged participation for Pranav.', 45, '2025-09-05 09:00:00+00:00', '{"platform": "EduNexus LMS v2", "verified": true}'::jsonb);
INSERT INTO public.engagement_events (id, student_id, event_type, title, description, duration_minutes, event_timestamp, metadata)
VALUES ('adc2d122-6bf8-41f5-96c4-f6e83ce0d5bd', 'b2b2a424-b2a2-4cd8-8261-fa53cd7c6397', 'library_visit', 'Reference Library Check-out', 'Logged participation for Pranav.', 30, '2025-09-07 17:00:00+00:00', '{"platform": "EduNexus LMS v2", "verified": true}'::jsonb);
INSERT INTO public.engagement_events (id, student_id, event_type, title, description, duration_minutes, event_timestamp, metadata)
VALUES ('5a5cd48b-8aab-4890-a7db-73cfc88fae2c', 'b2b2a424-b2a2-4cd8-8261-fa53cd7c6397', 'peer_study', 'Collaborative Group Study', 'Logged participation for Pranav.', 60, '2025-09-15 14:00:00+00:00', '{"platform": "EduNexus LMS v2", "verified": true}'::jsonb);
INSERT INTO public.engagement_events (id, student_id, event_type, title, description, duration_minutes, event_timestamp, metadata)
VALUES ('a4522a0d-d8d8-4068-b7ad-c34d44f63c7a', 'b2b2a424-b2a2-4cd8-8261-fa53cd7c6397', 'workshop', 'Career & Study Skills Workshop', 'Logged participation for Pranav.', 90, '2025-09-02 16:00:00+00:00', '{"platform": "EduNexus LMS v2", "verified": true}'::jsonb);
INSERT INTO public.engagement_events (id, student_id, event_type, title, description, duration_minutes, event_timestamp, metadata)
VALUES ('ed44227d-a017-4406-a43d-308555b67f20', '4e57e01c-8466-4ce3-b1f6-95cc2c119c64', 'lms_login', 'Portal Study Session', 'Logged participation for Zoya.', 45, '2025-09-07 11:00:00+00:00', '{"platform": "EduNexus LMS v2", "verified": true}'::jsonb);
INSERT INTO public.engagement_events (id, student_id, event_type, title, description, duration_minutes, event_timestamp, metadata)
VALUES ('9494c757-efd2-47d1-a9d2-536ccf8e4999', '4e57e01c-8466-4ce3-b1f6-95cc2c119c64', 'library_visit', 'Reference Library Check-out', 'Logged participation for Zoya.', 30, '2025-09-25 15:00:00+00:00', '{"platform": "EduNexus LMS v2", "verified": true}'::jsonb);
INSERT INTO public.engagement_events (id, student_id, event_type, title, description, duration_minutes, event_timestamp, metadata)
VALUES ('10be5f4b-492b-4616-9ee9-4d7147f1d5e5', '4e57e01c-8466-4ce3-b1f6-95cc2c119c64', 'peer_study', 'Collaborative Group Study', 'Logged participation for Zoya.', 60, '2025-09-03 13:00:00+00:00', '{"platform": "EduNexus LMS v2", "verified": true}'::jsonb);
INSERT INTO public.engagement_events (id, student_id, event_type, title, description, duration_minutes, event_timestamp, metadata)
VALUES ('5b27e67b-8d93-43c2-8b6f-4fe8babdf816', '4e57e01c-8466-4ce3-b1f6-95cc2c119c64', 'workshop', 'Career & Study Skills Workshop', 'Logged participation for Zoya.', 90, '2025-09-06 12:00:00+00:00', '{"platform": "EduNexus LMS v2", "verified": true}'::jsonb);

-- 5. Insert Interventions
INSERT INTO public.interventions (id, student_id, title, intervention_type, priority, status, description, goals, assigned_staff_name, start_date, target_completion_date, actual_completion_date, follow_up_date, notes)
VALUES ('cbc1f54d-f9a4-4789-933f-ef91512f821a', '0411a66b-943d-46d5-895d-28026b071aab', 'One-on-One Mathematics & STEM Tutoring — Aarav', 'academic_tutoring', 'high', 'completed', 'Personalized support strategy designed for Aarav Sharma.', 'Stabilize weekly attendance rate above 80% and reinforce fundamental problem solving.', 'Dr. Arvind Verma (Mathematics)', '2025-09-01', '2025-10-01', '2025-10-01', '2025-09-15', 'Action plan reviewed with student and guardian.');
INSERT INTO public.interventions (id, student_id, title, intervention_type, priority, status, description, goals, assigned_staff_name, start_date, target_completion_date, actual_completion_date, follow_up_date, notes)
VALUES ('a484e550-3d38-4220-89b3-2c92cdbef520', 'edd5c0e8-986a-4275-b213-362f1d2e2a5e', 'Punctuality & Morning Transit Counseling — Diya', 'attendance_counseling', 'urgent', 'completed', 'Personalized support strategy designed for Diya Patel.', 'Stabilize weekly attendance rate above 80% and reinforce fundamental problem solving.', 'Counselor Priya Nair (Student Support)', '2025-09-05', '2025-10-05', '2025-10-05', '2025-09-19', 'Action plan reviewed with student and guardian.');
INSERT INTO public.interventions (id, student_id, title, intervention_type, priority, status, description, goals, assigned_staff_name, start_date, target_completion_date, actual_completion_date, follow_up_date, notes)
VALUES ('239ba25b-4c62-4aae-9dc0-3cfd571e2f9f', '06088341-1830-40a1-b648-869368a12a82', 'Senior Student Cohort Mentorship — Rohan', 'peer_mentoring', 'medium', 'completed', 'Personalized support strategy designed for Rohan Mehta.', 'Stabilize weekly attendance rate above 80% and reinforce fundamental problem solving.', 'Prof. Sunita Rao (Science Dept)', '2025-09-09', '2025-10-09', '2025-10-09', '2025-09-23', 'Action plan reviewed with student and guardian.');
INSERT INTO public.interventions (id, student_id, title, intervention_type, priority, status, description, goals, assigned_staff_name, start_date, target_completion_date, actual_completion_date, follow_up_date, notes)
VALUES ('030f67fb-331d-4cf1-a4ee-27c761f64b0a', 'd8bcb8d5-c15c-421a-bc22-29148cd4eefc', 'Laboratory Block Reassignment — Ananya', 'schedule_adjustment', 'low', 'in_progress', 'Personalized support strategy designed for Ananya Iyer.', 'Stabilize weekly attendance rate above 80% and reinforce fundamental problem solving.', 'Advisor Rajesh Kulkarni (Grade Lead)', '2025-09-13', '2025-10-13', NULL, '2025-09-27', 'Action plan reviewed with student and guardian.');
INSERT INTO public.interventions (id, student_id, title, intervention_type, priority, status, description, goals, assigned_staff_name, start_date, target_completion_date, actual_completion_date, follow_up_date, notes)
VALUES ('f46d1816-1df2-41ba-8d62-2299ffcc7e99', '3f043811-1641-4ea6-a8b5-c0da39193232', 'Family Academic Partnership Check-in — Vikram', 'parental_engagement', 'high', 'in_progress', 'Personalized support strategy designed for Vikram Reddy.', 'Stabilize weekly attendance rate above 80% and reinforce fundamental problem solving.', 'Dr. Arvind Verma (Mathematics)', '2025-09-17', '2025-10-17', NULL, '2025-10-01', 'Action plan reviewed with student and guardian.');
INSERT INTO public.interventions (id, student_id, title, intervention_type, priority, status, description, goals, assigned_staff_name, start_date, target_completion_date, actual_completion_date, follow_up_date, notes)
VALUES ('bcb4f372-fc98-4526-a96d-15fdd35ac109', 'b208e78a-2f96-4e70-bc46-99e51f4d6543', 'Stress Management & Exam Preparation Session — Ishita', 'wellness_check', 'medium', 'in_progress', 'Personalized support strategy designed for Ishita Verma.', 'Stabilize weekly attendance rate above 80% and reinforce fundamental problem solving.', 'Counselor Priya Nair (Student Support)', '2025-09-21', '2025-10-21', NULL, '2025-10-05', 'Action plan reviewed with student and guardian.');
INSERT INTO public.interventions (id, student_id, title, intervention_type, priority, status, description, goals, assigned_staff_name, start_date, target_completion_date, actual_completion_date, follow_up_date, notes)
VALUES ('fdd36777-a9b1-4a11-bc82-4624d2b3ccb0', 'bef6289e-41de-428e-b7bf-13a855d6e54e', 'One-on-One Mathematics & STEM Tutoring — Kabir', 'academic_tutoring', 'high', 'planned', 'Personalized support strategy designed for Kabir Kapoor.', 'Stabilize weekly attendance rate above 80% and reinforce fundamental problem solving.', 'Prof. Sunita Rao (Science Dept)', '2025-09-25', '2025-10-25', NULL, '2025-10-09', 'Action plan reviewed with student and guardian.');
INSERT INTO public.interventions (id, student_id, title, intervention_type, priority, status, description, goals, assigned_staff_name, start_date, target_completion_date, actual_completion_date, follow_up_date, notes)
VALUES ('20e9533c-c9e5-4e82-92d0-49956659cb48', 'fef234a8-0c9c-468f-9383-f850a6082dc6', 'Punctuality & Morning Transit Counseling — Meera', 'attendance_counseling', 'urgent', 'planned', 'Personalized support strategy designed for Meera Nair.', 'Stabilize weekly attendance rate above 80% and reinforce fundamental problem solving.', 'Advisor Rajesh Kulkarni (Grade Lead)', '2025-09-29', '2025-10-29', NULL, '2025-10-13', 'Action plan reviewed with student and guardian.');

-- 6. Insert Intervention Outcomes
INSERT INTO public.intervention_outcomes (id, intervention_id, metric_name, baseline_value, post_value, target_value, measurement_date, outcome_status, evidence_notes, causation_disclaimer)
VALUES ('c480fac0-2a00-4570-b5fc-283bb7259e59', 'cbc1f54d-f9a4-4789-933f-ef91512f821a', 'mathematics_average_score', 54.0, 68.0, 80.0, '2025-09-22', 'improved', 'Observation shows upward trajectory for Aarav post-session.', 'Observed change reflects correlation during intervention interval; causal relationship not established without control study.');
INSERT INTO public.intervention_outcomes (id, intervention_id, metric_name, baseline_value, post_value, target_value, measurement_date, outcome_status, evidence_notes, causation_disclaimer)
VALUES ('92916f15-4b4a-4db8-a318-78e134cadcf4', 'a484e550-3d38-4220-89b3-2c92cdbef520', 'attendance_percentage', 64.0, 78.5, 80.0, '2025-09-26', 'improved', 'Observation shows upward trajectory for Diya post-session.', 'Observed change reflects correlation during intervention interval; causal relationship not established without control study.');
INSERT INTO public.intervention_outcomes (id, intervention_id, metric_name, baseline_value, post_value, target_value, measurement_date, outcome_status, evidence_notes, causation_disclaimer)
VALUES ('35a99467-0924-4ba9-bb5b-e2f4add7a58a', '239ba25b-4c62-4aae-9dc0-3cfd571e2f9f', 'mathematics_average_score', 54.0, 68.0, 80.0, '2025-09-30', 'improved', 'Observation shows upward trajectory for Rohan post-session.', 'Observed change reflects correlation during intervention interval; causal relationship not established without control study.');
INSERT INTO public.intervention_outcomes (id, intervention_id, metric_name, baseline_value, post_value, target_value, measurement_date, outcome_status, evidence_notes, causation_disclaimer)
VALUES ('d400845a-058b-4c9e-832c-58887a4eb683', '030f67fb-331d-4cf1-a4ee-27c761f64b0a', 'mathematics_average_score', 54.0, 68.0, 80.0, '2025-10-04', 'improved', 'Observation shows upward trajectory for Ananya post-session.', 'Observed change reflects correlation during intervention interval; causal relationship not established without control study.');
INSERT INTO public.intervention_outcomes (id, intervention_id, metric_name, baseline_value, post_value, target_value, measurement_date, outcome_status, evidence_notes, causation_disclaimer)
VALUES ('04dcce00-3d6b-4956-86d2-5345aca8b852', 'f46d1816-1df2-41ba-8d62-2299ffcc7e99', 'mathematics_average_score', 54.0, 68.0, 80.0, '2025-10-08', 'improved', 'Observation shows upward trajectory for Vikram post-session.', 'Observed change reflects correlation during intervention interval; causal relationship not established without control study.');
INSERT INTO public.intervention_outcomes (id, intervention_id, metric_name, baseline_value, post_value, target_value, measurement_date, outcome_status, evidence_notes, causation_disclaimer)
VALUES ('16a48075-544b-4b12-a917-5788e1d53dcb', 'bcb4f372-fc98-4526-a96d-15fdd35ac109', 'mathematics_average_score', 54.0, 68.0, 80.0, '2025-10-12', 'improved', 'Observation shows upward trajectory for Ishita post-session.', 'Observed change reflects correlation during intervention interval; causal relationship not established without control study.');

