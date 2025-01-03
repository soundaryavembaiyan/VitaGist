import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Injectable, EventEmitter } from '@angular/core';
import { catchError } from 'rxjs';
import { environment } from 'src/environments/environment';
import { Router } from '@angular/router';

@Injectable({
	providedIn: 'root'
})
export class UsersDataService {
	upload_image(formData: FormData) {
		throw new Error('Method not implemented.');
	}
	get_tags(tag: any, any: any) {
		throw new Error('Method not implemented.');
	}
	splice(doc: any) {
		throw new Error('Method not implemented.');
	}
	deleteItem(index_country: any, type: any) {
		throw new Error('Method not implemented.');
	}
	delete_row(index_country: any) {
		throw new Error('Method not implemented.');
	}
	update_dialog(value: any) {
		throw new Error('Method not implemented.');
	}
	value: any;
	valid: any;

	constructor(private http: HttpClient, private router: Router) { }

	//Register
	register_profile(profile: any) {
		return this.http.post(`${environment.digicofferurl}register`, profile
		)
	}

	//Login
	login_sign(data: any) {
		return this.http.post(`${environment.digicofferurl}login`, data
		)
	}

	//Home API(relationships)
	get_home(data: any) {
		//https://apidev1.digicoffer.com/cors/consumer/relationships
		return this.http.get(`${environment.digicofferurl}relationships`, {

			headers: new HttpHeaders({
				"Authorization": "Bearer " + localStorage.getItem('TOKEN')
			})
		})
	}
	//Open document card API
	get_document_page(tag: any) {
		return this.http.get(`${environment.digicofferurl}all/citizenship`, {
			headers: new HttpHeaders({
				"Authorization": "Bearer " + localStorage.getItem('TOKEN')
			})
		}
		)
	}

	//Identity document API
	get_document(tag: any) {
		// Identity - https://apidev1.digicoffer.com/cors/consumer/identity/citizen_primary
		return this.http.get(`${environment.digicofferurl}identity/citizen_primary`, {
			headers: new HttpHeaders({
				"Authorization": "Bearer " + localStorage.getItem('TOKEN')
			})
		}
		)
	}

	//API docs - Health, L&F, Personal, Others
	get_tag_doc(tag: any) {
		//Health - https://apidev1.digicoffer.com/cors/consumer/personal/tagged/citizen_primary/Health
		return this.http.get(`${environment.digicofferurl}personal/tagged/citizen_primary/${tag}`, {
			headers: new HttpHeaders({
				"Authorization": "Bearer " + localStorage.getItem('TOKEN')
			})
		})
	}

	//Get credentials for Identity
	get_crediential_docs(country: any) {
		return this.http.get(`${environment.digicofferurl}identity/${country}`, {
			headers: new HttpHeaders({
				"Authorization": "Bearer " + localStorage.getItem('TOKEN') + " " + localStorage.getItem('PK')
			})
		})
	}

	//Delete action -Identity
	//https://apidev1.digicoffer.com/cors/consumer/identity/citizen_primary/null/delete
	delete_api(type: any) {
		return this.http.delete(`${environment.digicofferurl}identity/citizen_primary/${type}/delete`, {
			headers: new HttpHeaders({
				"Authorization": "Bearer " + localStorage.getItem('TOKEN')
			})
		})
	}

	//Get credentials for All others
	get_all_del(name: any) {
		return this.http.get(`${environment.digicofferurl}personal/tagged/citizen_primary/${name}`, {
			headers: new HttpHeaders({
				"Authorization": "Bearer " + localStorage.getItem('TOKEN') + " " + localStorage.getItem('PK')
			})
		})
	}

	//Delete action -All
	delete_personal_api(id: any) {
		return this.http.delete(`${environment.digicofferurl}personal/citizen_primary/${id}/delete`,
			{
				headers: new HttpHeaders({
					"Authorization": "Bearer " + localStorage.getItem('TOKEN')
				})
			})
	}

	//View action
	view_docs(category: any, name: any) {
		return this.http.get(`${environment.digicofferurl}identity/${category}/${name}/view`, {
			headers: new HttpHeaders({
				"Authorization": "Bearer " + localStorage.getItem('TOKEN') + " " + localStorage.getItem('PK')
			})
		})
	}

