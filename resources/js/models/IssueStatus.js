import BaseVuexModel from "./BaseVuexModel";
import {
    actions
} from "../constants";

class Status extends BaseVuexModel {
    constructor(data) {
        super({
            status: "",
            ...data
        });

        this.groupedConfigs = [];

        this.$updateGroupConfig();
    }

    static async [actions.ISSUE_STATUS.FETCH](props) {
        let response;

        try {
            response = await api.get("api:issue-statuses.index", {
                includes: ["configs"],
                ...props
            });
        } catch (error) {
            throw error;
        }

        return response;
    }

    static async [actions.ISSUE_STATUS.EDIT](data) {
        let response;

        try {
            response = await api.get("api:issue-statuses.edit", {
                includes: ["configs"],
                ...data
            });
        } catch (error) {
            throw error;
        }

        return response;
    }

    static async [actions.ISSUE_STATUS.STORE](props) {
        let response;

        try {
            response = await api.post("api:issue-statuses.store", {
                includes: ["configs"],
                ...props
            });
        } catch (error) {
            throw error;
        }

        return response;
    }

    static async [actions.ISSUE_STATUS.UPDATE](props) {
        let response;

        try {
            response = await api.put("api:issue-statuses.update", {
                includes: ["configs"],
                ...props
            });
        } catch (error) {
            throw error;
        }

        return response;
    }

    static async [actions.ISSUE_STATUS.DELETE](data) {
        let response;

        try {
            response = await api.delete("api:issue-statuses.destroy", {
                ...data
            });
        } catch (error) {
            throw error;
        }

        return response;
    }

    static async [actions.ISSUE_STATUS.RESTORE](data) {
        let response;

        try {
            response = await api.post("api:issue-statuses.restore", {
                includes: ["configs"],
                ...data
            });
        } catch (error) {
            throw error;
        }

        return response;
    }

    $updateGroupConfig() {
        let {
            configs = []
        } = this;

        if (configs.length) {
            this.groupedConfigs = _(configs)
                .sortBy("duration")
                .groupBy("unit")
                .value();
        }

        return this;
    }

    getColorByTime(timeStamp = null, customStartTimeStamp = null) {
        let {
            groupedConfigs = {}
        } = this;
        let color = this.color;

        if (timeStamp && Object.keys(groupedConfigs).length > 0) {
            const units = [
                "minutes",
                "hours",
                "days",
                "weeks",
                "months",
                "years"
            ];

            units.forEach(unit => {
                if (groupedConfigs[unit]) {
                    for (
                        let index = 0; index < groupedConfigs[unit].length; index++
                    ) {
                        const config = groupedConfigs[unit][index];
                        const currentMoment = _.isNull(customStartTimeStamp) ? moment() : moment(customStartTimeStamp);
                        const configMoment = moment(timeStamp).add(
                            config.duration,
                            config.unit
                        );

                        // console.log(
                        //     this.created_at,
                        //     configMoment.toString(),
                        //     currentMoment.toString(),
                        //     configMoment.isBefore(currentMoment),
                        //     config.duration,
                        //     config.unit
                        // );

                        if (configMoment.isBefore(currentMoment)) {
                            color = config.color;
                            continue;
                        } else {
                            break;
                        }
                    }
                }
            });
        }

        return color;
    }

    getConfigByTime(timeStamp = null, customStartTimeStamp = null) {
        let {
            groupedConfigs = {}
        } = this;

        let result = null;

        if (timeStamp && Object.keys(groupedConfigs).length > 0) {
            const units = [
                "minutes",
                "hours",
                "days",
                "weeks",
                "months",
                "years"
            ];

            units.forEach(unit => {
                if (groupedConfigs[unit]) {
                    for (
                        let index = 0; index < groupedConfigs[unit].length; index++
                    ) {
                        const config = groupedConfigs[unit][index];
                        const currentMoment = _.isNull(customStartTimeStamp) ? moment() : moment(customStartTimeStamp);
                        const configMoment = moment(timeStamp).add(
                            config.duration,
                            config.unit
                        );

                        // console.log(
                        //     this.created_at,
                        //     configMoment.toString(),
                        //     currentMoment.toString(),
                        //     configMoment.isBefore(currentMoment),
                        //     config.duration,
                        //     config.unit
                        // );
                        // console.log(timeStamp, customStartTimeStamp, configMoment.isBefore(currentMoment));

                        if (configMoment.isBefore(currentMoment)) {
                            result = config;
                            continue;
                        } else {
                            break;
                        }
                    }
                }
            });
        }

        return result;
    }
}

export default Status;
