const { test, expect } = require('@playwright/test');

test('vehicleFormTest', async ({ page }) => {

    const data = {
        url: 'http://localhost:3000/api/vehicle',
        requestData: {
            "idApartment": 200,
            "state": "Activo",
            "description": "Carro morado de gama alta",
            "licenseplate": "ZZZ000"
        }
    };

    try {
        const response = await page.evaluate(async (data) => {
            console.log(data.url)
            const response = await fetch(data.url, {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json'
                },
                body: JSON.stringify(data.requestData)
            });
            return {
                status: response.status,
                body: await response.json()
            };
        }, data); // Pasamos un objeto con la URL y los datos como argumento

        expect(response.status).toBe(200);
        const body = response.body;
        expect(body.message).toBe('Vehiculo registrado exitosamente');
    } catch (error) {
        console.error('Error al registrar vehiculo:', error);
    }
});