	//Edit action
	edit_docs(category: any, type: any, data: any) {
		return this.http.put(`${environment.digicofferurl}identity/${category}/${type}/update`, data, {
			headers: new HttpHeaders({
				"Authorization": "Bearer " + localStorage.getItem('TOKEN') + " " + localStorage.getItem('PK')
			})
		})
	}

	//Edit action
	edit_personal(id: any, data: any) {
		// https://apidev1.digicoffer.com/cors/consumer/personal/citizen_primary/62de78cc6cc7d07641a41bec/update
		return this.http.put(`${environment.digicofferurl}personal/citizen_primary/${id}/update`, data, {
			headers: new HttpHeaders({
				"Authorization": "Bearer " + localStorage.getItem('TOKEN')
			})
		})
	}

	download_credentials(category: any, doctype: any) {
		return this.http.get(`${environment.digicofferurl}/identity/${category}/${doctype}/download`, {
			headers: new HttpHeaders({
				"Authorization": "Bearer " + localStorage.getItem('TOKEN') + " " + localStorage.getItem('PK')
			})
		})
	}

	download_personal(id: any, category: any) {
		return this.http.get(`${environment.digicofferurl}/personal/${category}/${id}/download`, {
			headers: new HttpHeaders({
				"Authorization": "Bearer " + localStorage.getItem('TOKEN') + " " + localStorage.getItem('PK')
			})
		})

	}

	//Upload (add)
	add_dialog(data: any) {
		return this.http.post(`${environment.digicofferurl}identity/citizen_primary/add`, data, {
			headers: new HttpHeaders({
				"Authorization": "Bearer " + localStorage.getItem('TOKEN')
			})
		})
	}


	//Upload (add)
	add_dialog_personal(data: any) {
		//https://apidev1.digicoffer.com/cors/consumer/personal/citizen_primary/add
		return this.http.post(`${environment.digicofferurl}personal/citizen_primary/add`, data, {
			headers: new HttpHeaders({
				"Authorization": "Bearer " + localStorage.getItem('TOKEN')
			})
		})
	}

	//profile page
	get_profile_sign() {
		return this.http.get(`${environment.digicofferurl}profile`, {
			headers: new HttpHeaders({
				"Authorization": "Bearer " + localStorage.getItem('TOKEN')
			})
		})
	}

	update_profile(data: any) {
		return this.http.put(`${environment.digicofferurl}profile`, data, {
			headers: new HttpHeaders({
				"Authorization": "Bearer " + localStorage.getItem('TOKEN')
			})
		}
		)
	}

	update_digicoffer_profile(data: any) {
		return this.http.put(`${environment.digicofferurl}profile/update`, data, {
			headers: new HttpHeaders({
				"Authorization": "Bearer " + localStorage.getItem('TOKEN') + " " + localStorage.getItem('PK')
			})
		})

	}

	update_profile_lists(id: number, profile: any) {
		return this.http.patch(`${environment.vitacapeRestUrl}consumer/profile/${id}/`, profile, {
			headers: new HttpHeaders({
				"Authorization": "Bearer " + localStorage.getItem('TOKEN') + " " + localStorage.getItem('PK'),
				"Accept-Language": Intl.DateTimeFormat().resolvedOptions().timeZone
			})
		})
	}


	get_notifications() {
		return this.http.get(`${environment.digicofferurl}notifications`, {
			headers: new HttpHeaders({
				"Authorization": "Bearer " + localStorage.getItem('TOKEN') + " " + localStorage.getItem('PK')
			})
		})
	}

	read_notifications(id: any) {
		return this.http.put(`${environment.digicofferurl}notifications/read`, [id], {
			headers: new HttpHeaders({
				"Authorization": "Bearer " + localStorage.getItem('TOKEN') + " " + localStorage.getItem('PK')
			})
		})
	}

	delete_notifications(id: any) {
		return this.http.request('delete', `${environment.digicofferurl}notifications/delete`, {
			headers: new HttpHeaders({
				"Authorization": "Bearer " + localStorage.getItem('TOKEN') + " " + localStorage.getItem('PK')
			}),
			body: [id]
		})
	}



