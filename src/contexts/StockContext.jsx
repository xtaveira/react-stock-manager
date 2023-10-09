import { createContext, useState } from "react";
import { PropTypes } from "prop-types";

// para usar o contexto precisa de uma provider
export const StockContext = createContext({})

StockContextProvider.propTypes = {
    children: PropTypes.node
}

export function StockContextProvider({children}) {
    const [items, setItems] = useState(() => {
        const storedItems = localStorage.getItem('react-stock-manager')
        if(!storedItems) return []
        const items = JSON.parse(storedItems)
        items.forEach((item) => {
            item.createdAt = new Date(item.createdAt) // criar uma data que veio como string
            item.updatedAt = new Date(item.updatedAt) // criar uma data que veio como string
        })
        return items
    })

    const addItem = (item) => {
        setItems(currentState => {
            const updatedItems = [item, ...currentState] // novo valor baseado no anterior
            localStorage.setItem('react-stock-manager', JSON.stringify(updatedItems))
            return updatedItems
        })
    }

    const deleteItem = (itemId) => {
        setItems(currentState => {
            const updatedItems = currentState.filter(item => item.id !== itemId)
            localStorage.setItem('react-stock-manager', JSON.stringify(updatedItems))
            return updatedItems
        })
    }

    const getItem = (itemId) => {
        return items.find(item => item.id === +itemId)
    }

    const updateItem = (itemId, newAtributes) => {
        setItems(currentState => {
            const itemIndex = currentState.findIndex(item => item.id === +itemId)
            const updatedItems = [...currentState]
            Object.assign(updatedItems[itemIndex], newAtributes, {updatedAt: new Date()})
            localStorage.setItem('react-stock-manager', JSON.stringify(updatedItems))
            return updatedItems
        })
    }

    const stock = {
        items,
        addItem,
        deleteItem,
        getItem,
        updateItem
    }

    return (
        <StockContext.Provider value={stock}>
            {children}
        </StockContext.Provider>
    )
}