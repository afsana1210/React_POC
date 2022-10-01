import i18n from '../i18n';
import { createSelector } from 'reselect';
import moment from "moment";
import _ from "lodash";
const subChildScreenDetails = state => state.systemManager.subChildScreenDetails;
const sysMgrSortBy = state => state.systemManager.sortBy;
const sysMgrOrderBy = state => state.systemManager.orderBy;
const choiceLists = state => state.systemManager.sysManagerWSChoiceLists;
const selectedSearchInObj = state => state.systemManager.selectedSearchInObj;
const selectedClass = state => state.systemManager.selectedClass;
const availableRolesList = state => state.systemManager.availableRolesList;
const selectedRolesList = state => state.systemManager.selectedRolesList;
const roleSortBy = state => state.systemManager.roleSortBy;
const roleOrderBy = state => state.systemManager.roleOrderBy;
const selectedRoleSortBy = state => state.systemManager.selectedRoleSortBy;
const selectedRoleOrderBy = state => state.systemManager.selectedRoleOrderBy;
const dataElementsMetaData= state=> state.systemManager.dataElementsMetaData;
const selectedObjectStore=state=>state.systemManager.selectedObjectStore;
const workbenchesConfigBrokersModel = state => state.systemManager.workbenchesConfigBrokersModel;
const workbenchesContextModel = state => state.systemManager.workbenchesContextModel;
const workbenchesConfigCompleteJson = state => state.systemManager.workbenchesConfigCompleteJson;
const stepsSortBy = state => state.systemManager.stepsSortBy;
const stepsOrderBy = state => state.systemManager.stepsOrderBy;
const selectedStepsSortBy = state => state.systemManager.selectedStepsSortBy;
const selectedStepsOrderBy = state => state.systemManager.selectedStepsOrderBy;
const activeStepViewTabIndexData = state => state.systemManager.activeWorkbenchViewTabIndex;
const sysManagerWSChoiceLists = state => state.systemManager.sysManagerWSChoiceLists;
const selectedSearchObjectStore = state => state.systemManager.selectedSearchObjectStore;
const availableRouteDestineList = state => state.systemManager.availableRouteDestineList;
const selectedRouteDestineList = state => state.systemManager.selectedRouteDestineList;
const routeSortBy = state => state.systemManager.routeSortBy;
const routeOrderBy = state => state.systemManager.routeOrderBy;
const selectedRouteSortBy = state => state.systemManager.selectedRouteSortBy;
const selectedRouteOrderBy = state => state.systemManager.selectedRouteOrderBy;
const availableRouteReasonsList = state => state.systemManager.availableRouteReasonsList;
const selectedRouteReasonsList = state => state.systemManager.selectedRouteReasonsList;
const routeReasonSortBy = state => state.systemManager.routeReasonSortBy;
const routeReasonOrderBy = state => state.systemManager.routeReasonOrderBy;
const selectedRouteReasonsSortBy = state => state.systemManager.selectedRouteReasonsSortBy;
const selectedRouteReasonOrderBy = state => state.systemManager.selectedRouteReasonOrderBy;
const availableHoldsList = state => state.systemManager.availableHoldsList;
const selectedHoldsList = state => state.systemManager.selectedHoldsList;
const holdsSortBy = state => state.systemManager.holdsSortBy;
const holdsOrderBy = state => state.systemManager.holdsOrderBy;
const selectedHoldsSortBy = state => state.systemManager.selectedHoldsSortBy;
const selectedHoldsOrderBy = state => state.systemManager.selectedHoldsOrderBy;
const selectedBrokerObjectStore = state => state.systemManagerWorkbenches.selectedBrokerObjectStore;
const brokersChoiceList = state => state.systemManagerWorkbenches.brokersChoiceList;
const selectedSearchIn = state => state.systemManagerWorkbenches.selectedSearchIn;
const relatedTasksChoiceLists = state => state.systemManagerWorkbenches.relatedTasksChoiceList;

export const subChildItemsListSelector = createSelector(subChildScreenDetails, sysMgrSortBy, sysMgrOrderBy,
    (subChildScreenDetails, sysMgrSortBy, sysMgrOrderBy) => {
        let newArray = [];
        if (_.keys(subChildScreenDetails).length > 0) {
            let clonedEnvList = JSON.parse(subChildScreenDetails?.listItems);
            let clonedArrList = _.orderBy([...clonedEnvList?.items], [sysMgrSortBy], [sysMgrOrderBy]);
            clonedArrList.forEach((item) => {
                const newObj = { ...item };
                newObj.lastModifiedDate = moment(item.lastModifiedDate).format(i18n.t('systemManager_date_time_format'));
                for (const key in newObj) {
                    if (typeof newObj[key] === "boolean") {
                        let stringValue = newObj[key].toString();
                        newObj[key] = stringValue.charAt(0).toUpperCase() + stringValue.substring(1)
                    }
                }
                newArray.push(newObj)
            });
        }
        return newArray
    });


