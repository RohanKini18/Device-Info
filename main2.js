initBattery()
            function initBattery(){
                const batteryLiquid = document.querySelector('.battery__liquid'),
                      batteryStatus = document.querySelector('.battery__status'),
                      batteryPercentage = document.querySelector('.battery__percentage')
                
                navigator.getBattery().then((batt) =>{
                    updateBattery = () =>{
                        
                        let level = Math.floor(batt.level * 100)
                        batteryPercentage.innerHTML ='Battery Percentage:'+' '+level+ '<b>%</b>'
            
                        
                        batteryLiquid.style.height = `${parseInt(batt.level * 100)}%`
            
                        
                        if(level == 100){ 
                            batteryStatus.innerHTML = 'Charging Status:'+' '+`<b>Full battery</b> <i class="ri-battery-2-fill green-color"></i>`
                            batteryLiquid.style.height = '103%'
                        }
                        else if(level <= 20 &! batt.charging){ 
                            batteryStatus.innerHTML = 'Charging Status:'+' '+`<b>Low battery</b> <i class="ri-plug-line animated-red"></i>`
                        }
                        else if(batt.charging){ 
                            batteryStatus.innerHTML = 'Charging Status:'+' '+`<b>Charging...</b> <i class="ri-flashlight-line animated-green"></i>`
                        }
                        else{ 
                            batteryStatus.innerHTML = 'Charging Status:'+' '+'<b>Charger Not connected</b>'
                        }
                        
                      
                    }
                    updateBattery()
            
                   
                    batt.addEventListener('chargingchange', () => {updateBattery()})
                    batt.addEventListener('levelchange', () => {updateBattery()})
                })
            }