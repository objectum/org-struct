import { Emp } from '../src/entity'

export async function createEmp(name: string, parentId: number): Promise<Emp> {
    const response = await fetch('/emp', {
        method: 'POST',
        headers: {
            'Content-Type': 'application/json',
        },
        body: JSON.stringify({ name, parentId }),
    })
    const result = await response.json()

    return result as Emp
}

export async function changeEmp(id: number, parentId: number): Promise<Emp> {
    const response = await fetch(`/emp/${id}`, {
        method: 'PUT',
        headers: {
            'Content-Type': 'application/json',
        },
        body: JSON.stringify({ parentId }),
    })
    const result = await response.json()

    return result as Emp
}

export async function removeEmp(id: number): Promise<void> {
    const response = await fetch(`/emp/${id}`, {
        method: 'DELETE',
    })
}
