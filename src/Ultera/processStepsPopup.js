import React, {useEffect, useState} from "react";
import {useTranslation} from "react-i18next";
import {useDispatch,useSelector} from "react-redux";
// import styles from "./workbenchesConfig.module.scss";
import styles from  "./processStepsPopup.module.scss";
import {Icons} from "../../../../components/icons";
import {ICONS} from "../../../../utils/iconNames";
import {Button, Checkbox} from "@blueprintjs/core";
import {
    onSortingSelectedViewStepsColumns,
    onSortingViewStepsColumns,
    setSearchesConfigDetails,
    setWorkbenchesContextModel,
    updateSelectedSearchInObj,
    updateViewerSettingsCompleteJson,
    updateWSConfigContextModel
} from "../../../../slices/systemManagerSlice";
import {AutoSelect} from "../../../../components/autoSelect";
import {Table} from "../../../../components/tables/Table";
import {HeaderActions} from "../../../../components/headerActions";
import {
    availableViewStepsSelector,
    availableVStepsSelector,
    folderTypeListSelector,
    folderTypeSubStepViewListSelector
} from "../../../../slices/systemMangerSelectors";
import _ from "lodash";
export const ProcessStepsPopup=({selectedViewStepsSelectorList,isError})=>{
    const {t}=useTranslation();
    const {loading}=useSelector((state) => state.dashboard);
    const {activeWorkbenchViewTabIndex, workbenchesContextModel, workbenchesConfigCompleteJson,searchesConfigDetails,setSearchesConfigCompleteJson}=useSelector((state) => state.systemManager);
    const folderTypeSelectorList = useSelector(state => folderTypeListSelector(state));
    const folderTypeSubStepSelectorList = useSelector(state => folderTypeSubStepViewListSelector(state));
    const availableViewStepsSelectorList = useSelector(state=> availableViewStepsSelector(state));
    const availableVStepsSelectorList=useSelector(state=>availableVStepsSelector(state));
    const [folderTypeError, setFolderTypeError] = useState("");
    const [nameOrderList, setNameOrderList] = useState([]);
    const [selectedLeftRows, setSelectedLeftRows] = useState(null);
    const [selectedRightRows, setSelectedRightRows] = useState(null);
    const [showBorder, setShowBorder] = useState(false);
    const [leftTableHeader, setLeftTableHeader] = useState([
        {name: 'name', caption: "Process", colWidth:  165},
        {name: 'description', caption: "Excluded Steps", colWidth:  170}]);
    const [rightTableHeader, setRightTableHeader] = useState([
        {name: 'name', caption: "Process", colWidth: 165},
        {name: 'description', caption: "Included Steps", colWidth:  170}]);

        const dispatch=useDispatch();
    useEffect(() => {
        setShowBorder(false)
    }, [activeWorkbenchViewTabIndex,workbenchesConfigCompleteJson,leftTableHeader]);
    useEffect(() => {
        if (_.keys(workbenchesConfigCompleteJson?.availableSteps)) {
          UpdateOrderTable();
        }
      }, [workbenchesConfigCompleteJson]);
    
      const UpdateOrderTable = () => {
        const temp = [];
        console.log("workbenchesConfigCompleteJson?.availableSteps",workbenchesConfigCompleteJson?.availableSteps);
        let clonedEnvList =JSON.parse(workbenchesConfigCompleteJson?.availableSteps);
        clonedEnvList?.length > 0 &&
          _.map(clonedEnvList, (item) => {
            console.log("item",item);
            temp.push({
              name: item.name,
              id: item.id,
              description: item.description,
            });
          });
             setNameOrderList(temp);
      };
  console.log("availableViewStepsSelectorList",availableVStepsSelectorList)
  console.log("selectedViewStepsSelectorList",selectedViewStepsSelectorList)
    const actionsOnLeftTableRowClick = (data) =>{
        if(!Array.isArray(data)) {
            setSelectedLeftRows(data)
        }else{
            let calculatedArray = _.filter(availableViewStepsSelectorList,(el)=>{
                let findData = false;
                const result =  _.filter(data,(dataObj)=>{
                    return dataObj.id == el.id;
                });
                if(result.length > 0){
                    findData = true;
                }
                return findData;
            });
            if(calculatedArray.length > 0){
                setSelectedLeftRows(calculatedArray)
            }
        }
    };
    const actionsOnRightTableRowClick = (data) =>{
        if(!Array.isArray(data)) {
            setSelectedRightRows(data)
        }else{
            let calculatedArray = _.filter(selectedViewStepsSelectorList,(el)=>{
                let findData = false;
                const result =  _.filter(data,(dataObj)=>{
                    return dataObj.id == el.id;
                });
                if(result.length > 0){
                    findData = true;
                }
                return findData;
            });
            if(calculatedArray.length > 0){
                setSelectedRightRows(calculatedArray)
            }
        }
    };
    const onColumnSort = (sortBy, sortDirection) => {
        let orderBy = '';
        if (sortDirection === 'Asc') {
            orderBy = 'asc'
        } else {
            orderBy = 'desc'
        }
        dispatch(onSortingViewStepsColumns({sortBy, orderBy}))
    };
    const onColumnRightSort = (sortBy, sortDirection) =>{
        let orderBy = '';
        if (sortDirection === 'Asc') {
            orderBy = 'asc'
        } else {
            orderBy = 'desc'
        }
        dispatch(onSortingSelectedViewStepsColumns({sortBy, orderBy}))
    };

    const sendRightClick = () =>{
        if(selectedLeftRows) {
            if (!Array.isArray(selectedLeftRows)) {
                let clonedRightArray = [...selectedViewStepsSelectorList];
                clonedRightArray.push(selectedLeftRows);
                let clonedViewerCompleteJson = JSON.parse(JSON.stringify(workbenchesConfigCompleteJson));
                clonedViewerCompleteJson.workbenchSelectedSteps = clonedRightArray;
                let clonedLeftArray = [...availableViewStepsSelectorList];
                clonedLeftArray = clonedLeftArray.filter((object) => {
                    return object.id !== selectedLeftRows.id
                });
                clonedViewerCompleteJson.workbenchAvailableSteps = clonedLeftArray;
                dispatch(updateViewerSettingsCompleteJson(clonedViewerCompleteJson));
            } else {
                let clonedRightArray = [...selectedViewStepsSelectorList];
                clonedRightArray = [...clonedRightArray, ...selectedLeftRows];
                let clonedViewerCompleteJson = JSON.parse(JSON.stringify(workbenchesConfigCompleteJson));
                clonedViewerCompleteJson.workbenchSelectedSteps = clonedRightArray;
                let clonedLeftArray = _.filter(availableViewStepsSelectorList, (el) => {
                    let findData = false;
                    const result = _.filter(selectedLeftRows, (data) => {
                        return data.id === el.id;
                    });
                    if (result.length > 0) {
                        findData = true;
                    }
                    return !findData;
                });
                clonedViewerCompleteJson.workbenchAvailableSteps = clonedLeftArray;
                dispatch(updateViewerSettingsCompleteJson(clonedViewerCompleteJson));
            }
            setSelectedLeftRows(null)
        }
    };
    const sendAllRightClick = () =>{
        if(availableViewStepsSelectorList.length > 0) {
            setSelectedLeftRows(null);
            setSelectedRightRows(null);
            let clonedArray = JSON.parse(JSON.stringify(availableViewStepsSelectorList));
            let cloneViewerCompleteJson = JSON.parse(JSON.stringify(workbenchesConfigCompleteJson));
            cloneViewerCompleteJson.workbenchAvailableSteps = [];
            if(selectedViewStepsSelectorList.length > 0) {
                clonedArray = [...selectedViewStepsSelectorList, ...clonedArray];
            }
            cloneViewerCompleteJson.workbenchSelectedSteps = clonedArray;
            dispatch(updateViewerSettingsCompleteJson(cloneViewerCompleteJson));
        }
    };
    const sendLeftClick = () =>{
        if(selectedRightRows) {
            if (!Array.isArray(selectedRightRows)) {
                let clonedRightArray = [...availableViewStepsSelectorList];
                clonedRightArray.push(selectedRightRows);
                let cloneViewerCompleteJson = JSON.parse(JSON.stringify(workbenchesConfigCompleteJson));
                cloneViewerCompleteJson.workbenchAvailableSteps = clonedRightArray;
                let clonedLeftArray = [...selectedViewStepsSelectorList];
                clonedLeftArray = clonedLeftArray.filter((object) => {
                    return object.id !== selectedRightRows.id
                });
                cloneViewerCompleteJson.workbenchSelectedSteps = clonedLeftArray;
                dispatch(updateViewerSettingsCompleteJson(cloneViewerCompleteJson));

            } else {
                let clonedRightArray = [...availableViewStepsSelectorList];
                clonedRightArray = [...clonedRightArray, ...selectedRightRows];
                let cloneViewerCompleteJson = JSON.parse(JSON.stringify(workbenchesConfigCompleteJson));
                cloneViewerCompleteJson.workbenchAvailableSteps = clonedRightArray;
                let clonedLeftArray = _.filter(selectedViewStepsSelectorList, (el) => {
                    let findData = false;
                    const result = _.filter(selectedRightRows, (data) => {
                        return data.id === el.id;
                    });
                    if (result.length > 0) {
                        findData = true;
                    }
                    return !findData;
                });
                cloneViewerCompleteJson.workbenchSelectedSteps = clonedLeftArray;
                dispatch(updateViewerSettingsCompleteJson(cloneViewerCompleteJson));
            }
            setSelectedRightRows(null)
        }
    };
    const sendAllLeftClick = () =>{
        if(selectedViewStepsSelectorList.length > 0) {
            setSelectedLeftRows(null);
            setSelectedRightRows(null);
            let clonedArray = JSON.parse(JSON.stringify(selectedViewStepsSelectorList));
            let clonedViewerCompleteJson = JSON.parse(JSON.stringify(workbenchesConfigCompleteJson));
            clonedViewerCompleteJson.workbenchSelectedSteps = [];
            if(availableViewStepsSelectorList.length > 0) {
                clonedArray = [...availableViewStepsSelectorList, ...clonedArray];
            }
            clonedViewerCompleteJson.workbenchAvailableSteps = clonedArray;
            dispatch(updateViewerSettingsCompleteJson(clonedViewerCompleteJson));
        }
    };
        return (
            <>
                   <div className={styles.contentDiv}>
                    { 
                            <div className={styles.procLabel}>
                                <div
                                    className={styles.childProcLabel}>{t('sysmgr.workbench.config.gentab.fieldset.title')}</div>
                                <div className={styles.parentTextDiv}
                                     style={{display: "flex", padding: 10}}>
                                    <div className={styles.leftChildStyle}>
                                        <Table
                                            loading={loading}
                                            tableId={"leftViewTable"}
                                            headerIcon={<Icons icon={ICONS.MODULE_PREFERENCES}/>}
                                            actions={<HeaderActions minimal={true} actions={[]}/>}
                                            searchResultCol={leftTableHeader}
                                            // tableData={availableViewStepsSelectorList}
                                            tableData={nameOrderList}
                                            colNames={leftTableHeader}
                                            isSortable={true}
                                            // searchResult={availableViewStepsSelectorList}
                                            searchResult={nameOrderList}
                                            isError={isError}
                                            actionsOnTableRowClick={actionsOnLeftTableRowClick}
                                            appType={'UlteraAdmin'}
                                            onColumnSort={onColumnSort}
                                            setTableColumnsWidth={setLeftTableHeader}
                                            resetSelectedRow={selectedLeftRows}
                                            noDataText={" "}
                                        />
                                    </div>
                                    <div className={styles.middleChildStyle}>
                                        <Button onClick={sendRightClick} title={">"}
                                                icon={<Icons
                                                    icon={ICONS.FORM_NEXT_WHITE}/>}
                                                className={styles.buttonMidIcon}
                                        />
                                        <Button onClick={sendAllRightClick} title={">>"}
                                                icon={<Icons
                                                    icon={ICONS.FORM_FAST_FORWARD_WHITE}/>}
                                                className={styles.buttonMidIcon}
                                        />
                                        <Button onClick={sendLeftClick} title={"<"} icon={<Icons
                                            icon={ICONS.FORM_PREVIOUS_WHITE}/>}
                                                className={styles.buttonMidIcon}
                                        />
                                        <Button onClick={sendAllLeftClick} title={"<<"}
                                                icon={<Icons
                                                    icon={ICONS.FORM_REWIND_WHITE}/>}
                                                className={styles.buttonMidIcon}
                                        />
                                    </div>
                                    <div className={styles.leftChildStyle}>
                                        <Table
                                            loading={loading}
                                            tableId={"rightViewTable"}
                                            headerIcon={<Icons
                                                icon={ICONS.MODULE_PREFERENCES}/>}
                                            actions={<HeaderActions minimal={true} actions={[]}/>}
                                            searchResultCol={rightTableHeader}
                                            tableData={selectedViewStepsSelectorList}
                                            colNames={rightTableHeader}
                                            isSortable={true}
                                            searchResult={selectedViewStepsSelectorList}
                                            isError={isError}
                                            actionsOnTableRowClick={actionsOnRightTableRowClick}
                                            appType={'UlteraAdmin'}
                                            onColumnSort={onColumnRightSort}
                                            setTableColumnsWidth={setRightTableHeader}
                                            resetSelectedRow={selectedRightRows}
                                            noDataText={" "}
                                        />
                                    </div>
                                </div>
                            </div>
                    }
                </div>
            </>
        );
}