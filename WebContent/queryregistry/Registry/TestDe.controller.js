sap.ui
	.controller(
		"queryregistry.Registry.TestDe",
		{

		    /**
		     * Called when a controller is instantiated and its View
		     * controls (if available) are already created. Can be used
		     * to modify the View before it is displayed, to bind event
		     * handlers and do other one-time initialization.
		     * 
		     * @memberOf queryregistry.Registry.TestSl
		     */
			/*	updateTextMenu:function () {
					var tabBar= this.getView().byId("TabBarTest");
					var itemsBar = tabBar.getItems();
					var test;
	
				},*/
			createTestTable: function (tableId, oController, view,
				typeTable) {

				var heightRow = 35;

				jQuery.sap.require("jquery.sap.storage");
				this.oStorage = jQuery.sap
					.storage(jQuery.sap.storage.Type.local);
				var check = this.oStorage.get("IDCheck");
				var link = this.oStorage.get("IDSystemLink");

				// //////////////////////////////////////////////////////////////////////////////
				var notMigrationButton = new sap.m.Button({

					icon: "sap-icon://locked",
					enabled: false,
					tooltip: "Не переносить в предпрод",
					press: function () {

						// var idx = oTable.getSelectedIndex();
						var idx = oTable.getSelectedIndices();
						if (idx == -1)
							return;
						var Trkorr = oTable.getContextByIndex(idx)
							.getObject().Trkorr;
						oDontPush(Trkorr);
					},

				});
				notMigrationButton.addStyleClass("myErrorButton");
				// //////////////////////////////////////////////////////////////////////

				var refreshButton = new sap.m.Button(
					{

						icon: "sap-icon://refresh",
						tooltip: "Обновить",
						press: function refresh() {

							var oModel = new sap.ui.model.odata.v2.ODataModel(
								link, {

								useBatch: false,
								defaultUpdateMethod: "Put"

							});
							oTable.getModel().refresh(true);
							oTable.rerender();
							ConterText();

						},
					});
				refreshButton.addStyleClass("myRefreshButton");

				var removeButton = new sap.m.Button({

					text: "Удалить",
					icon: "sap-icon://decline",
					tooltip: "Удалить запрос",
					enabled: false,
					visible: false,
					press: function () {

						// var idx = oTable.getSelectedIndex();
						var idx = oTable.getSelectedIndices();
						if (idx == -1)
							return;
						var ReleaseType = oTable.getContextByIndex(idx)
							.getObject().Trkorr;
						openDeleteDialog(ReleaseType);

					},
				});
				if (check == "true") {

					removeButton.setVisible(true);

				}

				var numbersButton = new sap.m.Button(
					{

						icon: "sap-icon://approvals",
						tooltip: "Номера запросов",
						enabled: false,
						press: function () {

							// var idx = oTable.getSelectedIndex();
							var idx = oTable.getSelectedIndices();
							if (idx == -1)
								return;
							var array = [];
							for (i = 0; i < oTable
								.getSelectedIndices().length; i++) {

								var NumbersTrkorr = oTable
									.getContextByIndex(idx[i])
									.getObject().Trkorr;
								array.push(NumbersTrkorr);

							}
							openNumbersTrkorrDialog(array);

						},
					});

				var watchButton = new sap.m.Button({

					icon: "sap-icon://display",
					tooltip: "Просмотр",
					enabled: false,
					press: function () {

						// var idx = oTable.getSelectedIndex();
						var idx = oTable.getSelectedIndices();
						if (idx == -1)
							return;
						var Trkorr = oTable.getContextByIndex(idx)
							.getObject().Trkorr;
						watch(Trkorr);
					},

				});

				var historyButton = new sap.m.Button({

					icon: "sap-icon://work-history",
					tooltip: "История запроса",
					enabled: false,
					press: function () {

						// var idx = oTable.getSelectedIndex();
						var idx = oTable.getSelectedIndices();
						if (idx == -1)
							return;
						var Trkorr = oTable.getContextByIndex(idx)
							.getObject().Trkorr;
						history(Trkorr);
					},

				});

				// //yydevlyashov Кнопка добавления копии запроса в DET
				// var addQueryButtonDet = new sap.m.Button({
				// 	icon: "sap-icon://copy",
				// 	text: "Перенос копии",
				// 	tooltip: "Перенос копии",
				// 	title: "Перенос копии",
				// 	press: function () {
				// 		// busyDialog.open(); 			//cтатус "блок системы" 
				// 		oCreateDialogCopyRequest();
				// 	}
				// });

				// //yydevlyashov Диалоговое окно для переноса копии (ссылки на тест кейс и пользовательские доки)
				// function oCreateDialogCopyRequest() {
				// 	var self = this;
				// 	var oCreateDialog = new sap.m.Dialog({
				// 		title: "Перенос копии в DEQ"
				// 	});

				// 	// yydevlyashov трансформация реестра запросов - добавление функционала переноса копий 
				// 	var oDropDownBox = new sap.m.ComboBox();
				// 	var oDropDownBoxTypeRequest = new sap.m.ComboBox({
				// 		change: function (oEvent) {
				// 			changeTypeRequest(oEvent, oMultiInputRequests, descriptionCopyRequestDET); //для копии запросов
				// 		}
				// 	});

				// 	//yydevlyashov new описание для копии запросов DET
				// 	var descriptionCopyRequestDET = new sap.m.TextArea({
				// 		required: true,
				// 		cols: 60,
				// 		height: "70px",
				// 	});
				// 	descriptionCopyRequestDET.setEditable(false); //Заблокировать "описание" для юзера 


				// 	// Фильтр по названию системы ландшафта yydevlyashov
				// 	var aFilterSysName = new sap.ui.model.Filter(
				// 		"Tarsystem",
				// 		sap.ui.model.FilterOperator.EQ,
				// 		"DET"
				// 	);
				// 	// Список запросов пользователя для копирования yydevlyashov
				// 	var oMultiInputRequests = new sap.m.ComboBox({
				// 		visible: false,
				// 		items: {
				// 			path: '/User_querySet',
				// 			filters: [aFilterSysName],
				// 			template: new sap.ui.core.ListItem({
				// 				key: "{Trkorr}",
				// 				text: "{Trkorr} - {Description}",
				// 			})
				// 		},
				// 		selectionChange: (oControlEvent) => {	//yydevlyashov При клике Description попадает в Описание
				// 			const item = oMultiInputRequests.getSelectedItem();
				// 			var context = item.getBindingContext();
				// 			const description = context.getProperty("Description", context);
				// 			descriptionCopyRequestDET.setValue(description);
				// 		},
				// 	});

				// 	var oSimpleForm = new sap.ui.layout.form.SimpleForm(
				// 		{
				// 			width: "400px",
				// 			content: [
				// 				new sap.m.Label({
				// 					text: "Запросы для копирования"
				// 				}),
				// 				oMultiInputRequests.setVisible(true),

				// 				new sap.m.Label({
				// 					text: "Описание"
				// 				}), descriptionCopyRequestDET.setRequired(true),

				// 				new sap.m.Label({
				// 					text: "Ссылка на тест-кейс"
				// 				}),

				// 				new sap.m.TextArea({
				// 					required: true,
				// 					cols: 60,
				// 					height: "70px"
				// 				}),

				// 				new sap.m.Label({
				// 					text: "Cсылка на пользовательскую документацию"
				// 				}),

				// 				new sap.m.TextArea({
				// 					required: true,
				// 					cols: 60,
				// 					height: "70px"
				// 				}),

				// 				new sap.m.Label({
				// 					text: "Ссылка на спецификацию"
				// 				}),

				// 				new sap.m.TextArea({
				// 					required: true,
				// 					cols: 60,
				// 					height: "70px"
				// 				}),
				// 			]
				// 		});


				// 	oCreateDialog.addContent(oSimpleForm);
				// 	oModel.attachRequestCompleted(function () {
				// 		busyDialog.close();
				// 	});

				// 	//yyydevlyashov перенос копии запросов
				// 	oCreateDialog.addButton(new sap.m.Button({
				// 		text: "Сохранить",
				// 		press: function () {
				// 			var content = oSimpleForm.getContent();
				// 			for (var i in content) {
				// 				var control = content[i];
				// 				if (control.getValue) {
				// 					if (control.getValue() === "" && control.getRequired() == true) {
				// 						control.setValueState(sap.ui.core.ValueState.Error);
				// 						return;
				// 					}
				// 					else {
				// 						control.setValueState(sap.ui.core.ValueState.None);
				// 					}
				// 				}
				// 			}
				// 			var oEntry = {};
				// 			var CreateBusyDialog = new sap.m.BusyDialog(
				// 				{
				// 					text: "Создание транспортного запроса..."
				// 				})

				// 				sap.ui.getCore().getModel().callFunction(
				// 					"/CreateQueryCopy",
				// 					{
				// 						method: "POST",
				// 						urlParameters: {
											
				// 							Original_trkorr: oMultiInputRequests.getSelectedKey(),
				// 							Tarsystem: "DEQ",
				// 						},
							
				// 					success: function (oData, response) {
				// 						oModel.setSizeLimit(500);
				// 						sap.ui.getCore().setModel(oModel);
				// 						oTable.setModel(oModel);
				// 						CreateBusyDialog.close();
				// 						oCreateDialog.close();
				// 						ConterText0();
				// 					},
				// 					error: function () {
				// 						oCreateDialog.close();
				// 						CreateBusyDialog.close();
				// 						sap.m.MessageToast.show("Ошибка при создании запроса");
				// 					}
				// 				});
				// 			CreateBusyDialog.open();
				// 		}
				// 	}));

				// 	oCreateDialog.addButton(new sap.m.Button({
				// 		text: "Отмена",
				// 		press: function () {
				// 			oCreateDialog.close();
				// 		}
				// 	}))
				// 	oCreateDialog.open();
				// };
				//END Диалоговое окно

				var self = this;

				function ConterText() {

					var listServer = sap.ui.getCore().byId("listServer");
					var listServerItems = listServer.getItems();
					var tabBar = sap.ui.getCore().byId("TabBarTest");
					var itemsBar = tabBar.getItems();
					var oJsonModel = new sap.ui.model.json.JSONModel();
					var aFltDET = [new sap.ui.model.Filter({
						path: "StatusCode",
						operator: sap.ui.model.FilterOperator.EQ,
						value1: '02'
					}),
					];

					var aFltDETT = [new sap.ui.model.Filter({
						path: "StatusCode",
						operator: sap.ui.model.FilterOperator.EQ,
						value1: '03'
					}),
					];

					var aFltDET3 = [new sap.ui.model.Filter({
						path: "StatusCode",
						operator: sap.ui.model.FilterOperator.EQ,
						value1: '04'
					}),
					];

					var aFltDETecatt = [new sap.ui.model.Filter({
						path: "StatusCode",
						operator: sap.ui.model.FilterOperator.EQ,
						value1: '14'
					}),
					];


					var oModel = new sap.ui.model.odata.ODataModel(link, false);
					oModel.read("/Query_registrySet", {
						filters: aFltDET,
						async: false,
						success: function (oData, response) {
							oJsonModel.setData(oData);
						}
					});

					var oJsonModelT = new sap.ui.model.json.JSONModel();
					oModel.read("/Query_registrySet", {
						filters: aFltDETT,
						async: false,
						success: function (oData, response) {
							oJsonModelT.setData(oData);
						}
					});

					var oJsonModelT3 = new sap.ui.model.json.JSONModel();
					oModel.read("/Query_registrySet", {
						filters: aFltDET3,
						async: false,
						success: function (oData, response) {
							oJsonModelT3.setData(oData);
						}
					});

					var oJsonModelT4 = new sap.ui.model.json.JSONModel();
					oModel.read("/Query_registrySet", {
						filters: aFltDETecatt,
						async: false,
						success: function (oData, response) {
							oJsonModelT4.setData(oData);
						}
					});

					var aFltDE0 = [new sap.ui.model.Filter({
						path: "StatusCode",
						operator: sap.ui.model.FilterOperator.EQ,
						value1: '01'
					}),
					];

					var oJsonModelDE0 = new sap.ui.model.json.JSONModel();
					oModel.read("/Query_registrySet", {
						filters: aFltDE0,
						async: false,
						success: function (oData, response) {
							oJsonModelDE0.setData(oData);
						}
					});

					var aFltDEQ = [new sap.ui.model.Filter({
						path: "StatusCode",
						operator: sap.ui.model.FilterOperator.EQ,
						value1: '05'
					}),
					];

					var oJsonModelDEQ = new sap.ui.model.json.JSONModel();
					oModel.read("/Query_registrySet", {
						filters: aFltDEQ,
						async: false,
						success: function (oData, response) {
							oJsonModelDEQ.setData(oData);
						}
					});

					var aFltDEQQ = [new sap.ui.model.Filter({
						path: "StatusCode",
						operator: sap.ui.model.FilterOperator.EQ,
						value1: '06'
					}),
					];

					var oJsonModelDEQQ = new sap.ui.model.json.JSONModel();
					oModel.read("/Query_registrySet", {
						filters: aFltDEQQ,
						async: false,
						success: function (oData, response) {
							oJsonModelDEQQ.setData(oData);
						}
					});

					var aFltDE1 = [new sap.ui.model.Filter({
						path: "StatusCode",
						operator: sap.ui.model.FilterOperator.EQ,
						value1: '08'
					}),
					];

					var oJsonModelDE1 = new sap.ui.model.json.JSONModel();
					oModel.read("/Query_registrySet", {
						filters: aFltDE1,
						async: false,
						success: function (oData, response) {
							oJsonModelDE1.setData(oData);
						}
					});

					var aFltDE11 = [new sap.ui.model.Filter({
						path: "StatusCode",
						operator: sap.ui.model.FilterOperator.EQ,
						value1: '09'
					}),
					];

					var oJsonModelDE11 = new sap.ui.model.json.JSONModel();
					oModel.read("/Query_registrySet", {
						filters: aFltDE11,
						async: false,
						success: function (oData, response) {
							oJsonModelDE11.setData(oData);
						}
					});

					var aFltJournal = [new sap.ui.model.Filter({
						path: "StatusCode",
						operator: sap.ui.model.FilterOperator.EQ,
						value1: '11'
					}),
					];

					var oJsonModelJournal = new sap.ui.model.json.JSONModel();
					oModel.read("/Query_registrySet", {
						filters: aFltJournal,
						async: false,
						success: function (oData, response) {
							oJsonModelJournal.setData(oData);
						}
					});


					var aFltArchive = [new sap.ui.model.Filter({
						path: "StatusCode",
						operator: sap.ui.model.FilterOperator.EQ,
						value1: '12'
					}),
					];

					var oJsonModelArchive = new sap.ui.model.json.JSONModel();
					oModel.read("/Query_registrySet", {
						filters: aFltArchive,
						async: false,
						success: function (oData, response) {
							oJsonModelArchive.setData(oData);
						}
					});


					var listNotBlockedobj = [];
					if (oJsonModelJournal.oData.results.length > 0) {
						oJsonModelJournal.oData.results.forEach(function (item, i, parseListModel) {
							if (item.Icon == "") {
								listNotBlockedobj.push(item);
							}
						});
					}

					itemsBar[0].setText("К переносу в DET " + "(" + oJsonModel.oData.results.length + ")");
					itemsBar[1].setText("Перенос в DET одобрен " + "(" + oJsonModelT.oData.results.length + ")");
					itemsBar[2].setText("в DET " + "(" + oJsonModelT3.oData.results.length + ")");
					itemsBar[3].setText("eCATT " + "(" + oJsonModelT4.oData.results.length + ")");

					listServerItems[0].setTitle("DE0 " + "(" + oJsonModelDE0.oData.results.length + ")");
					listServerItems[1].setTitle("DET " + "(" + oJsonModel.oData.results.length + "/" + oJsonModelT.oData.results.length + ")");
					listServerItems[2].setTitle("DEQ " + "(" + oJsonModelDEQ.oData.results.length + "/" + oJsonModelDEQQ.oData.results.length + ")");
					listServerItems[3].setTitle("DE1 " + "(" + oJsonModelDE1.oData.results.length + "/" + oJsonModelDE11.oData.results.length + ")");
					listServerItems[4].setTitle("Журнал ошибок " + "(" + listNotBlockedobj.length + ")");
					listServerItems[5].setTitle("Архив " + "(" + oJsonModelArchive.oData.results.length + ")");
				};

				/*	function test(){
						var tabBar= sap.ui.getCore().byId("TabBarTest");
						var itemsBar = tabBar.getItems();
					  /*  itemsBar[0].setText(":)")
						var test;*/

				var buttons = [];
				var self = this;
				if (typeTable == 'for') {
					var doneButton = new sap.m.Button({
						icon: "sap-icon://sys-enter-2",
						tooltip: "Одобрен к переносу в тест",
						enabled: false,
						visible: false,
						press: function () {
							pushApprove();
						},
					});
					doneButton.addStyleClass("myDoneButton");
					if (check == "true") {
						doneButton.setVisible(true);
					}
					buttons.push(doneButton);
				}

				if (typeTable == 'approve') {
					removeButton.setVisible(false);
					var errorButtonUnlock = new sap.m.Button({
						icon: "sap-icon://sys-cancel-2",
						tooltip: "Ошибка при деблокировании",
						enabled: false,
						press: function () {
							// var idx = oTable.getSelectedIndex();
							var idx = oTable.getSelectedIndices();
							if (idx == -1)
								return;
							var Trkorr = oTable.getContextByIndex(idx).getObject().Trkorr;
							errorUnlocking(Trkorr);

						},
					});
					errorButtonUnlock.addStyleClass("myErrorButton");
					// buttons.push(errorButtonUnlock);

				}
				if (typeTable == 'into') {
					removeButton.setVisible(false);
					var errorButton = new sap.m.Button({
						icon: "sap-icon://sys-cancel-2",
						enabled: false,
						tooltip: "Тест не пройден",
						press: function () {
							// var idx = oTable.getSelectedIndex();
							var idx = oTable.getSelectedIndices();
							if (idx == -1)
								return;
							var Trkorr = oTable.getContextByIndex(idx)
								.getObject().Trkorr;
							oTestFail(Trkorr);

						},
					});
					errorButton.addStyleClass("myErrorButton");
					buttons.push(errorButton);

					buttons.push(notMigrationButton);

					var passTest = new sap.m.Button({
						icon: "sap-icon://sys-enter-2",
						tooltip: "Прошел тест",
						enabled: false,
						press: function () {
							// var idx = oTable.getSelectedIndex();
							var idx = oTable.getSelectedIndices();
							if (idx == -1)
								return;
							var Trkorr = oTable.getContextByIndex(idx).getObject().Trkorr;
							openPushDialog(Trkorr);

						}
					});

					passTest.addStyleClass("myDoneButton");
					buttons.push(passTest);
				}

				if (typeTable == 'eCATT') {
					removeButton.setVisible(false);
				}

				var forceButton = new sap.m.Button({
					icon: "sap-icon://alert",
					enabled: false,
					visible: false,
					tooltip: "Принудительный перенос",
					press: function () {
						// var idx = oTable.getSelectedIndex();
						var idx = oTable.getSelectedIndices();
						if (idx == -1)
							return;
						// var Trkorr =
						// oTable.getContextByIndex(idx).getObject().Trkorr;
						var Trkorr = '';
						var Trkorrs = [];
						idx.forEach(function (item, i, idx) {
							var usin = oTable.getContextByIndex(item).getObject();
							if (Trkorr === "") {
								Trkorr = usin.Trkorr;
							} else {
								Trkorr = Trkorr + ', ' + usin.Trkorr
							}
							Trkorrs.push(usin.Trkorr);
						});
						openForceDialog(Trkorrs, Trkorr);
					},

				});
				forceButton.addStyleClass("myAlertButton");

				if (check == "true") {
					forceButton.setVisible(true);
				}
				buttons.push(forceButton);

				var searchBox = new sap.m.SearchField({

					enabled: true,
					visible: true,
					maxLength: 0,
					placeholder: "Текст для поиска...",
					showMagnifier: true,
					showRefreshButton: false,
					width: "15rem",
					search: function (oEvent) {
						Search(oEvent);
					},
				});

				var TestToolBar = new sap.m.Toolbar({
					busy: false, // boolean
					busyIndicatorDelay: 1000, // int
					visible: true, // boolean
					active: false, // boolean
					enabled: true, // boolean
					design: sap.m.ToolbarDesign.Auto, // sap.m.ToolbarDesign,
					// since 1.16.8
					content: [
						refreshButton, removeButton,
						new sap.m.ToolbarSeparator(),
						// addQueryButtonDet,								//yydevlyashov кнопка добавления копии запроса (из DET в DEQ)
						// new sap.m.ToolbarSeparator(),
						numbersButton,
						new sap.m.ToolbarSeparator(), watchButton,
						historyButton, new sap.m.ToolbarSeparator()

					], // sap.ui.core.Control
				});

				for (var i = 0; i < buttons.length; i++) {
					var item = buttons[i];
					TestToolBar.addContent(item);
				}

				TestToolBar.addContent(new sap.m.ToolbarSpacer());
				TestToolBar.addContent(searchBox);

				var oTable = new sap.ui.table.Table(
					tableId,
					{
						visibleRowCountMode: sap.ui.table.VisibleRowCountMode.Auto,
						rowHeight: heightRow,
						// visibleRowCount: 23,
						selectionBehavior: sap.ui.table.SelectionBehavior.Row,
						selectionMode: sap.ui.table.SelectionMode.MultiToggle,
						enableColumnReordering: true,
						sort: function (oEvent) {
							oEvent.getSource().rerender();
						},

						toolbar: [
							TestToolBar,
						],
					});

				// var check = this.oStorage.get("IDCheck");

				oTable.attachRowSelectionChange(function (oEvent) {
					var quantitySelectedRows = oTable
						.getSelectedIndices().length; // получаем
					// длину
					// массива
					(quantitySelectedRows >= 1) ? numbersButton
						.setEnabled(true) : numbersButton
							.setEnabled(false);

					switch (typeTable) {
						case 'for':
							if (quantitySelectedRows > 1
								|| quantitySelectedRows == 0) {

								removeButton.setEnabled(false);
								watchButton.setEnabled(false);
								historyButton.setEnabled(false);
								if (quantitySelectedRows == 0) {

									doneButton.setEnabled(false);

								} else {

									doneButton.setEnabled(true);

								}
								// forceButton.setEnabled(false);

							} else {

								removeButton.setEnabled(true);
								watchButton.setEnabled(true);
								historyButton.setEnabled(true);
								doneButton.setEnabled(true);
								forceButton.setEnabled(true);

							}
							break;

						case 'approve':

							if (quantitySelectedRows > 1
								|| quantitySelectedRows == 0) {

								removeButton.setEnabled(false);
								watchButton.setEnabled(false);
								historyButton.setEnabled(false);
								errorButtonUnlock.setEnabled(false);
								// forceButton.setEnabled(false);

							} else {

								removeButton.setEnabled(true);
								watchButton.setEnabled(true);
								historyButton.setEnabled(true);
								errorButtonUnlock.setEnabled(true);
								forceButton.setEnabled(true);

							}
							break;

						case 'into':

							if (quantitySelectedRows > 1
								|| quantitySelectedRows == 0) {

								watchButton.setEnabled(false);
								historyButton.setEnabled(false);
								passTest.setEnabled(false);
								errorButton.setEnabled(false);
								notMigrationButton.setEnabled(false);
								// forceButton.setEnabled(false);

							} else {

								watchButton.setEnabled(true);
								historyButton.setEnabled(true);
								passTest.setEnabled(true);
								errorButton.setEnabled(true);
								notMigrationButton.setEnabled(true);
								forceButton.setEnabled(true);

							}
							break;

						case 'eCATT':

							if (quantitySelectedRows > 1
								|| quantitySelectedRows == 0) {

								watchButton.setEnabled(false);
								historyButton.setEnabled(false);
								forceButton.setEnabled(false);

							} else {

								watchButton.setEnabled(true);
								historyButton.setEnabled(true);
								forceButton.setEnabled(true);

							}
							break;

					}
				});

				if (typeTable == 'into') {

					// new sap.ui.commons.Image ---- для
					// пользовательских изображений
					var oControl = new sap.ui.core.Icon({

						src: "{Icon}",
						color: "#cc0303!important;",

					});
					oTable.addColumn(new sap.ui.table.Column({

						width: "35px",
						template: oControl

					}));
				}

				var oControl = new sap.ui.commons.TextField()
					.bindProperty("value", "Trkorr").setEditable(
						false); // short binding notation
				oTable.addColumn(new sap.ui.table.Column({
					sortProperty: "Trkorr",
					label: new sap.ui.commons.Label({
						text: "Номер"
					}),
					width: "100px",
					template: oControl
				}));
				jQuery.sap.require("sap.ui.core.format.DateFormat");

				// yyd номер оригинала запроса
				oControl = new sap.ui.commons.TextField().bindProperty("value", "Original_trkorr").setEditable(false); // short binding notation
				oTable.addColumn(new sap.ui.table.Column({
				label: new sap.ui.commons.Label({
					text: "Номер оригинала"
				}),
				sortProperty: "Original_trkorr",
				width: "120px",
				template: oControl,
			}));

				oControl = new sap.ui.commons.TextView({

					text: {

						path: "CreateDate",
						type: new sap.ui.model.type.DateTime({

							pattern: "dd-MM-yyyy HH:mm:ss",
							UTC: true
						})

					}
				});

				oTable.addColumn(new sap.ui.table.Column({
					sortProperty: "CreateDate",
					label: new sap.ui.commons.Label({
						text: "Добавлен"
					}),
					width: "150px",
					template: oControl
				}));

				var oGroupField = new sap.ui.commons.TextView()
					.bindProperty("text", {

						parts: [

							{
								path: "TuskNumber"
							}, {
								path: "Version"
							}, {
								path: "Description"
							}

						],
						formatter: function (TuskNumber, Version,
							Description) {

							return TuskNumber + "-" + Version
								+ ": " + Description;

						}
					});

				oTable.addColumn(new sap.ui.table.Column({

					label: "Описание",
					template: oGroupField

				}));

				oControl = new sap.ui.commons.TextView({
					text: "{Trfunction}"
				});
				oTable.addColumn(new sap.ui.table.Column({
					sortProperty: "Trfunction",
					label: new sap.ui.commons.Label({
						text: "Тип"
					}),
					width: "13%",
					template: oControl

				}));

				oControl = new sap.ui.commons.TextView({
					text: "{CreatorLogin}"
				});
				oTable.addColumn(new sap.ui.table.Column({
					sortProperty: "CreatorLogin",
					label: new sap.ui.commons.Label({
						text: "Добавил"
					}),
					width: "13%",
					template: oControl

				}));

				if (typeTable == 'into') {

					oControl = new sap.ui.commons.TextView({
						text: "{TestComment}"
					});
					oTable.addColumn(new sap.ui.table.Column({
						sortProperty: "TestComment",
						label: new sap.ui.commons.Label({
							text: "Ком. к тестированию"
						}),
						width: "13%",
						template: oControl

					}));

					oControl = new sap.ui.commons.TextView({
						text: "{WikiLink}"
					});
					oTable.addColumn(new sap.ui.table.Column({
						sortProperty: "WikiLink",
						label: new sap.ui.commons.Label({
							text: "Ссылка на WIKI"
						}),
						width: "13%",
						template: oControl

					}));
				}

				var oModel = new sap.ui.model.odata.v2.ODataModel(link,
					{

						useBatch: false,
						defaultUpdateMethod: "Put"

					});
				oModel.setSizeLimit(500);
				sap.ui.getCore().setModel(oModel);
				oTable.setModel(oModel);

				var oFilterInTest = new sap.ui.model.Filter(
					"StatusCode", sap.ui.model.FilterOperator.EQ,
					'02');
				var oFilterTestApprove = new sap.ui.model.Filter(
					"StatusCode", sap.ui.model.FilterOperator.EQ,
					'03');
				var oFilterTest = new sap.ui.model.Filter("StatusCode",
					sap.ui.model.FilterOperator.EQ, '04');
				var oFilterEcatt = new sap.ui.model.Filter(
					"StatusCode", sap.ui.model.FilterOperator.EQ,
					'14');

				switch (typeTable) {

					case 'for':

						oTable.bindRows("/Query_registrySet", undefined,
							undefined, [oFilterInTest]);
						break;

					case 'approve':
						oTable.bindRows("/Query_registrySet", undefined,
							undefined, [oFilterTestApprove]);
						break;

					case 'into':
						oTable.bindRows("/Query_registrySet", undefined,
							undefined, [oFilterTest]);
						break;

					case 'eCATT':
						oTable.bindRows("/Query_registrySet", undefined,
							undefined, [oFilterEcatt]);
						break;

				}

				oTable
					.setVisibleRowCountMode(sap.ui.table.VisibleRowCountMode.Fixed);
				oTable.setVisibleRowCount(calcRowCount());
				oTable
					.setVisibleRowCountMode(sap.ui.table.VisibleRowCountMode.Auto);

				function calcRowCount() {
					var height = document.documentElement.clientHeight - 243;// .style.height;
					// height = height - 243;

					return ~~(height / heightRow);
				}

				function pushApprove(Unlock, Trkorr) {

					var BusyDialog = new sap.m.BusyDialog({

						text: "Деблокирование запроса..."

					})

					var array = [];

					for (var i = 0; i < oTable.getSelectedIndices().length; i++) {

						array.push(oTable.getContextByIndex(
							oTable.getSelectedIndices()[i])
							.getObject().Trkorr);

					}
					;
					function updateTextMenu() {
						var tabBar = this.getView().byId("TabBarTest");
						return 6;

					};

					var oModelUnlock = new sap.ui.model.odata.v2.ODataModel(
						link,
						{

							defaultUpdateMethod: sap.ui.model.odata.UpdateMethod.Put

						});

					var oEntry = {};
					if (Trkorr == undefined) {

						for (var index = 0; index < array.length; ++index) {

							BusyDialog.open();

							oEntry.Trkorr = array[index];
							oEntry.Trstatus = 'D';
							oEntry.StatusCode = "03";
							oEntry.Unlock = false;

							oModelUnlock.callFunction(
									"/UnlockTrkorr",
									{
										method: "POST",
										urlParameters: {
											"UnTrkorr": oEntry.Trkorr,
											"Trstatus": oEntry.Trstatus,
											"StatusCode": oEntry.StatusCode,
											"Unlock": oEntry.Unlock

										},
										success: function (
											oData, response) {

											var oModel = new sap.ui.model.odata.v2.ODataModel(
												link,
												{

													useBatch: false,
													defaultUpdateMethod: "Put"

												});
											oModel
												.setSizeLimit(500);
											sap.ui
												.getCore()
												.setModel(
													oModel);

											oTable
												.setModel(oModel);
											BusyDialog.close();
											ConterText();
											if (oData.Unlock == true) {

												openDeblockDialog(oData.Trkorr);

											}
										},
										error: function (oError) {
											ConterText();
											BusyDialog.close();
											sap.m.MessageToast
												.show("Произошла ошибка при смене статуса запроса!");

										}
									});

							// oModelUnlock.update("/Query_registrySet('"
							// + oEntry.Trkorr + "')", oEntry, {
							// groupId: "Update"
							// } );

						}
						;
					} else {

						BusyDialog.open();

						oEntry.Trkorr = Trkorr;
						oEntry.Trstatus = 'D';
						oEntry.StatusCode = "03";
						oEntry.Unlock = Unlock;

						// oModelUnlock.update("/Query_registrySet('" +
						// oEntry.Trkorr + "')", oEntry );

						oModelUnlock
							.callFunction(
								"/UnlockTrkorr",
								{

									method: "POST",
									urlParameters: {

										"UnTrkorr": oEntry.Trkorr,
										"Trstatus": oEntry.Trstatus,
										"StatusCode": oEntry.StatusCode,
										"Unlock": oEntry.Unlock

									},
									success: function (oData,
										response) {

										var oModel = new sap.ui.model.odata.v2.ODataModel(
											link,
											{

												useBatch: false,
												defaultUpdateMethod: "Put"

											});
										oModel
											.setSizeLimit(500);
										sap.ui.getCore()
											.setModel(
												oModel);
										oTable.setModel(oModel);
										BusyDialog.close();
										ConterText();
									},
									error: function (oError) {

										BusyDialog.close();
										ConterText();
										sap.m.MessageToast
											.show("Произошла ошибка при смене статуса запроса!");

									}
								});
					}

					// oModelUnlock.submitChanges({
					// groupId: "Update",
					// success: function(oData, response){
					// var oModel = new
					// sap.ui.model.odata.v2.ODataModel(link, {
					// json: false,
					// useBatch: false,
					// defaultUpdateMethod: "Put"
					// });
					// oModel.setSizeLimit(500);
					// sap.ui.getCore().setModel(oModel);
					// oTable.setModel(oModel);
					// BusyDialog.close();
					// },
					// error: function(oError){
					// BusyDialog.close();
					// jQuery.sap.require("sap.m.MessageBox");
					// sap.m.MessageBox.error("Произошла ошибка при
					// смене статуса запроса!", {
					// title: "Ошибка"});
					// }
					// });

					// oModelUnlock.attachRequestCompleted(function(oEvent){
					// var oModel = new
					// sap.ui.model.odata.v2.ODataModel(link, {
					// useBatch: false,
					// defaultUpdateMethod: "Put"
					// });
					// oModel.setSizeLimit(500);
					// sap.ui.getCore().setModel(oModel);
					// oTable.setModel(oModel);
					// if(oEvent.Unlock == true){
					// openDeblockDialog(oEntry.Trkorr);
					// }
					// BusyDialog.close();
					// });
					array = null;

				}
				;

				function openDeleteDialog(Trkorr) {

					jQuery.sap.require("sap.m.MessageBox");
					sap.m.MessageBox
						.confirm(
							"Вы уверены что хотите удалить запрос "
							+ Trkorr + " ?",
							{

								title: "Удаление запроса",
								onClose: function (oAction) {

									switch (oAction) {

										case 'OK':

											sap.ui
												.getCore()
												.getModel()
												.remove(
													"/Query_registrySet('"
													+ Trkorr
													+ "')",
													{

														success: function () {

															var oModel = new sap.ui.model.odata.v2.ODataModel(
																link,
																{

																	useBatch: false,
																	defaultUpdateMethod: "Put"

																});
															oModel
																.setSizeLimit(500);
															sap.ui
																.getCore()
																.setModel(
																	oModel);
															oTable
																.setModel(oModel);
															ConterText();
															sap.m.MessageToast
																.show("Запрос "
																	+ Trkorr
																	+ " удален!");

														},
														error: function (
															oError) {

															var json = $
																.parseJSON(oError.responseText);
															var code = json.error.code;

															switch (code) {

																case '01':

																	var dialogErr = new sap.m.Dialog(
																		{

																			title: "Ошибка",
																			type: sap.m.DialogType.Message,
																			state: 'Error',
																			content: new sap.m.Text(
																				{

																					text: 'У Вас недостаточно прав для удаления!'

																				}),
																			beginButton: new sap.m.Button(
																				{

																					text: 'OK',
																					press: function () {

																						dialogErr
																							.close();

																					}
																				}),
																			afterClose: function () {

																				dialogErr
																					.destroy();

																			}
																		});
																	dialogErr
																		.open();
																	dialogErr
																		.addStyleClass("mydialogErr");
																	break;

																// case
																// 'value2':
																// ...
																// break;

																default:

																	var dialog = new sap.m.Dialog(
																		{

																			title: "Ошибка",
																			type: sap.m.DialogType.Message,
																			state: sap.ui.core.ValueState.Error,
																			content: new sap.m.Text(
																				{

																					text: "Произошла ошибка при удалении запроса "
																						+ Trkorr.Trkorr

																				}),
																			beginButton: new sap.m.Button(
																				{

																					text: "Ок",
																					press: function () {

																						dialog
																							.close();

																					}
																				}),
																			afterClose: function () {

																				dialog
																					.destroy();

																			}
																		});
																	dialog
																		.open();
																	break;
															}
														}
													});

											break;

										case 'CANCEL':

											break;

									}
								}
							});
				}

				function openDeblockDialog(Trkorr) {

					jQuery.sap.require("sap.m.MessageBox");
					sap.m.MessageBox
						.confirm(
							"Запрос "
							+ Trkorr
							+ " содержит ошибки регламента: деблокировать?",
							{

								title: "Ошибки регламента",
								onClose: function (oAction) {

									switch (oAction) {

										case 'OK':

											var Unlock = true;
											pushApprove(Unlock,
												Trkorr);
											ConterText();
											break;

										case 'CANCEL':

											break;

									}
								}
							});
				}


				function openNumbersTrkorrDialog(array) {

					var oNumbersTrkorrDialog = new sap.m.Dialog({

						title: "Номера запросов",
						textAlign: sap.ui.core.TextAlign.Center,
						// contentHeight: "300px",
						endButton: new sap.m.Button({

							text: "Закрыть",
							press: function () {

								oNumbersTrkorrDialog.close();

							}
						})
					});
					for (var i = 0; i < array.length; i++) {

						var NumbersTrkorr = new sap.m.Text({

							text: array[i] + "\n",

						}).addStyleClass("myNumbersRequests");

						oNumbersTrkorrDialog.addContent(NumbersTrkorr);

					}
					oNumbersTrkorrDialog.open();

				}

				function watch(Trkorr) {

					var oUpdateDialog = new sap.m.Dialog({

						title: "Просмотр запроса " + Trkorr,
						endButton: new sap.m.Button({

							text: "Закрыть",
							press: function () {

								oUpdateDialog.close()

							}
						})
					});

					var oTableWatch = new sap.ui.table.Table(
						{

							visibleRowCount: 7,
							enableCellFilter: true,
							enableCustomFilter: true,
							selectionMode: sap.ui.table.SelectionMode.None,
							enableColumnReordering: true,

						});

					var oControl = new sap.m.Text({
						text: "{Parameter}"
					}); // short binding notation
					oTableWatch.addColumn(new sap.ui.table.Column({

						width: "30%",
						label: new sap.m.Label({
							text: "Параметр"
						}),
						template: oControl
					}));

					oControl = new sap.m.Text({
						text: "{Value}"
					}); // more verbose binding notationt
					oTableWatch.addColumn(new sap.ui.table.Column({

						label: new sap.m.Label({
							text: "Значение"
						}),
						template: oControl
					}));

					var oModelWatch = new sap.ui.model.odata.v2.ODataModel(
						link, {

						useBatch: false,
						defaultUpdateMethod: "Put"

					});
					oModelWatch.setSizeLimit(500);
					sap.ui.getCore().setModel(oModelWatch);
					oTableWatch.setModel(oModelWatch);

					var oFilterWatch = new sap.ui.model.Filter(
						"Parameter",
						sap.ui.model.FilterOperator.EQ, Trkorr);
					oTableWatch.bindRows("/Watch_requestSet",
						undefined, undefined, [oFilterWatch]);

					var oSimpleForm = new sap.ui.layout.form.SimpleForm(
						{

							content: [

								oTableWatch,

							]
						});

					oUpdateDialog.addContent(oSimpleForm);
					oUpdateDialog.open();

				}

				function openPushDialog(Trkorr) {

					var oPushDialog = new sap.m.Dialog({

						title: "Аудит запроса " + Trkorr,

					});

					var oSimpleForm = new sap.ui.layout.form.SimpleForm(
						{

							content: [

								new sap.m.Label({
									text: "Ссылка на тест-кейс",
								}), new sap.m.TextArea({

									required: true,
									cols: 60,

								}),

								new sap.m.Label({
									text: "Ссылка на пользовательскую документацию",
								}), new sap.m.TextArea({

									required: true,
									cols: 60,

								}),

								new sap.m.Label({
									text: "Ссылка на спецификацию",
								}), new sap.m.TextArea({

									required: true,
									cols: 60,

								}),]
						});
					oPushDialog.addContent(oSimpleForm);
					oPushDialog.addButton(
						new sap.m.Button(
							{
								text: "Сохранить",
								press: function () {
									var content = oSimpleForm.getContent();
									for (var i in content) {
										var control = content[i];
										if (control.getValue) {
											if (control.getValue() === "") {
												control.setValueState(sap.ui.core.ValueState.Error);
												return;
											} else {
												control.setValueState(sap.ui.core.ValueState.None);
											}
										}
									}

									var oEntry = {};
									oEntry.Trkorr = Trkorr;
									oEntry.StatusCode = "05";
									oEntry.TestComment = content[1].getValue();
									oEntry.WikiLink = content[3].getValue();
									oEntry.SpecLink = content[5].getValue();

									sap.ui.getCore().getModel().update("/Query_registrySet('" + oEntry.Trkorr + "')",
											oEntry,
											{
												//yydevlyashov
												method: "POST",
												urlParameters: {
													Original_trkorr: "StatusCode '02'",
													Tarsystem: "DET",
												},
												//end
												success: function () {

													var oModel = new sap.ui.model.odata.v2.ODataModel(
														link,
														{

															useBatch: false,
															defaultUpdateMethod: "Put"

														});
													oModel
														.setSizeLimit(500);
													sap.ui
														.getCore()
														.setModel(
															oModel);
													oTable
														.setModel(oModel);
													oPushDialog
														.close();
													ConterText();

												},
												error: function () {

													oPushDialog
														.close();
													ConterText();
													jQuery.sap
														.require("sap.m.MessageBox");
													sap.m.MessageBox
														.error(
															"Ошибка при изменении статуса запроса!",
															{

																title: "Ошибка"
															});

												}
											});
								}
							}));
					oPushDialog.addButton(new sap.m.Button({

						text: "Закрыть",
						press: function () {

							oPushDialog.close();

						}
					}));
					oPushDialog.open();

				}
				;

				function openForceDialog(Trkorrs, Trkorr) {

					var oForceDialog = new sap.m.Dialog({

						title: "Принудительный перенос запроса "
							+ Trkorr,

					});
					var TrkorrValue = "";

					TrkorrValue = Trkorr;

					var oComboBox = new sap.ui.commons.ComboBox();
					oComboBox.setModel(oModel);

					var itemTemplate = new sap.ui.core.ListItem({

						key: "{Id}",
						text: "{Text}",

					});

					oComboBox
						.bindItems("/Status_codeSet", itemTemplate);

					var oSimpleForm = new sap.ui.layout.form.SimpleForm(
						{

							width: "400px",
							content: [

								new sap.ui.commons.Label({
									text: "Запрос",
								}), new sap.ui.commons.TextView({

									text: TrkorrValue,
									editable: false,

								}),

								new sap.ui.commons.Label({
									text: "Статус запроса",
								}), oComboBox,

							]
						});
					oForceDialog.addContent(oSimpleForm);
					oForceDialog
						.addButton(

							new sap.m.Button(
								{

									text: "Сохранить",
									press: function () {

										var content = oSimpleForm
											.getContent();
										for (var i in content) {

											var control = content[i];
											if (control.getValue) {
												if (control
													.getValue() === "") {

													control
														.setValueState(sap.ui.core.ValueState.Error);
													return;

												} else {

													control
														.setValueState(sap.ui.core.ValueState.None);

												}
											}
										}

										Trkorrs
											.forEach(function (
												item, i,
												Trkorrs) {
												var oEntry = {};
												oEntry.Trkorr = item;
												oEntry.StatusCode = oComboBox
													.getSelectedKey();

												sap.ui
													.getCore()
													.getModel()
													.update(
														"/Query_registrySet('"
														+ oEntry.Trkorr
														+ "')",
														oEntry,
														{

															success: function () {

																var oModel = new sap.ui.model.odata.v2.ODataModel(
																	link,
																	{

																		useBatch: false,
																		defaultUpdateMethod: "Put"

																	});
																oModel
																	.setSizeLimit(500);
																sap.ui
																	.getCore()
																	.setModel(
																		oModel);
																oTable
																	.setModel(oModel);
																oForceDialog
																	.close();
																ConterText();
															},
															error: function (
																oError3) {

																var json = $
																	.parseJSON(oError3.responseText);
																var code = json.error.code;

																switch (code) {

																	case '01':

																		var dialogErr3 = new sap.m.Dialog(
																			{

																				title: "Ошибка",
																				type: sap.m.DialogType.Message,
																				state: 'Error',
																				content: new sap.m.Text(
																					{

																						text: 'У Вас недостаточно прав для переноса!'

																					}),
																				beginButton: new sap.m.Button(
																					{

																						text: 'OK',
																						press: function () {

																							dialogErr3
																								.close();

																						}
																					}),
																				afterClose: function () {

																					dialogErr3
																						.destroy();

																				}
																			});
																		dialogErr3
																			.open();
																		dialogErr3
																			.addStyleClass("mydialogErr2");

																		break;

																	default:

																		oForceDialog
																			.close();
																		jQuery.sap
																			.require("sap.m.MessageBox");
																		sap.m.MessageBox
																			.error(
																				"Ошибка при изменении статуса запроса!",
																				{

																					title: "Ошибка"
																				});

																}
															}
														});
											});

									}
								}));
					oForceDialog.addButton(

						new sap.m.Button({

							text: "Отмена",
							press: function () {

								oForceDialog.close();

							}
						}))
					oForceDialog.open();

				}
				;

				function history(Trkorr) {

					var oUpdateDialog = new sap.m.Dialog({

						title: "История запроса " + Trkorr,
						endButton: new sap.m.Button({

							text: "Закрыть",
							press: function () {

								oUpdateDialog.close();

							}
						})
					});

					var oTableWatch = new sap.ui.table.Table(
						{

							visibleRowCount: 7,
							selectionMode: sap.ui.table.SelectionMode.None,
							enableColumnReordering: false,

						});

					var oControl = new sap.m.Text({

						text: {

							path: "TimeOfAction",
							type: new sap.ui.model.type.DateTime({

								pattern: "dd-MM-yyyy HH:mm:ss",
								UTC: true

							})
						}
					});
					oTableWatch.addColumn(new sap.ui.table.Column({

						width: "30%",
						label: new sap.m.Label({
							text: "Отметка времени"
						}),
						template: oControl
					}));

					oControl = new sap.m.Text({
						text: "{ActionUser}"
					});
					oTableWatch.addColumn(new sap.ui.table.Column({

						label: new sap.m.Label({
							text: "Пользователь"
						}),
						template: oControl
					}));

					oControl = new sap.m.Text({

						text: "{ActionTxt}"
					});
					oTableWatch.addColumn(new sap.ui.table.Column({

						label: new sap.m.Label({
							text: "Действие"
						}),
						template: oControl
					}));

					var oModelHistory = new sap.ui.model.odata.v2.ODataModel(
						link, {

						useBatch: false,
						defaultUpdateMethod: "Put"

					});
					oModelHistory.setSizeLimit(500);
					sap.ui.getCore().setModel(oModelHistory);
					oTableWatch.setModel(oModelHistory);

					var oFilterWatch = new sap.ui.model.Filter(
						"Trkorr", sap.ui.model.FilterOperator.EQ,
						Trkorr);
					oTableWatch.bindRows("/HistorySet", undefined,
						undefined, [oFilterWatch]);

					var oSimpleForm = new sap.ui.layout.form.SimpleForm(
						{

							layout: sap.ui.layout.form.SimpleFormLayout.ResponsiveGridLayout,
							content: [

								oTableWatch,

							]
						});
					oUpdateDialog.addContent(oSimpleForm);
					oUpdateDialog.open();

				}

				function errorUnlocking(Trkorr) {

					var oEntry = {};
					oEntry.Trkorr = Trkorr;
					oEntry.StatusCode = "errorUnlocking";

					sap.ui
						.getCore()
						.getModel()
						.update(
							"/Query_registrySet('"
							+ oEntry.Trkorr + "')",
							oEntry,
							{

								success: function () {

									var oModel = new sap.ui.model.odata.v2.ODataModel(
										link,
										{

											useBatch: false,
											defaultUpdateMethod: "Put"

										});
									oModel.setSizeLimit(500);
									sap.ui.getCore().setModel(
										oModel);
									oTable.setModel(oModel);

								},
								error: function () {

									jQuery.sap
										.require("sap.m.MessageBox");
									sap.m.MessageBox
										.error(
											"Произошла ошибка при смене статуса запроса!",
											{

												title: "Ошибка"
											});

								}
							});
				}

				function oTestFail(Trkorr) {

					var oEntry = {};
					oEntry.Trkorr = Trkorr;
					oEntry.Icon = "sap-icon://sys-cancel-2";
					sap.ui
						.getCore()
						.getModel()
						.update(
							"/Query_registrySet('"
							+ oEntry.Trkorr + "')",
							oEntry,
							{

								success: function () {

									var oModel = new sap.ui.model.odata.v2.ODataModel(
										link,
										{

											useBatch: false,
											defaultUpdateMethod: "Put"

										});
									oModel.setSizeLimit(500);
									sap.ui.getCore().setModel(
										oModel);
									oTable.setModel(oModel);

								},
								error: function () {

									var oModel = new sap.ui.model.odata.v2.ODataModel(
										link,
										{

											useBatch: false,
											defaultUpdateMethod: "Put"

										});
									oModel.setSizeLimit(500);
									sap.ui.getCore().setModel(
										oModel);
									oTable.setModel(oModel);
									jQuery.sap
										.require("sap.m.MessageBox");
									sap.m.MessageBox
										.error(
											"Ошибка при изменении статуса запроса!",
											{

												title: "Ошибка"
											});

								}
							});
				}

				function oDontPush(Trkorr) {

					var oEntry = {};
					oEntry.Trkorr = Trkorr;
					oEntry.Icon = "sap-icon://locked";
					sap.ui
						.getCore()
						.getModel()
						.update(
							"/Query_registrySet('"
							+ oEntry.Trkorr + "')",
							oEntry,
							{

								success: function () {

									var oModel = new sap.ui.model.odata.v2.ODataModel(
										link,
										{

											useBatch: false,
											defaultUpdateMethod: "Put"

										});
									oModel.setSizeLimit(500);
									sap.ui.getCore().setModel(
										oModel);
									oTable.setModel(oModel);

								},
								error: function () {

									var oModel = new sap.ui.model.odata.v2.ODataModel(
										link,
										{

											useBatch: false,
											defaultUpdateMethod: "Put"

										});
									oModel.setSizeLimit(500);
									sap.ui.getCore().setModel(
										oModel);
									oTable.setModel(oModel);
									jQuery.sap
										.require("sap.m.MessageBox");
									sap.m.MessageBox
										.error(
											"Ошибка при изменении статуса запроса!",
											{

												title: "Ошибка"
											});

								}
							});
				}

				function Search(oEvent) {

					var data = oEvent.getSource().getValue();
					var oFilterSearch = new sap.ui.model.Filter(
						"Trkorr", sap.ui.model.FilterOperator.EQ,
						data);

					switch (typeTable) {

						case 'for':

							var oFilterStatus = new sap.ui.model.Filter(
								"StatusCode",
								sap.ui.model.FilterOperator.EQ, '02');
							break;

						case 'approve':

							var oFilterStatus = new sap.ui.model.Filter(
								"StatusCode",
								sap.ui.model.FilterOperator.EQ, '03');
							break;

						case 'into':

							var oFilterStatus = new sap.ui.model.Filter(
								"StatusCode",
								sap.ui.model.FilterOperator.EQ, '04');
							break;

						case 'eCATT':

							var oFilterStatus = new sap.ui.model.Filter(
								"StatusCode",
								sap.ui.model.FilterOperator.EQ, '14');
							break;

					}

					var oFilterAll = new sap.ui.model.Filter([
						oFilterSearch, oFilterStatus], true);
					oTable.bindRows("/Query_registrySet", undefined,
						undefined, [oFilterAll]);
					oTable
						.setVisibleRowCountMode(sap.ui.table.VisibleRowCountMode.Fixed);
					oTable.setVisibleRowCount(calcRowCount());
					oTable
						.setVisibleRowCountMode(sap.ui.table.VisibleRowCountMode.Auto);
				}

				return oTable;

			},

			/**
			 * Similar to onAfterRendering, but this hook is invoked before
			 * the controller's View is re-rendered (NOT before the first
			 * rendering! onInit() is used for that one!).
			 * 
			 * @memberOf queryregistry.Registry.TestSl
			 */
			// onBeforeRendering: function() {
			//
			// },
			changeBar: function () {
				jQuery.sap.require("jquery.sap.storage");
				this.oStorage = jQuery.sap
					.storage(jQuery.sap.storage.Type.local);
				var link = this.oStorage.get("IDSystemLink");
				var oModel = new sap.ui.model.odata.ODataModel(link, false);
				var tabBar = sap.ui.getCore().byId("TabBarTest");
				var itemsBar = tabBar.getItems();
				var oJsonModel = new sap.ui.model.json.JSONModel();

				var aFltDET = [new sap.ui.model.Filter({
					path: "StatusCode",
					operator: sap.ui.model.FilterOperator.EQ,
					value1: '02'
				}),
				];

				var aFltDETT = [new sap.ui.model.Filter({
					path: "StatusCode",
					operator: sap.ui.model.FilterOperator.EQ,
					value1: '03'
				}),
				];

				var aFltDET3 = [new sap.ui.model.Filter({
					path: "StatusCode",
					operator: sap.ui.model.FilterOperator.EQ,
					value1: '04'
				}),
				];

				var aFltDETecatt = [new sap.ui.model.Filter({
					path: "StatusCode",
					operator: sap.ui.model.FilterOperator.EQ,
					value1: '14'
				}),
				];


				var oModel = new sap.ui.model.odata.ODataModel(link, false);
				oModel.read("/Query_registrySet", {
					filters: aFltDET,
					async: false,
					success: function (oData, response) {
						oJsonModel.setData(oData);
					}
				});

				var oJsonModelT = new sap.ui.model.json.JSONModel();
				oModel.read("/Query_registrySet", {
					filters: aFltDETT,
					async: false,
					success: function (oData, response) {
						oJsonModelT.setData(oData);
					}
				});

				var oJsonModelT3 = new sap.ui.model.json.JSONModel();
				oModel.read("/Query_registrySet", {
					filters: aFltDET3,
					async: false,
					success: function (oData, response) {
						oJsonModelT3.setData(oData);
					}
				});

				var oJsonModelT4 = new sap.ui.model.json.JSONModel();
				oModel.read("/Query_registrySet", {
					filters: aFltDETecatt,
					async: false,
					success: function (oData, response) {
						oJsonModelT4.setData(oData);
					}
				});

				itemsBar[0].setText("К переносу в DET " + "(" + oJsonModel.oData.results.length + ")");
				itemsBar[1].setText("Перенос в DET одобрен " + "(" + oJsonModelT.oData.results.length + ")");
				itemsBar[2].setText("в DET " + "(" + oJsonModelT3.oData.results.length + ")");
				itemsBar[3].setText("eCATT " + "(" + oJsonModelT4.oData.results.length + ")");

			},
			onInit: function () {
				this.changeBar();

			},
			/**
			 * Called when the View has been rendered (so its HTML is part
			 * of the document). Post-rendering manipulations of the HTML
			 * could be done here. This hook is the same one that SAPUI5
			 * controls get after being rendered.
			 * 
			 * @memberOf queryregistry.Registry.TestSl
			 */
			// onAfterRendering: function() {
			//
			// },
			/**
			 * Called when the Controller is destroyed. Use this one to free
			 * resources and finalize activities.
			 * 
			 * @memberOf queryregistry.Registry.TestSl
			 */
			// onExit: function() {
			//
			// }
		});