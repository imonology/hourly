module.exports = {
	form: ['document', 'document2', 'info'], // 指定的form或multi-form
	forms: [
		{
			form: 'document',
			label: '文件1',
			rules: {
				desc2: [
					{
						message: '你必須是 AAA',
						validator: (rule, value, callback) => {
							console.log('開始驗證');
							console.log(value);
							if (value !== 'AAA') {
								callback(new Error('error'));
							} else {
								callback();
							}
						},
						required: true,
					},
				],
			},
		},
		{ form: 'document2', label: '文件2' },
		{ form: 'info', label: '基本資料' },
	],
	name: '多表單簽核',
	pending_field: ['name'], // 待處理顯示的欄位
	processed_field: ['name'], // 簽核中顯示的欄位
	done_field: ['name'], // 已結案顯示的欄位
	/*
	開始的第一個關卡
	這是一個特例，在這一個關卡開始建立一筆新的資料，其他關卡都是使用該筆資料
	*/
	start: 'A',
	ends: ['End', 'Cancel'],
	steps: {
		A: require('./multi_form_flow/A.js'),
		B: require('./multi_form_flow/B.js'),
		B2: require('./multi_form_flow/B2.js'),
		C: require('./multi_form_flow/C.js'),
		End: require('./multi_form_flow/End.js'),
		Cancel: require('./multi_form_flow/Cancel.js'),
	},
};