	get_audit() {
		return this.http.get(`${environment.digicofferurl}audit`, {
			headers: new HttpHeaders({
				"Authorization": "Bearer " + localStorage.getItem('TOKEN') + " " + localStorage.getItem('PK')
			})
		})
	}


	get_reminders() {
		return this.http.get(`${environment.digicofferurl}reminders`, {
			headers: new HttpHeaders({
				"Authorization": "Bearer " + localStorage.getItem('TOKEN') + " " + localStorage.getItem('PK')
			})
		})
	}

	add_reminders(message: any, target: any) {
		return this.http.post(`${environment.digicofferurl}reminders/add`, { message, target }, {
			headers: new HttpHeaders({
				"Authorization": "Bearer " + localStorage.getItem('TOKEN') + " " + localStorage.getItem('PK')
			})
		})
	}

	delete_reminders(id: any) {
		return this.http.delete(`${environment.digicofferurl}reminders/${id}/delete`, {
			headers: new HttpHeaders({
				"Authorization": "Bearer " + localStorage.getItem('TOKEN') + " " + localStorage.getItem('PK')
			})
		})
	}

	logout(data: any) {
		return this.http.post(`${environment.digicofferurl}logout`, {
			headers: new HttpHeaders({
				"Authorization": "Bearer "
			})
		})
	}

	//connection api
	get_connection() {
		return this.http.get(`${environment.digicofferurl}dummyrelation`, {
			headers: new HttpHeaders({
				"Authorization": "Bearer " + localStorage.getItem('TOKEN') + " " + localStorage.getItem('PK')
			})
		})
	}

	//selected tags of connection api
	get_relationship_bytag(tag: any) {
		return this.http.get(`${environment.digicofferurl}relationships/bytag/${tag}`, {
			headers: new HttpHeaders({
				"Authorization": "Bearer " + localStorage.getItem('TOKEN') + " " + localStorage.getItem('PK')
			})
		})
	}

	//entity api call
	relationship_list() {
		return this.http.get(`${environment.digicofferurl}sprelationship/search/entity`, {
			headers: new HttpHeaders({
				"Authorization": "Bearer " + localStorage.getItem('TOKEN')
			})
		})
	}

	//Entity Actions..
	add_entity(data: any) {
		return this.http.post(`${environment.digicofferurl}dummyrelation/create`, data, {
			headers: new HttpHeaders({
				"Authorization": "Bearer " + localStorage.getItem('TOKEN') + " " + localStorage.getItem('PK')
			})
		})
	}

	edit_entity(id: any, data: any) {
		return this.http.put(`${environment.digicofferurl}dummyrelation/update/${id}`, data, {
			headers: new HttpHeaders({
				"Authorization": "Bearer " + localStorage.getItem('TOKEN') + " " + localStorage.getItem('PK')
			})
		})
	}

	delete_entity(id: any) {
		return this.http.delete(`${environment.digicofferurl}dummyrelation/delete/${id}`, {
			headers: new HttpHeaders({
				"Authorization": "Bearer " + localStorage.getItem('TOKEN') + " " + localStorage.getItem('PK')
			})
		})
	}

	//relationship accept
	care_team_accept_request(id: any) {
		return this.http.post(`${environment.digicofferurl}sprelationship/${id}/accept`, { "response": "accept" }, {
			headers: new HttpHeaders({
				"Authorization": "Bearer " + localStorage.getItem('TOKEN')
			})
		})

	}

	//relationship accept
	service_provider_accept(entityId: any) {
		return this.http.put(`${environment.digicofferurl}relationships/${entityId}/confirm `, { field: "isaccepted", isaccepted: true }
			, {
				headers: new HttpHeaders({
					"Authorization": "Bearer " + localStorage.getItem('TOKEN')
				})
			})
	}

	//family & friends dialog box
	care_team_list_all() {
		return this.http.get(`${environment.digicofferurl}sprelationship/search/consumer`, {
			headers: new HttpHeaders({
				"Authorization": "Bearer " + localStorage.getItem('TOKEN')
			})
		})
	}

	care_team_send_request(description: any, consumerId: any) {
		return this.http.post(`${environment.digicofferurl}sprelationship/request/consumer`, { description, consumerId }, {
			headers: new HttpHeaders({
				"Authorization": "Bearer " + localStorage.getItem('TOKEN')
			})
		})
	}

