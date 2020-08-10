var l_cache = SR.State.get('cache');

// language setting
var l_lang = require('./language')('english');

SR.Callback.onStart(function () { });

var l_form = SR.State.get('FlexFormMap');
var l_accounts;

SR.Callback.onStart(function () {
	l_form = SR.State.get('FlexFormMap');
	l_accounts = SR.State.get('_accountMap');

	// check if our form exists or create one if not
	LOG.warn('l_form size: ' + Object.keys(l_form).length);
});

// get session value based on request object's cookie
// TODO: make this SR function?
var l_getSession = function (req) {
	var cookie = SR.REST.getCookie(req.headers.cookie);
	var session = SR.EventManager.getSession(cookie);
	return session;
};

// pass in request object, returns session data if logined, otherwise returns null
var l_checkLogin = function (req) {
	var session = l_getSession(req);
	if (session.hasOwnProperty('_user')) {
		var login = session._user;
		login.admin = session._user.account === 'admin';
		return login;
	}

	LOG.warn('user not yet logined...');
	return { control: { groups: [], permissions: [] } };
};

let time_calculation = function (start, end) {
	const hours = (end.getTime() - start.getTime())/3600000
	return (hours.toFixed(2))
}

let getWeekNumber = function(date) {
	let d = new Date(date)
    d = new Date(Date.UTC(d.getFullYear(), d.getMonth(), d.getDate()));
    d.setUTCDate(d.getUTCDate() + 4 - (d.getUTCDay()||7));
    // Get first day of year
    var yearStart = new Date(Date.UTC(d.getUTCFullYear(),0,1));
    // Calculate full weeks to nearest Thursday
    var weekNo = Math.ceil(( ( (d - yearStart) / 86400000) + 1)/7);
    // Return array of year and week number
	// console.log(weekNo)
    return {year: d.getUTCFullYear(), week: weekNo};
}
	
let isSameWeek = function(date1, date2) {
	let week1 = getWeekNumber(date1)
	let week2 = getWeekNumber(date2)
	if(week1.year === week2.year && week1.week === week2.week){
		return true
	}
	else {
		return false
	} 
}

let isSameMonth = function(date1, date2) {
	let month1 = new Date(date1)
	let month2 = new Date(date2)
	if(month1.getYear() == month2.getYear() && month1.getMonth() == month2.getMonth()) {
		return true
	}
	else {
		return false
	}
}

// let distinct = function(list) {
// 	let result = [];
// 	let map = new Map();
// 	for (const item of list) {
// 		if(!map.has(item.project)){
// 			map.set(item.project, true);    // set any value to Map
// 			result.push({
// 				project: item.project,
// 				member: item.member
// 			});
// 		}
// 	}
// 	return result
// }

