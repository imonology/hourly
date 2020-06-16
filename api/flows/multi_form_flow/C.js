module.exports = {
	title: '複查',

	auth: ['manager', 'user'], // 可以修改
	view: [], // 可以看見

	shows: [
		'applicant',
		'item',
		'desc1',
		'desc2',
		'desc3',
		'doc_name',
		'doc_choice',
		'doc_desc1',
		'file',
		'sub_data',
		'data1',
		'data2',
		'data3',
	], // 顯示的欄位
	hidden: [], // 和shows二選一
	lock: [], // 不可被修改的欄位
	unlock: ['desc3'], // 跟lock二選一
	option: ['通過', '退回'], // 審核者選項
	notify: true, // 開啟通知功能
	/* 
				定義可以觀看角色的關聯性，假如其他status也設為observer1, 則這兩邊會是固定的人看到
				簡言之，可以固定觀看的角色，而非是整個group都可以看到
			*/
	// handler: 'observer1', // 需搭配	appoint 使用
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
};
