-- Profiles policies
CREATE POLICY "profiles_select_own" ON public.profiles FOR SELECT USING (auth.uid() = id);
CREATE POLICY "profiles_insert_own" ON public.profiles FOR INSERT WITH CHECK (auth.uid() = id);
CREATE POLICY "profiles_update_own" ON public.profiles FOR UPDATE USING (auth.uid() = id);

-- Clients policies - all authenticated users can access
CREATE POLICY "clients_select_all" ON public.clients FOR SELECT USING (auth.role() = 'authenticated');
CREATE POLICY "clients_insert_all" ON public.clients FOR INSERT WITH CHECK (auth.role() = 'authenticated');
CREATE POLICY "clients_update_all" ON public.clients FOR UPDATE USING (auth.role() = 'authenticated');
CREATE POLICY "clients_delete_all" ON public.clients FOR DELETE USING (auth.role() = 'authenticated');

-- Pets policies - all authenticated users can access
CREATE POLICY "pets_select_all" ON public.pets FOR SELECT USING (auth.role() = 'authenticated');
CREATE POLICY "pets_insert_all" ON public.pets FOR INSERT WITH CHECK (auth.role() = 'authenticated');
CREATE POLICY "pets_update_all" ON public.pets FOR UPDATE USING (auth.role() = 'authenticated');
CREATE POLICY "pets_delete_all" ON public.pets FOR DELETE USING (auth.role() = 'authenticated');

-- Medical records policies - all authenticated users can access
CREATE POLICY "medical_records_select_all" ON public.medical_records FOR SELECT USING (auth.role() = 'authenticated');
CREATE POLICY "medical_records_insert_all" ON public.medical_records FOR INSERT WITH CHECK (auth.role() = 'authenticated');
CREATE POLICY "medical_records_update_all" ON public.medical_records FOR UPDATE USING (auth.role() = 'authenticated');

-- Appointments policies - all authenticated users can access
CREATE POLICY "appointments_select_all" ON public.appointments FOR SELECT USING (auth.role() = 'authenticated');
CREATE POLICY "appointments_insert_all" ON public.appointments FOR INSERT WITH CHECK (auth.role() = 'authenticated');
CREATE POLICY "appointments_update_all" ON public.appointments FOR UPDATE USING (auth.role() = 'authenticated');
CREATE POLICY "appointments_delete_all" ON public.appointments FOR DELETE USING (auth.role() = 'authenticated');

-- Inventory policies - all authenticated users can access
CREATE POLICY "inventory_select_all" ON public.inventory FOR SELECT USING (auth.role() = 'authenticated');
CREATE POLICY "inventory_insert_all" ON public.inventory FOR INSERT WITH CHECK (auth.role() = 'authenticated');
CREATE POLICY "inventory_update_all" ON public.inventory FOR UPDATE USING (auth.role() = 'authenticated');

-- Inventory movements policies - all authenticated users can access
CREATE POLICY "inventory_movements_select_all" ON public.inventory_movements FOR SELECT USING (auth.role() = 'authenticated');
CREATE POLICY "inventory_movements_insert_all" ON public.inventory_movements FOR INSERT WITH CHECK (auth.role() = 'authenticated');

-- Services policies - all authenticated users can access
CREATE POLICY "services_select_all" ON public.services FOR SELECT USING (auth.role() = 'authenticated');
CREATE POLICY "services_insert_all" ON public.services FOR INSERT WITH CHECK (auth.role() = 'authenticated');
CREATE POLICY "services_update_all" ON public.services FOR UPDATE USING (auth.role() = 'authenticated');

-- Invoices policies - all authenticated users can access
CREATE POLICY "invoices_select_all" ON public.invoices FOR SELECT USING (auth.role() = 'authenticated');
CREATE POLICY "invoices_insert_all" ON public.invoices FOR INSERT WITH CHECK (auth.role() = 'authenticated');
CREATE POLICY "invoices_update_all" ON public.invoices FOR UPDATE USING (auth.role() = 'authenticated');

-- Invoice items policies - all authenticated users can access
CREATE POLICY "invoice_items_select_all" ON public.invoice_items FOR SELECT USING (auth.role() = 'authenticated');
CREATE POLICY "invoice_items_insert_all" ON public.invoice_items FOR INSERT WITH CHECK (auth.role() = 'authenticated');

-- Vaccinations policies - all authenticated users can access
CREATE POLICY "vaccinations_select_all" ON public.vaccinations FOR SELECT USING (auth.role() = 'authenticated');
CREATE POLICY "vaccinations_insert_all" ON public.vaccinations FOR INSERT WITH CHECK (auth.role() = 'authenticated');
CREATE POLICY "vaccinations_update_all" ON public.vaccinations FOR UPDATE USING (auth.role() = 'authenticated');
