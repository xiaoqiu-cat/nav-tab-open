<template>
  <div class="full-page">
    <el-form ref="elForm" class="add-from-container" :model="addtableData" :rules="elFormRules" size="small" :inline="true">
            <el-table 
                :data="addtableData.ajustData" 
                row-key="id" 
                :show-header="true"
                :expand-row-keys="expandRowKeys"
                :row-class-name="rowClassName"
                :cell-class-name="({row})=>row.childrens && row.childrens.length ? 'has-children' : ''"
                @selection-change="handleAddSelection"
                height="450"
            >
                <el-table-column type="expand">
                    <template slot-scope="props" >
                        <el-table
                            :show-header="false"
                            :data="props.row.childrens"
                            :border="false"
                        >
                            <el-table-column  
                                v-for="(item,idx) in tabHeader"
                                :key="idx"
                                :prop="item.prop"
                                :label="item.label"
                            >
                                <template slot-scope="scope">
                                    <template v-if="scope.row.type === 1">
                                        <template v-if="item.prop === 'type'">
                                            <el-tag  type="success">新</el-tag>
                                        </template>
                                        <template v-else-if="item.prop === 'name'">
                                            <el-form-item 
                                                :prop="item.prop" 
                                                :error="scope.row.nameError"
                                            >
                                                <el-input 
                                                    v-model="scope.row.name"
                                                    @input="onExchange({
                                                        currentIndex: scope.$index,
                                                        currentRow: scope.row,
                                                        fieldName: 'name',
                                                        parentIndex: props.$index,
                                                        parentRow: props.row
                                                    })"
                                                    clearable
                                                    ></el-input>
                                                    <div style="display:none">{{props.row.childrens[0].errorMsg}}</div>
                                            </el-form-item>
                                        </template>
                                        <template v-else-if="item.prop === 'level'">
                                            <el-form-item 
                                                :prop="item.prop" 
                                                :error="scope.row.levelError"
                                            >
                                                <el-select 
                                                    v-model="scope.row.level" 
                                                    @change="onExchange({
                                                        currentIndex: scope.$index,
                                                        currentRow: scope.row,
                                                        fieldName: 'level',
                                                        parentIndex: props.$index,
                                                        parentRow: props.row
                                                    })"
                                                    clearable>
                                                    <el-option value="实施性施工组织总设计"></el-option>
                                                </el-select>
                                            </el-form-item>
                                        </template>
                                        <template v-else-if="item.prop === 'target'">
                                            <el-form-item 
                                                :prop="item.prop" 
                                                :error="scope.row.targetError"
                                            >
                                                <el-select 
                                                    v-model="scope.row.target" 
                                                    @change="onExchange({
                                                        currentIndex: scope.$index,
                                                        currentRow: scope.row,
                                                        fieldName: 'target',
                                                        parentIndex: props.$index,
                                                        parentRow: props.row
                                                    })"
                                                    clearable
                                                >
                                                    <el-option value="经过专家论证"></el-option>
                                                </el-select>
                                            </el-form-item>
                                        </template>
                                        <template v-else-if="item.prop === 'plan_time'">
                                            <el-form-item 
                                                :prop="item.prop" 
                                                :error="scope.row.plan_timeError"
                                            >
                                                <el-date-picker 
                                                    clearable 
                                                    size="small"
                                                    style="width:150px;"
                                                    v-model="scope.row.plan_time"
                                                    @change="onExchange({
                                                        currentIndex: scope.$index,
                                                        currentRow: scope.row,
                                                        fieldName: 'plan_time',
                                                        parentIndex: props.$index,
                                                        parentRow: props.row
                                                    })"
                                                ></el-date-picker>
                                            </el-form-item>
                                        </template>
                                        <template v-else-if="item.prop === 'person'">
                                            <el-form-item 
                                                :prop="item.prop" 
                                                :error="scope.row.personError"
                                            >
                                                <el-input 
                                                    v-model="scope.row.person"
                                                    @input="onExchange({
                                                        currentIndex: scope.$index,
                                                        currentRow: scope.row,
                                                        fieldName: 'person',
                                                        parentIndex: props.$index,
                                                        parentRow: props.row
                                                    })"
                                                    clearable
                                                    ></el-input>
                                            </el-form-item>
                                        </template>
                                        <template v-else-if="item.prop === 'opration'">
                                            <el-button type="primary" @click="handleRowValid({
                                                currentIndex: scope.$index,
                                                currentRow: scope.row,
                                                parentIndex: props.$index,
                                                parentRow: props.row
                                            })">单行验证</el-button>
                                        </template>
                                        <template v-else >
                                        {{scope.row[item.prop]}}
                                        </template>
                                    </template>
                                    <template v-else>
                                        <span v-if="item.prop === 'type'">
                                            <el-tag  type="info">旧</el-tag>
                                        </span>
                                        <span v-else>{{scope.row[item.prop]}}</span>
                                    </template>
                                </template>
                            </el-table-column> 
                        </el-table>  
                    </template>
                </el-table-column>
                <el-table-column  
                    v-for="(item,idx) in tabHeader"
                    :key="idx"
                    :prop="item.prop"
                    :label="item.label"
                    :align="item.align"
                    :width="item.width"
                    :show-overflow-tooltip="item.toolitp"
                >
                    <template slot-scope="scope">
                        <template v-if="scope.row.type === 1">
                            <template v-if="item.prop === 'type'">
                                <el-tag  type="success">新</el-tag>
                            </template>
                            <template v-else-if="item.prop === 'name'">
                                <el-form-item 
                                    :prop="item.prop" 
                                    :error="scope.row.nameError"
                                >
                                    <el-input 
                                        v-model="scope.row.name"
                                        @input="onExchange({
                                            currentIndex: scope.$index,
                                            currentRow: scope.row,
                                            fieldName: 'name',
                                            parentIndex: null,
                                            parentRow: null
                                        })"
                                        clearable
                                        ></el-input>
                                </el-form-item>
                            </template>
                            <template v-else-if="item.prop === 'level'">
                                <el-form-item 
                                    :prop="item.prop" 
                                    :error="scope.row.levelError"
                                >
                                    <el-select 
                                        v-model="scope.row.level" 
                                        @change="onExchange({
                                            currentIndex: scope.$index,
                                            currentRow: scope.row,
                                            fieldName: 'level',
                                            parentIndex: null,
                                            parentRow: null
                                        })"
                                        clearable>
                                        <el-option value="实施性施工组织总设计"></el-option>
                                    </el-select>
                                </el-form-item>
                            </template>
                            <template v-else-if="item.prop === 'target'">
                                <el-form-item 
                                    :prop="item.prop" 
                                    :error="scope.row.targetError"
                                >
                                    <el-select 
                                        v-model="scope.row.target" 
                                        @change="onExchange({
                                            currentIndex: scope.$index,
                                            currentRow: scope.row,
                                            fieldName: 'target',
                                            parentIndex: null,
                                            parentRow: null
                                        })"
                                        clearable
                                    >
                                        <el-option value="经过专家论证"></el-option>
                                    </el-select>
                                </el-form-item>
                            </template>
                            <template v-else-if="item.prop === 'plan_time'">
                                <el-form-item 
                                    :prop="item.prop" 
                                    :error="scope.row.plan_timeError"
                                >
                                    <el-date-picker 
                                        clearable 
                                        size="small"
                                        style="width:150px;"
                                        v-model="scope.row.plan_time"
                                        @change="onExchange({
                                            currentIndex: scope.$index,
                                            currentRow: scope.row,
                                            fieldName: 'plan_time',
                                            parentIndex: null,
                                            parentRow: null
                                        })"
                                    ></el-date-picker>
                                </el-form-item>
                            </template>
                            <template v-else-if="item.prop === 'person'">
                                <el-form-item 
                                    :prop="item.prop" 
                                    :error="scope.row.personError"
                                >
                                    <el-input 
                                        v-model="scope.row.person"
                                        @input="onExchange({
                                            currentIndex: scope.$index,
                                            currentRow: scope.row,
                                            fieldName: 'person',
                                            parentIndex: null,
                                            parentRow: null
                                        })"
                                        clearable
                                        ></el-input>
                                </el-form-item>
                            </template>
                            <template v-else-if="item.prop === 'opration'">
                                <el-button type="primary" @click="handleRowValid({
                                    currentIndex: scope.$index,
                                    currentRow: scope.row,
                                    parentIndex: null,
                                    parentRow: null
                                })">单行验证</el-button>
                            </template>
                            <template v-else >
                            {{scope.row[item.prop]}}
                            </template>
                        </template>
                        <template v-else>
                            <span v-if="item.prop === 'type'">
                                <el-tag  type="info">旧</el-tag>
                            </span>
                            <span v-else>{{scope.row[item.prop]}}</span>
                        </template>
                    </template>
                </el-table-column>
            </el-table>
    </el-form>
    <el-button 
        type="primary"
        @click="handleValid"
    >整个表单验证</el-button>
  </div>
