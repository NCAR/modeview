
function date_range(start_date_str, end_date_str, date_diff_hours=24) {
    let start_date = new Date(start_date_str);
    let end_date = new Date(end_date_str);
    console.log("start date", start_date);
    console.log("end date", end_date);
    let hours_to_ms = 3600000;
    let curr_date = new Date(start_date);
    let dates = [];
    while (curr_date <= end_date)
    {
        dates.push(curr_date);
        curr_date = new Date(curr_date.getTime() + date_diff_hours * hours_to_ms);
    }
    dates = dates.reverse();
    return dates;
}

function hrrr_json_date_str(date_str) {
    let init_time = new Date(date_str);
    let init_date_str = String(init_time.getUTCFullYear());
    init_date_str += String(init_time.getUTCMonth() + 1).padStart(2, "0");
    init_date_str += String(init_time.getUTCDate()).padStart(2, "0");
    init_date_str += "-" + String(init_time.getUTCHours()).padStart(2, "0") + "00";
    return init_date_str;
}

function hrrr_csv_date_str(date_str) {
    let init_time = new Date(date_str);
    let init_date_str = String(init_time.getUTCFullYear()) + "-";
    init_date_str += String(init_time.getUTCMonth() + 1).padStart(2, "0") + "-";
    init_date_str += String(init_time.getUTCDate()).padStart(2, "0");
    init_date_str += "_" + String(init_time.getUTCHours()).padStart(2, "0") + "00";
    return init_date_str;
}

async function read_csv(filename) {
    let data = {};
    let str_cols = ["Valid_Date", "Run_Date", "Step_ID", "Track_ID", "SS_Label", "CNN_1_Label", "DNN_1_Label"];
    let int_cols = ["Forecast_Hour", "Duration"];
    await d3.csv(filename, function(row) {
        if (Object.keys(data).length === 0) {
            console.log(row);
            Object.keys(row).forEach(function (col) {
               data[col] = [];
            });
        }
        Object.keys(row).forEach(function (col) {
            if (str_cols.includes(col)) {
                data[col].push(row[col]);
            }
            else if (int_cols.includes(col)) {
                data[col].push(parseInt(row[col]));
            }
            else {
                data[col].push(parseFloat(row[col]));
            }
            });
    });
    return data;
}

function filter_time(valid_time, time_arr, index_arr, data_arr) {
    let selected_data = {};
    selected_data["index"] = index_arr.filter(function (i) {return time_arr[i] === valid_time;});
    Object.keys(data_arr).forEach(function(col) {selected_data[col] = [];});
    selected_data["index"].forEach(function (t)  {
        Object.keys(data_arr).forEach(function(col) {selected_data[col].push(data_arr[col][t]);});
    });
    return selected_data;
}
