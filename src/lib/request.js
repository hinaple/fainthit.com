const URL = "https://portfolio.fainthit.workers.dev/";

const Key2Key = {
    name: "title",
    icon: "files",
    percentage: "number",
    order: "number",
    label: "title",
    data: "rich_text",
    type: "rich_text",
    URL: "url",
    client: "rich_text",
    description: "rich_text",
    thumbnail: "files",
    title: "title",
    types: "multi_select",
};

function sortByOrder(data) {
    return data[0].order === undefined
        ? data
        : data.sort((a, b) => (a.order ?? Infinity) - (b.order ?? Infinity));
}

function processData(data) {
    return sortByOrder(
        data.map((d) => {
            const obj = {};
            const temp = d.properties;
            Object.entries(temp).forEach(([k, v]) => {
                const type = Key2Key[k];
                const current = v[type];
                if (type === "rich_text" || type === "title")
                    obj[k] = current.map((c) => c.plain_text).join("\n");
                else if (type === "multi_select")
                    obj[k] = current.map((c) => c.name);
                else if (type === "files")
                    obj[k] = current.length ? current[0].file.url : null;
                else obj[k] = current;
            });
            return obj;
        })
    );
}

export default (types = "DEV") =>
    fetch(`${URL}?types=${types}`)
        .then((data) => data.json())
        .then((data) => {
            const returnData = {};
            Object.entries(data).forEach(
                ([key, value]) => (returnData[key] = processData(value.results))
            );
            return returnData;
        });
