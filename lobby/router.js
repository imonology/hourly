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
	return (end.getHours() + end.getMinutes() / 60) - (start.getHours() + start.getMinutes() / 60)
}

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
							roles: ['developer'],
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
							roles: ['pm', 'admin', 'client'],
							// extra_btn: [
							// 	{
							// 		name: 'check',
							// 		path: 'add_log',
							// 		para: ['boolean'], 
							// 	},
							// ],
						},
					},
				],
			},
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
						props: {
							edit: true,
						},
						meta: {
							title: 'Create project',
							icon: 'edit',
							form_name: 'project',
							isUpdate: false,
							roles: ['pm'],
							schemaUrl: '/api/project/schema'
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
							roles: ['pm', 'admin', 'client'],
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
				path: '/salary_sheet',
				redirect: '/salary_sheet',
				name: 'salary track',
				meta: {
					title: 'Salary',
					icon: 'salary_sheet',
				},
				children: [
					{
						path: 'create',
						name: 'set salary',
						type: 'create',
						props: {
							edit: true,
						},
						meta: {
							title: 'Set Salary',
							icon: 'edit',
							form_name: 'salary_sheet',
							isUpdate: false,
							roles: ['admin'],
						},
					},
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
							roles: ['admin'],
						},
					},
				],
			},
			{
				path: '/info',
				redirect: '/info',
				name: 'info',
				meta: {
					title: 'Basic info',
					icon: 'basic info',
				},
				children: [
					{
						path: 'list',
						name: 'Basic info list',
						type: 'list',
						props: {
							edit: true,
						},
						meta: {
							title: 'Basic info list',
							icon: 'edit',
							roles: ['admin'],
							schemaUrl: '/api/info',
							// submitUrl: '/api/info',
						},
					},
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
				],
			},
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
			// {
			// 	path: '/case',
			// 	redirect: '/case',
			// 	name: 'case',
			// 	meta: {
			// 		title: 'Case',
			// 		icon: 'case',
			// 	},
			// 	children: [
			// 		{
			// 			path: 'create',
			// 			name: 'Create case',
			// 			type: 'create',
			// 			props: {
			// 				edit: true,
			// 			},
			// 			meta: {
			// 				title: 'Create case',
			// 				icon: 'edit',
			// 				form_name: 'case',
			// 				isUpdate: false,
			// 				role: ['admin'],
			// 			},
			// 		},
			// 		{
			// 			path: 'list',
			// 			name: 'Case list',
			// 			type: 'list',
			// 			props: {
			// 				edit: true,
			// 			},
			// 			meta: {
			// 				title: 'Case list',
			// 				icon: 'edit',
			// 				roles: ['admin'],
			// 				extra_btn: [
			// 					{
			// 						name: 'New cycle',
			// 						button_name: 'Add',
			// 						path: 'add_cycles', // 後面加上的網址
			// 						para: ['record_id'], // 新增的參數
			// 					},
			// 				],
			// 			},
			// 		},
			// 	],
			// },
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

	app.get('/api/project/schema', (req, res, next) => {
		let p_controller = new SR.Flexform.controller('project')
		let d_controller = new SR.Flexform.controller('dev_cycles')

		const found_account = l_checkLogin(req).account;

		p_controller.findOne({ query: { account: found_account } });
		d_controller.find({ query: { account: found_account } });

		if (Object.keys(p_controller.data.values).length === 0) {
			p_controller = JSON.parse(JSON.stringify(p_controller.find()));
			p_controller.data.values = {};
		}

		let option = Object.keys(d_controller.data.values).map((elem, i, arr) => {
			return { text: d_controller.data.values[elem].applicant, value: elem }
		})

		p_controller.data.fields[2].fields.cycle.option = option

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
		// console.log('project ' + Object.keys(project.data.values)[0]);
		
		res.send(account);
	});
	
// 	app.get('/api/get_info', (req, res, next) => {
// 		let info = new SR.Flexform.controller('info');
// 		let project = new SR.Flexform.controller('project');
// 		let account = new SR.Flexform.controller('_account');
// 		const found_account = l_checkLogin(req).account;
// 		let proj = Object.keys(project.data.values)[0];
// 		let acc = Object.keys(account.data.values)[0];
// 		console.log('project ' + proj);
// 		console.log('account ' + acc);
// 		info.findOne({ query: { account: found_account } });
// 		// console.log(controller.findOne);
// 		console.log(info.data.values);
// 		if (Object.keys(info.data.values).length === 0) {
// 			console.log('AAAA');
// 			info = JSON.parse(JSON.stringify(info.find()));
// 			info.data.values = {};
// 		}
		

// 		res.send(info);
// 	});

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

	app.post('/api/salary_filter', (req, res, next) => {
		let filter = req.body
		let progress = new SR.Flexform.controller('progress')
		let salary_sheet = new SR.Flexform.controller('salary_sheet')
		let isDev = filter.sort_settings == "dev"
		let method = isDev ? JSON.parse(JSON.stringify(l_accounts)) :
			new SR.Flexform.controller('project').find().data.values

		Object.keys(method).forEach(method_id => {
			let body = {}

			if (isDev) {
				body.member = method[method_id].account
			} else {
				body.project = method[method_id].project_name
			}

			progress.find(
				{ query: body },
				{ with_fields: false }
			)

			let values = progress.data.values
			let pricing_method = 200 // TEST
			let workload = 0

			Object.keys(values).forEach(id => {
				console.log(values[id])
				let time = time_calculation(
					new Date(values[id].Starting_time),
					new Date(values[id].End_time)
				)
				workload += time
				console.log(time)
			})

			let salary = {
				project: isDev ? "" : method[method_id].project_name,
				identity: isDev ? method[method_id].control.groups[0] : "",
				member: isDev ? method[method_id].account : "",
				pricing_method: isDev ? pricing_method : "",
				workload,
				salary: workload * pricing_method,
			}

			salary_sheet.create(salary)
			res.sendStatus(200)
		})
	})
};
