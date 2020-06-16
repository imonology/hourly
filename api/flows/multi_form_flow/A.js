module.exports = {
	title: '建立表單',
	include_form: [
		{
			// include現有表單，只能在create時include
			form: 'info',
			account_field: 'account',
		},
	],

	auth: (groups, account_data, forms) => {
		console.log('不讓用不讓用');
		console.log('不讓用不讓用');
		console.log('不讓用不讓用');
		console.log('不讓用不讓用');
		return '不讓用';
	},
	// beforeUpdate: (forms) => {
	// 	console.log('處理forms');
	// 	console.log(forms);
	// 	return forms;
	// },
	field_control: [
		{
			group: 'admin',
			control: {
				shows: [
					'applicant',
					'item',
					'desc1',
					'desc2',
					'doc_name',
					'doc_choice',
					'doc_desc1',
					'file',
					'zipcode',
					'name',
					'sex',
					'address',
					'sub_data',
					'statement',
					'person_id',
					'data1',
					'data2',
					'boo',
					'boo2',
				], // 顯示的欄位
				hidden: [], // 和shows二選一
				lock: [], // 不可被修改的欄位
				unlock: [], // 跟lock二選一
			},
		},
		{
			group: 'user',
			control: {
				shows: [
					'applicant',
					'item',
					'desc1',
					'doc_name',
					'doc_choice',
					'doc_desc1',
					'file',
					'zipcode',
					'name',
					'sex',
					'address',
					'sub_data',
					'statement',
					'person_id',
				], // 顯示的欄位
				hidden: [], // 和shows二選一
				lock: [], // 不可被修改的欄位
				unlock: [], // 跟lock二選一
			},
		},
	],

	option: ['申請'], // 審核者選項

	goto: 'B',
};
