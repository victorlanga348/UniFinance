/**
 * @license
 * SPDX-License-Identifier: Apache-2.0
 */

import React, { useState, useEffect } from 'react';
import { useFinance } from '../contexts/FinanceContext';
import { Transaction } from '../types/finance';
import { 
  Search, 
  Trash2, 
  Edit3, 
  TrendingUp, 
  TrendingDown, 
  X, 
  Plus, 
  HelpCircle, 
  Info, 
  Calendar, 
  ArrowLeftRight, 
  PieChart, 
  Briefcase, 
  GraduationCap, 
  Coins, 
  Cpu, 
  Store, 
  PlusCircle, 
  Utensils, 
  Car, 
  BookOpen, 
  Wifi, 
  Phone, 
  Home, 
  HeartPulse, 
  ShoppingBag, 
  Tv, 
  Compass, 
  Receipt, 
  Target,
  AlertTriangle, 
  Sparkles 
} from 'lucide-react';
import { EmptyState } from '../components/EmptyState';

// Type-safe category icon dictionary preventing wildcard imports and AI runtime errors
const categoryIconMap: Record<string, React.ElementType> = {
  Briefcase,
  GraduationCap,
  Coins,
  Cpu,
  Store,
  TrendingUp,
  PlusCircle,
  Utensils,
  Car,
  BookOpen,
  Wifi,
  Phone,
  Home,
  HeartPulse,
  ShoppingBag,
  Tv,
  Compass,
  Receipt,
  Target,
  HelpCircle,
  AlertTriangle
};

const renderCategoryIcon = (iconName: string, className = '') => {
  const IconComponent = categoryIconMap[iconName] || HelpCircle;
  return <IconComponent size={16} className={className} />;
};

