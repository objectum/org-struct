import * as React from 'react'
import { NextPage, NextPageContext } from 'next'
import { Emp } from '../../src/entity'
import { useState, useEffect } from 'react'
import { createEmp, changeEmp, removeEmp } from '../api'

interface Props {
    query: { emps: string }
}

interface ContainerProps {
    emps: Emp[]
    parentId: number
}

interface BranchProps {
    emps: Emp[]
    emp: Emp
}

interface CallbackFunction {
    (): void
}

interface CreateFunction {
    (name: string): void
}

interface ChangeFunction {
    (parentId: number): void
}

interface MenuProps {
    top: number
    left: number
    hide: CallbackFunction
    showCreation: CallbackFunction
    showChanging: CallbackFunction
    remove: CallbackFunction
}

interface CreationProps {
    top: number
    left: number
    create: CreateFunction
    hide: CallbackFunction
}

interface ChangingProps {
    top: number
    left: number
    emps: Emp[]
    change: ChangeFunction
    hide: CallbackFunction
}

let currentEmp: number = null
let selectedEmpId: number = null

const Branch = (props: BranchProps) => {
    const { emp, emps } = props
    const childs: Emp[] = emps.filter(e => e.parentId === emp.id)

    return (
        <div>
            {emp.parentId ? <div className="link">|</div> : null}
            <div className="emp" onMouseOver={() => (currentEmp = emp.id)} onMouseOut={() => (currentEmp = null)}>
                {emp.name}
            </div>
            {childs.length ? <Container emps={emps} parentId={emp.id} /> : null}
        </div>
    )
}

const Container = (props: ContainerProps) => {
    const { emps, parentId } = props

    return (
        <div style={{ display: 'flex' }}>
            {emps
                .filter(emp => emp.parentId === parentId)
                .map((emp, i) => {
                    return <Branch emps={emps} emp={emp} key={i} />
                })}
        </div>
    )
}

const Menu = (props: MenuProps) => {
    const { top, left, hide, showCreation, showChanging, remove } = props

    return (
        <div style={{ top, left }} onMouseLeave={() => hide()} className="menu">
            <p
                onClick={() => {
                    hide()
                    showCreation()
                }}
            >
                Добавить
            </p>
            {currentEmp ? (
                <p
                    onClick={() => {
                        hide()
                        showChanging()
                    }}
                >
                    Изменить руководителя
                </p>
            ) : null}
            {currentEmp ? (
                <p
                    onClick={() => {
                        hide()
                        remove()
                    }}
                >
                    Удалить
                </p>
            ) : null}
        </div>
    )
}

const Creation = (props: CreationProps) => {
    const { top, left, create, hide } = props
    const [name, setName] = useState('')

    return (
        <div style={{ top, left }} className="dialog">
            <input type="text" autoFocus onChange={e => setName(e.target.value)} />
            <button onClick={() => create(name)} disabled={!name} className="button">
                Добавить
            </button>
            <button onClick={hide} className="button">
                Отмена
            </button>
        </div>
    )
}

const Changing = (props: ChangingProps) => {
    const { top, left, emps, change, hide } = props

    return (
        <div style={{ top, left }} className="menu">
            <button onClick={hide} className="button cancel-change">
                Отмена
            </button>
            {emps.map((emp, i) => {
                return (
                    <p
                        key={i}
                        onClick={() => {
                            hide()
                            change(emp.id)
                        }}
                    >
                        {emp.name}
                    </p>
                )
            })}
        </div>
    )
}

const Home: NextPage<Props> = ({ query }) => {
    const [emps, setEmps] = useState(JSON.parse(query.emps))
    const [menuVisible, setMenuVisible] = useState(false)
    const [menuTop, setMenuTop] = useState(0)
    const [menuLeft, setMenuLeft] = useState(0)
    const [creationVisible, setCreationVisible] = useState(false)
    const [changingVisible, setChangingVisible] = useState(false)
    const selectedParentId = emps.find((emp: Emp) => emp.id === selectedEmpId)?.parentId || null

    useEffect(() => {
        addEventListener('contextmenu', function (e) {
            selectedEmpId = currentEmp
            e.preventDefault()
            setMenuLeft(e.pageX - 40)
            setMenuTop(e.pageY - 10)
            setCreationVisible(false)
            setMenuVisible(true)
        })
    })

    return (
        <div>
            <Container emps={emps} parentId={null} />
            {menuVisible ? (
                <Menu
                    top={menuTop}
                    left={menuLeft}
                    hide={() => setMenuVisible(false)}
                    showCreation={() => setCreationVisible(true)}
                    showChanging={() => setChangingVisible(true)}
                    remove={async () => {
                        await removeEmp(selectedEmpId)
                        setEmps([...emps.filter((emp: Emp) => emp.id !== selectedEmpId)])
                    }}
                />
            ) : null}
            {creationVisible ? (
                <Creation
                    top={menuTop}
                    left={menuLeft}
                    create={async name => {
                        setCreationVisible(false)
                        const emp: Emp = await createEmp(name, selectedEmpId)
                        setEmps([...emps, emp])
                    }}
                    hide={() => setCreationVisible(false)}
                />
            ) : null}
            {changingVisible ? (
                <Changing
                    top={menuTop}
                    left={menuLeft}
                    emps={emps.filter((emp: Emp) => emp.id !== selectedParentId)}
                    change={async parentId => {
                        setChangingVisible(false)
                        const emp: Emp = await changeEmp(selectedEmpId, parentId)
                        setEmps([...emps.filter((e: Emp) => e.id !== emp.id), emp])
                    }}
                    hide={() => setChangingVisible(false)}
                />
            ) : null}
        </div>
    )
}

export async function getServerSideProps(ctx: NextPageContext) {
    const query = {
        emps: JSON.stringify(ctx.query.emps),
    }
    return { props: { query } }
}

export default Home
