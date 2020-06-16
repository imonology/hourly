module.exports = {
	form: ['document'], // 指定的form或multi-form
	forms: [{ form: 'document', label: '文件1' }],
	name: '簽核表單',
	/*
	開始的第一個關卡
	這是一個特例，在這一個關卡開始建立一筆新的資料，其他關卡都是使用該筆資料
	*/
	start: 'A',
	ends: ['End', 'Cancel'],
	steps: {
		A: {
			title: '建立表單',
			auth: [], // 可以看見的group
			shows: ['applicant', 'zipcode'], // 顯示的欄位
			hidden: [], // 和shows二選一
			lock: ['applicant'], // 不可被修改的欄位
			unlock: [], // 跟lock二選一
			option: ['申請'], // 審核者選項
			notify: true, // 開啟通知功能
			goto: 'B',
			/* 
			是否需要輸出:
			假如設定為true，會出現button:輸出報表
			*/
			print: false,
		},
		B: {
			title: '申請評估',

			auth: ['manager'], // 可以修改
			view: ['user', 'c'], // 可以看見

			shows: ['applicant', 'item', 'desc1', 'desc2'], // 顯示的欄位
			hidden: [], // 和shows二選一
			lock: [], // 不可被修改的欄位
			unlock: ['desc2'], // 跟lock二選一

			option: ['通過', '前往B2', '取消'], // 審核者選項
			notify: true, // 開啟通知功能
			/* 
				定義可以觀看角色的關聯性，假如其他status也設為observer1, 則這兩邊會是固定的人看到
				簡言之，可以固定觀看的角色，而非是整個group都可以看到
			*/
			appoint: {
				condition: (account_groups, account_data, forms) => {
					console.log('審核appoint');
					console.log('forms');
					console.log(forms);
					if (
						account_groups.indexOf('manager') !== -1 &&
						account_data.region === 'north'
					) {
						return true;
					} else {
						return false;
					}
				},
				// groups: ['manager'],
				handler: 'observer1',
			}, // 顯示指派選項，可依照指定的groups顯示下拉選單，可複選
			goto: [
				// 前往其他關卡
				{
					condition: (form, reviews) => {
						/*
							reviews: [
								{
									option: '通過',
									comment: '...'
								},
							]
						*/
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
		},

		B2: {
			title: 'B2 Step',

			auth: ['c'], // 可以修改
			view: ['user', 'manager'], // 可以看見

			shows: ['applicant', 'item', 'desc1', 'desc2', 'desc4'], // 顯示的欄位
			hidden: [], // 和shows二選一
			lock: [], // 不可被修改的欄位
			unlock: ['desc4'], // 跟lock二選一
			option: ['通過', '退回'], // 審核者選項
			notify: true, // 開啟通知功能
			/* 
				定義可以觀看角色的關聯性，假如其他status也設為observer1, 則這兩邊會是固定的人看到
				簡言之，可以固定觀看的角色，而非是整個group都可以看到
			*/
			handler: 'observer1', // 需搭配	appoint 使用
			goto: [
				// 前往其他關卡
				{
					condition: (form, reviews) => {
						/*
							reviews: [
								{
									option: '通過',
									comment: '...'
								},
							]
						*/
						if (reviews[0].option === '通過') return true;
						else return false;
					},
					step: 'End', // 前往的關卡
				},
				{
					condition: (form, reviews) => {
						if (reviews[0].option === '退回') return true;
						return false;
					},
					step: 'B',
				},
			],
			/* 
			是否需要輸出:
			假如設定為true，會出現button:輸出報表
			*/
			print: false,
		},

		C: {
			title: '複查',

			auth: ['manager', 'user'], // 可以修改
			view: [], // 可以看見

			shows: ['applicant', 'item', 'desc1', 'desc2', 'desc3'], // 顯示的欄位
			hidden: [], // 和shows二選一
			lock: [], // 不可被修改的欄位
			unlock: ['desc3'], // 跟lock二選一
			option: ['通過', '退回'], // 審核者選項
			notify: true, // 開啟通知功能
			/* 
				定義可以觀看角色的關聯性，假如其他status也設為observer1, 則這兩邊會是固定的人看到
				簡言之，可以固定觀看的角色，而非是整個group都可以看到
			*/
			handler: 'observer1', // 需搭配	appoint 使用
			goto: [
				// 前往其他關卡
				{
					condition: (form, reviews) => {
						/*
							reviews: [
								{
									option: '通過',
									comment: '...'
								},
							]
						*/
						if (reviews[0].option === '通過') return true;
						else return false;
					},
					step: 'End', // 前往的關卡
				},
				{
					condition: (form, reviews) => {
						if (reviews[0].option === '退回') return true;
						return false;
					},
					step: 'B',
				},
			],
			/* 
			是否需要輸出:
			假如設定為true，會出現button:輸出報表
			*/
			print: false,
		},
		End: {
			title: '完成',
			auth: ['manager'],
			shows: [], // 顯示的欄位
			hidden: [], // 和shows二選一
			lock: [], // 不可被修改的欄位
			unlock: [], // 跟lock二選一
			print: false,
		},
		Cancel: {
			title: '案件取消',
			auth: ['manager'],
			shows: [], // 顯示的欄位
			hidden: [], // 和shows二選一
			lock: [], // 不可被修改的欄位
			unlock: [], // 跟lock二選一
			print: false,
		},
	},
};
