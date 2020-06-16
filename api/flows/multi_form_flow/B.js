module.exports = {
	title: '申請評估',
	header: [
		{
			field: 'applicant',
			label: '申請人',
		},
		{
			field: 'item',
			label: '申請的項目',
		},
	],

	// auth: ['manager'], // 可以修改
	auth: (groups, account_data, forms) => {
		return null;
	},
	view: ['user', 'c', 'admin'], // 可以看見
	userEdit: true,

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
		'data3',
		'boo',
		'boo2',
	], // 顯示的欄位
	hidden: [], // 和shows二選一
	lock: [], // 不可被修改的欄位
	unlock: [
		'desc2',
		'doc_desc1',
		'zipcode',
		'item',
		'choice',
		'file',
		'sub_data',
		'address',
		'person_id',
	], // 跟lock二選一

	option: ['通過', '前往B2', '取消'], // 審核者選項

	// appoint: { // 顯示指派選項，可依照指定的groups顯示下拉選單，可複選
	// 	groups: [{
	// 		value: 'manager',
	// 		label: '管理者',
	// 	}, {
	// 		value: 'c',
	// 		label: 'C'
	// 	}],
	// 	handler: 'observer1'
	// },
	// appoint: {
	// 	condition: (account_groups, account_data, forms) => {
	// 		// console.log('審核appoint');
	// 		// console.log('forms');
	// 		// console.log(forms);
	// 		if (account_groups.indexOf('manager') !== -1) {
	// 			return true;
	// 		} else {
	// 			return false;
	// 		}
	// 	},
	// 	// groups: ['manager'],
	// 	handler: 'observer1',
	// }, // 顯示指派選項，可依照指定的groups顯示下拉選單，可複選
	/* 
				定義可以觀看角色的關聯性，假如其他status也設為observer1, 則這兩邊會是固定的人看到
				簡言之，可以固定觀看的角色，而非是整個group都可以看到
			*/
	// handler: 'observer1', // 需搭配	appoint 使用
	goto: [
		// 前往其他關卡
		{
			condition: (forms, reviews) => {
				/*
							reviews: [
								{
									option: '通過',
									comment: '...'
								},
							]
						*/
				console.log('拿到的forms');
				console.log(forms);
				if (reviews[0].option === '通過') return true;
				else return false;
			},
			step: 'C', // 前往的關卡
		},
		{
			condition: (form, reviews) => {
				if (reviews[0].option === '前往B2') return true;
				return false;
			},
			step: 'B2',
		},
		{
			condition: (form, reviews) => {
				if (reviews[0].option === '取消') return true;
				return false;
			},
			step: 'Cancel',
		},
	],
	/* 
			是否需要輸出:
			假如設定為true，會出現button:輸出報表
			*/
	print: false,
	bottom_button: [
		{
			id: 'print_key',
			type: 'primary',
			para: ['plain', 'circle'], // plain, circle, disabled # 尚未實作
			icon: 'el-icon-printer', // Refer to https://element.eleme.io/#/zh-CN/component/icon
			text: '123',
			generate: (forms) => {
				console.log('呼叫這裡');
				console.log(forms);
				return {
					link: 'https://reurl.cc/QdN6yq',
					fileName: 'cat.jpg',
				};
			},
		},
	],
};
