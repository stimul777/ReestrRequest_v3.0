   sap.ui.jsview("queryregistry.Mobile_version.TestDeMobile",
		{

 			/**
			 * Specifies the Controller belonging to this View. In the case that
			 * it is not implemented, or that "null" is returned, this View does
			 * not have a Controller.
			 * 
			 * @memberOf queryregistry.Mobile_version.TestDeMobile
			 */
			getControllerName : function() {
				return "queryregistry.Mobile_version.TestDeMobile";
			},

			/**
			 * Is initially called once after the Controller has been
			 * instantiated. It is the place where the UI is constructed. Since
			 * the Controller is given to this method, its event handlers can be
			 * attached right away.
			 * 
			 * @memberOf queryregistry.Mobile_version.TestDeMobile
			 */

			createContent : function(oController) {

				jQuery.sap.require("jquery.sap.storage");
				this.oStorage = jQuery.sap.storage(jQuery.sap.storage.Type.local);

				var self = this;

				var scrollContainer = sap.ui.getCore().byId('scroll');
				var oTableColumn = sap.ui.getCore().byId('TableColumn');
				var oToolbar = sap.ui.getCore().byId('ToolBar');
				var tabBar = new sap.m.IconTabBar({
					expandable : false,
					items : [
						new sap.m.IconTabFilter({
							key: "idT",
							text : "К переносу в DET",
							content : oController.createTestTable("idT",
									oController, this, 'for')
						}),
						new sap.m.IconTabFilter({
							key: "idT1",
							text : "Перенос в DET одобрен",
							content : oController.createTestTable("idT1",
									oController, this, 'approve')
						}),
						new sap.m.IconTabFilter({
							key: "idT2",
							text : "В DET",
							content : oController.createTestTable("idT2",
									oController, this, 'into')
						}),
						new sap.m.IconTabFilter({
							key: "idT3",
							text : "eCATT",
							content : oController.createTestTable("idT3",
									oController, this, 'eCATT')
						})

				],
				
				});
				var Title = new sap.m.Label({
					text : "Разработка(DE)"
				});

				var MenuButton = new sap.m.Button({
					enabled : true,
					visible : "{device>/isPhone}",
					icon : "sap-icon://nav-back",
					press : function() {

						var oSplitApp = sap.ui.getCore().byId(
								'workDeskSplitApp');
						oSplitApp.backToPage("registry_de");

					}

				});
				// var PopoverExit = new sap.m.Popover({
				// // placement : sap.m.PlacementType.Bottom,
				// // title : this.oStorage.get("IDName"),
				// // contentWidth : "200px",
				var PopoverExit = new sap.m.Toolbar({
					content : new sap.m.Button({
						text : "Выход",
						icon : "sap-icon://visits",
						press : function() {
							sap.ui.controller("queryregistry.WorkDesk")
									.logoff();
						}
					}).addStyleClass("myButtonExit")
				});

				var ButtonExit = new sap.m.Button({
					icon : "sap-icon://visits",
					press : function() {
						sap.ui.controller("queryregistry.WorkDesk").logoff();
					}
				});

				var headerBar = new sap.m.Bar({
					contentLeft : MenuButton,
					contentMiddle : Title,

					contentRight : [ ButtonExit, ],
					design : sap.m.BarDesign.Header
				});

				var headerBarUser = new sap.m.Bar({

					contentMiddle : [ new sap.m.Label({
						text : "Пользователь: "
					}), new sap.m.Label({
						text : this.oStorage.get("IDName")
					}) ],
				// design: sap.m.BarDesign.Header
				}).addStyleClass("myToolBarUser");

				var pageDev = new sap.m.Page({
					// enableScrolling: false,
					showHeader : true,
					showSubHeader : true,
					customHeader : headerBar,
					subHeader : headerBarUser,
					content : [ tabBar ]

				}).addStyleClass("myPageBackgoundColor");
				// addStyleClass("sapUiBody");

				return pageDev;
			}

		});