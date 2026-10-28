import React, {createContext, useCallback, useContext, useEffect, useMemo, useState} from 'react';
import AsyncStorage from '@react-native-async-storage/async-storage';
import {INVOICE_STATUS} from '../constants';
import {createSeedInvoices, seedDishes} from '../data/seed';
import {formatDateTime} from '../utils/format';

const STORAGE_KEY = '@restaurant_app_data_v1';

const RestaurantContext = createContext(null);

const createId = prefix => `${prefix}_${Date.now()}_${Math.random().toString(36).slice(2, 7)}`;

export function RestaurantProvider({children}) {
  const [state, setState] = useState({dishes: [], invoices: []});
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    let mounted = true;

    const load = async () => {
      let data = null;
      try {
        const raw = await AsyncStorage.getItem(STORAGE_KEY);
        if (raw) {
          data = JSON.parse(raw);
        }
      } catch (error) {
        data = null;
      }
      if (!mounted) {
        return;
      }
      setState({
        dishes: data?.dishes ?? seedDishes,
        invoices: data?.invoices ?? createSeedInvoices(),
      });
      setLoading(false);
    };

    load();
    return () => {
      mounted = false;
    };
  }, []);

  useEffect(() => {
    if (loading) {
      return;
    }
    AsyncStorage.setItem(STORAGE_KEY, JSON.stringify(state)).catch(() => {});
  }, [state, loading]);

  const addDish = useCallback(dish => {
    setState(prev => ({
      ...prev,
      dishes: [...prev.dishes, {...dish, id: createId('dish')}],
    }));
  }, []);

  const updateDish = useCallback((id, changes) => {
    setState(prev => ({
      ...prev,
      dishes: prev.dishes.map(dish => (dish.id === id ? {...dish, ...changes} : dish)),
    }));
  }, []);

  const deleteDish = useCallback(id => {
    setState(prev => ({
      ...prev,
      dishes: prev.dishes.filter(dish => dish.id !== id),
    }));
  }, []);

  const setDishAvailable = useCallback((id, available) => {
    setState(prev => ({
      ...prev,
      dishes: prev.dishes.map(dish => (dish.id === id ? {...dish, available} : dish)),
    }));
  }, []);

  const changeQuantity = useCallback((tableNumber, dishId, delta) => {
    setState(prev => {
      const active = prev.invoices.find(
        invoice =>
          invoice.tableNumber === tableNumber &&
          invoice.status === INVOICE_STATUS.SERVING,
      );

      if (!active) {
        if (delta <= 0) {
          return prev;
        }
        const invoice = {
          id: createId('invoice'),
          tableNumber,
          items: [{dishId, quantity: 1}],
          status: INVOICE_STATUS.SERVING,
          createdAt: formatDateTime(new Date()),
        };
        return {...prev, invoices: [invoice, ...prev.invoices]};
      }

      const existing = active.items.find(item => item.dishId === dishId);
      let items;
      if (!existing) {
        items = delta > 0 ? [...active.items, {dishId, quantity: 1}] : active.items;
      } else {
        const quantity = existing.quantity + delta;
        items =
          quantity > 0
            ? active.items.map(item =>
                item.dishId === dishId ? {...item, quantity} : item,
              )
            : active.items.filter(item => item.dishId !== dishId);
      }

      return {
        ...prev,
        invoices: prev.invoices.map(invoice =>
          invoice.id === active.id ? {...invoice, items} : invoice,
        ),
      };
    });
  }, []);

  const payInvoice = useCallback(invoiceId => {
    setState(prev => ({
      ...prev,
      invoices: prev.invoices.map(invoice =>
        invoice.id === invoiceId
          ? {...invoice, status: INVOICE_STATUS.PAID}
          : invoice,
      ),
    }));
  }, []);

  const getActiveInvoice = useCallback(
    tableNumber =>
      state.invoices.find(
        invoice =>
          invoice.tableNumber === tableNumber &&
          invoice.status === INVOICE_STATUS.SERVING,
      ) ?? null,
    [state.invoices],
  );

  const value = useMemo(
    () => ({
      dishes: state.dishes,
      invoices: state.invoices,
      loading,
      addDish,
      updateDish,
      deleteDish,
      setDishAvailable,
      changeQuantity,
      payInvoice,
      getActiveInvoice,
    }),
    [
      state.dishes,
      state.invoices,
      loading,
      addDish,
      updateDish,
      deleteDish,
      setDishAvailable,
      changeQuantity,
      payInvoice,
      getActiveInvoice,
    ],
  );

  return (
    <RestaurantContext.Provider value={value}>
      {children}
    </RestaurantContext.Provider>
  );
}

export function useRestaurant() {
  const context = useContext(RestaurantContext);
  if (!context) {
    throw new Error('useRestaurant phải được dùng bên trong RestaurantProvider');
  }
  return context;
}
