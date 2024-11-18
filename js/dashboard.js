class PumpSystem {
    constructor() {
        this.pumps = {
            1: { running: false, speed: 0, current: 0 },
            2: { running: false, speed: 0, current: 0 }
        };
        this.systemParameters = {
            inletPressure: 2.0,
            outletPressure: 2.0,
            flowRate: 0
        };
        this.alarms = [];
        this.startUpdates();
        this.updateClock();
    }

    togglePump(pumpId) {
        const pump = this.pumps[pumpId];
        pump.running = !pump.running;
        
        if (!pump.running) {
            pump.speed = 0;
            pump.current = 0;
            document.getElementById(`pump${pumpId}-speed-control`).value = 0;
        }
        
        this.updatePumpDisplay(pumpId);
        this.checkAlarms();
    }

    adjustSpeed(pumpId, speed) {
        const pump = this.pumps[pumpId];
        if (pump.running) {
            pump.speed = parseInt(speed);
            pump.current = (speed / 50 * 25).toFixed(1); // Simulate current draw
            this.updatePumpDisplay(pumpId);
            this.updateSystemParameters();
        }
    }

    updatePumpDisplay(pumpId) {
        const pump = this.pumps[pumpId];
        const statusElement = document.getElementById(`pump${pumpId}-status`);
        
        statusElement.className = pump.running ? 'status-indicator status-running' : 'status-indicator status-stopped';
        
        document.getElementById(`pump${pumpId}-speed`).textContent = pump.speed;
        document.getElementById(`pump${pumpId}-current`).textContent = pump.current;
    }

    updateSystemParameters() {
        // Simulate system parameters based on pump operation
        let totalFlow = 0;
        for (let pumpId in this.pumps) {
            if (this.pumps[pumpId].running) {
                totalFlow += this.pumps[pumpId].speed * 2; // Simple flow calculation
            }
        }

        this.systemParameters.flowRate = totalFlow;
        this.systemParameters.outletPressure = 2.0 + (totalFlow / 100) * 1.5;

        // Update display
        document.getElementById('inlet-pressure').textContent = this.systemParameters.inletPressure.toFixed(1);
        document.getElementById('outlet-pressure').textContent = this.systemParameters.outletPressure.toFixed(1);
        document.getElementById('flow-rate').textContent = this.systemParameters.flowRate.toFixed(1);
    }

    checkAlarms() {
        this.alarms = []; // Clear existing alarms
        
        // Check pressure differential
        if (this.systemParameters.outletPressure - this.systemParameters.inletPressure > 4) {
            this.addAlarm('High Pressure Differential');
        }

        // Check pump current
        for (let pumpId in this.pumps) {
            if (this.pumps[pumpId].current > 20) {
                this.addAlarm(`High Current on Pump ${pumpId}`);
            }
        }

        this.displayAlarms();
    }

    addAlarm(message) {
        this.alarms.push({
            message: message,
            time: new Date().toLocaleTimeString()
        });
    }

    displayAlarms() {
        const alarmsList = document.getElementById('alarms-list');
        alarmsList.innerHTML = '';
        
        this.alarms.forEach(alarm => {
            const alarmElement = document.createElement('div');
            alarmElement.className = 'alarm-item';
            alarmElement.textContent = `${alarm.time}: ${alarm.message}`;
            alarmsList.appendChild(alarmElement);
        });
    }

    startUpdates() {
        // Update system parameters every second
        setInterval(() => {
            this.updateSystemParameters();
            this.checkAlarms();
        }, 1000);
    }

    updateClock() {
        setInterval(() => {
            document.getElementById('systemTime').textContent = 
                new Date().toLocaleTimeString();
        }, 1000);
    }
}

// Initialize the system
const pumpSystem = new PumpSystem();