	//Health - Get Common Care Plan..
	get_care_plan() {
		return this.http.get(`${environment.vitacapeRestUrl}consumer/careplanlist/`, {
			headers: new HttpHeaders({
				"Authorization": "Bearer " + localStorage.getItem('TOKEN') + " " + localStorage.getItem('PK')
			})
		})
	}

	// Get id from view care plans..
	get_care_plan_id(id: any) {
		return this.http.get(`${environment.vitacapeRestUrl}consumer/careplanlist/${id}/`, {
			headers: new HttpHeaders({
				"Authorization": "Bearer " + localStorage.getItem('TOKEN') + " " + localStorage.getItem('PK')
			})
		})
	}

	get_careplangoal(id: any) {
		return this.http.get(`${environment.vitacapeRestUrl}consumer/careplangoal/?planid=${id}`, {
			headers: new HttpHeaders({
				"Authorization": "Bearer " + localStorage.getItem('TOKEN') + " " + localStorage.getItem('PK'),

			})
		})

	}
	get_careplandiet(id: any) {
		return this.http.get(`${environment.vitacapeRestUrl}consumer/careplandiet/?planid=${id}`, {
			headers: new HttpHeaders({
				"Authorization": "Bearer " + localStorage.getItem('TOKEN') + " " + localStorage.getItem('PK'),

			})
		})

	}
	get_careplabexerice(id: any) {
		return this.http.get(`${environment.vitacapeRestUrl}consumer/careplanexercise/?planid=${id}`, {
			headers: new HttpHeaders({
				"Authorization": "Bearer " + localStorage.getItem('TOKEN') + " " + localStorage.getItem('PK'),

			})
		})

	}

	get_careplanschedule(id: any) {
		return this.http.get(`${environment.vitacapeRestUrl}consumer/careplanschedule/?planid=${id}`, {
			headers: new HttpHeaders({
				"Authorization": "Bearer " + localStorage.getItem('TOKEN') + " " + localStorage.getItem('PK')
			})
		})

	}

	//health info profile
	profile_details() {
		return this.http.get(`${environment.vitacapeRestUrl}consumer/profile/`, {
			headers: new HttpHeaders({
				"Authorization": "Bearer " + localStorage.getItem('TOKEN') + " " + localStorage.getItem('PK')
			})
		})
	}

	get_questions(id: any) {
		return this.http.get(`${environment.vitacapeRestUrl}setting/careplanquestions/?planid=${id}`, {
			headers: new HttpHeaders({
				"Authorization": "Bearer " + localStorage.getItem('TOKEN')
			})
		})

	}

	add_careplan_exercise(data: any) {
		return this.http.post(`${environment.vitacapeRestUrl}consumer/careplanexercise/`, data, {
			headers: new HttpHeaders({
				"Authorization": "Bearer " + localStorage.getItem('TOKEN') + " " + localStorage.getItem('PK'),

			})
		})
	}

	get_ethnicity() {
		return this.http.get(`${environment.vitacapeRestUrl}setting/ethnicity/`, {
			headers: new HttpHeaders({
				"Authorization": "Bearer " + localStorage.getItem('TOKEN') + " " + localStorage.getItem('PK')

			})

		})
	}

	get_bloodgrps() {
		return this.http.get(`${environment.vitacapeRestUrl}setting/bloodgroup/`, {
			headers: new HttpHeaders({
				"Authorization": "Bearer " + localStorage.getItem('TOKEN') + " " + localStorage.getItem('PK')

			})

		})

	}

	get_digicoffer_profile() {
		return this.http.get(`${environment.vitacapeRestUrl}consumer/profile`, {
			headers: new HttpHeaders({
				"Authorization": "Bearer " + localStorage.getItem('TOKEN') + " " + localStorage.getItem('PK')
			})
		})

	}

	get_category(type: string) {
		return this.http.get(`${environment.vitacapeRestUrl}setting/categories/?type=${type}`, {
			headers: new HttpHeaders({
				"Authorization": "Bearer " + localStorage.getItem('TOKEN') + " " + localStorage.getItem('PK')
			})
		})

	}

