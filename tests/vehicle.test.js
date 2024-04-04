const { test, expect } = require('@playwright/test');


test('AddVehicleToApartment', async ({ page }) => {
    const data = {
        url: 'http://localhost:3000/api/vehicle',
        // url: 'https://apptowerbackend.onrender.com/api/vehicle',
        vehicleData: {
            "idApartment": 1,
            // "state": "Activo",
            "description": "Rojo",
            "licenseplate": "ABL33F"
        }
    };

    try {
        const response = await page.evaluate(async (data) => {
            const response = await fetch(data.url, {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json'
                },
                body: JSON.stringify(data.vehicleData)
            });
            return {
                status: response.status,
                body: await response.json()
            };
        }, data);


        expect(response.status).toBe(200);
        const body = response.body;
        expect(body.message).toBe('Inicio de sesión exitoso');
    } catch (error) {
        console.error('Error al hacer la solicitud:', error);
    }
});