module.exports = function (app) {
	app.get('/api/menu', (req, res) => {
		const menu = [
			{
				path: '/',
				redirect: '/dashboard',
				name: 'Home',
				hidden: true,
				children: [
					{
						path: 'dashboard',
					},
				],
			},
			// {
			// 	path: '/rate',
			// 	redirect: '/rate',
			// 	name: 'rate for role',
			// 	meta: {
			// 		title: 'Rate test',
			// 		icon: 'rate',
			// 	},
			// 	children: [
			// 		{
			// 			path: 'create',
			// 			name: 'set rate',
			// 			type: 'create',
			// 			meta: {
			// 				title: 'Set Rate',
			// 				icon: 'rate',
			// 				roles: [],
			// 			},
			// 		},
			// 		{
			// 			path: 'list',
			// 			name: 'get rate list',
			// 			type: 'list',
			// 			props: {
			// 				edit: true,
			// 			},
			// 			meta: {
			// 				title: 'Rate List',
			// 				icon: 'edit',
			// 				roles: ['client','pm','dev'],
			// 			},
			// 		},
			// 	],
			// },
			{
				path: '/project',
				redirect: '/project',
				name: 'project',
				meta: {
					title: 'Project',
					icon: 'project',
				},
				children: [
					{
						path: 'create',
						name: 'Create project',
						type: 'create',
						// props: {
						// 	edit: true,
						// },
						meta: {
							title: 'Create project',
							icon: 'edit',
							form_name: 'project',
							// isUpdate: false,
							roles: ['pm'],
							schemaUrl: '/api/project/schema',
						},
					},
					{
						path: 'list',
						name: 'Project list',
						type: 'list',
						props: {
							edit: true,
						},
						meta: {
							title: 'Project list',
							icon: 'edit',
							isUpdate: false,
							roles: ['pm', 'admin', 'client'],
							schemaUrl: '/api/project',
						},
					},
				],
			},
			{
				path: '/progress',
				redirect: '/progress',
				name: 'progress',
				meta: {
					title: 'Progress',
					icon: 'progress',
				},
				children: [
					{
						path: 'create',
						name: 'set tracking',
						type: 'create',
						props: {
							edit: true,
						},
						meta: {
							title: 'Set Track',
							icon: 'edit',
							form_name: 'progress',
							isUpdate: false,
							roles: ['developer', 'pm'],
							schemaUrl: '/api/progress/schema',
						},
					},
					{
						path: 'list',
						name: 'get track list',
						type: 'list',
						props: {
							edit: true,
						},
						meta: {
							title: 'Track List',
							icon: 'edit',
							roles: ['pm', 'admin', 'client', 'developer'],
							// extra_btn: [
							// 	{
							// 		name: 'check',
							// 		path: 'add_log',
							// 		para: ['boolean'], 
							// 	},
							// ],
							schemaUrl: '/api/progress',
							submitUrl: '/api/progress',
						},
					},
				],
			},
			{
				path: '/salary_filter',
				redirect: '/salary_filter',
				name: 'salary track',
				meta: {
					title: 'Salary Filter',
					icon: 'salary_filter',
				},
				children: [
					{
						path: 'create',
						name: 'Salary Filter',
						type: 'create',
						props: {
							edit: true,
						},
						meta: {
							title: 'Salary Filter',
							icon: 'edit',
							isUpdate: false,
							roles: ['admin'],
							submitUrl: '/api/salary_filter'
						},
					},
				],
			},

			{
				path: '/salary_sum_record',
				redirect: '/salary_sum_record',
				name: 'salary sum record',
				meta: {
					title: 'Salary Record',
					icon: 'salary_sum_record',
				},
				children: [
					// {
					// 	path: 'create',
					// 	name: 'set salary',
					// 	type: 'create',
					// 	props: {
					// 		edit: true,
					// 	},
					// 	meta: {
					// 		title: 'Set Salary',
					// 		icon: 'edit',
					// 		form_name: 'salary_sheet',
					// 		isUpdate: false,
					// 		roles: ['admin'],
					// 	},
					// },
					{
						path: 'list',
						name: 'get salary list',
						type: 'list',
						props: {
							edit: true,
						},
						meta: {
							title: 'Salary List',
							icon: 'edit',
							isUpdate: false,
							roles: ['admin'],
							// schemaUrl: '/api/salary_sum_record',
						},
					},
				],
			},
			// {
			// 	path: '/info',
			// 	redirect: '/info',
			// 	name: 'info',
			// 	meta: {
			// 		title: 'Basic info',
			// 		icon: 'basic info',
			// 	},
			// 	children: [
			// 		{
			// 			path: 'list',
			// 			name: 'Basic info list',
			// 			type: 'list',
			// 			props: {
			// 				edit: true,
			// 			},
			// 			meta: {
			// 				title: 'Basic info list',
			// 				icon: 'edit',
			// 				roles: ['pm'],
			// 				schemaUrl: '/api/info',
			// 				// submitUrl: '/api/info',
			// 			},
			// 		},
					// {
					// 	path: 'info',
					// 	name: 'Personal information',
					// 	type: 'create',
					// 	props: {
					// 		edit: true,
					// 	},
					// 	meta: {
					// 		title: 'Personal information',
					// 		icon: 'edit',
					// 		// roles: ['c1'], // 此處還需要修改，只能讓登入者看到自己的帳號，且不可刪除
					// 		/* IMPORTANT: update page needs to upgrade to newest version of flexform (aea2a846) to get this feature below! */
					// 		// schemaUrl: '/api/project',
					// 		// submitUrl: '/api/info',
					// 		roles: ['pm'],
					// 	},
					// },
			// 	],
			// },
			{
				path: '/hourly_rate',
				redirect: '/hourly_rate',
				name: 'Hourly Rate',
				meta: {
					title: 'Hourly rate',
					icon: 'hourly_rate',
				},
				children: [
					{
						path: 'create',
						name: 'Add Hourly Rate',
						type: 'create',
						meta: {
							title: 'Add Hourly Rate',
							icon: 'hourly_rate',
							roles: ['admin'],
						},
					},
					{
						path: 'list',
						name: 'Hourly Rate List',
						type: 'list',
						props: {
							edit: true,
						},
						meta: {
							title: 'Hourly Rate List',
							icon: 'edit',
							roles: ['admin'],
						},
					},
				],
			},
			{
				path: '/dev_cycles',
				redirect: '/dev_cycles',
				name: 'dev_cycles',
				meta: {
					title: 'Dev cycles',
					icon: 'Dev cycles',
				},
				children: [
					{
						path: 'create',
						name: 'Create cycle',
						type: 'create',
						props: {
							edit: true,
						},
						meta: {
							title: 'Create cycle',
							icon: 'edit',
							form_name: 'dev_cycles',
							isUpdate: false,
							roles: ['admin']
						},
					},
					{
						path: 'list',
						name: 'Dev cycles',
						type: 'list',
						props: {
							edit: true,
						},
						meta: {
							title: 'Dev cycles',
							icon: 'edit',
							roles: ['admin'],
						},
					},
				],
			},
			{
				path: '/organization',
				redirect: '/organization',
				name: 'organization',
				meta: {
					icon: 'Organization',
					title: 'Organization',
				},
				children: [
					{
						path: 'create',
						name: 'Create organization',
						type: 'create',
						props: {
							edit: true,
						},
						meta: {
							title: 'Organizaion',
							icon: 'edit',
							form_name: 'organization',
							roles: ['admin'],
						},
					},
					{
						path: 'list',
						name: 'Organization list',
						type: 'list',
						props: {
							edit: true,
						},
						meta: {
							title: 'Organizaion',
							icon: 'edit',
							roles: ['admin'],
						},
					},
				],
			}
		];
		res.send(menu);
	});

	app.post('/api/salary', (req, res, next) => {
		console.log(JSON.stringify(req.body))

		let p_controller = new SR.Flexform.controller('project')
		const found_account = l_checkLogin(req).account;
		p_controller.findOne({ query: { account: found_account } });
		
		if (Object.keys(p_controller.data.values).length === 0) {
			p_controller = JSON.parse(JSON.stringify(p_controller.find()));
			p_controller.data.values = {};
		}

		res.send(p_controller)
	})
	
	app.get('/api/progress', (req, res, next) => {
		let project = new SR.Flexform.controller('project');
		let progress = new SR.Flexform.controller('progress');
		let account = new SR.Flexform.controller('progress');
		
		const found_account = l_checkLogin(req).account;

		account.find().populated();
		
		let all_acc = account.data.fields[1].option;
		let acc_role = all_acc.find( ({ value }) => value === found_account ).roles[0];
		
		project.find({ query: {} });
		
		let member = {}
		for(let i in account.data.fields) {
			if(('model' in account.data.fields[i]) && account.data.fields[i].model === '_account'){
				for(let j in account.data.fields[i].option) {
					if(account.data.fields[i].option[j].value === found_account) {
						member = {
							value: account.data.fields[i].option[j].value,
							text: account.data.fields[i].option[j].text,
							roles: account.data.fields[i].option[j].roles[0],
						}
					}
				}
			}
		}
		console.log(member);
		
		let new_option = [];
		for (let i in project.data.values) {
			switch(acc_role){
				case 'developer':
					if(project.data.values[i].dev1 === found_account || project.data.values[i].dev2 === found_account || project.data.values[i].dev3 === found_account) {
						new_option.push({
							value: project.data.values[i].project_name,
							text: project.data.values[i].project_name,
						});
					};
					break;
				case 'pm' :
					if(project.data.values[i].pm === found_account) {
						new_option.push({
							value: project.data.values[i].project_name,
							text: project.data.values[i].project_name,
						});
					};
					break;
				case 'client': 
					if(project.data.values[i].client1 === found_account || project.data.values[i].client3 === found_account ) {
						new_option.push({
							value: project.data.values[i].project_name,
							text: project.data.values[i].project_name,
						});
					};
					break;
				default: 
					new_option.push({
						value: project.data.values[i].project_name,
						text: project.data.values[i].project_name,
					});
					break;
			}	
		}
		let project_list = new_option.map(x => x.value);
		if(member.roles === 'developer') {
			progress.find({ query: { project: project_list, member: found_account} });
		}
		else {
			progress.find({ query: { project: project_list }});
		}
				
		if(Object.keys(progress.data.values).length === 0) {
			progress = JSON.parse(JSON.stringify(progress.find()));
			progress.data.values = {};
		}
		
		for(let i in progress.data.fields) {
			if( progress.data.fields[i].id === 'project' ) {
				progress.data.fields[i].option = new_option;
			}
			if( progress.data.fields[i].id === 'Approve' && member.roles === 'pm' ) {
				progress.data.fields[i].show = true;
			}
			if( progress.data.fields[i].id === 'Approve' && member.roles != 'pm' ) {
				progress.data.fields[i].show = false;
			}
		}
		
		res.send(progress);
	})
	
	app.post('/api/progress', (req, res, next) => {
		let account = new SR.Flexform.controller('progress');
		let progress = new SR.Flexform.controller('progress');
		let salary_record = new SR.Flexform.controller('salary_sheet');
			
		const found_account = l_checkLogin(req).account;
		
		account.find().populated();
		progress.find();		

		let all_acc = account.data.fields[1].option;
		let acc_role = all_acc.find( ({value}) => value === found_account).roles[0];
		
		let member = {}
		for(let i in account.data.fields) {
			if(('model' in account.data.fields[i]) && account.data.fields[i].model === '_account'){
				for(let j in account.data.fields[i].option) {
					if(account.data.fields[i].option[j].value === found_account) {
						member = {
							value: account.data.fields[i].option[j].value,
							text: account.data.fields[i].option[j].text,
							roles: account.data.fields[i].option[j].roles[0],
						}
						if(account.data.fields[i].id === 'Approve' && member.roles === 'pm') {
							account.data.fields[i].show = true;
						}
					}
				}
			}
		}
		
		const submitData = req.body;
		// console.log('body' + submitData);
		submitData.member = found_account;
		progress.create(submitData);
		
		progress.find({query: { member: found_account }});
		console.log(JSON.stringify(progress.data));
		res.send(progress.data.values);
	})
	
	app.get('/api/progress/schema', (req, res, next) => {
		let project = new SR.Flexform.controller('project');
		let progress = new SR.Flexform.controller('progress');
		let account = new SR.Flexform.controller('progress');
		
		const found_account = l_checkLogin(req).account;

		account.find().populated();
		
		let all_acc = account.data.fields[1].option;
		let acc_role = all_acc.find( ({ value }) => value === found_account ).roles[0];
				
		project.find({ query: {} });		
		
		let member = {}
		for(let i in account.data.fields) {
			if(('model' in account.data.fields[i]) && account.data.fields[i].model === '_account'){
				for(let j in account.data.fields[i].option) {
					if(account.data.fields[i].option[j].value === found_account) {
						member = {
							value: account.data.fields[i].option[j].value,
							text: account.data.fields[i].option[j].text,
							roles: account.data.fields[i].option[j].roles[0],
						}
						if(account.data.fields[i].id === 'Approve' && member.roles === 'pm') {
							account.data.fields[i].show = true;
						}
					}
				}
			}
		}
		// console.log(member);
		
		let new_option = [];
		for (let i in project.data.values) {
			switch(acc_role){
				case 'developer':
					if(project.data.values[i].dev1 === found_account || project.data.values[i].dev2 === found_account || project.data.values[i].dev3 === found_account) {
						new_option.push({
							value: project.data.values[i].project_name,
							text: project.data.values[i].project_name,
						});
					};
					break;
				case 'pm' :
					if(project.data.values[i].pm === found_account) {
						new_option.push({
							value: project.data.values[i].project_name,
							text: project.data.values[i].project_name,
						});
					};
					break;
				case 'client': 
					if(project.data.values[i].client1 === found_account || project.data.values[i].client3 === found_account ) {
						new_option.push({
							value: project.data.values[i].project_name,
							text: project.data.values[i].project_name,
						});
					};
					break;
				default: 
					new_option.push({
						value: project.data.values[i].project_name,
						text: project.data.values[i].project_name,
					});
					break;
			}
		}
		let project_list = new_option.map(x => x.value);
		if(member.roles === 'developer') {
			progress.find({ query: { project: project_list, member: found_account} });
		}
		else {
			progress.find({ query: { project: project_list }});
		}
				
		if(Object.keys(progress.data.values).length === 0) {
			progress = JSON.parse(JSON.stringify(progress.find()));
			progress.data.values = {};
		}
		
		for(let i in progress.data.fields) {
			if( progress.data.fields[i].id === 'project') {
				progress.data.fields[i].option = new_option;
			}
			if( progress.data.fields[i].id === 'Approve' && member.roles === 'pm' ) {
				progress.data.fields[i].show = true;
			}
			if( progress.data.fields[i].id === 'Approve' && member.roles != 'pm' ) {
				progress.data.fields[i].show = false;
			}
		}
		
		res.send(progress);
	});

	app.get('/api/project/schema', (req, res, next) => {
		let p_controller = new SR.Flexform.controller('project')
		let d_controller = new SR.Flexform.controller('dev_cycles')
		let o_controller = new SR.Flexform.controller('organization')
		let account = new SR.Flexform.controller('project')
		
		const found_account = l_checkLogin(req).account;
		
		account.find().populated();
		let all_acc = account.data.fields[4].option;
		let login_acc = all_acc.find( ({ value }) => value === found_account );

		switch (login_acc.roles[0]) {
			case 'pm':
				p_controller.find({ query: { pm: found_account } });
				break;
			// case 'dev': 
			// 	p_controller.find({ query: { dev1: found_account }})
			default: 
				p_controller.find({ query: { } });
				break;
		}		
		o_controller.find({});
		d_controller.find({});
		
		for(let i in account.data.fields) {
			if('model' in account.data.fields[i]) {
				let new_option = [];
				for(let j in account.data.fields[i].option) {
					if(account.data.fields[i].desc === account.data.fields[i].option[j].roles[0]){
						new_option.push({
							value: account.data.fields[i].option[j].value,
							text: account.data.fields[i].option[j].text,
							roles: account.data.fields[i].option[j].roles[0],
						})
					}
				}
				account.data.fields[i].option = new_option;
			}
		}
			
		if (Object.keys(p_controller.data.values).length === 0) {
			p_controller = JSON.parse(JSON.stringify(p_controller.find()));
			p_controller.data.values = {};
		}
		
		let option = Object.keys(d_controller.data.values).map((elem, i, arr) => {
			return { text: d_controller.data.values[elem].applicant, value: elem }
		})
		let organization = Object.keys(o_controller.data.values).map((elem, i, arr) => {
			return { text: o_controller.data.values[elem].company_name, value: elem }
		})
		
		for (let i in p_controller.data.fields) {
			if(p_controller.data.fields[i].id === 'sub_dev_cycle' ){
				// p_controller.data.fields[i].fields.cycle.option = option
				p_controller.data.fields[i].option = option

			}
			if(p_controller.data.fields[i].id === 'organization' ){
				// p_controller.data.fields[i].fields.cycle.option = option
				p_controller.data.fields[i].option = organization

			}
		}

		res.send(p_controller);
	});
	
	app.get('/api/project', (req, res, next) => {
		let p_controller = new SR.Flexform.controller('project')
		let d_controller = new SR.Flexform.controller('dev_cycles')
		let o_controller = new SR.Flexform.controller('organization')
		let account = new SR.Flexform.controller('project')
		
		const found_account = l_checkLogin(req).account;
		
		account.find().populated();
		let all_acc = account.data.fields[4].option;
		let login_acc = all_acc.find( ({ value }) => value === found_account );

		switch (login_acc.roles[0]) {
			case 'pm':
				p_controller.find({ query: { pm: found_account } });
				break;
			// case 'dev': 
			// 	p_controller.find({ query: { dev1: found_account }})
			default: 
				p_controller.find({ query: { } });
				break;
		}
		o_controller.find({});
		d_controller.find({});
		
		for(let i in account.data.fields) {
			if('model' in account.data.fields[i]) {
				let new_option = [];
				for(let j in account.data.fields[i].option) {
					if(account.data.fields[i].desc === account.data.fields[i].option[j].roles[0]){
						new_option.push({
							value: account.data.fields[i].option[j].value,
							text: account.data.fields[i].option[j].text,
							roles: account.data.fields[i].option[j].roles[0],
						})
					}
				}
				account.data.fields[i].option = new_option;
			}
		}
			
		if (Object.keys(p_controller.data.values).length === 0) {
			p_controller = JSON.parse(JSON.stringify(p_controller.find()));
			p_controller.data.values = {};
		}
		
		let option = Object.keys(d_controller.data.values).map((elem, i, arr) => {
			return { text: d_controller.data.values[elem].applicant, value: elem }
		})
		let organization = Object.keys(o_controller.data.values).map((elem, i, arr) => {
			return { text: o_controller.data.values[elem].company_name, value: elem }
		})
		
		for (let i in p_controller.data.fields) {
			if(p_controller.data.fields[i].id === 'sub_dev_cycle' ){
				// p_controller.data.fields[i].fields.cycle.option = option
				p_controller.data.fields[i].option = option

			}
			if(p_controller.data.fields[i].id === 'organization' ){
				// p_controller.data.fields[i].fields.cycle.option = option
				p_controller.data.fields[i].option = organization

			}
		}

		for (let i in p_controller.data.fields) {
			if(p_controller.data.fields[i].id === 'sub_dev_cycle' ){
				// p_controller.data.fields[i].fields.cycle.option = option
				p_controller.data.fields[i].option = option
			}
		}
		res.send(p_controller);
	});

	app.get('/api/info', (req, res, next) => {
		let project = new SR.Flexform.controller('project');
		let account = new SR.Flexform.controller('_account');
		// let acc = Object.keys(account.data)[0];
		const found_account = l_checkLogin(req).account;
		console.log(found_account);
		
		account.findOne({ query: { account: found_account } });
		console.log('acc ' + Object.keys(account.data).length);
		
		res.send(account);
	});

	app.patch('/api/info', (req, res, next) => {
		let controller = new SR.Flexform.controller('info');

		const found_account = l_checkLogin(req).account;
		controller.findOne({ query: { account: found_account } });

		let record_id = Object.keys(controller.data.values)[0];

		const updateData = req.body;
		updateData.record_id = record_id;
		if (record_id) {
			controller.update(updateData);
		} else {
			updateData.values.account = found_account;
			controller.create(updateData.values).then;
		}
		res.send(controller);
	})
	
// 	app.get('/api/salary_sum_record', (req, res, next) => {
// 		// let salary_filter = new SR.Flexform.controller('salary_filter')
// 		let salary_sum_record = new SR.Flexform.controller('salary_sum_record')
// 		let project = new SR.Flexform.controller('project')
// 		let proj_list = []
		
// 		project.find()
// 		Object.keys(project.data.values).forEach(id => {
// 			proj_list.push(project.data.values[id].project_name)
// 		})
		
// 		console.log(proj_list)
// 		// salary_filter.find({query: {}})
		
// 		// Object.keys(salary_filter.data.values).forEach(id => {
// 		// 	console.log(JSON.stringify(salary_filter.data.values[id]))
// 		// 	if (salary_filter.data.values[id].sort_settings === 'dev') {
// 		// 		salary_sum_record.find({ query: {project: ''} });	
// 		// 	}
// 		// 	if (salary_filter.data.values[id].sort_settings === 'project') {
// 		// 		salary_sum_record.find({ query: {project: proj_list}});
// 		// 	}
// 		// })
// 		salary_sum_record.find({ query: {} });	
		
// 		res.send(salary_sum_record)
// 	})

	app.post('/api/salary_filter', (req, res, next) => {
		let filter = req.body
		let salary_filter = new SR.Flexform.controller('salary_filter')
		let progress = new SR.Flexform.controller('progress')
		let salary_sheet = new SR.Flexform.controller('salary_sheet')
		let salary_sum_record = new SR.Flexform.controller('salary_sum_record')
		let method = JSON.parse(JSON.stringify(l_accounts))
		let acc = [];
		let project = new SR.Flexform.controller('project')
		let proj_list = []
		
		//List project  
		project.find()
		Object.keys(project.data.values).forEach(id => {
			proj_list.push(project.data.values[id].project_name)
		})
		console.log(proj_list)
		
		//List developer account
		Object.keys(method).forEach(method_id => {
			if(method[method_id].control.groups[0] === "developer"){
				acc.push({
					member: method[method_id].account,
					role: method[method_id].control.groups[0],
				});
			}
		})
		
		progress.find({query: {member: acc.map(x => x.member), Approve: true}});
		
		let values = progress.data.values
		let pricing_method = 200 // TEST
		let workload = 0
		let salary = 0
		let salary_progress_record = {}
		let a = []
		let b = []
		
		//delete salary_sheet which progress have been removed
		salary_sheet.find({query: {}})
		Object.keys(salary_sheet.data.values).forEach(id => {
				a.push(salary_sheet.data.values[id].progress_id)
			})
		Object.keys(values).forEach(id => {
				b.push(id)
			})
		
		var difference = a.filter(x => b.indexOf(x) === -1);
		console.log(difference);
		
		salary_sheet.find({query: {progress_id: difference}})
		
		Object.keys(salary_sheet.data.values).forEach(id => {
			let obj = { 
				record_id: id
			}
			salary_sheet.destroy(obj)
		})
		
		//create salary_sheet from progress record that have been approved
		Object.keys(values).forEach(async id => {
			
			let time = time_calculation(
						new Date(values[id].Starting_time),
						new Date(values[id].End_time)
					)
			salary = (time * pricing_method)
			workload = time
			
			let role = acc.find(x => x.member === values[id].member).role
			
			salary_progress_record = {
					progress_id: id,
					project: values[id].project,
					identity: role,
					member: values[id].member,
					pricing_method: pricing_method,
					workload,
					salary,
					start_time: values[id].Starting_time,
					end_time: values[id].End_time,		
			}
					
			salary_sheet.findOne({query: {progress_id: id}});
			if(Object.keys(salary_sheet.data.values).length === 0) {
				await salary_sheet.create(salary_progress_record)		
			}
		})
	
		//delete previoud salary_filter and create new one 
		salary_filter.find({query: {}})
		Object.keys(salary_filter.data.values).forEach(id => {
				let obj = { 
					record_id: id
				}
				salary_filter.destroy(obj)
			})
		salary_filter.create(filter)
		
		//delete all past salary_sum_record
		salary_sum_record.find()
		Object.keys(salary_sum_record.data.values).forEach(id => {
				let obj = { 
					record_id: id
				}
				salary_sum_record.destroy(obj)
			})

		//create new salary_sum_record according to filter 
		salary_sheet.find({query: {}})
		console.log('salary_sheet' + JSON.stringify(salary_sheet))
		let salary_record = salary_sheet.data.values
		let sum_record = {}
		// let list = []
		
		if(filter.sort_settings === 'dev') {
			for (let i in acc) {
				let total_workload = 0
				let total_salary = 0
// 				Object.keys(salary_record).forEach(id => {
// 					list.push({
// 						project: salary_record[id].project,
// 						member: salary_record[id].member,
// 					})
// 				})

// 				list = distinct(list)			
				// if(filter.sort_settings === 'dev') {
					Object.keys(salary_record).forEach(id => {
						if(filter.time_setting === 'week') {
							if(isSameWeek(filter.choose_time, salary_record[id].start_time) === true || isSameWeek(filter.choose_time, salary_record[id].end_time) === true) {
								if(acc[i].member === salary_record[id].member) {
									total_workload += salary_record[id].workload
									total_salary += salary_record[id].salary
								}
							}
						}
						if(filter.time_setting === 'month') {
							if(isSameMonth(filter.choose_time, salary_record[id].start_time) === true || isSameWeek(filter.choose_time, salary_record[id].end_time) === true) {
								if(acc[i].member === salary_record[id].member) {
									total_workload += salary_record[id].workload
									total_salary += salary_record[id].salary
								}
							}
						}
					})
					sum_record = {
							project: '',
							member: acc[i].member,
							workload: total_workload,
							salary: total_salary,
							identity: acc.find(x => x.member === acc[i].member).role,
							pricing_method: pricing_method,

					}

					salary_sum_record.create(sum_record)
				// }
			}
		}
		
		
			if(filter.sort_settings === 'project') {
				for(var j in proj_list) {
					let total_workload_proj = 0
					let total_salary_proj = 0
					let project = undefined
					Object.keys(salary_record).forEach(id => {
						if(filter.time_setting === 'week') {
							if(isSameWeek(filter.choose_time, salary_record[id].start_time) === true || isSameWeek(filter.choose_time, salary_record[id].end_time) === true) {
									if(proj_list[j] === salary_record[id].project){
										total_workload_proj += salary_record[id].workload
										total_salary_proj += salary_record[id].salary
										project = salary_record[id].project
									}
							}
						}
						if(filter.time_setting === 'month') {
							if(isSameMonth(filter.choose_time, salary_record[id].start_time) === true || isSameWeek(filter.choose_time, salary_record[id].end_time) === true) {
									if(proj_list[j] === salary_record[id].project){
										total_workload_proj += salary_record[id].workload
										total_salary_proj += salary_record[id].salary
										project = salary_record[id].project
									}
							}
						}
					})
					
				sum_record = {
						project: proj_list[j],
						member: '',
						workload: total_workload_proj,
						salary: total_salary_proj,
						identity: '',
						pricing_method: pricing_method,
					}

				salary_sum_record.create(sum_record)
				}
			}			
		
		res.send(progress);
	})
};