	update_careplan_exercise(data: any, id: any) {
		return this.http.patch(`${environment.vitacapeRestUrl}consumer/careplanexercise/${id}/`, data, {
			headers: new HttpHeaders({
				"Authorization": "Bearer " + localStorage.getItem('TOKEN') + " " + localStorage.getItem('PK')
			})
		})

	}

	delete_careplan_exercise(id: any) {
		return this.http.delete(`${environment.vitacapeRestUrl}consumer/careplanexercise/${id}/`, {
			headers: new HttpHeaders({
				"Authorization": "Bearer " + localStorage.getItem('TOKEN') + " " + localStorage.getItem('PK')
			})
		})
	}

	get_medical_condition() {
		return this.http.get(`${environment.vitacapeRestUrl}setting/medicalcondition/`, {
			headers: new HttpHeaders({
				"Authorization": "Bearer " + localStorage.getItem('TOKEN') + " " + localStorage.getItem('PK')

			})

		})
	}

	get_vaccine_list() {
		return this.http.get(`${environment.vitacapeRestUrl}setting/vaccine/`, {
			headers: new HttpHeaders({
				"Authorization": "Bearer " + localStorage.getItem('TOKEN') + " " + localStorage.getItem('PK')

			})

		})

	}

	get_allergic_reaction() {
		return this.http.get(`${environment.vitacapeRestUrl}setting/allergicreaction/`, {
			headers: new HttpHeaders({
				"Authorization": "Bearer " + localStorage.getItem('TOKEN') + " " + localStorage.getItem('PK')

			})

		})

	}

	update_profile_list(id: any, profile: any) {
		return this.http.patch(`${environment.vitacapeRestUrl}consumer/profile/${id}/`, profile, {
			headers: new HttpHeaders({
				"Authorization": "Bearer " + localStorage.getItem('TOKEN') + " " + localStorage.getItem('PK'),
				"Accept-Language": Intl.DateTimeFormat().resolvedOptions().timeZone
			})
		})
	}


	//Devices..
	device_list() {
		return this.http.get(`${environment.vitacapeRestUrl}consumer/device/`, {
			headers: new HttpHeaders({
				"Authorization": "Bearer " + localStorage.getItem('TOKEN') + " " + localStorage.getItem('PK')
			})
		})
	}
	//Device Reading..
	device_reading() {
		return this.http.get(`${environment.vitacapeRestUrl}consumer/devicereading/`, {
			headers: new HttpHeaders({
				"Authorization": "Bearer " + localStorage.getItem('TOKEN') + " " + localStorage.getItem('PK')
			})
		})
	}

	//Device Type..
	healthy_range() {
		return this.http.get(`${environment.vitacapeRestUrl}setting/deviceType/`, {
			headers: new HttpHeaders({
				"Authorization": "Bearer " + localStorage.getItem('TOKEN') + " " + localStorage.getItem('PK')
			})
		})
	}

	get_diet_status(date: any) {
		return this.http.get(`${environment.vitacapeRestUrl}consumer/dietstatus/?date=${date}`, {
			headers: new HttpHeaders({
				"Authorization": "Bearer " + localStorage.getItem('TOKEN') + " " + localStorage.getItem('PK')
			})
		})
	}
	get_exercise_status(date: any) {
		return this.http.get(`${environment.vitacapeRestUrl}consumer/exercisestatus/?date=${date}`, {
			headers: new HttpHeaders({
				"Authorization": "Bearer " + localStorage.getItem('TOKEN') + " " + localStorage.getItem('PK')
			})
		})

	}

	add_diet_reading(data: any) {
		return this.http.post(`${environment.vitacapeRestUrl}consumer/dietreading/`, data, {
			headers: new HttpHeaders({
				"Authorization": "Bearer " + localStorage.getItem('TOKEN') + " " + localStorage.getItem('PK'),
				"Accept-Language": Intl.DateTimeFormat().resolvedOptions().timeZone
			})
		})
	}

	get_activitylog_date(date: any) {
		return this.http.get(`${environment.vitacapeRestUrl}consumer/activitylog/?date=${date}`, {
			headers: new HttpHeaders({
				"Authorization": "Bearer " + localStorage.getItem('TOKEN') + " " + localStorage.getItem('PK')
			})
		})
	}