export const processSelector = createSelector(choiceLists, selectedSearchInObj,
    (choiceLists, selectedSearchInObj) => {
        let newArray = [];
        if (_.keys(selectedSearchInObj).length > 0) {
            newArray = _.filter(choiceLists[0].selections, (choiceObj) => { return choiceObj.parentId == selectedSearchInObj?.id });
        }
        return newArray
    });

export const sortBySelector = createSelector(choiceLists, selectedSearchInObj,
    (choiceLists, selectedSearchInObj) => {
        let newArray = [];
        if (_.keys(selectedSearchInObj).length > 0) {
            newArray = _.filter(choiceLists[2].selections, (choiceObj) => { return choiceObj.parentId === selectedSearchInObj?.id });
        }
        return newArray
    });

export const availableRoleSelector = createSelector(availableRolesList, roleSortBy, roleOrderBy,
    (availableRolesList, roleSortBy, roleOrderBy) => {
        let newArray = [];
        if (availableRolesList.length > 0) {
            newArray = _.orderBy([...availableRolesList], [roleSortBy], [roleOrderBy]);
        }
        return newArray
    });

export const selectedRoleSelector = createSelector(selectedRolesList, selectedRoleSortBy, selectedRoleOrderBy,
    (selectedRolesList, selectedRoleSortBy, selectedRoleOrderBy) => {
        let newArray = [];
        if (selectedRolesList.length > 0) {
            newArray = _.orderBy([...selectedRolesList], [selectedRoleSortBy], [selectedRoleOrderBy]);
        }
        return newArray
    });

export const dataElementsChoiceListSelector = createSelector(dataElementsMetaData, selectedObjectStore,
    (dataElementsMetaData, selectedObjectStore) => {
        let newArray = [];
        if (_.keys(selectedObjectStore).length > 0) {
            newArray = _.filter(dataElementsMetaData?.choiceLists[1].selections, (choiceObj) => { return choiceObj.parentId == selectedObjectStore?.id });
        }
        return newArray;
    });
export const folderTypeListSelector = createSelector(workbenchesConfigBrokersModel,workbenchesContextModel ,
    (workbenchesConfigBrokersModel, workbenchesContextModel) => {
        let folderList = [];
        if(workbenchesContextModel && workbenchesConfigBrokersModel) {
          if(workbenchesContextModel.broker.brokerType ===6){
         folderList = workbenchesConfigBrokersModel?.filter((model) => model?.brokerType === 6)
          }else if(workbenchesContextModel.broker.brokerType ===2){
            folderList = workbenchesConfigBrokersModel?.filter((model) => model?.brokerType === 2)
          }
          else{
            folderList = workbenchesConfigBrokersModel?.filter((model) => model?.brokerType === workbenchesContextModel?.folderType)
          }
        }
        return folderList
    });
export const folderTypeSubStepViewListSelector = createSelector(workbenchesConfigBrokersModel,workbenchesContextModel , activeStepViewTabIndexData,
    (workbenchesConfigBrokersModel, workbenchesContextModel, activeStepViewTabIndexData) => {
        let folderList = [];
        if(workbenchesContextModel && workbenchesConfigBrokersModel) {
            folderList = workbenchesConfigBrokersModel?.filter((model) => { return model?.brokerType == workbenchesContextModel?.subFolders[activeStepViewTabIndexData]?.folder?.broker?.brokerType})
        }
        return folderList
    });

export const availableViewStepsSelector = createSelector(workbenchesConfigCompleteJson, stepsSortBy, stepsOrderBy,
    (workbenchesConfigCompleteJson,stepsSortBy,stepsOrderBy ) => {
        let newArray = [];
        if(workbenchesConfigCompleteJson?.workbenchAvailableSteps.length > 0) {
            newArray = _.orderBy([...workbenchesConfigCompleteJson?.workbenchAvailableSteps], [stepsSortBy], [stepsOrderBy]);
        }
        return newArray
    });
    export const availableVStepsSelector = createSelector(workbenchesConfigCompleteJson, stepsSortBy, stepsOrderBy,
        (workbenchesConfigCompleteJson,stepsSortBy,stepsOrderBy ) => {
            let newArray = [];
            if(workbenchesConfigCompleteJson?.availableSteps.length > 0) {
                const availableSteps=JSON.parse(workbenchesConfigCompleteJson?.availableSteps)
                newArray = _.orderBy([...availableSteps], [stepsSortBy], [stepsOrderBy]);
            }
            return newArray
        });

