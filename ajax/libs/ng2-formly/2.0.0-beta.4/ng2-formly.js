var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
var __metadata = (this && this.__metadata) || function (k, v) {
    if (typeof Reflect === "object" && typeof Reflect.metadata === "function") return Reflect.metadata(k, v);
};
var __extends = (this && this.__extends) || function (d, b) {
    for (var p in b) if (b.hasOwnProperty(p)) d[p] = b[p];
    function __() { this.constructor = d; }
    d.prototype = b === null ? Object.create(b) : (__.prototype = b.prototype, new __());
};
var __param = (this && this.__param) || function (paramIndex, decorator) {
    return function (target, key) { decorator(target, key, paramIndex); }
};
System.register("components/formly.common.component", ["@angular/core"], function(exports_1, context_1) {
    "use strict";
    var __moduleName = context_1 && context_1.id;
    var core_1;
    var FormlyCommon;
    return {
        setters:[
            function (core_1_1) {
                core_1 = core_1_1;
            }],
        execute: function() {
            FormlyCommon = (function () {
                function FormlyCommon() {
                    this.formSubmit = new core_1.EventEmitter();
                }
                FormlyCommon.prototype.changeFunction = function (value, field) {
                    this.model[field.key] = value;
                    this.formSubmit.emit(value);
                };
                __decorate([
                    core_1.Input(), 
                    __metadata('design:type', Object)
                ], FormlyCommon.prototype, "model", void 0);
                __decorate([
                    core_1.Output(), 
                    __metadata('design:type', Object)
                ], FormlyCommon.prototype, "formSubmit", void 0);
                return FormlyCommon;
            }());
            exports_1("FormlyCommon", FormlyCommon);
        }
    }
});
System.register("services/formly.config", ["@angular/core"], function(exports_2, context_2) {
    "use strict";
    var __moduleName = context_2 && context_2.id;
    var core_2;
    var FormlyConfig;
    return {
        setters:[
            function (core_2_1) {
                core_2 = core_2_1;
            }],
        execute: function() {
            FormlyConfig = (function () {
                function FormlyConfig() {
                    this.types = {};
                }
                FormlyConfig.prototype.setType = function (options) {
                    this.types[options.name] = options.component;
                };
                FormlyConfig.prototype.getDirectives = function () {
                    return this.types;
                };
                FormlyConfig = __decorate([
                    core_2.Injectable(), 
                    __metadata('design:paramtypes', [])
                ], FormlyConfig);
                return FormlyConfig;
            }());
            exports_2("FormlyConfig", FormlyConfig);
        }
    }
});
System.register("services/formly.event.emitter", ["rxjs/Subject"], function(exports_3, context_3) {
    "use strict";
    var __moduleName = context_3 && context_3.id;
    var Subject_1;
    var FormlyEventEmitter, FormlyPubSub;
    return {
        setters:[
            function (Subject_1_1) {
                Subject_1 = Subject_1_1;
            }],
        execute: function() {
            FormlyEventEmitter = (function (_super) {
                __extends(FormlyEventEmitter, _super);
                function FormlyEventEmitter() {
                    _super.call(this);
                }
                FormlyEventEmitter.prototype.emit = function (value) {
                    _super.prototype.next.call(this, value);
                };
                return FormlyEventEmitter;
            }(Subject_1.Subject));
            exports_3("FormlyEventEmitter", FormlyEventEmitter);
            FormlyPubSub = (function () {
                function FormlyPubSub() {
                    this.emitters = {};
                    this.updated = false;
                    this.Stream = new FormlyEventEmitter();
                }
                FormlyPubSub.prototype.getUpdated = function () {
                    return this.updated;
                };
                FormlyPubSub.prototype.setUpdated = function (value) {
                    this.updated = value;
                };
                FormlyPubSub.prototype.setEmitter = function (key, emitter) {
                    this.emitters[key] = emitter;
                };
                FormlyPubSub.prototype.getEmitter = function (key) {
                    return this.emitters[key];
                };
                return FormlyPubSub;
            }());
            exports_3("FormlyPubSub", FormlyPubSub);
        }
    }
});
System.register("services/formly.expression", [], function(exports_4, context_4) {
    "use strict";
    var __moduleName = context_4 && context_4.id;
    function evalExpression(expression, thisArg, argNames, argVal) {
        return Function.bind.apply(Function, [void 0].concat(argNames.concat("return " + expression + ";")))().apply(thisArg, argVal);
    }
    exports_4("evalExpression", evalExpression);
    function expressionValueSetter(expression, expressionValue, thisArg, argNames, argVal) {
        return Function.bind.apply(Function, [void 0].concat(["expressionValue"].concat(argNames.concat(expression + "= expressionValue;"))))().apply(thisArg, [expressionValue].concat(argVal));
    }
    exports_4("expressionValueSetter", expressionValueSetter);
    return {
        setters:[],
        execute: function() {
        }
    }
});
System.register("services/formly.field.delegates", ["services/formly.expression"], function(exports_5, context_5) {
    "use strict";
    var __moduleName = context_5 && context_5.id;
    var formly_expression_1;
    var FormlyFieldVisibilityDelegate, FormlyFieldExpressionDelegate;
    return {
        setters:[
            function (formly_expression_1_1) {
                formly_expression_1 = formly_expression_1_1;
            }],
        execute: function() {
            FormlyFieldVisibilityDelegate = (function () {
                function FormlyFieldVisibilityDelegate(formlyField) {
                    this.formlyField = formlyField;
                }
                FormlyFieldVisibilityDelegate.prototype.eval = function (expression) {
                    if (expression instanceof Function) {
                        return expression();
                    }
                    else if (typeof expression === "string") {
                        return formly_expression_1.evalExpression(expression, this.formlyField, ["model", "fieldModel"], [this.formlyField.model, this.formlyField.model[this.formlyField.key]]);
                    }
                    else {
                        return expression ? true : false;
                    }
                };
                FormlyFieldVisibilityDelegate.prototype.hasHideExpression = function () {
                    return (this.formlyField.field.hideExpression !== undefined) && this.formlyField.field.hideExpression ? true : false;
                };
                FormlyFieldVisibilityDelegate.prototype.checkVisibilityChange = function () {
                    var hideExpressionResult = this.eval(this.formlyField.field.hideExpression);
                    if (hideExpressionResult !== this.formlyField.isHidden()) {
                        this.formlyField.setHidden(hideExpressionResult);
                    }
                };
                return FormlyFieldVisibilityDelegate;
            }());
            exports_5("FormlyFieldVisibilityDelegate", FormlyFieldVisibilityDelegate);
            FormlyFieldExpressionDelegate = (function () {
                function FormlyFieldExpressionDelegate(formlyField) {
                    this.formlyField = formlyField;
                }
                FormlyFieldExpressionDelegate.prototype.checkExpressionChange = function () {
                    var expressionProperties = this.formlyField.field.expressionProperties;
                    if (expressionProperties) {
                        for (var key in expressionProperties) {
                            var expressionValue = formly_expression_1.evalExpression(expressionProperties[key], this.formlyField, ["model", "fieldModel"], [this.formlyField.model, this.formlyField.model[this.formlyField.key]]);
                            formly_expression_1.expressionValueSetter(key, expressionValue, this.formlyField, ["model", "fieldModel", "templateOptions"], [this.formlyField.model, this.formlyField.model[this.formlyField.key], this.formlyField.field.templateOptions]);
                        }
                    }
                };
                return FormlyFieldExpressionDelegate;
            }());
            exports_5("FormlyFieldExpressionDelegate", FormlyFieldExpressionDelegate);
        }
    }
});
System.register("components/formly.field.config", [], function(exports_6, context_6) {
    "use strict";
    var __moduleName = context_6 && context_6.id;
    return {
        setters:[],
        execute: function() {
        }
    }
});
System.register("components/formly.field", ["@angular/core", "components/formly.common.component", "services/formly.config", "services/formly.event.emitter", "services/formly.field.delegates"], function(exports_7, context_7) {
    "use strict";
    var __moduleName = context_7 && context_7.id;
    var core_3, formly_common_component_1, formly_config_1, formly_event_emitter_1, formly_field_delegates_1;
    var DivComponent, FormlyField;
    return {
        setters:[
            function (core_3_1) {
                core_3 = core_3_1;
            },
            function (formly_common_component_1_1) {
                formly_common_component_1 = formly_common_component_1_1;
            },
            function (formly_config_1_1) {
                formly_config_1 = formly_config_1_1;
            },
            function (formly_event_emitter_1_1) {
                formly_event_emitter_1 = formly_event_emitter_1_1;
            },
            function (formly_field_delegates_1_1) {
                formly_field_delegates_1 = formly_field_delegates_1_1;
            }],
        execute: function() {
            DivComponent = (function () {
                function DivComponent(viewContainer) {
                    this.viewContainer = viewContainer;
                }
                DivComponent = __decorate([
                    core_3.Directive({
                        selector: "[child-host]"
                    }), 
                    __metadata('design:paramtypes', [core_3.ViewContainerRef])
                ], DivComponent);
                return DivComponent;
            }());
            exports_7("DivComponent", DivComponent);
            FormlyField = (function (_super) {
                __extends(FormlyField, _super);
                function FormlyField(elem, fc, ps, cr) {
                    _super.call(this);
                    this.elem = elem;
                    this.ps = ps;
                    this.cr = cr;
                    this.changeFn = new core_3.EventEmitter();
                    this.directives = fc.getDirectives();
                    this.visibilityDelegate = new formly_field_delegates_1.FormlyFieldVisibilityDelegate(this);
                    this.expressionDelegate = new formly_field_delegates_1.FormlyFieldExpressionDelegate(this);
                }
                FormlyField.prototype.ngOnInit = function () {
                    this.createChilds();
                };
                FormlyField.prototype.ngAfterViewInit = function () { };
                FormlyField.prototype.createChilds = function () {
                    var _this = this;
                    this.hide = this.field.hideExpression ? true : false;
                    if (!this.field.template && !this.field.fieldGroup) {
                        this.update = new formly_event_emitter_1.FormlyEventEmitter();
                        this.ps.setEmitter(this.key, this.update);
                        this.cr.resolveComponent(this.directives[this.field.type])
                            .then(function (cf) {
                            var ref = _this.myChild.viewContainer.createComponent(cf);
                            ref.instance.model = _this.model[_this.field.key];
                            ref.instance.type = _this.field.type;
                            ref.instance.templateOptions = _this.field.templateOptions;
                            ref.instance.changeFn.subscribe(function (value) {
                                _this.changeFn.emit(value);
                            });
                            ref.instance.key = _this.key;
                            ref.instance.form = _this.form;
                            ref.instance.update = _this.update;
                            ref.instance.field = _this.field;
                            _this.form.addControl(_this.key, ref.instance.formControl);
                        });
                    }
                };
                FormlyField.prototype.isHidden = function () {
                    return this.hide;
                };
                FormlyField.prototype.setHidden = function (cond) {
                    this.hide = cond;
                    this.elem.nativeElement.style.display = cond ? "none" : "";
                    if (this.field.fieldGroup) {
                        for (var i = 0; i < this.field.fieldGroup.length; i++) {
                            this.psEmit(this.field.fieldGroup[i].key, "hidden", this.hide);
                        }
                    }
                    else {
                        this.psEmit(this.field.key, "hidden", this.hide);
                    }
                    this.eventEmitter.emit({
                        key: this.field.key,
                        value: this.hide
                    });
                };
                FormlyField.prototype.ngDoCheck = function () {
                    this.visibilityDelegate.checkVisibilityChange();
                    this.expressionDelegate.checkExpressionChange();
                };
                FormlyField.prototype.psEmit = function (fieldKey, eventKey, value) {
                    if (this.ps && this.ps.getEmitter(fieldKey) && this.ps.getEmitter(fieldKey).emit) {
                        this.ps.getEmitter(fieldKey).emit({
                            key: eventKey,
                            value: value
                        });
                    }
                };
                __decorate([
                    core_3.Input(), 
                    __metadata('design:type', Object)
                ], FormlyField.prototype, "model", void 0);
                __decorate([
                    core_3.Input(), 
                    __metadata('design:type', Object)
                ], FormlyField.prototype, "key", void 0);
                __decorate([
                    core_3.Input(), 
                    __metadata('design:type', Object)
                ], FormlyField.prototype, "form", void 0);
                __decorate([
                    core_3.Input(), 
                    __metadata('design:type', Object)
                ], FormlyField.prototype, "field", void 0);
                __decorate([
                    core_3.Input(), 
                    __metadata('design:type', Object)
                ], FormlyField.prototype, "eventEmitter", void 0);
                __decorate([
                    core_3.Output(), 
                    __metadata('design:type', core_3.EventEmitter)
                ], FormlyField.prototype, "changeFn", void 0);
                __decorate([
                    core_3.ViewChild(DivComponent), 
                    __metadata('design:type', DivComponent)
                ], FormlyField.prototype, "myChild", void 0);
                FormlyField = __decorate([
                    core_3.Component({
                        selector: "formly-field",
                        template: "\n        <div child-host #child></div>\n        <div *ngIf=\"field.template\" [innerHtml]=\"field.template\"></div>\n        <div class=\"formly-field\"\n          *ngFor=\"let field of field.fieldGroup\">\n          <formly-field [hide]=\"field.hideExpression\" [model]=\"model\" [key]=\"field.key\" [form]=\"form\" [field]=\"field\"\n            (changeFn)=\"changeFunction($event, field)\" [ngClass]=\"field.className\" [eventEmitter]=\"eventEmitter\">\n          </formly-field>\n        </div> \n    ",
                        directives: [FormlyField, DivComponent]
                    }), 
                    __metadata('design:paramtypes', [core_3.ElementRef, formly_config_1.FormlyConfig, formly_event_emitter_1.FormlyPubSub, core_3.ComponentResolver])
                ], FormlyField);
                return FormlyField;
            }(formly_common_component_1.FormlyCommon));
            exports_7("FormlyField", FormlyField);
        }
    }
});
System.register("components/formly.form", ["@angular/core", "@angular/common", "components/formly.field", "services/formly.event.emitter", "components/formly.common.component"], function(exports_8, context_8) {
    "use strict";
    var __moduleName = context_8 && context_8.id;
    var core_4, common_1, formly_field_1, formly_event_emitter_2, formly_common_component_2;
    var FormlyForm;
    return {
        setters:[
            function (core_4_1) {
                core_4 = core_4_1;
            },
            function (common_1_1) {
                common_1 = common_1_1;
            },
            function (formly_field_1_1) {
                formly_field_1 = formly_field_1_1;
            },
            function (formly_event_emitter_2_1) {
                formly_event_emitter_2 = formly_event_emitter_2_1;
            },
            function (formly_common_component_2_1) {
                formly_common_component_2 = formly_common_component_2_1;
            }],
        execute: function() {
            FormlyForm = (function (_super) {
                __extends(FormlyForm, _super);
                function FormlyForm(_fm, ps, fb) {
                    _super.call(this);
                    this._fm = _fm;
                    this.ps = ps;
                    this.fb = fb;
                    this.event = new formly_event_emitter_2.FormlyEventEmitter();
                }
                Object.defineProperty(FormlyForm.prototype, "fields", {
                    get: function () {
                        return this._fields;
                    },
                    set: function (value) {
                        this._fields = value;
                        this.ps.Stream.emit(this.form);
                    },
                    enumerable: true,
                    configurable: true
                });
                Object.defineProperty(FormlyForm.prototype, "model", {
                    get: function () {
                        return this._model;
                    },
                    set: function (value) {
                        this._model = value;
                        this.ps.Stream.emit(this.form);
                    },
                    enumerable: true,
                    configurable: true
                });
                ;
                FormlyForm.prototype.ngOnInit = function () {
                    if (!this.model) {
                        this.model = {};
                    }
                    this.form = this.fb.group({});
                };
                FormlyForm.prototype.changeFunction = function (value, field) {
                    this.model[field.key] = value;
                    this.formSubmit.emit(value);
                };
                __decorate([
                    core_4.Input(), 
                    __metadata('design:type', Array)
                ], FormlyForm.prototype, "fields", null);
                __decorate([
                    core_4.Input(), 
                    __metadata('design:type', Object)
                ], FormlyForm.prototype, "model", null);
                __decorate([
                    core_4.Input(), 
                    __metadata('design:type', common_1.ControlGroup)
                ], FormlyForm.prototype, "form", void 0);
                FormlyForm = __decorate([
                    core_4.Component({
                        selector: "formly-form",
                        directives: [formly_field_1.FormlyField],
                        template: "\n            <form class=\"formly\" role=\"form\" novalidate [ngFormModel]=\"form\">\n              <div class=\"formly-field\"\n                  *ngFor=\"let field of fields\"\n                  [ngClass]=\"field.className\">\n                  <formly-field [hide]=\"field.hideExpression\" [model]=\"model\" [key]=\"field.key\" [form]=\"form\" [field]=\"field\"\n                    (changeFn)=\"changeFunction($event, field)\" [eventEmitter]=\"event\">\n                  </formly-field>\n              </div>\n              <ng-content></ng-content>\n            </form>\n            ",
                        providers: [common_1.NgFormModel, formly_event_emitter_2.FormlyPubSub]
                    }), 
                    __metadata('design:paramtypes', [common_1.NgFormModel, formly_event_emitter_2.FormlyPubSub, common_1.FormBuilder])
                ], FormlyForm);
                return FormlyForm;
            }(formly_common_component_2.FormlyCommon));
            exports_8("FormlyForm", FormlyForm);
        }
    }
});
System.register("services/formly.messages", ["@angular/core", "@angular/common"], function(exports_9, context_9) {
    "use strict";
    var __moduleName = context_9 && context_9.id;
    var core_5, common_2;
    var FormlyMessages, FormlyMessage;
    return {
        setters:[
            function (core_5_1) {
                core_5 = core_5_1;
            },
            function (common_2_1) {
                common_2 = common_2_1;
            }],
        execute: function() {
            FormlyMessages = (function () {
                function FormlyMessages() {
                    this.messages = {};
                }
                FormlyMessages.prototype.addStringMessage = function (validator, message) {
                    this.messages[validator] = message;
                };
                FormlyMessages.prototype.getMessages = function () {
                    return this.messages;
                };
                FormlyMessages.prototype.getValidatorErrorMessage = function (prop) {
                    return this.messages[prop];
                };
                FormlyMessages = __decorate([
                    core_5.Injectable(), 
                    __metadata('design:paramtypes', [])
                ], FormlyMessages);
                return FormlyMessages;
            }());
            exports_9("FormlyMessages", FormlyMessages);
            FormlyMessage = (function () {
                function FormlyMessage(_formDir, fm) {
                    this._formDir = _formDir;
                    this.fm = fm;
                }
                Object.defineProperty(FormlyMessage.prototype, "errorMessage", {
                    get: function () {
                        var c = this._formDir.form.find(this.control);
                        for (var propertyName in c.errors) {
                            if (c.errors.hasOwnProperty(propertyName)) {
                                return this.fm.getValidatorErrorMessage(propertyName);
                            }
                        }
                        return null;
                    },
                    enumerable: true,
                    configurable: true
                });
                __decorate([
                    core_5.Input(), 
                    __metadata('design:type', String)
                ], FormlyMessage.prototype, "control", void 0);
                FormlyMessage = __decorate([
                    core_5.Component({
                        selector: "formly-message",
                        template: "<div *ngIf=\"errorMessage !== null\">{{errorMessage}}</div>"
                    }),
                    __param(0, core_5.Host()), 
                    __metadata('design:paramtypes', [common_2.NgFormModel, FormlyMessages])
                ], FormlyMessage);
                return FormlyMessage;
            }());
            exports_9("FormlyMessage", FormlyMessage);
        }
    }
});
System.register("services/formly.providers", ["services/formly.event.emitter", "services/formly.messages"], function(exports_10, context_10) {
    "use strict";
    var __moduleName = context_10 && context_10.id;
    var formly_event_emitter_3, formly_messages_1;
    var FormlyProviders;
    return {
        setters:[
            function (formly_event_emitter_3_1) {
                formly_event_emitter_3 = formly_event_emitter_3_1;
            },
            function (formly_messages_1_1) {
                formly_messages_1 = formly_messages_1_1;
            }],
        execute: function() {
            exports_10("FormlyProviders", FormlyProviders = [
                formly_event_emitter_3.FormlyPubSub,
                formly_messages_1.FormlyMessages
            ]);
        }
    }
});
System.register("services/formly.processor", [], function(exports_11, context_11) {
    "use strict";
    var __moduleName = context_11 && context_11.id;
    var FormlyConfigProcessor, FormlyConfigValidator;
    return {
        setters:[],
        execute: function() {
            FormlyConfigProcessor = (function () {
                function FormlyConfigProcessor() {
                    this.visitors = [new FormlyConfigValidator()];
                }
                FormlyConfigProcessor.prototype.process = function (fieldConfigs) {
                    var _this = this;
                    fieldConfigs.forEach(function (field) {
                        _this.visitors.forEach(function (visitor) {
                            visitor.visit(field);
                        });
                    });
                };
                return FormlyConfigProcessor;
            }());
            exports_11("FormlyConfigProcessor", FormlyConfigProcessor);
            FormlyConfigValidator = (function () {
                function FormlyConfigValidator() {
                }
                FormlyConfigValidator.prototype.visit = function (field) { };
                return FormlyConfigValidator;
            }());
        }
    }
});
System.register("core", ["components/formly.common.component", "components/formly.field", "components/formly.form", "services/formly.config", "services/formly.event.emitter", "services/formly.messages", "services/formly.field.delegates", "services/formly.providers", "services/formly.processor"], function(exports_12, context_12) {
    "use strict";
    var __moduleName = context_12 && context_12.id;
    return {
        setters:[
            function (formly_common_component_3_1) {
                exports_12({
                    "FormlyCommon": formly_common_component_3_1["FormlyCommon"]
                });
            },
            function (formly_field_2_1) {
                exports_12({
                    "FormlyField": formly_field_2_1["FormlyField"]
                });
            },
            function (formly_form_1_1) {
                exports_12({
                    "FormlyForm": formly_form_1_1["FormlyForm"]
                });
            },
            function (formly_config_2_1) {
                exports_12({
                    "FormlyConfig": formly_config_2_1["FormlyConfig"]
                });
            },
            function (formly_event_emitter_4_1) {
                exports_12({
                    "FormlyPubSub": formly_event_emitter_4_1["FormlyPubSub"],
                    "FormlyEventEmitter": formly_event_emitter_4_1["FormlyEventEmitter"]
                });
            },
            function (formly_messages_2_1) {
                exports_12({
                    "FormlyMessage": formly_messages_2_1["FormlyMessage"],
                    "FormlyMessages": formly_messages_2_1["FormlyMessages"]
                });
            },
            function (formly_field_delegates_2_1) {
                exports_12({
                    "FormlyFieldVisibilityDelegate": formly_field_delegates_2_1["FormlyFieldVisibilityDelegate"]
                });
            },
            function (formly_providers_1_1) {
                exports_12({
                    "FormlyProviders": formly_providers_1_1["FormlyProviders"]
                });
            },
            function (formly_processor_1_1) {
                exports_12({
                    "FormlyConfigProcessor": formly_processor_1_1["FormlyConfigProcessor"]
                });
            }],
        execute: function() {
        }
    }
});
System.register("templates/field", ["@angular/core", "@angular/common"], function(exports_13, context_13) {
    "use strict";
    var __moduleName = context_13 && context_13.id;
    var core_6, common_3;
    var Field;
    return {
        setters:[
            function (core_6_1) {
                core_6 = core_6_1;
            },
            function (common_3_1) {
                common_3 = common_3_1;
            }],
        execute: function() {
            Field = (function () {
                function Field(fm, ps) {
                    var _this = this;
                    this.ps = ps;
                    this.changeFn = new core_6.EventEmitter();
                    this.messages = fm.getMessages();
                    this.ps.Stream.subscribe(function (form) {
                        _this.form = form;
                    });
                }
                Field.prototype.ngOnInit = function () {
                    var _this = this;
                    if (this.update) {
                        this.update.subscribe(function (update) {
                            _this.templateOptions[update.key] = update.value;
                        });
                    }
                };
                Field.prototype.inputChange = function (e, val) {
                    this.changeFn.emit(e.target[val]);
                    this.ps.setUpdated(true);
                };
                Object.defineProperty(Field.prototype, "formControl", {
                    get: function () {
                        if (!this._control) {
                            this._control = this.createControl();
                        }
                        return this._control;
                    },
                    enumerable: true,
                    configurable: true
                });
                Field.prototype.createControl = function () {
                    return new common_3.Control(this.model || "", this.field.validation);
                };
                __decorate([
                    core_6.Input(), 
                    __metadata('design:type', Object)
                ], Field.prototype, "form", void 0);
                __decorate([
                    core_6.Input(), 
                    __metadata('design:type', Object)
                ], Field.prototype, "update", void 0);
                __decorate([
                    core_6.Input(), 
                    __metadata('design:type', Object)
                ], Field.prototype, "templateOptions", void 0);
                __decorate([
                    core_6.Input(), 
                    __metadata('design:type', String)
                ], Field.prototype, "key", void 0);
                __decorate([
                    core_6.Input(), 
                    __metadata('design:type', Object)
                ], Field.prototype, "field", void 0);
                __decorate([
                    core_6.Output(), 
                    __metadata('design:type', core_6.EventEmitter)
                ], Field.prototype, "changeFn", void 0);
                return Field;
            }());
            exports_13("Field", Field);
        }
    }
});
System.register("templates/formlyfield.checkbox", ["@angular/core", "templates/field", "services/formly.messages", "services/formly.event.emitter", "@angular/common"], function(exports_14, context_14) {
    "use strict";
    var __moduleName = context_14 && context_14.id;
    var core_7, field_1, formly_messages_3, formly_event_emitter_5, common_4;
    var FormlyFieldCheckbox;
    return {
        setters:[
            function (core_7_1) {
                core_7 = core_7_1;
            },
            function (field_1_1) {
                field_1 = field_1_1;
            },
            function (formly_messages_3_1) {
                formly_messages_3 = formly_messages_3_1;
            },
            function (formly_event_emitter_5_1) {
                formly_event_emitter_5 = formly_event_emitter_5_1;
            },
            function (common_4_1) {
                common_4 = common_4_1;
            }],
        execute: function() {
            FormlyFieldCheckbox = (function (_super) {
                __extends(FormlyFieldCheckbox, _super);
                function FormlyFieldCheckbox(fm, ps, formBuilder) {
                    _super.call(this, fm, ps);
                    this.formBuilder = formBuilder;
                }
                FormlyFieldCheckbox.prototype.createControl = function () {
                    return this.formBuilder.control(this.model[this.key] ? "on" : undefined);
                };
                FormlyFieldCheckbox = __decorate([
                    core_7.Component({
                        selector: "formly-field-checkbox",
                        template: "\n    <div class=\"form-group\">\n      <div [ngFormModel]=\"form\">\n        <label class=\"c-input c-checkbox\">\n          <input type=\"checkbox\" [ngControl]=\"key\" (change)=\"inputChange($event, 'checked')\"\n            *ngIf=\"!templateOptions.hidden\" [disabled]=\"templateOptions.disabled\" value=\"on\"> {{templateOptions.label}}\n            <span class=\"c-indicator\"></span>\n          </label>\n      </div>\n      <small class=\"text-muted\">{{templateOptions.description}}</small>\n    </div>\n    "
                    }), 
                    __metadata('design:paramtypes', [formly_messages_3.FormlyMessages, formly_event_emitter_5.FormlyPubSub, common_4.FormBuilder])
                ], FormlyFieldCheckbox);
                return FormlyFieldCheckbox;
            }(field_1.Field));
            exports_14("FormlyFieldCheckbox", FormlyFieldCheckbox);
        }
    }
});
System.register("templates/formlyfield.multicheckbox", ["@angular/core", "services/formly.event.emitter", "services/formly.messages", "templates/field", "@angular/common"], function(exports_15, context_15) {
    "use strict";
    var __moduleName = context_15 && context_15.id;
    var core_8, formly_event_emitter_6, formly_messages_4, field_2, common_5;
    var FormlyFieldMultiCheckbox;
    return {
        setters:[
            function (core_8_1) {
                core_8 = core_8_1;
            },
            function (formly_event_emitter_6_1) {
                formly_event_emitter_6 = formly_event_emitter_6_1;
            },
            function (formly_messages_4_1) {
                formly_messages_4 = formly_messages_4_1;
            },
            function (field_2_1) {
                field_2 = field_2_1;
            },
            function (common_5_1) {
                common_5 = common_5_1;
            }],
        execute: function() {
            FormlyFieldMultiCheckbox = (function (_super) {
                __extends(FormlyFieldMultiCheckbox, _super);
                function FormlyFieldMultiCheckbox(fm, fps, formBuilder) {
                    _super.call(this, fm, fps);
                    this.fps = fps;
                    this.formBuilder = formBuilder;
                }
                FormlyFieldMultiCheckbox.prototype.inputChange = function (e, val) {
                    this.model[val] = e.target.checked;
                    this.changeFn.emit(this.model);
                    this.fps.setUpdated(true);
                };
                FormlyFieldMultiCheckbox.prototype.createControl = function () {
                    var _this = this;
                    var controlGroupConfig = this.templateOptions.options.reduce(function (previous, option) {
                        previous[option.key] = [_this.model ? _this.model[option.key] : undefined];
                        return previous;
                    }, {});
                    return this.formBuilder.group(controlGroupConfig);
                };
                __decorate([
                    core_8.Input(), 
                    __metadata('design:type', Object)
                ], FormlyFieldMultiCheckbox.prototype, "model", void 0);
                FormlyFieldMultiCheckbox = __decorate([
                    core_8.Component({
                        selector: "formly-field-multicheckbox",
                        template: "\n        <div [ngFormModel]=\"form\">\n            <div [ngControlGroup]=\"key\" class=\"form-group\">\n                <label class=\"form-control-label\" for=\"\">{{templateOptions.label}}</label>\n                <div *ngFor=\"let option of templateOptions.options\">\n                    <label class=\"c-input c-radio\">\n                        <input type=\"checkbox\" name=\"choose\" value=\"{{option.value}}\" [ngControl]=\"option.key\" (change)=\"inputChange($event, option.key)\">{{option.value}}\n                        <span class=\"c-indicator\"></span>\n                    </label>\n                </div>\n                <small class=\"text-muted\">{{templateOptions.description}}</small>\n            </div>\n        </div>\n    "
                    }), 
                    __metadata('design:paramtypes', [formly_messages_4.FormlyMessages, formly_event_emitter_6.FormlyPubSub, common_5.FormBuilder])
                ], FormlyFieldMultiCheckbox);
                return FormlyFieldMultiCheckbox;
            }(field_2.Field));
            exports_15("FormlyFieldMultiCheckbox", FormlyFieldMultiCheckbox);
        }
    }
});
System.register("templates/formlyfield.input", ["@angular/core", "services/formly.messages", "services/formly.event.emitter", "templates/field"], function(exports_16, context_16) {
    "use strict";
    var __moduleName = context_16 && context_16.id;
    var core_9, formly_messages_5, formly_event_emitter_7, field_3;
    var FormlyFieldInput;
    return {
        setters:[
            function (core_9_1) {
                core_9 = core_9_1;
            },
            function (formly_messages_5_1) {
                formly_messages_5 = formly_messages_5_1;
            },
            function (formly_event_emitter_7_1) {
                formly_event_emitter_7 = formly_event_emitter_7_1;
            },
            function (field_3_1) {
                field_3 = field_3_1;
            }],
        execute: function() {
            FormlyFieldInput = (function (_super) {
                __extends(FormlyFieldInput, _super);
                function FormlyFieldInput(fm, ps, elem) {
                    _super.call(this, fm, ps);
                    this.elem = elem;
                }
                FormlyFieldInput.prototype.ngAfterViewInit = function () {
                    if (this.templateOptions.focus) {
                        this.elem.nativeElement.querySelector("input").focus();
                    }
                };
                FormlyFieldInput = __decorate([
                    core_9.Component({
                        selector: "formly-field-input",
                        template: "\n    <div class=\"form-group\" [ngFormModel]=\"form\" [ngClass]=\"{'has-danger': !formControl.valid}\" *ngIf=\"!templateOptions.hidden\">\n      <label attr.for=\"{{key}}\" class=\"form-control-label\">{{templateOptions.label}}</label>\n        <input type=\"{{templateOptions.type}}\" [ngControl]=\"key\" class=\"form-control\" id=\"{{key}}\"\n          placeholder=\"{{templateOptions.placeholder}}\" [disabled]=\"templateOptions.disabled\"\n          (keyup)=\"inputChange($event, 'value')\" (change)=\"inputChange($event, 'value')\"\n          [ngClass]=\"{'form-control-danger': !form.controls[key].valid}\">\n        <small class=\"text-muted\">{{templateOptions.description}}</small>\n        <small class=\"text-muted text-danger\"><formly-message [control]=\"key\"></formly-message></small>\n      </div>\n    ",
                        directives: [formly_messages_5.FormlyMessage]
                    }), 
                    __metadata('design:paramtypes', [formly_messages_5.FormlyMessages, formly_event_emitter_7.FormlyPubSub, core_9.ElementRef])
                ], FormlyFieldInput);
                return FormlyFieldInput;
            }(field_3.Field));
            exports_16("FormlyFieldInput", FormlyFieldInput);
        }
    }
});
System.register("templates/formlyfield.radio", ["@angular/core", "services/formly.event.emitter", "services/formly.messages", "templates/field", "@angular/common"], function(exports_17, context_17) {
    "use strict";
    var __moduleName = context_17 && context_17.id;
    var core_10, formly_event_emitter_8, formly_messages_6, field_4, common_6;
    var FormlyFieldRadio;
    return {
        setters:[
            function (core_10_1) {
                core_10 = core_10_1;
            },
            function (formly_event_emitter_8_1) {
                formly_event_emitter_8 = formly_event_emitter_8_1;
            },
            function (formly_messages_6_1) {
                formly_messages_6 = formly_messages_6_1;
            },
            function (field_4_1) {
                field_4 = field_4_1;
            },
            function (common_6_1) {
                common_6 = common_6_1;
            }],
        execute: function() {
            FormlyFieldRadio = (function (_super) {
                __extends(FormlyFieldRadio, _super);
                function FormlyFieldRadio(fm, ps, formBuilder) {
                    _super.call(this, fm, ps);
                    this.formBuilder = formBuilder;
                }
                FormlyFieldRadio.prototype.createControl = function () {
                    var _this = this;
                    var controlGroupConfig = this.templateOptions.options.reduce(function (previous, option) {
                        previous[option.key] = [new common_6.RadioButtonState(_this.model === option.value, option.value)];
                        return previous;
                    }, {});
                    return this.formBuilder.group(controlGroupConfig);
                };
                FormlyFieldRadio = __decorate([
                    core_10.Component({
                        selector: "formly-field-radio",
                        template: "\n        <div [ngFormModel]=\"form\">\n          <div [ngControlGroup]=\"key\" class=\"form-group\">\n            <label class=\"form-control-label\" for=\"\">{{templateOptions.label}}</label>\n            <div *ngFor=\"let option of templateOptions.options\">\n              <label class=\"c-input c-radio\">\n                <input type=\"radio\" name=\"choose\" value=\"{{option.value}}\" [ngControl]=\"option.key\" (change)=\"inputChange($event, 'value')\">{{option.value}}\n                <span class=\"c-indicator\"></span>\n              </label>\n            </div>\n            <small class=\"text-muted\">{{templateOptions.description}}</small>\n          </div>\n        </div>\n        "
                    }), 
                    __metadata('design:paramtypes', [formly_messages_6.FormlyMessages, formly_event_emitter_8.FormlyPubSub, common_6.FormBuilder])
                ], FormlyFieldRadio);
                return FormlyFieldRadio;
            }(field_4.Field));
            exports_17("FormlyFieldRadio", FormlyFieldRadio);
        }
    }
});
System.register("templates/formlyfield.textarea", ["@angular/core", "services/formly.event.emitter", "services/formly.messages", "templates/field"], function(exports_18, context_18) {
    "use strict";
    var __moduleName = context_18 && context_18.id;
    var core_11, formly_event_emitter_9, formly_messages_7, field_5;
    var FormlyFieldTextArea;
    return {
        setters:[
            function (core_11_1) {
                core_11 = core_11_1;
            },
            function (formly_event_emitter_9_1) {
                formly_event_emitter_9 = formly_event_emitter_9_1;
            },
            function (formly_messages_7_1) {
                formly_messages_7 = formly_messages_7_1;
            },
            function (field_5_1) {
                field_5 = field_5_1;
            }],
        execute: function() {
            FormlyFieldTextArea = (function (_super) {
                __extends(FormlyFieldTextArea, _super);
                function FormlyFieldTextArea(fm, ps, elem) {
                    _super.call(this, fm, ps);
                    this.elem = elem;
                }
                FormlyFieldTextArea.prototype.ngAfterViewInit = function () {
                    if (this.templateOptions.focus) {
                        this.elem.nativeElement.querySelector("textarea").focus();
                    }
                };
                FormlyFieldTextArea = __decorate([
                    core_11.Component({
                        selector: "formly-field-textarea",
                        template: "\n    <fieldset class=\"form-group\" [ngFormModel]=\"form\" *ngIf=\"!templateOptions.hidden\">\n      <label attr.for=\"{{key}}\" class=\"form-control-label\">{{templateOptions.label}}</label>\n      <textarea name=\"{{key}}\" [ngControl]=\"key\" id=\"{{key}}\" cols=\"{{templateOptions.cols}}\"\n        rows=\"{{templateOptions.rows}}\" (change)=\"inputChange($event, 'value')\" (keyup)=\"inputChange($event, 'value')\"\n        placeholder=\"{{templateOptions.placeholder}}\" class=\"form-control\" [disabled]=\"templateOptions.disabled\"></textarea>\n      <small class=\"text-muted\">{{templateOptions.description}}</small>\n    </fieldset>"
                    }), 
                    __metadata('design:paramtypes', [formly_messages_7.FormlyMessages, formly_event_emitter_9.FormlyPubSub, core_11.ElementRef])
                ], FormlyFieldTextArea);
                return FormlyFieldTextArea;
            }(field_5.Field));
            exports_18("FormlyFieldTextArea", FormlyFieldTextArea);
        }
    }
});
System.register("templates/formlyfield.select", ["@angular/core", "services/formly.event.emitter", "services/formly.messages", "templates/field"], function(exports_19, context_19) {
    "use strict";
    var __moduleName = context_19 && context_19.id;
    var core_12, formly_event_emitter_10, formly_messages_8, field_6;
    var FormlyFieldSelect;
    return {
        setters:[
            function (core_12_1) {
                core_12 = core_12_1;
            },
            function (formly_event_emitter_10_1) {
                formly_event_emitter_10 = formly_event_emitter_10_1;
            },
            function (formly_messages_8_1) {
                formly_messages_8 = formly_messages_8_1;
            },
            function (field_6_1) {
                field_6 = field_6_1;
            }],
        execute: function() {
            FormlyFieldSelect = (function (_super) {
                __extends(FormlyFieldSelect, _super);
                function FormlyFieldSelect(fm, ps) {
                    _super.call(this, fm, ps);
                }
                FormlyFieldSelect = __decorate([
                    core_12.Component({
                        selector: "formly-field-select",
                        template: "\n        <div class=\"select\" [ngFormModel]=\"form\">\n          <label for=\"\" class=\"form-control-label\">{{templateOptions.label}}</label>\n          <select [id]=\"key\" [ngControl]=\"key\" (change)=\"inputChange($event, 'value')\" class=\"c-select\">\n            <option value=\"\" *ngIf=\"templateOptions.placeholder\">{{templateOptions.placeholder}}</option>\n            <option *ngFor=\"let opt of templateOptions.options\" [value]=\"opt.value\">{{opt.label}}</option>\n          </select>\n          <small class=\"text-muted\">{{templateOptions.description}}</small>\n        </div>\n    "
                    }), 
                    __metadata('design:paramtypes', [formly_messages_8.FormlyMessages, formly_event_emitter_10.FormlyPubSub])
                ], FormlyFieldSelect);
                return FormlyFieldSelect;
            }(field_6.Field));
            exports_19("FormlyFieldSelect", FormlyFieldSelect);
        }
    }
});
System.register("templates/templates", ["templates/formlyfield.input", "templates/formlyfield.checkbox", "templates/formlyfield.radio", "templates/formlyfield.select", "templates/formlyfield.textarea", "templates/formlyfield.multicheckbox"], function(exports_20, context_20) {
    "use strict";
    var __moduleName = context_20 && context_20.id;
    var formlyfield_input_1, formlyfield_checkbox_1, formlyfield_radio_1, formlyfield_select_1, formlyfield_textarea_1, formlyfield_multicheckbox_1;
    var TemplateDirectives;
    return {
        setters:[
            function (formlyfield_input_1_1) {
                formlyfield_input_1 = formlyfield_input_1_1;
            },
            function (formlyfield_checkbox_1_1) {
                formlyfield_checkbox_1 = formlyfield_checkbox_1_1;
            },
            function (formlyfield_radio_1_1) {
                formlyfield_radio_1 = formlyfield_radio_1_1;
            },
            function (formlyfield_select_1_1) {
                formlyfield_select_1 = formlyfield_select_1_1;
            },
            function (formlyfield_textarea_1_1) {
                formlyfield_textarea_1 = formlyfield_textarea_1_1;
            },
            function (formlyfield_multicheckbox_1_1) {
                formlyfield_multicheckbox_1 = formlyfield_multicheckbox_1_1;
            }],
        execute: function() {
            exports_20("TemplateDirectives", TemplateDirectives = {
                input: formlyfield_input_1.FormlyFieldInput,
                checkbox: formlyfield_checkbox_1.FormlyFieldCheckbox,
                radio: formlyfield_radio_1.FormlyFieldRadio,
                select: formlyfield_select_1.FormlyFieldSelect,
                textarea: formlyfield_textarea_1.FormlyFieldTextArea,
                multicheckbox: formlyfield_multicheckbox_1.FormlyFieldMultiCheckbox
            });
        }
    }
});
System.register("templates/formlyBootstrap", ["services/formly.config", "services/formly.messages", "templates/templates", "@angular/core"], function(exports_21, context_21) {
    "use strict";
    var __moduleName = context_21 && context_21.id;
    var formly_config_3, formly_messages_9, templates_1, core_13;
    var FormlyBootstrap;
    return {
        setters:[
            function (formly_config_3_1) {
                formly_config_3 = formly_config_3_1;
            },
            function (formly_messages_9_1) {
                formly_messages_9 = formly_messages_9_1;
            },
            function (templates_1_1) {
                templates_1 = templates_1_1;
            },
            function (core_13_1) {
                core_13 = core_13_1;
            }],
        execute: function() {
            FormlyBootstrap = (function () {
                function FormlyBootstrap(fc, fm) {
                    fm.addStringMessage("required", "This field is required.");
                    fm.addStringMessage("invalidEmailAddress", "Invalid Email Address");
                    fm.addStringMessage("maxlength", "Maximum Length Exceeded.");
                    fm.addStringMessage("minlength", "Should have atleast 2 Characters");
                    ["input", "checkbox", "radio", "select"].forEach(function (field) {
                        fc.setType({
                            name: field,
                            component: templates_1.TemplateDirectives[field]
                        });
                    });
                }
                FormlyBootstrap = __decorate([
                    core_13.Injectable(), 
                    __metadata('design:paramtypes', [formly_config_3.FormlyConfig, formly_messages_9.FormlyMessages])
                ], FormlyBootstrap);
                return FormlyBootstrap;
            }());
            exports_21("FormlyBootstrap", FormlyBootstrap);
        }
    }
});
System.register("templates", ["templates/formlyfield.checkbox", "templates/formlyfield.multicheckbox", "templates/formlyfield.input", "templates/formlyfield.radio", "templates/formlyfield.textarea", "templates/formlyfield.select", "templates/field", "templates/templates", "templates/formlyBootstrap"], function(exports_22, context_22) {
    "use strict";
    var __moduleName = context_22 && context_22.id;
    return {
        setters:[
            function (formlyfield_checkbox_2_1) {
                exports_22({
                    "FormlyFieldCheckbox": formlyfield_checkbox_2_1["FormlyFieldCheckbox"]
                });
            },
            function (formlyfield_multicheckbox_2_1) {
                exports_22({
                    "FormlyFieldMultiCheckbox": formlyfield_multicheckbox_2_1["FormlyFieldMultiCheckbox"]
                });
            },
            function (formlyfield_input_2_1) {
                exports_22({
                    "FormlyFieldInput": formlyfield_input_2_1["FormlyFieldInput"]
                });
            },
            function (formlyfield_radio_2_1) {
                exports_22({
                    "FormlyFieldRadio": formlyfield_radio_2_1["FormlyFieldRadio"]
                });
            },
            function (formlyfield_textarea_2_1) {
                exports_22({
                    "FormlyFieldTextArea": formlyfield_textarea_2_1["FormlyFieldTextArea"]
                });
            },
            function (formlyfield_select_2_1) {
                exports_22({
                    "FormlyFieldSelect": formlyfield_select_2_1["FormlyFieldSelect"]
                });
            },
            function (field_7_1) {
                exports_22({
                    "Field": field_7_1["Field"]
                });
            },
            function (templates_2_1) {
                exports_22({
                    "TemplateDirectives": templates_2_1["TemplateDirectives"]
                });
            },
            function (formlyBootstrap_1_1) {
                exports_22({
                    "FormlyBootstrap": formlyBootstrap_1_1["FormlyBootstrap"]
                });
            }],
        execute: function() {
        }
    }
});
System.register("index", ["core", "templates"], function(exports_23, context_23) {
    "use strict";
    var __moduleName = context_23 && context_23.id;
    function exportStar_1(m) {
        var exports = {};
        for(var n in m) {
            if (n !== "default") exports[n] = m[n];
        }
        exports_23(exports);
    }
    return {
        setters:[
            function (core_14_1) {
                exportStar_1(core_14_1);
            },
            function (templates_3_1) {
                exportStar_1(templates_3_1);
            }],
        execute: function() {
        }
    }
});
//# sourceMappingURL=ng2-formly.js.map