	add_new_device(name: any, category: any, serviceUid: any, manufacturer: any, systemId: any, modelNumber: any, serialNumber: any, isBLE: any, paired: any, status: any) {
		return this.http.post(`${environment.vitacapeRestUrl}consumer/device/`, { name, category, serviceUid, manufacturer, systemId, modelNumber, serialNumber, isBLE, paired, status }, {

			headers: new HttpHeaders({
				"Authorization": "Bearer " + localStorage.getItem('TOKEN') + " " + localStorage.getItem('PK')
			})
		})
	}

	delete_device(deviceId: any) {
		return this.http.patch(`${environment.vitacapeRestUrl}consumer/device/${deviceId}/`, { "isDeleted": true }, {
			headers: new HttpHeaders({
				"Authorization": "Bearer " + localStorage.getItem('TOKEN') + " " + localStorage.getItem('PK')
			})
		})
	}

	get_chartreading(device_id: any) {
		return this.http.get(`${environment.vitacapeRestUrl}consumer/devicereading/?devicetype=${device_id}&rows=10`, {
			headers: new HttpHeaders({
				"Authorization": "Bearer " + localStorage.getItem('TOKEN') + " " + localStorage.getItem('PK')
			})
		})
	}

	lastest_device_reading() {
		return this.http.get(`${environment.vitacapeRestUrl}consumer/devicelatestreading/`, {
			headers: new HttpHeaders({
				"Authorization": "Bearer " + localStorage.getItem('TOKEN') + " " + localStorage.getItem('PK')
			})
		})
	}

	get_tag_list(a: Number) {
		return this.http.get(`${environment.vitacapeRestUrl}setting/tags/?catid=${a}`, {
			headers: new HttpHeaders({
				"Authorization": "Bearer " + localStorage.getItem('TOKEN') + " " + localStorage.getItem('PK')
			})
		})
	}

	data_last_reading() {
		return this.http.get(`${environment.vitacapeRestUrl}consumer/devicelastreading/`, {
			headers: new HttpHeaders({
				"Authorization": "Bearer " + localStorage.getItem('TOKEN') + " " + localStorage.getItem('PK')
			})
		})
	}
	add_device_reading(device: any, sequence: any, readingDateTime: any, value1: any, value2: any, value3: any, valueUnit1: any, valueUnit2: any, valueUnit3: any, tag: any) {
		return this.http.post(`${environment.vitacapeRestUrl}consumer/devicereading/`, { device, sequence, readingDateTime, value1, value2, value3, valueUnit1, valueUnit2, valueUnit3, tag }, {
			headers: new HttpHeaders({
				"Authorization": "Bearer " + localStorage.getItem('TOKEN') + " " + localStorage.getItem('PK'),
				"Accept-Language": Intl.DateTimeFormat().resolvedOptions().timeZone
			})
		})
	}
	get_image(){
		return this.http.get(`${environment.digicofferurl}profile/pic`,{
			headers: new HttpHeaders({
				"Authorization": "Bearer " + localStorage.getItem('TOKEN')
			})
		}) 

	}	

	service_provider_list() {
		return this.http.get(`${environment.digicofferurl}relationships`, {
	
			headers: new HttpHeaders({
				"Authorization": "Bearer " + localStorage.getItem('TOKEN')
			})
		})
		.pipe(
			 catchError(err => {
				if(err.status == 401 || err.status == 403){
				  ////console.log("error => ",err.status)
				  this.router.navigate(['/login']);
				}
				return "error"
			  })
		)
	  }

	  notify_user_list(relId: any) {
		return this.http.get(`${environment.digicofferurl}relationships/${relId}/users/notify`, {
	
			headers: new HttpHeaders({
				"Authorization": "Bearer " + localStorage.getItem('TOKEN')
			})
		})
		.pipe(
			 catchError(err => {
				if(err.status == 401 || err.status == 403){
				 // //console.log("error => ",err.status)
				  this.router.navigate(['/login']);
				}
				return "error"
			  })
		)
	  }

	  forgot_password(email: string){
		return this.http.post(`${environment.digicofferurl}forgot/email`, {
		  email
		}, {observe: 'response'})
	  }
	

}
