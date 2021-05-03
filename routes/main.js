module.exports = function (app) {

    /* ----- PLEASE NOTE: The comments on this code are meant to be read in order from top to bottom, in order to not repeat previous explanations and keep them as concise as possible. If some explanations are skipped, the following comments may not make much sense given that they are out of context ----- */

    /* ---- GLOBAL FUNCTIONS ----- */
    
    // The add-device page makes an sql query to know the values that are acceptable for the smart device type name (e.g: tv, speakers, etc). The following function converts the sql query result into an acceptable javascript array 
    function mySQLEnumTypeToJavascriptArray(mySQLQueryString) {
        result = mySQLQueryString[0].Type.slice(5, -1);
        returnThisArrayWithPossibleDevices = result.split(',');
        return returnThisArrayWithPossibleDevices;
    }

    // The following 'global' function validates the input values before proceeding to write them in the database. If all the values are correct (in range) a "true" is returned, otherwise when the value is incorrect, an array containing the incorrect value and an error message is returned.
    //The following function is used by both the inital device adding process and by the configuration update process.
    function validateUserInput(object) {               
        switch (object['smartdevice_type']) {
            case 'Light':
                if (!(object['is_on'] == 0 || object['is_on'] == 1)) {
                    return ['is_on', object['is_on'], 'The device ON/OFF value is not defined']
                }
                if (object['red'] < 0) {
                    return ['red', object['red'], 'The percentage of red is less than 0']
                }
                if (object['red'] > 100) {
                    return ['red', object['red'], 'The percentage of red is greater than 100']
                }
                if (object['green'] < 0) {
                    return ['green', object['green'], 'The percentage of green is less than 0']
                }
                if (object['green'] > 100) {
                    return ['green', object['green'], 'The percentage of green is greater than 100']
                }
                if (object['blue'] < 0) {
                    return ['blue', object['blue'], 'The percentage of blue is less than 0']
                }
                if (object['blue'] > 100) {
                    return ['blue', object['blue'], 'The percentage of blue is greater than 100']
                }
                break;
            case 'Oven':
                if (!(object['is_on'] == 0 || object['is_on'] == 1)) {
                    return ['is_on', object['is_on'], 'The device ON/OFF value is not defined']
                }
                if (object['temperature'] < 0) {
                    return ['temperature', object['temperature'], 'The oven temperature is less than 0']
                }
                if (object['temperature'] > 485) {
                    return ['temperature', object['temperature'], 'The oven temperature is greater than 485°C']
                }
                if (!(object['heat_from_above'] == 0 || object['heat_from_above'] == 1)) {
                    return ['heat_from_above', object['heat_from_above'], 'The heat from above value is not defined']
                }
                if (!(object['heat_from_below'] == 0 || object['heat_from_below'] == 1)) {
                    return ['heat_from_below', object['heat_from_below'], 'The heat from below value is not defined']
                }
                break;
            case 'Kitchen_hob':
                if (!(object['is_on'] == 0 || object['is_on'] == 1)) {
                    return ['is_on', object['is_on'], 'The device ON/OFF value is not defined']
                }
                if (object['burner_one'] < 0) {
                    return ['burner_one', object['burner_one'], 'The power of the first burner is less than 0%']
                }
                if (object['burner_one'] > 100) {
                    return ['burner_one', object['burner_one'], 'The  power of the first burner is greater than 100%']
                }
                if (object['burner_two'] < 0) {
                    return ['burner_two', object['burner_two'], 'The power of the second burner is less than 0%']
                }
                if (object['burner_two'] > 100) {
                    return ['burner_two', object['burner_two'], 'The  power of the second burner is greater than 100%']
                }
                if (object['burner_three'] < 0) {
                    return ['burner_three', object['burner_three'], 'The power of the third burner is less than 0%']
                }
                if (object['burner_three'] > 100) {
                    return ['burner_three', object['burner_three'], 'The  power of the third burner is greater than 100%']
                }
                if (object['burner_four'] < 0) {
                    return ['burner_four', object['burner_four'], 'The power of the fourth is less than 0%']
                }
                if (object['burner_four'] > 100) {
                    return ['burner_four', object['burner_four'], 'The  power of the fourth is greater than 100%']
                }
                if (object['burner_five'] < 0) {
                    return ['burner_five', object['burner_five'], 'The power of the fifth burner is less than 0%']
                }
                if (object['burner_five'] > 100) {
                    return ['burner_five', object['burner_five'], 'The  power of the fifth burner is greater than 100%']
                }
                if (object['burner_six'] < 0) {
                    return ['burner_six', object['burner_six'], 'The power of the sixth burner is less than 0%']
                }
                if (object['burner_six'] > 100) {
                    return ['burner_six', object['burner_six'], 'The  power of the sixth burner is greater than 100%']
                }

                break;
            case 'Microwave':
                if (!(object['is_on'] == 0 || object['is_on'] == 1)) {
                    return ['is_on', object['is_on'], 'The device ON/OFF value is not defined']
                }
                if (object['countdown_timer'] < 0) {
                    return ['countdown_timer', object['countdown_timer'], 'The countdown timer minutes is less than 0']
                }
                if (object['countdown_timer'] >= 65535) {
                    return ['countdown_timer', object['countdown_timer'], 'The countdown timer minutes is greater than 65534']
                }
                break;
            case 'Dishwasher':
                if (!(object['is_on'] == 0 || object['is_on'] == 1)) {
                    return ['is_on', object['is_on'], 'The device ON/OFF value is not defined']
                }
                if (!(object['hot_water'] == 0 || object['hot_water'] == 1)) {
                    return ['hot_water', object['hot_water'], 'The hot water value is not defined']
                }
                if (object['countdown_timer'] < 0) {
                    return ['countdown_timer', object['countdown_timer'], 'The countdown timer minutes is less than 0']
                }
                if (object['countdown_timer'] >= 65535) {
                    return ['countdown_timer', object['countdown_timer'], 'The countdown timer minutes is greater than 65534']
                }
                break;
            case 'Refrigerator':
                if (!(object['is_on'] == 0 || object['is_on'] == 1)) {
                    return ['is_on', object['is_on'], 'The device ON/OFF value is not defined']
                }
                if (object['temperature'] < 0) {
                    return ['temperature', object['temperature'], 'The refrigerator temperature can not be less than 0']
                }
                if (object['temperature'] > 10) {
                    return ['temperature', object['temperature'], 'The refrigerator temperature can not be greater than 10°C']
                }
                if (!(object['holiday_mode'] == 0 || object['holiday_mode'] == 1)) {
                    return ['holiday_mode', object['holiday_mode'], 'The ECO/holiday mode value is not defined']
                }
                break;
            case 'Washing_Machine':
                if (!(object['is_on'] == 0 || object['is_on'] == 1)) {
                    return ['is_on', object['is_on'], 'The device ON/OFF value is not defined']
                }
                if (object['countdown_timer'] < 0) {
                    return ['countdown_timer', object['countdown_timer'], 'The countdown timer minutes is less than 0']
                }
                if (object['countdown_timer'] >= 65535) {
                    return ['countdown_timer', object['countdown_timer'], 'The countdown timer minutes is greater than 65534']
                }
                if (!(object['hot_water'] == 0 || object['hot_water'] == 1)) {
                    return ['hot_water', object['hot_water'], 'The hot water value is not defined']
                }
                break;
            case 'Drying_Machine':
                if (!(object['is_on'] == 0 || object['is_on'] == 1)) {
                    return ['is_on', object['is_on'], 'The device ON/OFF value is not defined']
                }
                if (object['countdown_timer'] < 0) {
                    return ['countdown_timer', object['countdown_timer'], 'The countdown timer minutes is less than 0']
                }
                if (object['countdown_timer'] >= 65535) {
                    return ['countdown_timer', object['countdown_timer'], 'The countdown timer minutes is greater than 65534']
                }
                break;
            case 'Television':
                if (!(object['is_on'] == 0 || object['is_on'] == 1)) {
                    return ['is_on', object['is_on'], 'The device ON/OFF value is not defined']
                }
                if (object['channel'] < 0) {
                    return ['channel', object['channel'], 'The channel number is less than 0']
                }
                if (object['channel'] >= 65535) {
                    return ['channel', object['channel'], 'The channel is greater than 65534']
                }
                if (object['volume'] < 0) {
                    return ['volume', object['volume'], 'The  volume is less than 0%']
                }
                if (object['volume'] > 100) {
                    return ['volume', object['volume'], 'The  volume is greater than 100%']
                }
                if (object['source'].length >= 255) {
                    return ['source', object['source'], 'The source text can not exceed 254 characters']
                }
                if (object['countdown_timer'] < 0) {
                    return ['countdown_timer', object['countdown_timer'], 'The countdown timer minutes is less than 0']
                }
                if (object['countdown_timer'] >= 65535) {
                    return ['countdown_timer', object['countdown_timer'], 'The countdown timer minutes is greater than 65534']
                }
                break;
            case 'Speakers':
                if (!(object['is_on'] == 0 || object['is_on'] == 1)) {
                    return ['is_on', object['is_on'], 'The device ON/OFF value is not defined']
                }
                if (object['volume'] < 0) {
                    return ['volume', object['volume'], 'The  volume is less than 0%']
                }
                if (object['volume'] > 100) {
                    return ['volume', object['volume'], 'The  volume is greater than 100%']
                }
                if (object['source'].length >= 255) {
                    return ['source', object['source'], 'The source text can not exceed 254 characters']
                }
                if (object['countdown_timer'] < 0) {
                    return ['countdown_timer', object['countdown_timer'], 'The countdown timer minutes is less than 0']
                }
                if (object['countdown_timer'] >= 65535) {
                    return ['countdown_timer', object['countdown_timer'], 'The countdown timer minutes is greater than 65534']
                }
                break;
            case 'Air_conditioning':
                if (!(object['is_on'] == 0 || object['is_on'] == 1)) {
                    return ['is_on', object['is_on'], 'The device ON/OFF value is not defined']
                }
                if (object['temperature'] < 0) {
                    return ['temperature', object['temperature'], 'The air conditioning temperature can not be less than 0°C']
                }
                if (object['temperature'] > 26) {
                    return ['temperature', object['temperature'], 'The air conditioning temperature can not be greater than 26°C']
                }
                if (object['fan_speed'] < 0) {
                    return ['fan_speed', object['fan_speed'], 'The  fan speed is less than 0%']
                }
                if (object['fan_speed'] > 100) {
                    return ['fan_speed', object['fan_speed'], 'The  fan speed is greater than 100%']
                }
                break;
            case 'Fan':
                if (!(object['is_on'] == 0 || object['is_on'] == 1)) {
                    return ['is_on', object['is_on'], 'The device ON/OFF value is not defined']
                }
                if (object['fan_speed'] < 0) {
                    return ['fan_speed', object['fan_speed'], 'The  fan speed is less than 0%']
                }
                if (object['fan_speed'] > 100) {
                    return ['fan_speed', object['fan_speed'], 'The  fan speed is greater than 100%']
                }
                break;
            case 'Vacuum_cleaner_robot':
                if (!(object['is_on'] == 0 || object['is_on'] == 1)) {
                    return ['is_on', object['is_on'], 'The device ON/OFF value is not defined']
                }
                if (!(object['self_charge_mode'] == 0 || object['self_charge_mode'] == 1)) {
                    return ['self_charge_mode', object['self_charge_mode'], 'The self charging mode value is not defined']
                }
                break;
            case 'Security_Camera':
                if (!(object['is_on'] == 0 || object['is_on'] == 1)) {
                    return ['is_on', object['is_on'], 'The device ON/OFF value is not defined']
                }
                if (!(object['automatic_photo_shooting'] == 0 || object['automatic_photo_shooting'] == 1)) {
                    return ['automatic_photo_shooting', object['automatic_photo_shooting'], 'The automatic photo shooting mode value is not defined']
                }
                if (!(object['night_mode'] == 0 || object['night_mode'] == 1)) {
                    return ['night_mode', object['night_mode'], 'The night mode value is not defined']
                }
                if (!(object['automatic_video_recording'] == 0 || object['automatic_video_recording'] == 1)) {
                    return ['automatic_video_recording', object['automatic_video_recording'], 'The automatic video recording mode value is not defined']
                }
                break;
            case 'Thermostat':
                if (!(object['is_on'] == 0 || object['is_on'] == 1)) {
                    return ['is_on', object['is_on'], 'The device ON/OFF value is not defined']
                }
                if (object['temperature'] < 10) {
                    return ['temperature', object['temperature'], 'The thermostar temperature can not be less than 10°C']
                }
                if (object['temperature'] > 30) {
                    return ['temperature', object['temperature'], 'The thermostar temperature can not be greater than 30°C']
                }
                break;
            case 'Door_lock':
                if (!(object['locked'] == 0 || object['locked'] == 1)) {
                    return ['locked', object['locked'], 'The locked value is not defined']
                }
                break;
            case 'Lawnmower_robot':
                if (!(object['is_on'] == 0 || object['is_on'] == 1)) {
                    return ['is_on', object['is_on'], 'The device ON/OFF value is not defined']
                }
                break;
            case 'Coffee_machine':
                if (!(object['is_on'] == 0 || object['is_on'] == 1)) {
                    return ['is_on', object['is_on'], 'The device ON/OFF value is not defined']
                }
                break;
            case 'Window_shades':
                if (object['shade_down_percentage'] < 0) {
                    return ['shade_down_percentage', object['shade_down_percentage'], 'The window shade pull down is less than 0%']
                }
                if (object['shade_down_percentage'] > 100) {
                    return ['shade_down_percentage', object['shade_down_percentage'], 'The window shade pull down is greater than 100%']
                }
                if (!(object['automatic_mode'] == 0 || object['automatic_mode'] == 1)) {
                    return ['automatic_mode', object['automatic_mode'], 'The window shade automatic mode value is not defined']
                }
                break;
            case 'Smart_window':
                if (!(object['open'] == 0 || object['open'] == 1)) {
                    return ['open', object['open'], 'The window open/close value is not defined']
                }
                break;
        }
        return true;
    }


    /* ---- ROUTING ----- */

    // visiting / will render the home page
    app.get("/", function (req, res) {
        res.render("home.html",{ public_name_to_show: "@ezema",public_name_to_show_href: "https://www.github.com/ezema"})
    });

    // visiting /home will render the home page
    app.get("/home", function (req, res) {
        res.render("home.html",{ public_name_to_show: "@ezema",public_name_to_show_href: "https://www.github.com/ezema"})
    });
        
    // visiting /about will render the about page
    app.get("/about", function (req, res) {
        res.render("about.html",{ public_name_to_show: "@ezema",public_name_to_show_href: "https://www.github.com/ezema"})
    });  

    // When visiting the add-device page, the mysql table will be queried to obtain the acceptable values for smart devices (enum type in the mysql table). The query result will be passed to the add-device ejs template and rendered to the user. If an error occurs while retrieving the database, the error will be notified to the user.
    app.get("/add-device", function (req, res) {
        let sqlquery = 'SHOW COLUMNS FROM table_userAddedSmartDevices LIKE "smartdevice_type";';

        db.query(sqlquery, (err, result) => {
            if (err) {
                res.render('operation-result-message.html', { cardHeader: "Database error", cardTitle: "Oops!", cardText: "An error ocurred while retrieving possible devices list from the database", goBackHrefValue: `href=add-device` });
            } else
                javascriptArrayOfPossibleDevices = mySQLEnumTypeToJavascriptArray(result)
                res.render('add-device.html', { smartDevicesTypes: javascriptArrayOfPossibleDevices, stepTwo: false });
        });
        
    });

    //Please note that "add-device" is not equal to "addNewDevice". The following route will receive the value of the smart device type that wants to be added (e.g: coffee-machine) and based on the value, the page will be rendered. This is done so "coffee-machine" shows different configuration parameters than "television"
    app.get("/addNewDevice", function (req, res) {
        res.render('add-device.html', { stepTwo: true, deviceChosen: req.query.smartdevice_type });
    });

    //The values of the new device that is being added by the user are received by the following route via a POST request. The values that are not in the POST request mean that they are boolean-negative/disabled/off/undefined, for this reason, the values are run through a "normalization" process so a an actual negative value is written on the database. 
    //For example: if the device was set to be ON, the post request will receive an['is_on'] key-value pair in the POST request BUT IF THE DEVICE IS set to OFF, the [is_on] key-value will NOT EXIST in the req.body object, that is why it is necessary to express it as an OFF value.
    
    app.post("/addNewDevice", function (req, res) {

        // boolean "true" values are received as "ON", ON is not valid/acceptable by the SQL BOOLEAN type, therefore, the following iteration will change the values "ON" to true. "true" will then be converted to a 1 by the mysql API.
        for (let [key, value] of Object.entries(req.body)) {
            if ((value.localeCompare('on') == 0) && (key.localeCompare("source") != 0)) {
                req.body[`${key}`] = true;
            }
        }

        // Handle normalization of boolean variables (explained above)
        if (!(req.body['is_on'])) {
            //if is_on is not in the request it means the device was switched off
            req.body['is_on'] = 0;
        }
        if (!(req.body['heat_from_above'])) {
            req.body['heat_from_above'] = 0;
        }
        if (!(req.body['heat_from_below'])) {
            req.body['heat_from_below'] = 0;
        }
        if (!(req.body['hot_water'])) {
            req.body['hot_water'] = 0;
        }
        if (!(req.body['holiday_mode'])) {
            req.body['holiday_mode'] = 0;
        }
        if (!(req.body['self_charge_mode'])) {
            req.body['self_charge_mode'] = 0;
        }
        if (!(req.body['automatic_photo_shooting'])) {
            req.body['automatic_photo_shooting'] = 0;
        }
        if (!(req.body['night_mode'])) {
            req.body['night_mode'] = 0;
        }
        if (!(req.body['automatic_video_recording'])) {
            req.body['automatic_video_recording'] = 0;
        }
        if (!(req.body['locked'])) {
            req.body['locked'] = 0;
        }
        if (!(req.body['automatic_mode'])) {
            req.body['automatic_mode'] = 0;
        }
        if (!(req.body['open'])) {
            req.body['open'] = 0;
        }

        // Handle normalization of numeric variables (explained above)
        if (!req.body['red']) {
            req.body['red'] = 0;
        }
        if (!req.body['green']) {
            req.body['green'] = 0;
        }
        if (!req.body['blue']) {
            req.body['blue'] = 0;
        }
        if (!req.body['temperature']) {
            req.body['temperature'] = 0;
        }
        if (!req.body['burner_one']) {
            req.body['burner_one'] = 0;
        }
        if (!req.body['burner_two']) {
            req.body['burner_two'] = 0;
        }
        if (!req.body['burner_three']) {
            req.body['burner_three'] = 0;
        }
        if (!req.body['burner_four']) {
            req.body['burner_four'] = 0;
        }
        if (!req.body['burner_five']) {
            req.body['burner_five'] = 0;
        }
        if (!req.body['burner_six']) {
            req.body['burner_six'] = 0;
        }
        if (!req.body['channel']) {
            req.body['channel'] = 0;
        }
        if (!req.body['volume']) {
            req.body['volume'] = 0;
        }
        if (!req.body['fan_speed']) {
            req.body['fan_speed'] = 0;
        }
        if (!req.body['shade_down_percentage']) {
            req.body['shade_down_percentage'] = 0;
        }
        if (!req.body['countdown_timer']) {
            req.body['countdown_timer'] = 0;
        }

        // call function to validate user input (explained above). If the values are correct, they will proceed to be inserted in the database, if the values are not acceptable, a message will notify the user which value is out of range and a button will redirect to the correct previous page.
        let resultOfValidation = validateUserInput(req.body);

        if (resultOfValidation == true) {
            let sqlquery = "INSERT INTO table_userAddedSmartDevices (smartdevice_type, is_on, red, green, blue, temperature, heat_from_above, heat_from_below, burner_one, burner_two, burner_three, burner_four, burner_five, burner_six, countdown_timer, hot_water, holiday_mode, channel, volume, source, fan_speed, self_charge_mode, automatic_photo_shooting, night_mode, automatic_video_recording, locked, shade_down_percentage, automatic_mode, open) VALUES (?,?,?,?,?,?,?,?,?,?,?,?,?,?,?,?,?,?,?,?,?,?,?,?,?,?,?,?,?)";

            let newdevice = [req.body.smartdevice_type, req.body.is_on, req.body.red, req.body.green, req.body.blue, req.body.temperature, req.body.heat_from_above, req.body.heat_from_below, req.body.burner_one, req.body.burner_two, req.body.burner_three, req.body.burner_four, req.body.burner_five, req.body.burner_six, req.body.countdown_timer, req.body.hot_water, req.body.holiday_mode, req.body.channel, req.body.volume, req.body.source, req.body.fan_speed, req.body.self_charge_mode, req.body.automatic_photo_shooting, req.body.night_mode, req.body.automatic_video_recording, req.body.locked, req.body.shade_down_percentage, req.body.automatic_mode, req.body.open];
            
            db.query(sqlquery, newdevice, (err, result) => {
                if (err) {                    
                    res.render("operation-result-message.html", { cardHeader: "Error", cardTitle: "An error ocurred and the operation was cancelled", cardText: "", goBackHrefValue: `href=add-device` });
                } else
                    res.render("operation-result-message.html", { cardHeader: `New ${req.body.smartdevice_type.replace(/_/g, " ")} added!`, cardTitle: `Your ${req.body.smartdevice_type.replace(/_/g, " ")} was added with the unique identifier (UID) ${result.insertId}`, cardText: `Enjoy using your new device!`, goBackHrefValue: `href=add-device` });
            });
        } else {
            res.render("operation-result-message.html", { cardHeader: "Invalid input", cardTitle: "You entered an invalid configuration value", cardText: resultOfValidation[2], goBackHrefValue: `href=addNewDevice?smartdevice_type=${req.body.smartdevice_type}` });
        }
        
        
    });

    //The following route will first retrieve all current devices in the database (with correspondent configuration) and pass the result of the query by rendering the show-device-status ejs template.
    app.get("/show-device-status", function (req, res) {
        let sqlquery = "SELECT * FROM table_userAddedSmartDevices;";
        db.query(sqlquery, (err, result) => {
            if (err) {
                res.render('operation-result-message.html', { cardHeader: "Database error", cardTitle: "Oops!", cardText: "An error ocurred while retrieving possible devices list from the database", goBackHrefValue: `href=add-device` });
            } else                
                res.render('show-device-status.html', { userAddedSmartDevices: result});
        });
    });

    //The following route will first retrieve all current devices in the database (with correspondent configuration) and pass the result of the query by rendering the update-device-status ejs template
    app.get("/update-device-status", function (req, res) {
        let sqlquery = "SELECT * FROM table_userAddedSmartDevices;";

        db.query(sqlquery, (err, result) => {
            if (err) {
                res.render('operation-result-message.html', { cardHeader: "Database error", cardTitle: "Oops!", cardText: "An error ocurred while retrieving possible devices list from the database", goBackHrefValue: `href=add-device` });
            } else
                res.render('update-device-status.html', { userAddedSmartDevices: result });
        });
    });     

    //The following route will first retrieve all current devices in the database (with correspondent configuration) and pass the result of the query by rendering the delete-device ejs template.
    app.get("/delete-device", function (req, res) {
        let sqlquery = "SELECT * FROM table_userAddedSmartDevices;";

        db.query(sqlquery, (err, result) => {
            if (err) {
                res.render('operation-result-message.html', { cardHeader: "Database error", cardTitle: "Oops!", cardText: "An error ocurred while retrieving possible devices list from the database", goBackHrefValue: `href=add-device` });
            } else                
                res.render("delete-device.html", { userAddedSmartDevices: result});
        });
    });

    //The following route acts as an intermediary page to confirm the deletion (requirement R6B of the midterm) or update of the device selected.
    app.get("/confirm-user-action", function (req, res) {

        let actionTriggeredByUser;
        let deviceID = req.query['device-id'];                

        if (req.query['user-action']) { 
            if (req.query['user-action'].localeCompare('remove') == 0) {
                actionTriggeredByUser = 'remove'
            }
            else if (req.query['user-action'].localeCompare('update') == 0) {
                actionTriggeredByUser = 'update'
            }
        }                    

        //if deletion-resolution is in the the req.body it means that the deletion was confirmed (second step). See first step below this if statement. The order (check existance of the second step before checking the first step) is done on purpose (secuential).
        if (req.query['deletion-resolution']) {

            let successfulDeletionFlag;

            if (req.query['deletion-resolution'].localeCompare('Confirm')==0) {

                deviceID = req.query['device-id'];

                let sqlquery = `SELECT * FROM table_userAddedSmartDevices WHERE id = ${deviceID}`

                db.query(sqlquery, (err, result) => {
                    if (err) {
                        res.render("operation-result-message.html", { cardHeader: "Error", cardTitle: "An error ocurred and the operation was cancelled", cardText: "", goBackHrefValue: `href=delete-device` });

                    } else {
                        if (result[0]) {
                            let sqlquery = `DELETE FROM table_userAddedSmartDevices WHERE id= ${deviceID}`;
                            db.query(sqlquery, (err, result) => {
                                if (err) {                                    
                                    res.render("operation-result-message.html", { cardHeader: "Error", cardTitle: "An error ocurred and the operation was cancelled", cardText: "", goBackHrefValue: `href=delete-device` })
                                } else {              
                                    successfulDeletionFlag = true;
                                    res.render("operation-result-message.html", { cardHeader: "Success", cardTitle: "The device was removed", cardText: `The device with UID ${deviceID} was removed`, goBackHrefValue: `href=delete-device` })
                                }
                            });

                        } else {
                            res.render("operation-result-message.html", { cardHeader: "Error", cardTitle: "The device doesn't exist", cardText: "", goBackHrefValue: `href=delete-device` })
                        }
                    }
                    
                })

            } else if (req.query['deletion-resolution'].localeCompare('Cancel')==0) {
                res.render("operation-result-message.html", { cardHeader: "Cancelled", cardTitle: "The operation was cancelled", cardText: "", goBackHrefValue: `href=delete-device` })
            }
        }      

        // if step-number is defined it means the user is in the "first step" and hasn't confirmed the deletion/update in process. A confirmation page will be rendered to the user.
        // Please note that the update and the removal page rendered are different.
        if (req.query['step-number'] && (actionTriggeredByUser.localeCompare('remove')==0)) {
            res.render("confirm-action.html", { deviceNumber: req.query['device-id'], deviceTypeName: req.query['device-type'], actionTriggeredByUser: actionTriggeredByUser })    
        }
        else if (req.query['step-number'] && (actionTriggeredByUser.localeCompare('update') == 0)) {            
            res.render("device-to-update.html", { deviceObject: req.query['device-object']})
        }
        
    });

    // when the update is confirmed by the user, a POST request is made to update-completed
    app.post("/update-completed", function (req, res) {

        //save device-id so it can be removed from the req.body later
        let deviceID = req.body["device-id"];        
        //remove ID from req.body so can destructure array right into sql string query (sql handles id automatically)
        delete req.body["device-id"];

        //define arrays that will be later be used to dynamically create the mysql query
        let entriesToUpdate = [];
        let valuesToUpdate = [];

        // as previously explained, "on" values are translated into 1 that is the valid boolean value in the context of mysql boolean values.
        for (let [key, value] of Object.entries(req.body)) {            
            if ((value.localeCompare('on') == 0) && (key.localeCompare("source") != 0)) { 
                req.body[`${key}`]= 1;
            }                            
        }

        // Handle normalization of boolean variables (explained above)

        if (!(req.body['is_on'])) {
            //if is_on is not in the request it means the device was switched off
            req.body['is_on'] = 0;
        }
        if (!(req.body['heat_from_above'])) {            
            req.body['heat_from_above'] = 0;
        }
        if (!(req.body['heat_from_below'])) {            
            req.body['heat_from_below'] = 0;
        }
        if (!(req.body['hot_water'])) {        
            req.body['hot_water'] = 0;
        }
        if (!(req.body['holiday_mode'])) {            
            req.body['holiday_mode'] = 0;
        }
        if (!(req.body['self_charge_mode'])) {            
            req.body['self_charge_mode'] = 0;
        }
        if (!(req.body['automatic_photo_shooting'])) {            
            req.body['automatic_photo_shooting'] = 0;
        }
        if (!(req.body['night_mode'])) {            
            req.body['night_mode'] = 0;
        }
        if (!(req.body['automatic_video_recording'])) {            
            req.body['automatic_video_recording'] = 0;
        }
        if (!(req.body['locked'])) {            
            req.body['locked'] = 0;
        }
        if (!(req.body['automatic_mode'])) {            
            req.body['automatic_mode'] = 0;
        }
        if (!(req.body['open'])) {            
            req.body['open'] = 0;
        }

        // Handle normalization of numeric variables (explained above)
        if (!req.body['red']) {            
            req.body['red'] = 0;
        }
        if (!req.body['green']) {            
            req.body['green'] = 0;
        }
        if (!req.body['blue']) {            
            req.body['blue'] = 0;
        }
        if (!req.body['temperature']) {            
            req.body['temperature'] = 0;
        }
        if (!req.body['burner_one']) {            
            req.body['burner_one'] = 0;
        }
        if (!req.body['burner_two']) {            
            req.body['burner_two'] = 0;
        }
        if (!req.body['burner_three']) {            
            req.body['burner_three'] = 0;
        }
        if (!req.body['burner_four']) {            
            req.body['burner_four'] = 0;
        }
        if (!req.body['burner_five']) {            
            req.body['burner_five'] = 0;
        }
        if (!req.body['burner_six']) {            
            req.body['burner_six'] = 0;
        }
        if (!req.body['channel']) {            
            req.body['channel'] = 0;
        }
        if (!req.body['volume']) {            
            req.body['volume'] = 0;
        }
        if (!req.body['fan_speed']) {            
            req.body['fan_speed'] = 0;
        }
        if (!req.body['shade_down_percentage']) {            
            req.body['shade_down_percentage'] = 0;
        }
        if (!req.body['countdown_timer']) {            
            req.body['countdown_timer'] = 0;
        }

        // call function to validate user input (explained at the beginning). If the values are correct, they will proceed to be inserted in the database, if the values are not acceptable, a message will notify the user which value is out of range and a button will redirect to the correct previous page.
        let resultOfValidation = validateUserInput(req.body);

        //if the values passed are all valid (true), proceed. If not, 
        if (resultOfValidation == true) {

            // PLEASE NOTE: The following iterations and operations steps will create a sql query right from the values of the req.body.
            //Dynamically creating a mysql query from a req.body object. The values that exist/are defined in the req.body are the ones that are applicable to the device being updated. The arrays populated in the iteration contain the key-value pairs that are relevant/applicable to the device.
            for (let [key, value] of Object.entries(req.body)) {
                entriesToUpdate.push(key)
                valuesToUpdate.push(value)
            }            
            // A string that will be used in the mysql query is created dynamically below. For example: "shade_down_percentage" = 40 is created here for the smary window shade device. Each of these strings are saved in an array. For example: ["shade_down_percentage" = 40, "automatic_mode" = 1]. 
            mySqlSetStringQuery = [];
            for (let i = 0; i < entriesToUpdate.length; i++) {
                mySqlSetStringQuery.push(` ${entriesToUpdate[i]} = '${valuesToUpdate[i]}' `)
            }
            //The array previously created is turned into a sequence of strings with the javascript toString() method.
            let sqlquery = `UPDATE table_userAddedSmartDevices SET ${mySqlSetStringQuery.toString()} WHERE id=${deviceID}`;            

            // finally, the sql query is passed to the database
            db.query(sqlquery, (err, result) => {
                if (err) {
                    res.render('operation-result-message.html', { cardHeader: "Error", cardTitle: "An error ocurred and the operation was cancelled", cardText: "", goBackHrefValue: `href=update-device-status` });
                } else
                    res.render('operation-result-message.html', { cardHeader: "Update success", cardTitle: "Successful update!", cardText: `The device has been updated`, goBackHrefValue: `href=update-device-status` });
            });
        } else {
            res.render("operation-result-message.html", { cardHeader: "Update input is invalid", cardTitle: "You entered an invalid configuration value", cardText: resultOfValidation[2], goBackHrefValue: `href=update-device-status` });
        } 
    });    
}