export const selectedViewStepsSelector = createSelector(workbenchesConfigCompleteJson, selectedStepsSortBy, selectedStepsOrderBy,
    (workbenchesConfigCompleteJson,selectedStepsSortBy,selectedStepsOrderBy ) => {
        console.log("workbenchesConfigCompleteJson",workbenchesConfigCompleteJson)
        let newArray = [];
        if(workbenchesConfigCompleteJson?.workbenchSelectedSteps.length > 0) {
            newArray = _.orderBy([...workbenchesConfigCompleteJson?.workbenchSelectedSteps], [selectedStepsSortBy], [selectedStepsOrderBy]);
        }
        return newArray
    });

export const docClassObjStoreSelector = createSelector(sysManagerWSChoiceLists, selectedSearchObjectStore,
    (sysManagerWSChoiceLists, selectedSearchObjectStore) => {
        let newArray = [];
        if (_.keys(selectedSearchObjectStore).length > 0) {
            newArray = _.filter(sysManagerWSChoiceLists.find(f=>f.name==='docClasses')?.selections, (choiceObj) => { return choiceObj.parentId == selectedSearchObjectStore?.id });
        }
        return newArray;
    });

export const availableRouteDestineSelector = createSelector(availableRouteDestineList, routeSortBy, routeOrderBy,
    (availableRouteDestineList, routeSortBy, routeOrderBy) => {
        let newArray = [];
        if (availableRouteDestineList.length > 0) {
            newArray = _.orderBy([...availableRouteDestineList], [routeSortBy], [routeOrderBy]);
        }
        return newArray
    });

export const selectedRouteDestineSelector = createSelector(selectedRouteDestineList, selectedRouteSortBy, selectedRouteOrderBy,
    (selectedRouteDestineList, selectedRouteSortBy, selectedRouteOrderBy) => {
        let newArray = [];
        if (selectedRouteDestineList.length > 0) {
            newArray = _.orderBy([...selectedRouteDestineList], [selectedRouteSortBy], [selectedRouteOrderBy]);
        }
        return newArray
    });

export const availableRouteReasonsSelector = createSelector(availableRouteReasonsList, routeReasonSortBy, routeReasonOrderBy,
    (availableRouteReasonsList, routeReasonSortBy, routeReasonOrderBy) => {
        let newArray = [];
        if (availableRouteReasonsList.length > 0) {
            newArray = _.orderBy([...availableRouteReasonsList], [routeReasonSortBy], [routeReasonOrderBy]);
        }
        return newArray
    });

export const selectedRouteReasonsSelector = createSelector(selectedRouteReasonsList, selectedRouteReasonsSortBy, selectedRouteReasonOrderBy,
    (selectedRouteReasonsList, selectedRouteReasonsSortBy, selectedRouteReasonOrderBy) => {
        let newArray = [];
        if (selectedRouteReasonsList.length > 0) {
            newArray = _.orderBy([...selectedRouteReasonsList], [selectedRouteReasonsSortBy], [selectedRouteReasonOrderBy]);
        }
        return newArray
    });
export const availableHoldsSelector = createSelector(availableHoldsList, holdsSortBy, holdsOrderBy,
    (availableHoldsList, holdsSortBy, holdsOrderBy) => {
        let newArray = [];
        if (availableHoldsList.length > 0) {
            newArray = _.orderBy([...availableHoldsList], [holdsSortBy], [holdsOrderBy]);
        }
        return newArray
    });

export const selectedHoldsSelector = createSelector(selectedHoldsList, selectedHoldsSortBy, selectedHoldsOrderBy,
    (selectedHoldsList, selectedHoldsSortBy, selectedHoldsOrderBy) => {
        let newArray = [];
        if (selectedHoldsList.length > 0) {
            newArray = _.orderBy([...selectedHoldsList], [selectedHoldsSortBy], [selectedHoldsOrderBy]);
        }
        return newArray
    });

