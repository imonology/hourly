var l_cache = SR.State.get('cache');

// language setting
var l_lang = require('./language')('english');

SR.Callback.onStart(function () {});

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
			{
				path: '/rate',
				redirect: '/rate',
				name: 'rate for role',
				meta: {
					title: 'rate',
					icon: 'rate',
				},
				children: [
					{
						path: 'create',
						name: 'set rate',
						type: 'create',
						meta: {
							title: 'Set Rate',
							icon: 'rate',
							roles: ['admin'],
						},
					},
					{
						path: 'list',
						name: 'get rate list',
						type: 'list',
						props: {
							edit: true,
						},
						meta: {
							title: 'Rate List',
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
						},
					},
					{
						path: 'info',
						name: 'Personal information',
						type: 'update',
						props: {
							edit: true,
						},
						meta: {
							title: 'Personal information',
							icon: 'edit',
							// roles: ['c1'], // 此處還需要修改，只能讓登入者看到自己的帳號，且不可刪除
							/* IMPORTANT: update page needs to upgrade to newest version of flexform (aea2a846) to get this feature below! */
							schemaUrl: '/api/get_info',
							submitUrl: '/api/info',
						},
					},
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
						name: 'Write Hourly Rate',
						type: 'create',
						meta: {
							title: 'Write Hourly Rate',
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
				path: '/case',
				redirect: '/case',
				name: 'case',
				meta: {
					title: 'Case',
					icon: 'case',
				},
				children: [
					{
						path: 'create',
						name: 'Create case',
						type: 'update',
						props: {
							edit: true,
						},
						meta: {
							title: 'Create case',
							icon: 'edit',
							form_name: 'case',
							isUpdate: false,
						},
					},
					{
						path: 'list',
						name: 'Case list',
						type: 'list',
						props: {
							edit: true,
						},
						meta: {
							title: 'Case list',
							icon: 'edit',
							roles: ['admin', 'PM'],
							extra_btn: [
								{
									name: '新增開發週期',
									button_name: '新增',
									path: 'add_cycles', // 後面加上的網址
									para: ['record_id'], // 新增的參數
								},
							],
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
						type: 'update',
						props: {
							edit: true,
						},
						meta: {
							title: 'Create cycle',
							icon: 'edit',
							form_name: 'dev_cycles',
							isUpdate: false,
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
							roles: ['admin', 'PM'],
						},
					},
				],
			},
		];
		res.send(menu);
	});

	app.get('/api/get_info', (req, res, next) => {
		let controller = new SR.Flexform.controller('info');
		const found_account = l_checkLogin(req).account;

		controller.findOne({ query: { account: found_account } });

		if (Object.keys(controller.data.values).length === 0) {
			controller = JSON.parse(JSON.stringify(controller.find()));
			controller.data.values = {};
		}

		res.send(controller);
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
	});
};
