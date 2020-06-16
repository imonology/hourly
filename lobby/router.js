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
				path: '/info',
				redirect: '/info',
				name: '基本資料',
				meta: {
					title: '基本資料',
					icon: 'info',
				},
				children: [
					{
						path: 'create',
						name: '填寫基本資料',
						type: 'create',
						meta: {
							title: '填寫基本資料',
							icon: 'user',
						},
					},
					{
						path: 'list',
						name: '基本資料清單',
						type: 'list',
						props: {
							edit: true,
						},
						meta: {
							title: '基本資料清單',
							icon: 'edit',
						},
					},
				],
			},
			{
				path: '/green_cert',
				redirect: '/green_cert',
				name: '簽核系統',
				meta: {
					title: '簽核系統',
					icon: 'green_cert',
				},
				children: [
					{
						path: 'create',
						name: '建立表單',
						type: 'flow_create',
						meta: {
							title: '簽核系統',
							icon: 'create',
						},
						roles: ['user'],
					},
					{
						path: 'pending',
						name: '待處理',
						type: 'flow_pending',
						meta: {
							title: '待處理',
							icon: 'pending',
							type: 'pending',
							roles: ['manager', 'c'],
						},
					},
					{
						path: 'done',
						name: '已結案',
						type: 'flow_done',
						meta: {
							title: '已結案',
							icon: 'done',
							type: 'done',
							roles: ['manager', 'c'],
						},
					},
				],
			},
			{
				path: '/multi_form_flow',
				redirect: '/multi_form_flow',
				name: '多表單簽合系統',
				meta: {
					title: '多表單簽合系統',
					icon: 'multi_form_flow',
				},
				children: [
					{
						path: 'create',
						name: '建立表單',
						type: 'flow_create',
						meta: {
							title: '案件新增',
							icon: 'create',
							type: 'create',
							flow_name: 'multi_form_flow',
							roles: ['user'],
						},
					},
					{
						path: 'pending',
						name: '待處理',
						type: 'flow_pending',
						meta: {
							title: '待處理',
							icon: 'pending',
							type: 'pending',
							flow_name: 'multi_form_flow',
							roles: ['manager', 'c'],
						},
					},
					{
						path: 'processed',
						name: '簽核中',
						type: 'flow_processed',
						meta: {
							title: '簽核中',
							icon: 'processed',
							type: 'processed',
							flow_name: 'multi_form_flow',
							roles: ['manager', 'c'],
						},
					},
					{
						path: 'done',
						name: '已結案',
						type: 'flow_done',
						meta: {
							title: '已結案',
							icon: 'done',
							type: 'done',
							roles: ['manager', 'c'],
						},
					},
				],
			},
			{
				path: '/flow_list',
				redirect: '/flow_list',
				name: '已申請表單',
				meta: {
					title: '已申請表單',
					icon: 'flow_list',
				},
				children: [
					{
						path: 'list',
						name: '已申請表單',
						type: 'flow_user',
						meta: {
							title: '已申請表單',
							icon: 'list',
							roles: ['user'],
						},
					},
				],
			},
			{
				path: '/create_flow',
				name: '建立表單',
				type: 'flow_create',
				hidden: true,
				meta: {
					type: 'create',
					flow_name: 'multi_form_flow',
				},
			},
			{
				path: '/sample',
				name: 'sample',
				hidden: true,
				type: 'create',
				meta: {
					schemaUrl: '/api/document/schema',
					submitUrl: '/api/document',
				},
			},
		];
		res.send(menu);
	});
};