export const Transactions: React.FC = () => {
  const { 
    transactions, 
    categories, 
    budgets,
    currency, 
    saldoAtual,
    addTransaction, 
    updateTransaction, 
    deleteTransaction,
    addToast,
    activePage
  } = useFinance();

  // Active sub-view: Extrato & Lançamentos OR Relatórios & Indicadores
  const [viewTab, setViewTab] = useState<'movements' | 'reports'>(
    activePage === 'reports' ? 'reports' : 'movements'
  );

  useEffect(() => {
    if (activePage === 'reports') {
      setViewTab('reports');
    }
  }, [activePage]);

  // --- MOVEMENTS: FILTER & SEARCH STATES ---
  const [search, setSearch] = useState('');
  const [filterType, setFilterType] = useState<'all' | 'income' | 'expense'>('all');
  const [filterCategory, setFilterCategory] = useState<string>('all');
  const [filterPeriod, setFilterPeriod] = useState<'all' | 'today' | 'week' | 'month'>('all');
  const [sortOrder, setSortOrder] = useState<'desc' | 'asc'>('desc');

  // --- MODAL / FORM STATES ---
  const [isFormOpen, setIsFormOpen] = useState(false);
  const [editingTransaction, setEditingTransaction] = useState<Transaction | null>(null);
  const [confirmDeleteId, setConfirmDeleteId] = useState<string | null>(null);

  // Form Fields
  const [txType, setTxType] = useState<'income' | 'expense'>('expense');
  const [txDescription, setTxDescription] = useState('');
  const [txAmount, setTxAmount] = useState<number>(0);
  const [txCategoryId, setTxCategoryId] = useState('');
  const [txPaymentMethod, setTxPaymentMethod] = useState('M-Pesa');
  const [txDate, setTxDate] = useState(new Date().toISOString().split('T')[0]);
  const [txNotes, setTxNotes] = useState('');

  const paymentMethods = ['M-Pesa', 'e-Mola', 'mKesh', 'Dinheiro', 'Transferência Bancária', 'Cartão de Crédito/Débito'];

  const maxAllowedExpense = editingTransaction && editingTransaction.type === 'expense'
    ? saldoAtual + editingTransaction.amount
    : saldoAtual;
  const isExpenseExceeded = txType === 'expense' && txAmount > maxAllowedExpense;

  const resetForm = () => {
    setEditingTransaction(null);
    setTxType('expense');
    setTxDescription('');
    setTxAmount(0);
    const firstExp = categories.find(c => c.type === 'expense');
    setTxCategoryId(firstExp ? firstExp.id : '');
    setTxPaymentMethod('M-Pesa');
    setTxDate(new Date().toISOString().split('T')[0]);
    setTxNotes('');
  };

  const handleOpenAdd = (type: 'income' | 'expense' = 'expense') => {
    resetForm();
    setTxType(type);
    const firstCat = categories.find(c => c.type === type);
    setTxCategoryId(firstCat ? firstCat.id : '');
    setIsFormOpen(true);
  };

  const handleOpenEdit = (tx: Transaction) => {
    setEditingTransaction(tx);
    setTxType(tx.type);
    setTxDescription(tx.description);
    setTxAmount(tx.amount);
    setTxCategoryId(tx.categoryId);
    setTxPaymentMethod(tx.paymentMethod);
    setTxDate(tx.date);
    setTxNotes(tx.notes || '');
    setIsFormOpen(true);
  };

  const handleFormSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!txDescription || txAmount <= 0 || !txCategoryId) {
      addToast('Por favor preencha todos os campos obrigatórios com valores válidos.', 'warning');
      return;
    }

    const maxAllowedExpense = editingTransaction && editingTransaction.type === 'expense'
      ? saldoAtual + editingTransaction.amount
      : saldoAtual;

    if (txType === 'expense' && txAmount > maxAllowedExpense) {
      addToast(`Saldo insuficiente (${maxAllowedExpense.toLocaleString('pt-MZ')} ${currency}) para registar esta despesa.`, 'warning');
      return;
    }

    const txPayload = {
      type: txType,
      description: txDescription,
      amount: txAmount,
      categoryId: txCategoryId,
      paymentMethod: txPaymentMethod,
      date: txDate,
      notes: txNotes
    };

    try {
      if (editingTransaction) {
        await updateTransaction(editingTransaction.id, txPayload);
      } else {
        await addTransaction(txPayload);
      }
      setIsFormOpen(false);
      resetForm();
    } catch {
      // Handled in context
    }
  };

  const handleDelete = async (id: string) => {
    try {
      await deleteTransaction(id);
      setConfirmDeleteId(null);
    } catch {
      addToast('Erro ao remover a movimentação.', 'error');
    }
  };

  const handleTypeChangeInForm = (type: 'income' | 'expense') => {
    setTxType(type);
    const firstCat = categories.find(c => c.type === type);
    setTxCategoryId(firstCat ? firstCat.id : '');
  };

  // --- FILTERED TRANSACTIONS FOR EXTRACT VIEW ---
  const filteredTransactions = transactions
    .filter((tx) => {
      const matchSearch = tx.description.toLowerCase().includes(search.toLowerCase()) || 
                          (tx.notes && tx.notes.toLowerCase().includes(search.toLowerCase()));
      const matchType = filterType === 'all' ? true : tx.type === filterType;
      const matchCategory = filterCategory === 'all' ? true : tx.categoryId === filterCategory;

      let matchPeriod = true;
      if (filterPeriod !== 'all') {
        const txDateObj = new Date(tx.date);
        const today = new Date();
        today.setHours(0, 0, 0, 0);

        if (filterPeriod === 'today') {
          const txDay = new Date(tx.date);
          txDay.setHours(0, 0, 0, 0);
          matchPeriod = txDay.getTime() === today.getTime();
        } else if (filterPeriod === 'week') {
          const diffTime = Math.abs(today.getTime() - txDateObj.getTime());
          const diffDays = Math.ceil(diffTime / (1000 * 60 * 60 * 24));
          matchPeriod = diffDays <= 7;
        } else if (filterPeriod === 'month') {
          matchPeriod = txDateObj.getMonth() === today.getMonth() && txDateObj.getFullYear() === today.getFullYear();
        }
      }

      return matchSearch && matchType && matchCategory && matchPeriod;
    })
    .sort((a, b) => {
      const timeA = new Date(a.date).getTime();
      const timeB = new Date(b.date).getTime();
      return sortOrder === 'desc' ? timeB - timeA : timeA - timeB;
    });

  // --- REPORTS CALCULATIONS ---
  const [reportPeriod, setReportPeriod] = useState<'month' | 'quarter' | 'year'>('month');
  const currentMonth = new Date().getMonth();
  const currentYear = new Date().getFullYear();

  const reportTransactions = transactions.filter(tx => {
    const txDateObj = new Date(tx.date);
    if (reportPeriod === 'month') {
      return txDateObj.getMonth() === currentMonth && txDateObj.getFullYear() === currentYear;
    } else if (reportPeriod === 'quarter') {
      const diffTime = Math.abs(Date.now() - txDateObj.getTime());
      const diffDays = Math.ceil(diffTime / (1000 * 60 * 60 * 24));
      return diffDays <= 90;
    } else {
      return txDateObj.getFullYear() === currentYear;
    }
  });

  const periodReceitas = reportTransactions
    .filter(tx => tx.type === 'income')
    .reduce((sum, tx) => sum + tx.amount, 0);

  const periodDespesas = reportTransactions
    .filter(tx => tx.type === 'expense')
    .reduce((sum, tx) => sum + tx.amount, 0);

  let ratingLabel = 'Estável / Equilibrado';
  let ratingColor = 'text-blue-600 dark:text-blue-400 bg-blue-50 dark:bg-blue-950/20 border-blue-100 dark:border-blue-900/50';
  let healthFeedback = 'O seu nível de gastos está proporcional às suas receitas. Mantenha o controlo!';

  if (periodReceitas > 0) {
    const savingsRate = (1 - (periodDespesas / periodReceitas)) * 100;
    if (savingsRate >= 30) {
      ratingLabel = 'Excelente Saúde Financeira';
      ratingColor = 'text-emerald-600 dark:text-emerald-400 bg-emerald-50 dark:bg-emerald-950/20 border-emerald-100 dark:border-emerald-900/50';
      healthFeedback = 'Parabéns! Poupa mais de 30% dos seus rendimentos. Está num rumo de investimento seguro!';
    } else if (savingsRate < 0) {
      const deficitPercent = (periodDespesas - periodReceitas) / periodReceitas * 100;
      if (deficitPercent > 15) {
        ratingLabel = 'Saúde Crítica';
        ratingColor = 'text-rose-600 dark:text-rose-400 bg-rose-50 dark:bg-rose-950/20 border-rose-100 dark:border-rose-900/50';
        healthFeedback = 'Alerta: As suas despesas excederam as receitas em mais de 15%. Reduza gastos imediatos e ative orçamentos!';
      } else {
        ratingLabel = 'Situação de Risco';
        ratingColor = 'text-amber-600 dark:text-amber-400 bg-amber-50 dark:bg-amber-950/20 border-amber-100 dark:border-amber-900/50';
        healthFeedback = 'Atenção: Os seus gastos ultrapassaram ligeiramente as receitas. Evite contrair dívidas desnecessárias.';
      }
    }
  } else if (periodDespesas > 0) {
    ratingLabel = 'Saúde Crítica';
    ratingColor = 'text-rose-600 dark:text-rose-400 bg-rose-50 dark:bg-rose-950/20 border-rose-100 dark:border-rose-900/50';
    healthFeedback = 'Alerta: Registou despesas mas não possui nenhuma entrada financeira neste período. Encontre novas fontes!';
  }

  // Expense breakdown by category
  const catBreakdown: { [key: string]: { name: string; amount: number; percentage: number; icon: string } } = {};
  const expenseTX = reportTransactions.filter(tx => tx.type === 'expense');
  expenseTX.forEach(tx => {
    const cat = categories.find(c => c.id === tx.categoryId);
    const catId = tx.categoryId;
    if (!catBreakdown[catId]) {
      catBreakdown[catId] = {
        name: cat?.name || 'Geral',
        amount: 0,
        percentage: 0,
        icon: cat?.icon || 'HelpCircle'
      };
    }
    catBreakdown[catId].amount += tx.amount;
  });

  const totalCatAmount = Object.values(catBreakdown).reduce((sum, item) => sum + item.amount, 0);
  Object.keys(catBreakdown).forEach(key => {
    catBreakdown[key].percentage = totalCatAmount > 0 
      ? (catBreakdown[key].amount / totalCatAmount) * 100 
      : 0;
  });

  const sortedBreakdown = Object.values(catBreakdown).sort((a, b) => b.amount - a.amount);

  // Practical insights
  const smartInsights: string[] = [];
  if (sortedBreakdown.length > 0) {
    const topExp = sortedBreakdown[0];
    if (topExp.percentage >= 35) {
      smartInsights.push(`Gasta consideravelmente em ${topExp.name} (${topExp.percentage.toFixed(0)}% do seu total). Tente pesquisar alternativas mais económicas.`);
    }
  }

  budgets.forEach(b => {
    const cat = categories.find(c => c.id === b.categoryId);
    const spent = reportTransactions
      .filter(tx => tx.categoryId === b.categoryId && tx.type === 'expense')
      .reduce((sum, tx) => sum + tx.amount, 0);
    
    if (spent > b.amount) {
      smartInsights.push(`Ultrapassou o limite orçamental definido para ${cat?.name || 'Categoria'}. Evite novos lançamentos nesta área.`);
    } else if (spent >= b.amount * 0.8) {
      smartInsights.push(`O seu orçamento de ${cat?.name || 'Categoria'} está quase esgotado (mais de 80% consumido).`);
    }
  });

  const internetSpent = reportTransactions
    .filter(tx => tx.categoryId === 'exp-internet')
    .reduce((sum, tx) => sum + tx.amount, 0);
  if (internetSpent > 1200) {
    smartInsights.push('Gastou mais de 1.200 MZN em pacotes de internet. Sugerimos verificar planos mensais académicos mais vantajosos.');
  }

  if (smartInsights.length === 0) {
    smartInsights.push('Excelente controlo financeiro geral. Não existem desvios importantes detetados nas suas contas.');
    smartInsights.push('Recomenda-se manter o registo pontual de cada despesa diária para manter os relatórios exatos.');
  }

  return (
    <div className="space-y-6">
      
      {/* 1. UNIFIED PAGE HEADER WITH TAB CONTROLS & ACTION BUTTONS */}
      <div className="flex flex-col md:flex-row justify-between items-start md:items-center gap-4 border-b border-slate-200 dark:border-slate-800 pb-4">
        <div>
          <h1 className="text-xl font-bold font-serif text-slate-800 dark:text-white leading-none">
            Movimentos & Relatórios
          </h1>
          <p className="text-xs text-slate-400 mt-1">
            Consulte o extrato completo de lançamentos ou analise indicadores e gráficos de despesas.
          </p>
        </div>

        {/* Action CTAs */}
        <div className="flex gap-2 w-full sm:w-auto">
          <button
            onClick={() => handleOpenAdd('income')}
            className="flex-1 sm:flex-initial px-4 py-2 bg-emerald-500 hover:bg-emerald-600 text-white font-bold text-xs rounded-lg shadow-xs flex items-center justify-center gap-1.5 transition-all cursor-pointer"
          >
            <Plus size={14} strokeWidth={2.5} />
            Nova Receita
          </button>
          <button
            onClick={() => handleOpenAdd('expense')}
            className="flex-1 sm:flex-initial px-4 py-2 bg-rose-500 hover:bg-rose-600 text-white font-bold text-xs rounded-lg shadow-xs flex items-center justify-center gap-1.5 transition-all cursor-pointer"
          >
            <Plus size={14} strokeWidth={2.5} />
            Nova Despesa
          </button>
        </div>
      </div>

      {/* 2. SUB-NAVIGATION TABS (Extrato vs Relatórios) */}
      <div className="flex border-b border-slate-200 dark:border-slate-800">
        <button
          onClick={() => setViewTab('movements')}
          className={`flex items-center gap-2 px-5 py-2.5 text-xs font-semibold border-b-2 transition-all cursor-pointer ${
            viewTab === 'movements'
              ? 'border-brand-primary text-brand-primary dark:border-amber-400 dark:text-amber-400'
              : 'border-transparent text-slate-400 hover:text-slate-600 dark:hover:text-slate-200'
          }`}
        >
          <ArrowLeftRight size={14} />
          <span>Extrato & Lançamentos</span>
          <span className="text-[10px] font-mono px-1.5 py-0.5 rounded-full bg-slate-100 dark:bg-slate-800 text-slate-500">
            {transactions.length}
          </span>
        </button>

        <button
          onClick={() => setViewTab('reports')}
          className={`flex items-center gap-2 px-5 py-2.5 text-xs font-semibold border-b-2 transition-all cursor-pointer ${
            viewTab === 'reports'
              ? 'border-brand-primary text-brand-primary dark:border-amber-400 dark:text-amber-400'
              : 'border-transparent text-slate-400 hover:text-slate-600 dark:hover:text-slate-200'
          }`}
        >
          <PieChart size={14} />
          <span>Relatórios & Análise</span>
        </button>
      </div>

      {/* 3. VIEW 1: EXTRATO & MOVIMENTAÇÕES */}
      {viewTab === 'movements' && (
        <div className="space-y-6 animate-fade-in">
          {/* Advanced Filter Toolbox Card */}
          <div className="bg-white dark:bg-slate-900 p-4 rounded-xl border border-slate-200 dark:border-slate-800/80 shadow-xs space-y-4">
            
            {/* Row 1: Search & Type tabs */}
            <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
              
              {/* Search text query */}
              <div className="relative md:col-span-1">
                <span className="absolute inset-y-0 left-0 pl-3 flex items-center text-slate-400">
                  <Search size={15} />
                </span>
                <input
                  type="text"
                  placeholder="Pesquisar por descrição ou nota..."
                  value={search}
                  onChange={(e) => setSearch(e.target.value)}
                  className="w-full pl-9 pr-3 py-2 bg-slate-50 dark:bg-slate-800 border border-slate-200 dark:border-slate-800 rounded-lg text-xs"
                />
              </div>

              {/* Type filter buttons */}
              <div className="flex items-center gap-1 p-1 bg-slate-100 dark:bg-slate-800 rounded-lg w-full md:col-span-1">
                <button
                  onClick={() => setFilterType('all')}
                  className={`flex-1 text-center py-1 rounded-md text-[11px] font-semibold transition-colors whitespace-nowrap cursor-pointer ${filterType === 'all' ? 'bg-white dark:bg-slate-700 text-slate-900 dark:text-white shadow-xs' : 'text-slate-500 hover:text-slate-800 dark:hover:text-slate-200'}`}
                >
                  Todos
                </button>
                <button
                  onClick={() => setFilterType('income')}
                  className={`flex-1 text-center py-1 rounded-md text-[11px] font-semibold transition-colors whitespace-nowrap cursor-pointer ${filterType === 'income' ? 'bg-white dark:bg-slate-700 text-emerald-600 dark:text-emerald-400 shadow-xs' : 'text-slate-500 hover:text-slate-800 dark:hover:text-slate-200'}`}
                >
                  Receitas
                </button>
                <button
                  onClick={() => setFilterType('expense')}
                  className={`flex-1 text-center py-1 rounded-md text-[11px] font-semibold transition-colors whitespace-nowrap cursor-pointer ${filterType === 'expense' ? 'bg-white dark:bg-slate-700 text-rose-600 dark:text-rose-400 shadow-xs' : 'text-slate-500 hover:text-slate-800 dark:hover:text-slate-200'}`}
                >
                  Despesas
                </button>
              </div>

              {/* Period selection */}
              <div className="flex items-center gap-2 md:col-span-1">
                <span className="text-[10px] uppercase font-bold text-slate-400">Período:</span>
                <select
                  value={filterPeriod}
                  onChange={(e) => setFilterPeriod(e.target.value as any)}
                  className="w-full px-2.5 py-1.5 bg-slate-50 dark:bg-slate-800 border border-slate-200 dark:border-slate-800 rounded-lg text-xs font-medium cursor-pointer"
                >
                  <option value="all">Todo o Histórico</option>
                  <option value="today">Hoje</option>
                  <option value="week">Últimos 7 Dias</option>
                  <option value="month">Este Mês</option>
                </select>
              </div>

            </div>

            {/* Row 2: Category & Sort Order */}
            <div className="flex flex-wrap items-center justify-between gap-4 pt-3 border-t border-slate-100 dark:border-slate-800/60 text-xs">
              <div className="flex flex-wrap items-center gap-3">
                <div className="flex items-center gap-2">
                  <span className="text-[10px] uppercase font-bold text-slate-400">Filtrar Categoria:</span>
                  <select
                    value={filterCategory}
                    onChange={(e) => setFilterCategory(e.target.value)}
                    className="px-2.5 py-1 bg-slate-50 dark:bg-slate-800 border border-slate-200 dark:border-slate-800 rounded-lg text-xs cursor-pointer"
                  >
                    <option value="all">Todas as Categorias</option>
                    {categories.map((c) => (
                      <option key={c.id} value={c.id}>{c.name} ({c.type === 'income' ? 'R' : 'D'})</option>
                    ))}
                  </select>
                </div>

                <div className="flex items-center gap-2">
                  <span className="text-[10px] uppercase font-bold text-slate-400">Ordenar por Data:</span>
                  <button
                    onClick={() => setSortOrder(prev => prev === 'desc' ? 'asc' : 'desc')}
                    className="px-2.5 py-1 bg-slate-50 dark:bg-slate-800 hover:bg-slate-100 dark:hover:bg-slate-700 border border-slate-200 dark:border-slate-800 rounded-lg text-xs font-semibold cursor-pointer"
                  >
                    {sortOrder === 'desc' ? 'Mais Recentes Primeiro ↓' : 'Mais Antigos Primeiro ↑'}
                  </button>
                </div>
              </div>

              <span className="text-[10px] font-semibold text-slate-400 uppercase tracking-widest">
                Exibindo: <strong className="text-slate-700 dark:text-slate-200">{filteredTransactions.length}</strong> de {transactions.length}
              </span>
            </div>

          </div>

          {/* Transactions List Table */}
          {filteredTransactions.length === 0 ? (
            <EmptyState
              iconName="ArrowLeftRight"
              title="Nenhuma movimentação encontrada"
              description="Não foram encontrados lançamentos que correspondam aos filtros selecionados. Altere os critérios ou registe uma nova movimentação."
              actionLabel="Novo Lançamento"
              onAction={() => handleOpenAdd('expense')}
            />
          ) : (
            <div className="bg-white dark:bg-slate-900 rounded-xl border border-slate-200 dark:border-slate-800/80 shadow-xs overflow-hidden">
              <div className="overflow-x-auto">
                <table className="w-full text-left border-collapse text-xs">
                  <thead>
                    <tr className="text-slate-400 uppercase text-[9px] font-bold tracking-wider border-b border-slate-100 dark:border-slate-800 bg-slate-50/50 dark:bg-slate-800/20">
                      <th className="py-3 px-4">Data</th>
                      <th className="py-3 px-4">Descrição</th>
                      <th className="py-3 px-4">Categoria</th>
                      <th className="py-3 px-4">Método</th>
                      <th className="py-3 px-4 text-right">Montante ({currency})</th>
                      <th className="py-3 px-4 text-center">Ações</th>
                    </tr>
                  </thead>
                  <tbody className="divide-y divide-slate-100 dark:divide-slate-800/60">
                    {filteredTransactions.map((tx) => {
                      const cat = categories.find(c => c.id === tx.categoryId);
                      return (
                        <tr 
                          key={tx.id}
                          className="hover:bg-slate-50/80 dark:hover:bg-slate-800/40 transition-colors group"
                        >
                          <td className="py-3 px-4 font-medium text-slate-400 whitespace-nowrap">
                            {new Date(tx.date).toLocaleDateString('pt-MZ')}
                          </td>
                          <td className="py-3 px-4 font-semibold text-slate-800 dark:text-slate-100">
                            <div>
                              <span>{tx.description}</span>
                              {tx.notes && (
                                <span className="text-[10px] font-normal text-slate-400 block mt-0.5 italic truncate max-w-[200px]">
                                  {tx.notes}
                                </span>
                              )}
                            </div>
                          </td>
                          <td className="py-3 px-4 whitespace-nowrap">
                            <div className="flex items-center gap-1.5">
                              <span className="p-1 rounded bg-slate-100 dark:bg-slate-800 text-slate-500">
                                {renderCategoryIcon(cat?.icon || 'HelpCircle')}
                              </span>
                              <span className="text-slate-600 dark:text-slate-300">{cat?.name || 'Geral'}</span>
                            </div>
                          </td>
                          <td className="py-3 px-4 text-slate-500 whitespace-nowrap">
                            <span className="px-2 py-0.5 rounded-full bg-slate-100 dark:bg-slate-800 text-[10px] font-medium">
                              {tx.paymentMethod}
                            </span>
                          </td>
                          <td className={`py-3 px-4 text-right font-mono font-bold tabular-nums text-sm whitespace-nowrap ${tx.type === 'income' ? 'text-emerald-600 dark:text-emerald-400' : 'text-rose-600 dark:text-rose-400'}`}>
                            {tx.type === 'income' ? '+' : '-'}{tx.amount.toLocaleString('pt-MZ', { minimumFractionDigits: 2 })}
                          </td>
                          <td className="py-3 px-4 text-center whitespace-nowrap">
                            <div className="flex items-center justify-center gap-1">
                              <button
                                onClick={() => handleOpenEdit(tx)}
                                className="p-1.5 text-slate-400 hover:text-[#0B2545] dark:hover:text-amber-400 rounded-md hover:bg-slate-100 dark:hover:bg-slate-800 transition-colors cursor-pointer"
                                title="Editar"
                              >
                                <Edit3 size={13} />
                              </button>
                              
                              {confirmDeleteId === tx.id ? (
                                <div className="flex items-center gap-1 animate-fade-in">
                                  <button
                                    onClick={() => handleDelete(tx.id)}
                                    className="px-2 py-0.5 bg-rose-500 hover:bg-rose-600 text-white rounded text-[9px] font-bold uppercase transition-all cursor-pointer"
                                  >
                                    Sim
                                  </button>
                                  <button
                                    onClick={() => setConfirmDeleteId(null)}
                                    className="px-2 py-0.5 bg-slate-200 dark:bg-slate-800 text-slate-600 dark:text-slate-300 rounded text-[9px] font-semibold uppercase transition-all cursor-pointer"
                                  >
                                    Não
                                  </button>
                                </div>
                              ) : (
                                <button
                                  onClick={() => setConfirmDeleteId(tx.id)}
                                  className="p-1.5 text-slate-400 hover:text-rose-600 rounded-md hover:bg-rose-50 dark:hover:bg-rose-950/30 transition-colors cursor-pointer"
                                  title="Eliminar"
                                >
                                  <Trash2 size={13} />
                                </button>
                              )}
                            </div>
                          </td>
                        </tr>
                      );
                    })}
                  </tbody>
                </table>
              </div>
            </div>
          )}
        </div>
      )}

      {/* 4. VIEW 2: RELATÓRIOS & ANÁLISE */}
      {viewTab === 'reports' && (
        <div className="space-y-6 animate-fade-in">
          {/* Period selector */}
          <div className="flex justify-end">
            <div className="flex p-1 bg-slate-100 dark:bg-slate-800 rounded-lg w-full sm:w-auto">
              <button
                onClick={() => setReportPeriod('month')}
                className={`px-4 py-1.5 rounded-md text-xs font-semibold transition-all cursor-pointer whitespace-nowrap ${reportPeriod === 'month' ? 'bg-white dark:bg-slate-700 text-[#0B2545] dark:text-amber-400 shadow-xs' : 'text-slate-500 hover:text-slate-800 dark:hover:text-slate-200'}`}
              >
                Este Mês
              </button>
              <button
                onClick={() => setReportPeriod('quarter')}
                className={`px-4 py-1.5 rounded-md text-xs font-semibold transition-all cursor-pointer whitespace-nowrap ${reportPeriod === 'quarter' ? 'bg-white dark:bg-slate-700 text-[#0B2545] dark:text-amber-400 shadow-xs' : 'text-slate-500 hover:text-slate-800 dark:hover:text-slate-200'}`}
              >
                Últimos 90 dias
              </button>
              <button
                onClick={() => setReportPeriod('year')}
                className={`px-4 py-1.5 rounded-md text-xs font-semibold transition-all cursor-pointer whitespace-nowrap ${reportPeriod === 'year' ? 'bg-white dark:bg-slate-700 text-[#0B2545] dark:text-amber-400 shadow-xs' : 'text-slate-500 hover:text-slate-800 dark:hover:text-slate-200'}`}
              >
                Este Ano
              </button>
            </div>
          </div>

          {/* Health assessment card */}
          <div className={`p-5 rounded-xl border flex flex-col md:flex-row justify-between items-start md:items-center gap-4 transition-all duration-300 ${ratingColor}`}>
            <div className="flex-1 space-y-1">
              <span className="text-[9px] font-bold uppercase tracking-widest block text-slate-400">Diagnóstico de Saúde Financeira</span>
              <h3 className="text-base font-bold font-serif tracking-tight leading-none mb-1.5 flex items-center gap-2">
                <span>{ratingLabel}</span>
              </h3>
              <p className="text-xs leading-relaxed max-w-2xl font-medium opacity-90">{healthFeedback}</p>
            </div>
            
            <div className="flex gap-5 shrink-0 pl-0 md:pl-6 border-t md:border-t-0 md:border-l border-slate-200 dark:border-slate-800 pt-4 md:pt-0 w-full md:w-auto">
              <div>
                <span className="text-[9px] uppercase tracking-wider text-slate-400 font-semibold block">Recebido</span>
                <span className="text-xs font-mono font-bold text-emerald-600 dark:text-emerald-400 tabular-nums">
                  +{periodReceitas.toLocaleString('pt-MZ')} {currency}
                </span>
              </div>
              <div>
                <span className="text-[9px] uppercase tracking-wider text-slate-400 font-semibold block">Gasto</span>
                <span className="text-xs font-mono font-bold text-rose-500 tabular-nums">
                  -{periodDespesas.toLocaleString('pt-MZ')} {currency}
                </span>
              </div>
            </div>
          </div>

          {/* Category breakdown and insights */}
          <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
            <div className="bg-white dark:bg-slate-900 p-5 rounded-xl border border-slate-200 dark:border-slate-800/80 lg:col-span-2 shadow-xs">
              <h3 className="text-xs font-bold text-slate-500 dark:text-slate-400 uppercase tracking-wider mb-4 flex items-center gap-2">
                <PieChart size={14} className="text-[#0B2545] dark:text-amber-400" />
                Distribuição de Despesas por Categoria
              </h3>

              {sortedBreakdown.length === 0 ? (
                <p className="text-xs text-slate-400 text-center py-16">Não possui gastos registados neste período para apresentar estatísticas.</p>
              ) : (
                <div className="space-y-4">
                  {sortedBreakdown.map(item => (
                    <div key={item.name} className="space-y-1.5">
                      <div className="flex justify-between items-center text-xs font-medium">
                        <div className="flex items-center gap-2">
                          <div className="p-1 bg-slate-50 dark:bg-slate-800 text-slate-600 rounded">
                            {renderCategoryIcon(item.icon)}
                          </div>
                          <span className="text-slate-700 dark:text-slate-200">{item.name}</span>
                        </div>
                        <div className="text-right flex items-center gap-3">
                          <span className="font-mono text-slate-400 text-[10px]">{item.percentage.toFixed(1)}%</span>
                          <strong className="font-mono text-slate-800 dark:text-slate-100 tabular-nums">{item.amount.toLocaleString('pt-MZ')} {currency}</strong>
                        </div>
                      </div>
                      
                      <div className="w-full h-1.5 bg-slate-100 dark:bg-slate-800 rounded-full overflow-hidden">
                        <div 
                          className="h-full bg-brand-primary dark:bg-amber-400 rounded-full"
                          style={{ width: `${item.percentage}%` }}
                        />
                      </div>
                    </div>
                  ))}
                </div>
              )}
            </div>

            {/* Recommendations column */}
            <div className="bg-white dark:bg-slate-900 p-5 rounded-xl border border-slate-200 dark:border-slate-800/80 lg:col-span-1 shadow-xs flex flex-col justify-between">
              <div>
                <div className="flex items-center gap-2.5 mb-4 border-b border-slate-100 dark:border-slate-800 pb-3">
                  <Sparkles size={16} className="text-amber-500" />
                  <h3 className="text-xs font-bold text-slate-800 dark:text-slate-200 uppercase tracking-wider leading-none">
                    Recomendações Práticas
                  </h3>
                </div>

                <div className="space-y-3.5">
                  {smartInsights.map((insight, index) => (
                    <div 
                      key={index}
                      className="p-3 bg-slate-50 dark:bg-slate-800 border border-slate-100 dark:border-slate-800/60 rounded-xl text-xs leading-relaxed text-slate-600 dark:text-slate-400 flex items-start gap-2.5 hover:border-slate-200 transition-all"
                    >
                      <AlertTriangle size={15} className="text-amber-500 shrink-0 mt-0.5" />
                      <span>{insight}</span>
                    </div>
                  ))}
                </div>
              </div>

              <div className="pt-4 border-t border-slate-100 dark:border-slate-800 mt-6 text-[10px] text-slate-400 leading-relaxed italic flex items-center gap-1.5">
                <Info size={12} className="text-slate-400 shrink-0" />
                <span>Baseado no histórico real das suas movimentações.</span>
              </div>
            </div>
          </div>
        </div>
      )}

      {/* 5. ADD / EDIT TRANSACTION MODAL */}
      {isFormOpen && (
        <div className="fixed inset-0 bg-slate-900/60 backdrop-blur-xs flex items-center justify-center p-4 z-50 animate-fade-in">
          <div className="bg-white dark:bg-slate-900 border border-slate-200 dark:border-slate-800 text-slate-800 dark:text-white rounded-2xl shadow-2xl w-full max-w-md overflow-hidden animate-scale-in">
            
            {/* Modal Header */}
            <div className="flex justify-between items-center p-5 border-b border-slate-100 dark:border-slate-800 bg-[#0B2545] text-white">
              <div className="flex items-center gap-2">
                {txType === 'income' ? <TrendingUp size={18} className="text-emerald-400" /> : <TrendingDown size={18} className="text-rose-400" />}
                <h3 className="font-serif font-bold text-base">
                  {editingTransaction ? 'Editar Lançamento' : (txType === 'income' ? 'Nova Receita' : 'Nova Despesa')}
                </h3>
              </div>
              <button 
                onClick={() => setIsFormOpen(false)}
                className="text-slate-300 hover:text-white transition-colors cursor-pointer"
              >
                <X size={18} />
              </button>
            </div>

            {/* Modal Form */}
            <form onSubmit={handleFormSubmit} className="p-6 space-y-4">
              
              {/* Type Switcher */}
              <div>
                <label className="block text-[10px] font-bold text-slate-400 uppercase tracking-wider mb-2">
                  Tipo de Lançamento
                </label>
                <div className="flex p-1 bg-slate-100 dark:bg-slate-800 rounded-lg">
                  <button
                    type="button"
                    onClick={() => handleTypeChangeInForm('income')}
                    className={`flex-1 text-center py-2 rounded-md text-xs font-semibold transition-all cursor-pointer ${txType === 'income' ? 'bg-white dark:bg-slate-700 text-emerald-600 shadow-sm' : 'text-slate-500'}`}
                  >
                    + Receita (Entrada)
                  </button>
                  <button
                    type="button"
                    onClick={() => handleTypeChangeInForm('expense')}
                    className={`flex-1 text-center py-2 rounded-md text-xs font-semibold transition-all cursor-pointer ${txType === 'expense' ? 'bg-white dark:bg-slate-700 text-rose-600 shadow-sm' : 'text-slate-500'}`}
                  >
                    - Despesa (Saída)
                  </button>
                </div>
              </div>

              {/* Description */}
              <div>
                <label className="block text-[10px] font-bold text-slate-400 uppercase tracking-wider mb-1.5">
                  Descrição *
                </label>
                <input
                  type="text"
                  required
                  value={txDescription}
                  onChange={(e) => setTxDescription(e.target.value)}
                  placeholder={txType === 'income' ? 'Ex: Bolsa de Estudos / Mesada' : 'Ex: Recarga M-Pesa / Refeitório'}
                  className="w-full px-3 py-2 bg-slate-50 dark:bg-slate-800 border border-slate-200 dark:border-slate-800 rounded-lg text-xs"
                />
              </div>

              {/* Amount */}
              <div>
                <div className="flex justify-between items-center mb-1.5">
                  <label className="block text-[10px] font-bold text-slate-400 uppercase tracking-wider">
                    Montante ({currency}) *
                  </label>
                  {txType === 'expense' && (
                    <span className="text-[10px] font-mono text-emerald-600 dark:text-emerald-400 font-bold">
                      Livre: {maxAllowedExpense.toLocaleString('pt-MZ')} {currency}
                    </span>
                  )}
                </div>
                <input
                  type="number"
                  required
                  min="0.01"
                  step="any"
                  max={txType === 'expense' ? maxAllowedExpense : undefined}
                  value={txAmount || ''}
                  onChange={(e) => setTxAmount(Math.max(0, parseFloat(e.target.value) || 0))}
                  placeholder="Ex: 500"
                  className={`w-full px-3 py-2 bg-slate-50 dark:bg-slate-800 border rounded-lg text-xs font-mono font-bold tabular-nums ${
                    isExpenseExceeded 
                      ? 'border-rose-500 text-rose-600 dark:text-rose-400' 
                      : 'border-slate-200 dark:border-slate-800'
                  }`}
                />
                {isExpenseExceeded && (
                  <span className="text-[9px] text-rose-500 font-semibold mt-1 block">
                    O montante excede o saldo livre disponível ({maxAllowedExpense.toLocaleString('pt-MZ')} {currency}).
                  </span>
                )}
              </div>

              {/* Category */}
              <div>
                <label className="block text-[10px] font-bold text-slate-400 uppercase tracking-wider mb-1.5">
                  Categoria *
                </label>
                <select
                  required
                  value={txCategoryId}
                  onChange={(e) => setTxCategoryId(e.target.value)}
                  className="w-full px-3 py-2 bg-slate-50 dark:bg-slate-800 border border-slate-200 dark:border-slate-800 rounded-lg text-xs cursor-pointer"
                >
                  {categories
                    .filter(c => c.type === txType)
                    .map(c => (
                      <option key={c.id} value={c.id}>{c.name}</option>
                    ))
                  }
                </select>
              </div>

              {/* Payment Method & Date */}
              <div className="grid grid-cols-2 gap-4">
                <div>
                  <label className="block text-[10px] font-bold text-slate-400 uppercase tracking-wider mb-1.5">
                    Método
                  </label>
                  <select
                    value={txPaymentMethod}
                    onChange={(e) => setTxPaymentMethod(e.target.value)}
                    className="w-full px-3 py-2 bg-slate-50 dark:bg-slate-800 border border-slate-200 dark:border-slate-800 rounded-lg text-xs cursor-pointer"
                  >
                    {paymentMethods.map(pm => (
                      <option key={pm} value={pm}>{pm}</option>
                    ))}
                  </select>
                </div>

                <div>
                  <label className="block text-[10px] font-bold text-slate-400 uppercase tracking-wider mb-1.5">
                    Data
                  </label>
                  <input
                    type="date"
                    required
                    value={txDate}
                    onChange={(e) => setTxDate(e.target.value)}
                    className="w-full px-3 py-2 bg-slate-50 dark:bg-slate-800 border border-slate-200 dark:border-slate-800 rounded-lg text-xs"
                  />
                </div>
              </div>

              {/* Notes */}
              <div>
                <label className="block text-[10px] font-bold text-slate-400 uppercase tracking-wider mb-1.5">
                  Notas Adicionais (Opcional)
                </label>
                <input
                  type="text"
                  value={txNotes}
                  onChange={(e) => setTxNotes(e.target.value)}
                  placeholder="Ex: Pago via agente M-Pesa na paragem"
                  className="w-full px-3 py-2 bg-slate-50 dark:bg-slate-800 border border-slate-200 dark:border-slate-800 rounded-lg text-xs"
                />
              </div>

              {/* Form Actions */}
              <div className="flex gap-3 pt-3">
                <button
                  type="button"
                  onClick={() => setIsFormOpen(false)}
                  className="flex-1 py-2 px-4 bg-slate-100 hover:bg-slate-200 dark:bg-slate-800 dark:hover:bg-slate-700 text-slate-600 dark:text-slate-300 text-xs font-bold uppercase tracking-wider rounded-lg transition-all cursor-pointer"
                >
                  Cancelar
                </button>
                <button
                  type="submit"
                  disabled={isExpenseExceeded || txAmount <= 0}
                  className={`flex-1 py-2 px-4 text-white text-xs font-bold uppercase tracking-wider rounded-lg shadow-md transition-all cursor-pointer disabled:opacity-50 disabled:cursor-not-allowed ${txType === 'income' ? 'bg-emerald-500 hover:bg-emerald-600' : 'bg-rose-500 hover:bg-rose-600'}`}
                >
                  {editingTransaction ? 'Salvar Alterações' : 'Guardar Lançamento'}
                </button>
              </div>

            </form>

          </div>
        </div>
      )}

    </div>
  );
};
