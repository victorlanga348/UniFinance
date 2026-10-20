/**
 * @license
 * SPDX-License-Identifier: Apache-2.0
 */

import React, { useState, useEffect } from 'react';
import { X, TrendingUp, TrendingDown, CheckCircle2, AlertCircle, Wallet } from 'lucide-react';
import { useFinance } from '../contexts/FinanceContext';
import { TransactionType } from '../types/finance';

interface TransactionModalProps {
  isOpen: boolean;
  onClose: () => void;
  initialType?: TransactionType;
}

export const TransactionModal: React.FC<TransactionModalProps> = ({
  isOpen,
  onClose,
  initialType = 'income',
}) => {
  const { categories, currency, saldoAtual, addTransaction, addToast } = useFinance();

  const [txType, setTxType] = useState<TransactionType>(initialType);
  const [description, setDescription] = useState('');
  const [amount, setAmount] = useState<number | ''>('');
  const [categoryId, setCategoryId] = useState('');
  const [paymentMethod, setPaymentMethod] = useState('M-Pesa');
  const [date, setDate] = useState(new Date().toISOString().split('T')[0]);
  const [notes, setNotes] = useState('');
  const [isSubmitting, setIsSubmitting] = useState(false);

  const paymentMethods = [
    'M-Pesa',
    'e-Mola',
    'mKesh',
    'Dinheiro',
    'Transferência Bancária',
    'Cartão de Crédito/Débito',
  ];

  // Sync initial type when opening
  useEffect(() => {
    if (isOpen) {
      setTxType(initialType);
      resetForm(initialType);
    }
  }, [isOpen, initialType]);

  // Update default category when txType or categories change
  useEffect(() => {
    const available = categories.filter((c) => c.type === txType);
    if (available.length > 0 && !available.some((c) => c.id === categoryId)) {
      setCategoryId(available[0].id);
    }
  }, [txType, categories]);

  const resetForm = (type: TransactionType = 'income') => {
    setDescription('');
    setAmount('');
    const firstCat = categories.find((c) => c.type === type);
    setCategoryId(firstCat ? firstCat.id : '');
    setPaymentMethod('M-Pesa');
    setDate(new Date().toISOString().split('T')[0]);
    setNotes('');
    setIsSubmitting(false);
  };

  if (!isOpen) return null;

  const numAmount = typeof amount === 'number' ? amount : 0;
  const isExpenseExceeded = txType === 'expense' && numAmount > saldoAtual;

  const handleTypeChange = (newType: TransactionType) => {
    setTxType(newType);
    const available = categories.filter((c) => c.type === newType);
    if (available.length > 0) {
      setCategoryId(available[0].id);
    }
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();

    if (!description.trim()) {
      addToast('Por favor, informe uma descrição.', 'warning');
      return;
    }

    if (numAmount <= 0) {
      addToast('O montante deve ser superior a zero.', 'warning');
      return;
    }

    if (!categoryId) {
      addToast('Por favor, selecione uma categoria.', 'warning');
      return;
    }

    if (txType === 'expense' && numAmount > saldoAtual) {
      addToast(
        `Saldo insuficiente (${saldoAtual.toLocaleString('pt-MZ', { minimumFractionDigits: 2 })} ${currency}) para registar esta saída.`,
        'error'
      );
      return;
    }

    try {
      setIsSubmitting(true);
      await addTransaction({
        type: txType,
        description: description.trim(),
        amount: numAmount,
        categoryId,
        paymentMethod,
        date,
        notes: notes.trim(),
      });

      addToast(
        txType === 'income' ? 'Receita adicionada ao saldo com sucesso!' : 'Despesa registada com sucesso!',
        'success'
      );
      onClose();
    } catch {
      // Handled in context
    } finally {
      setIsSubmitting(false);
    }
  };

  const availableCategories = categories.filter((c) => c.type === txType);

  return (
    <div
      className="fixed inset-0 z-50 bg-slate-900/60 backdrop-blur-sm flex items-center justify-center p-4 overflow-y-auto animate-fade-in"
      onClick={(e) => {
        if (e.target === e.currentTarget) onClose();
      }}
    >
      <div className="bg-white dark:bg-slate-900 border border-slate-200 dark:border-slate-800 rounded-2xl w-full max-w-lg shadow-2xl overflow-hidden animate-scale-up">
        {/* Header */}
        <div className="flex justify-between items-center px-6 py-4 border-b border-slate-100 dark:border-slate-800 bg-[#0B2545] text-white">
          <div className="flex items-center gap-2.5">
            <div
              className={`p-2 rounded-lg ${
                txType === 'income' ? 'bg-emerald-500/20 text-emerald-400' : 'bg-rose-500/20 text-rose-400'
              }`}
            >
              {txType === 'income' ? <TrendingUp size={20} /> : <TrendingDown size={20} />}
            </div>
            <div>
              <h3 className="font-serif font-bold text-base">
                {txType === 'income' ? 'Adicionar Dinheiro' : 'Tirar Dinheiro'}
              </h3>
              <p className="text-[11px] text-slate-300">
                {txType === 'income'
                  ? 'Entrada de saldo na sua conta ou carteira'
                  : 'Registo de despesa ou pagamento efectuado'}
              </p>
            </div>
          </div>
          <button
            onClick={onClose}
            className="text-slate-300 hover:text-white p-1 rounded-lg hover:bg-white/10 transition-colors cursor-pointer"
            aria-label="Fechar"
          >
            <X size={18} />
          </button>
        </div>

        {/* Tab Switcher: Adicionar vs Tirar */}
        <div className="p-4 pb-0 bg-slate-50 dark:bg-slate-800/40 border-b border-slate-100 dark:border-slate-800">
          <div className="grid grid-cols-2 p-1 bg-slate-200/80 dark:bg-slate-800 rounded-xl gap-1">
            <button
              type="button"
              onClick={() => handleTypeChange('income')}
              className={`py-2 px-3 rounded-lg text-xs font-bold transition-all flex items-center justify-center gap-1.5 cursor-pointer ${
                txType === 'income'
                  ? 'bg-emerald-600 text-white shadow-md'
                  : 'text-slate-600 dark:text-slate-300 hover:text-emerald-600'
              }`}
            >
              <TrendingUp size={14} />
              + Adicionar Dinheiro
            </button>
            <button
              type="button"
              onClick={() => handleTypeChange('expense')}
              className={`py-2 px-3 rounded-lg text-xs font-bold transition-all flex items-center justify-center gap-1.5 cursor-pointer ${
                txType === 'expense'
                  ? 'bg-rose-600 text-white shadow-md'
                  : 'text-slate-600 dark:text-slate-300 hover:text-rose-600'
              }`}
            >
              <TrendingDown size={14} />
              - Tirar Dinheiro
            </button>
          </div>

          {/* Real-time Available Balance Notice */}
          <div className="mt-2.5 mb-1 px-3 py-1.5 bg-slate-100 dark:bg-slate-800/80 rounded-lg flex items-center justify-between text-xs font-mono">
            <span className="text-[11px] text-slate-500 flex items-center gap-1">
              <Wallet size={13} className="text-amber-500" />
              Saldo Disponível:
            </span>
            <span
              className={`font-bold tabular-nums ${
                saldoAtual >= 0 ? 'text-emerald-600 dark:text-emerald-400' : 'text-rose-600 dark:text-rose-400'
              }`}
            >
              {saldoAtual.toLocaleString('pt-MZ', { minimumFractionDigits: 2 })} {currency}
            </span>
          </div>
        </div>

        {/* Form Body */}
        <form onSubmit={handleSubmit} className="p-6 space-y-4">
          {/* Montante */}
          <div>
            <div className="flex justify-between items-center mb-1.5">
              <label className="block text-[11px] font-bold text-slate-500 dark:text-slate-400 uppercase tracking-wider">
                Montante ({currency}) *
              </label>
              {txType === 'expense' && (
                <span className="text-[10px] font-mono text-slate-400">
                  Máximo permitido: {saldoAtual.toLocaleString('pt-MZ')} {currency}
                </span>
              )}
            </div>
            <div className="relative">
              <input
                type="number"
                required
                min="0.01"
                step="any"
                max={txType === 'expense' ? saldoAtual : undefined}
                value={amount}
                onChange={(e) => {
                  const val = e.target.value;
                  setAmount(val === '' ? '' : Math.max(0, parseFloat(val)));
                }}
                placeholder="0.00"
                className={`w-full px-3.5 py-2.5 bg-slate-50 dark:bg-slate-800 border rounded-xl text-base font-mono font-bold tabular-nums focus:outline-none focus:ring-2 transition-all ${
                  isExpenseExceeded
                    ? 'border-rose-500 text-rose-600 focus:ring-rose-400/30'
                    : 'border-slate-200 dark:border-slate-700 focus:ring-brand-accent/30 focus:border-brand-accent text-slate-800 dark:text-slate-100'
                }`}
              />
              <span className="absolute right-3.5 top-1/2 -translate-y-1/2 text-xs font-bold text-slate-400 pointer-events-none">
                {currency}
              </span>
            </div>
            {isExpenseExceeded && (
              <p className="text-[10px] text-rose-500 font-semibold mt-1 flex items-center gap-1">
                <AlertCircle size={12} />
                O montante excede o saldo livre disponível ({saldoAtual.toLocaleString('pt-MZ')} {currency}).
              </p>
            )}
          </div>

          {/* Descrição */}
          <div>
            <label className="block text-[11px] font-bold text-slate-500 dark:text-slate-400 uppercase tracking-wider mb-1.5">
              Descrição do Movimento *
            </label>
            <input
              type="text"
              required
              value={description}
              onChange={(e) => setDescription(e.target.value)}
              placeholder={
                txType === 'income'
                  ? 'Ex: Salário, Mesada, Bolsa de Estudos, Venda'
                  : 'Ex: Recarga M-Pesa, Alimentação, Credelec, Propinas'
              }
              className="w-full px-3.5 py-2 bg-slate-50 dark:bg-slate-800 border border-slate-200 dark:border-slate-700 rounded-xl text-xs text-slate-800 dark:text-slate-100 focus:outline-none focus:ring-2 focus:ring-brand-accent/30 focus:border-brand-accent transition-all"
            />
          </div>

          {/* Categoria & Método de Pagamento (Grid 2 cols) */}
          <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
            <div>
              <label className="block text-[11px] font-bold text-slate-500 dark:text-slate-400 uppercase tracking-wider mb-1.5">
                Categoria *
              </label>
              <select
                required
                value={categoryId}
                onChange={(e) => setCategoryId(e.target.value)}
                className="w-full px-3 py-2 bg-slate-50 dark:bg-slate-800 border border-slate-200 dark:border-slate-700 rounded-xl text-xs text-slate-800 dark:text-slate-100 focus:outline-none focus:ring-2 focus:ring-brand-accent/30 cursor-pointer"
              >
                {availableCategories.map((cat) => (
                  <option key={cat.id} value={cat.id}>
                    {cat.name}
                  </option>
                ))}
              </select>
            </div>

            <div>
              <label className="block text-[11px] font-bold text-slate-500 dark:text-slate-400 uppercase tracking-wider mb-1.5">
                Método / Carteira *
              </label>
              <select
                value={paymentMethod}
                onChange={(e) => setPaymentMethod(e.target.value)}
                className="w-full px-3 py-2 bg-slate-50 dark:bg-slate-800 border border-slate-200 dark:border-slate-700 rounded-xl text-xs text-slate-800 dark:text-slate-100 focus:outline-none focus:ring-2 focus:ring-brand-accent/30 cursor-pointer"
              >
                {paymentMethods.map((pm) => (
                  <option key={pm} value={pm}>
                    {pm}
                  </option>
                ))}
              </select>
            </div>
          </div>

          {/* Data */}
          <div>
            <label className="block text-[11px] font-bold text-slate-500 dark:text-slate-400 uppercase tracking-wider mb-1.5">
              Data da Operação *
            </label>
            <input
              type="date"
              required
              value={date}
              onChange={(e) => setDate(e.target.value)}
              className="w-full px-3 py-2 bg-slate-50 dark:bg-slate-800 border border-slate-200 dark:border-slate-700 rounded-xl text-xs text-slate-800 dark:text-slate-100 focus:outline-none focus:ring-2 focus:ring-brand-accent/30"
            />
          </div>

          {/* Notas Opcionais */}
          <div>
            <label className="block text-[11px] font-bold text-slate-500 dark:text-slate-400 uppercase tracking-wider mb-1.5">
              Observações / Notas (Opcional)
            </label>
            <textarea
              rows={2}
              value={notes}
              onChange={(e) => setNotes(e.target.value)}
              placeholder="Ex: Referência de transação, comprovativo ou detalhes..."
              className="w-full px-3 py-2 bg-slate-50 dark:bg-slate-800 border border-slate-200 dark:border-slate-700 rounded-xl text-xs text-slate-800 dark:text-slate-100 focus:outline-none focus:ring-2 focus:ring-brand-accent/30 resize-none"
            />
          </div>

          {/* Action Buttons */}
          <div className="flex items-center justify-end gap-2.5 pt-2 border-t border-slate-100 dark:border-slate-800">
            <button
              type="button"
              onClick={onClose}
              disabled={isSubmitting}
              className="px-4 py-2 border border-slate-200 dark:border-slate-700 hover:bg-slate-100 dark:hover:bg-slate-800 text-slate-700 dark:text-slate-300 rounded-xl text-xs font-semibold transition-colors cursor-pointer"
            >
              Cancelar
            </button>
            <button
              type="submit"
              disabled={isSubmitting || isExpenseExceeded}
              className={`px-5 py-2 text-white rounded-xl text-xs font-bold transition-all flex items-center gap-1.5 shadow-md active:scale-95 cursor-pointer ${
                txType === 'income'
                  ? 'bg-emerald-600 hover:bg-emerald-700 disabled:opacity-50'
                  : 'bg-rose-600 hover:bg-rose-700 disabled:opacity-50'
              }`}
            >
              <CheckCircle2 size={15} />
              {isSubmitting
                ? 'A gravar...'
                : txType === 'income'
                ? 'Adicionar ao Saldo'
                : 'Confirmar Saída'}
            </button>
          </div>
        </form>
      </div>
    </div>
  );
};