export const docClassBrokerSelector = createSelector (workbenchesContextModel,brokersChoiceList, selectedBrokerObjectStore, activeStepViewTabIndexData,
    (workbenchesContextModel,brokersChoiceList, selectedBrokerObjectStore, activeStepViewTabIndexData) => {
        let newArray = [];
      if (workbenchesContextModel?.broker?.brokerType===6 && activeStepViewTabIndexData === null  && selectedBrokerObjectStore["-1"]?.id === undefined) {
        newArray = _.keys(brokersChoiceList).length > 0 && _.filter(brokersChoiceList["-1"][1].selections, (choiceObj) => { return choiceObj.parentId == brokersChoiceList["-1"][0]?.selections[0].id });
      }else if (_.keys(selectedBrokerObjectStore).length > 0 && activeStepViewTabIndexData === null) {
            newArray = _.keys(brokersChoiceList).length > 0 && _.filter(brokersChoiceList["-1"][1].selections, (choiceObj) => { return choiceObj.parentId == selectedBrokerObjectStore["-1"]?.id });
        }else if(_.keys(selectedBrokerObjectStore).length > 0 && activeStepViewTabIndexData !== null){
            newArray = _.keys(brokersChoiceList).length > 0 && brokersChoiceList.hasOwnProperty(activeStepViewTabIndexData.toString()) === true &&
                _.filter(brokersChoiceList[activeStepViewTabIndexData.toString()][1].selections, (choiceObj) => { return choiceObj.parentId == selectedBrokerObjectStore[activeStepViewTabIndexData.toString()]?.id });
        }
        return newArray;
    });

export const draftClassBrokerSelector = createSelector (brokersChoiceList, selectedBrokerObjectStore, activeStepViewTabIndexData,workbenchesContextModel,
    (brokersChoiceList, selectedBrokerObjectStore, activeStepViewTabIndexData, workbenchesContextModel) => {
        let newArray = [];
        if (_.keys(selectedBrokerObjectStore).length > 0 && activeStepViewTabIndexData === null) {
            newArray = _.keys(brokersChoiceList).length > 0 && _.filter(brokersChoiceList["-1"]?.[2]?.selections, (choiceObj) => { return choiceObj.parentId == selectedBrokerObjectStore["-1"]?.id });
        }else if(_.keys(selectedBrokerObjectStore).length > 0 && activeStepViewTabIndexData !== null) {
            if (workbenchesContextModel.subFolders[activeStepViewTabIndexData]?.folder?.broker?.brokerName === "Case Blog" && brokersChoiceList[activeStepViewTabIndexData.toString()]?.length > 2) {
                newArray = _.keys(brokersChoiceList).length > 0 && brokersChoiceList.hasOwnProperty(activeStepViewTabIndexData.toString()) === true &&
                    _.filter(brokersChoiceList[activeStepViewTabIndexData.toString()]?.[2].selections, (choiceObj) => {
                        return choiceObj.parentId == selectedBrokerObjectStore[activeStepViewTabIndexData.toString()]?.id
                    });
            }
        }
        return newArray;
    });


export const processBrokerSelector = createSelector(relatedTasksChoiceLists, selectedSearchIn,activeStepViewTabIndexData,
    (relatedTasksChoiceLists, selectedSearchIn, activeStepViewTabIndexData) => {
        let newArray = [];
            if (_.keys(selectedSearchIn).length > 0 && activeStepViewTabIndexData !== null) {
                newArray = _.filter(relatedTasksChoiceLists[activeStepViewTabIndexData.toString()]?.[0]?.selections, (choiceObj) => {
                    return choiceObj.parentId == selectedSearchIn[activeStepViewTabIndexData.toString()]?.id
                });
            }
            return newArray
    });
export const usingIndexBrokerSelector = createSelector(relatedTasksChoiceLists, selectedSearchIn,activeStepViewTabIndexData,
    (relatedTasksChoiceLists, selectedSearchIn, activeStepViewTabIndexData) => {
        let newArray = [];
        if (_.keys(selectedSearchIn).length > 0 && activeStepViewTabIndexData !== null) {
            newArray = _.filter(relatedTasksChoiceLists[activeStepViewTabIndexData.toString()]?.[2]?.selections, (choiceObj) =>
            { return choiceObj.parentId === selectedSearchIn[activeStepViewTabIndexData.toString()]?.name });
        }
        return newArray
    });

export const workflowStepsSelector = createSelector(sysManagerWSChoiceLists, selectedClass,
  (sysManagerWSChoiceLists, selectedClass) => {
    let newArray = [];
    if (_.keys(selectedClass).length > 0) {
      newArray = _.filter(sysManagerWSChoiceLists.find(f=>f.name==='workflowSteps')?.selections, (choiceObj) => { return choiceObj.parentId == selectedClass?.id });
    }
    return newArray;
  });