define([], () =>
    function Widget() {
        const widget = this

        widget.callbacks = {
            bind_actions: () => true,
            onSave: () => true,
            destroy: () => true,
            init: () => true,
        }

        widget.callbacks.render = async () => {
            const widgetCode = widget.get_settings().widget_code

            if (widget.system().area !== 'lcard') {
                return true
            }
            
            // data-id атрибут div-элемента, в котором расположены имена автопроизводителей
            let divElementBrandDataId = '493043';
            
            // name атрибут input-элемента, в котором хранится data-id выбранного автопроизводителя
            let inputElementBrand = 'CFV[493043]';
            
            // соответствие data-id полей автопроизводителей
            let listCarsBrandDataId = {
            	'251731' : 'Toyota',
            	'251733' : 'Nissan'
            }
            
            // data-id атрибут div-элемента, в котором расположены модели автомобилей
            let divElementModelDataId = '493093';
            
            let listCarsBrandModel = {
                Toyota : [
                    'RAV4',
                    'Camry',
                ],
                Nissan : [
                    'X-Trail',
                    'Qashqai',
                ],
            }
            
            let carModelsFromField = document.querySelectorAll(`#edit_card div[data-id="${divElementModelDataId}"] .linked-form__field__value ul li span`)
            
            let hideCarModelsFromBrand = (carBrand, carModelsFromField, listCarsBrandModel) => {
            	let carModelsOnlyOneBrand = listCarsBrandModel[carBrand] || []
            	console.log(carModelsOnlyOneBrand)
            	for (let model of carModelsFromField) {
            	    
            	    if (model.title === 'Выбрать' || carModelsOnlyOneBrand.indexOf(model.title) > -1) {
            	    	model.parentElement.style.display = '';
            	    	console.log(model.title)
            	    } else {
            	    	model.parentElement.style.display = 'none';
            	    }
            	}
            }
            
            let carBrandsFromField = document.querySelectorAll(`#edit_card div[data-id="${divElementBrandDataId}"] .linked-form__field__value ul li span`)
            
            for (let brand of carBrandsFromField) {
                
                if (brand.title === 'Выбрать') {
                	brand.addEventListener('click', ()=> {
                		hideCarModelsFromBrand('', carModelsFromField, listCarsBrandModel)
                		document.querySelector(`#edit_card div[data-id="${divElementModelDataId}"] .linked-form__field__value ul li span`).click()
                	})
                } else {
                	let brandName = listCarsBrandDataId[brand.parentElement.getAttribute('data-value')]
                	brand.addEventListener('click', ()=> {
                		hideCarModelsFromBrand(brandName, carModelsFromField, listCarsBrandModel)
                		document.querySelector(`#edit_card div[data-id="${divElementModelDataId}"] .linked-form__field__value ul li span`).click()
                	})
                }
            }
            
            let carBrandDataId = document.querySelector(`#edit_card input[name="${inputElementBrand}"]`).value
            
            // прячем модели при открытии карточки сделки
            if (!carBrandDataId) {
            	hideCarModelsFromBrand('', carModelsFromField, listCarsBrandModel)
            } else {
            	let brandName = listCarsBrandDataId[carBrandDataId]
            	hideCarModelsFromBrand(brandName, carModelsFromField, listCarsBrandModel)
            }

            return true
        }

        widget.callbacks.settings = () => {
            return true
        }

        return widget
    })