</template>

<script>

export default {
    name: 'FormValid',
    data() {
      return {
        addtableData: {
            ajustData:[
                {
                    id: 1,
                    type: 1,
                    name: '',
                    level: '',
                    target: '',
                    plan_time: '',
                    status: '完成',
                    person: '',
                    childrens:[]
                },
                {
                    id:2,
                    type: 0,
                    name: '圣诞节分类考试的解放路口的',
                    level: 'B类方案',
                    target: '十多个似懂非懂',
                    plan_time: '2022-12-16 00:00:00',
                    status: '已完成',
                    person: '张三',
                    childrens:[
                        {
                            type: 1,
                            name: '',
                            level: '',
                            target: '',
                            plan_time: '',
                            status: '完成',
                            person: '',
                        },
                        {
                            type: 1,
                            name: '',
                            level: '',
                            target: '',
                            plan_time: '',
                            status: '完成',
                            person: '',
                        }
                    ]
                }
            ]
        },
        tabHeader:[
            {
                label: '类型',
                prop: 'type',
                align: 'center',
                toolitp: true,
            },
            {
                label: '专项',
                prop: 'name',
                align: 'center',
                toolitp: true,
            },
            {
                label: '方案',
                prop: 'level',
                align: 'center',
                toolitp: true,
            },
            {
                label: '指标',
                prop: 'target',
                align: 'center',
                toolitp: true,
            },
            {
                label: '时间',
                prop: 'plan_time',
                width: 200,
                align: 'center',
                toolitp: true,
            },
            {
                label: '完成状态',
                prop: 'status',
                align: 'center',
                toolitp: true,
            },
            {
                label: '操作人',
                prop: 'person',
                align: 'center',
                toolitp: true,
            },
            {
                label: '操作',
                prop: 'opration',
                align: 'center',
                toolitp: true,
            },
        ],
        expandRowKeys:[],
        elFormRules:{},
        childForm: {},
        childFormRules:{},
        formModel:{
            name: '',
            person: ''
        },
      }
    },
    methods: {
        handleAddSelection(){},
        rowClassName(row){
            if(row.row.childrens.length==0){  
                    return 'row-expand-cover'
            }
            return 'test'
        },
        // 具体字段验证
        onExchange(paramsScope) {
            let {currentIndex,fieldName,currentRow,parentIndex,parentRow} = paramsScope
            if(parentRow && parentRow.childrens.length){
                console.log('children')
                this.$set(this.addtableData.ajustData[parentIndex].childrens,currentIndex,currentRow)
            }else{
                console.log('parent')
                let moment = this.addtableData.ajustData[currentIndex]; 
                this.$set(this.addtableData.ajustData, currentIndex, moment);
            }
            let name = fieldName
            let row = currentRow
            if(name == 'name'){
                if(row.name == ''){
                    row.nameError = '方案名称不能为空'
                }else{
                    row.nameError = ''
                }
            }else if(name == 'level') {
                if(row.level == ''){
                    row.levelError = '请选择方案等级'
                }else{
                    row.levelError = ''
                }
            }else if(name == 'target') {
                if(row.target == ''){
                    row.targetError = '请选择量化指标'
                }else{
                    row.targetError = ''
                }
            }else if(name == 'plan_time') {
                if(row.plan_time == ''){
                    row.plan_timeError = '请选择计划上报时间'
                }else{
                    row.plan_timeError = ''
                }
            }else if(name == 'person') {
                if(row.person == ''){
                    row.personError = '编制人不能为空'
                }else{
                    row.personError = ''
                }
            }
        },
        // 每行字段验证
        handleRowValid(paramsScope){
            let {currentIndex,currentRow,parentIndex,parentRow} = paramsScope
            let validFlag = true
            let row = currentRow
            validFlag = this.updateErrorMsg(row,validFlag)

            if(parentRow && parentRow.childrens.length){
                console.log('parent')
                this.$set(this.addtableData.ajustData[parentIndex].childrens,currentIndex,row)
            }else{
                console.log('parent')
                let moment = this.addtableData.ajustData[currentIndex]; 
                this.$set(this.addtableData.ajustData, currentIndex, moment);
            }
            if(!validFlag){
                return
            }
            this.$message.success('验证通过,可以操作数据了')
        },
        // 整个表单所有字段 验证
        handleValid(){
            let data = this.addtableData.ajustData
            let validFlag = true
            data.forEach((row,idx)=>{
                validFlag = this.updateErrorMsg(row,validFlag)
                if(!validFlag && row.childrens && row.childrens.length){
                    if(this.expandRowKeys.includes('id')){
                        return
                    }
                    this.expandRowKeys.push(row.id)
                }
                this.$set(data, idx, row);
                if(row.childrens && row.childrens.length){
                    row.childrens.forEach((child,cidx)=>{
                        validFlag = this.updateErrorMsg(child,validFlag)
                        this.$set(data[idx].childrens,cidx,child)
                    })
                }
            })
            console.log('validFlag',validFlag)
            if(!validFlag){
                return
            }
            this.$message.success('验证通过,可以提交表单数据了')
        },
        updateErrorMsg(row,validFlag){
            if(!row.name){
                row.nameError = '方案名称不能为空'
                validFlag = false
            }else{
                delete(row.nameError)
            }
            if(!row.level){
                row.levelError = '请选择方案等级'
                validFlag = false
            }else{
                delete(row.levelError)
            }
            if(!row.target){
                row.targetError = '请选择量化指标'
                validFlag = false
            }else{
                delete(row.targetError)
            }
            if(!row.plan_time){
                row.plan_timeError = '请选择计划上报时间'
                validFlag = false
            }else{
                delete(row.plan_timeError)
            }
            if(!row.person){
                row.personError = '编制人不能为空'
                validFlag = false
            }else{
                delete(row.personError)
            }
            return validFlag
        }

    }
}
</script>
<style lang="less" scoped>
.full-page{
    .has-children{
        text-align: right;
    }
}
.add-from-container{
    border: 1px solid #f5f5f5;
    padding: 20px;
    margin: 20px;
}
/deep/ .el-table .row-expand-cover .cell .el-table__expand-icon {
  display: none;
}
/deep/ .el-table__expanded-cell{
    padding-left: 100px !important;
}
</style>