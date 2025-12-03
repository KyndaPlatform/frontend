import { useState } from "react";
import { Wallet, Copy, Check, Settings, AlertCircle, X } from "lucide-react";

import { transactions } from "../../utils/studentData";

export default function StudentWallet() {
  const [selectedRows, setSelectedRows] = useState([]);

  console.log(selectedRows);

  const handleSelect = (id) => {
    setSelectedRows((prev) =>
      prev.includes(id) ? prev.filter((rowId) => rowId !== id) : [...prev, id]
    );
  };

  return (
    <section className="max-w-screen-2xl mx-auto px-4 py-6">
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
        {/* Item 1 */}
        <article className="flex flex-col justify-between border border-[#E2E8F0] p-6 rounded-lg shadow-md h-40">
          <div className="flex justify-between items-center text-[#344256]">
            <h3>Available to Withdraw</h3>
            <Wallet />
          </div>
          <p className="text-[#0B0C2E] font-bold text-3xl">₦110,000</p>
          <p className="text-[#344256]">Ready for withdrawal</p>
        </article>

        {/* Item 2 */}
        <article className="flex flex-col justify-between border border-[#E2E8F0] p-6 rounded-lg shadow-md h-40">
          <div className="flex justify-between items-center text-[#344256]">
            <h3>Pending Earnings</h3>
            <Wallet />
          </div>
          <p className="text-[#0B0C2E] font-bold text-3xl">₦15,000</p>
          <p className="text-[#344256]">Processing sessions</p>
        </article>

        {/* Item 3 */}
        <article className="flex flex-col justify-between border border-[#E2E8F0] p-6 rounded-lg shadow-md h-40">
          <div className="flex justify-between items-center text-[#344256]">
            <h3>Total Earned</h3>
            <Wallet />
          </div>
          <p className="text-[#0B0C2E] font-bold text-3xl">₦125,000</p>
          <p className="text-[#344256]">All time Earnings</p>
        </article>
      </div>

      <WalletDashboard />
      <TransactionHistorySection>
        <TransactionTable>
          <TransactionTableHeader />
          <tbody>
            {transactions.map((transaction) => (
              <TableRow
                key={transaction.id}
                transaction={transaction}
                isSelected={selectedRows.includes(transaction.id)}
                onSelect={() => handleSelect(transaction.id)}
              />
            ))}
          </tbody>
        </TransactionTable>
      </TransactionHistorySection>
    </section>
  );
}

// the student wallet section dashboard displayed here
function WalletDashboard() {
  const [copied, setCopied] = useState(false);

  const handleCopy = () => {
    navigator.clipboard.writeText("0x742d35Cc8634C0532925a3b8448c9e7595f0bEb");
    setCopied(true);
    setTimeout(() => setCopied(false), 2000);
  };

  return (
    <div className="my-6">
      <div className="max-w-screen-2xl mx-auto">
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-4 sm:gap-6">
          {/* Withdraw Earnings Section */}
          <div className="bg-white rounded-xl sm:rounded-2xl shadow-sm p-4 sm:p-6 md:p-8">
            <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-3 mb-6">
              <div className="flex items-center gap-2 sm:gap-3">
                <div className="w-9 h-9 sm:w-10 sm:h-10 bg-cyan-100 rounded-lg flex items-center justify-center flex-shrink-0">
                  <Wallet className="w-4 h-4 sm:w-5 sm:h-5 text-cyan-600" />
                </div>
                <h2 className="text-lg sm:text-xl md:text-2xl font-bold text-gray-900">
                  Withdraw Earnings
                </h2>
              </div>
              <span className="text-xs md:text-sm bg-cyan-50 text-cyan-700 px-2.5 sm:px-3 py-1 sm:py-1.5 rounded-full font-medium whitespace-nowrap self-start sm:self-auto">
                15% Kynda Commission
              </span>
            </div>

            <div className="bg-gradient-to-br from-green-50 to-emerald-50 rounded-xl p-4 sm:p-6 mb-4 sm:mb-6">
              <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-2 mb-4">
                <span className="text-xs sm:text-sm text-gray-600 font-medium">
                  Available Amount
                </span>
                <span className="text-2xl sm:text-3xl md:text-4xl font-bold text-green-600">
                  ₦110,000
                </span>
              </div>
              <div className="w-full bg-green-200 rounded-full h-2">
                <div
                  className="bg-green-500 h-2 rounded-full"
                  style={{ width: "100%" }}
                ></div>
              </div>
              <p className="text-xs text-gray-500 mt-3">
                Kindly be patient if your funded amount does not reflect
                immediately
              </p>
            </div>

            <button className="w-full bg-indigo-900 hover:bg-indigo-800 text-white font-semibold py-4 rounded-xl transition-colors duration-200">
              Fund Wallet
            </button>
          </div>

          {/* Payout Settings Section */}
          <div className="bg-white rounded-xl sm:rounded-2xl shadow-sm p-4 sm:p-6 md:p-8">
            <div className="flex items-center justify-between mb-6">
              <h2 className="text-lg sm:text-xl md:text-2xl font-bold text-gray-900">
                Payout Settings
              </h2>
              <button className="flex items-center gap-1 sm:gap-2 text-xs sm:text-sm text-gray-600 hover:text-gray-900 transition-colors">
                <Settings className="w-4 h-4 flex-shrink-0" />
                <span className="hidden sm:inline">Change Setting</span>
              </button>
            </div>

            {/* Bank Account Card */}
            <div className="bg-gray-50 rounded-xl p-4 sm:p-5 mb-4 sm:mb-6">
              <div className="flex items-start justify-between gap-3 mb-4">
                <div className="flex items-center gap-2 sm:gap-3 min-w-0 flex-1">
                  <div className="w-10 h-10 sm:w-12 sm:h-12 bg-[#E6F6F9] rounded-full flex items-center justify-center flex-shrink-0">
                    <Wallet color="#00A9C1" />
                  </div>
                  <div className="min-w-0 flex-1">
                    <h3 className="font-semibold text-gray-900 text-sm sm:text-base">
                      Bank Account
                    </h3>
                    <p className="text-xs sm:text-sm text-gray-500 truncate">
                      Dec 15, 2024 • Visa •••• 4242
                    </p>
                  </div>
                </div>
                <div className="flex flex-col items-end gap-1 sm:gap-2 flex-shrink-0">
                  <span className="text-xs text-gray-500 whitespace-nowrap">
                    Automatic Payout
                  </span>
                  <span className="text-xs bg-green-100 text-green-700 px-6 py-1 rounded-full font-medium">
                    Weekly
                  </span>
                </div>
              </div>
            </div>

            {/* Meta Wallet Address */}
            <div>
              <label className="block text-xs sm:text-sm font-medium text-gray-700 mb-2 sm:mb-3">
                Meta Wallet Address
              </label>
              <div className="flex items-center gap-2 bg-gray-50 rounded-lg p-3 sm:p-4 border border-gray-200">
                <span className="flex-1 text-xs sm:text-sm text-gray-600 font-mono break-all leading-relaxed">
                  0x742d35Cc8634C0532925a3b8448c9e7595f0bEb
                </span>
                <button
                  onClick={handleCopy}
                  className="flex-shrink-0 text-indigo-600 hover:text-indigo-700 transition-colors p-1"
                  aria-label="Copy wallet address"
                >
                  {copied ? (
                    <Check className="w-4 h-4 sm:w-5 sm:h-5 text-green-600" />
                  ) : (
                    <Copy className="w-4 h-4 sm:w-5 sm:h-5" />
                  )}
                </button>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}

function TransactionHistorySection({ children }) {
  return (
    <div className="w-full border border-[#E2E8F0] bg-white p-6 rounded-xl">
      <h3>Recent transactions</h3>
      {children}
    </div>
  );
}

function TransactionTable({ children }) {
  return (
    <div className="w-full overflow-x-auto">
      <table className="min-w-full table-auto">
        {children}
        {/* table body here */}
      </table>
    </div>
  );
}

function TransactionTableHeader() {
  return (
    <thead className="bg-gray-100 w-full">
      <tr>
        <th className="w-12 px-4 sm:px-6 py-3 sm:py-3.5">
          <input
            type="checkbox"
            className="w-4 h-4 rounded border-gray-300 text-indigo-600 focus:ring-indigo-500 cursor-pointer"
          />
        </th>
        <th className="px-4 sm:px-6 py-3 sm:py-3.5 text-left text-xs font-medium text-gray-600 whitespace-nowrap">
          Student
        </th>
        <th className="px-4 sm:px-6 py-3 sm:py-3.5 text-left text-xs font-medium text-gray-600 whitespace-nowrap">
          Date
        </th>
        <th className="px-4 sm:px-6 py-3 sm:py-3.5 text-left text-xs font-medium text-gray-600 whitespace-nowrap">
          Section
        </th>
        <th className="px-4 sm:px-6 py-3 sm:py-3.5 text-left text-xs font-medium text-gray-600 whitespace-nowrap">
          Subjects
        </th>
        <th className="px-4 sm:px-6 py-3 sm:py-3.5 text-left text-xs font-medium text-gray-600 whitespace-nowrap">
          Duration
        </th>
        <th className="px-4 sm:px-6 py-3 sm:py-3.5 text-left text-xs font-medium text-gray-600 whitespace-nowrap">
          Session Fee
        </th>
        <th className="px-4 sm:px-6 py-3 sm:py-3.5 text-left text-xs font-medium text-gray-600 whitespace-nowrap">
          Commission (15%)
        </th>
        <th className="px-4 sm:px-6 py-3 sm:py-3.5 text-left text-xs font-medium text-gray-600 whitespace-nowrap">
          Net Earnings
        </th>
        <th className="px-4 sm:px-6 py-3 sm:py-3.5 text-left text-xs font-medium text-gray-600 whitespace-nowrap">
          Status
        </th>
      </tr>
    </thead>
  );
}

const TableRow = ({ transaction, isSelected, onSelect }) => (
  <tr className="bg-white border-b border-gray-100 hover:bg-gray-50 transition-colors">
    <td className="px-4 sm:px-6 py-4">
      <input
        type="checkbox"
        checked={isSelected}
        onChange={onSelect}
        className="w-4 h-4 rounded border-gray-300 text-indigo-600 focus:ring-indigo-500 cursor-pointer"
      />
    </td>
    <td className="px-4 sm:px-6 py-4 text-sm text-gray-900 whitespace-nowrap">
      {transaction.student}
    </td>
    <td className="px-4 sm:px-6 py-4 text-sm text-gray-600 whitespace-nowrap">
      {transaction.date}
    </td>
    <td className="px-4 sm:px-6 py-4 text-sm text-gray-600 text-center whitespace-nowrap">
      {transaction.section}
    </td>
    <td className="px-4 sm:px-6 py-4 text-sm text-gray-600 whitespace-nowrap">
      {transaction.subject}
    </td>
    <td className="px-4 sm:px-6 py-4 text-sm text-gray-600 whitespace-nowrap">
      {transaction.duration}
    </td>
    <td className="px-4 sm:px-6 py-4 text-sm text-gray-900 whitespace-nowrap">
      ₦{transaction.sessionFee.toLocaleString()}
    </td>
    <td className="px-4 sm:px-6 py-4 text-sm text-red-600 font-medium whitespace-nowrap">
      -₦{transaction.commission}
    </td>
    <td className="px-4 sm:px-6 py-4 text-sm text-green-600 font-medium whitespace-nowrap">
      ₦{transaction.netEarnings.toLocaleString()}
    </td>
    <td className="px-4 sm:px-6 py-4 whitespace-nowrap">
      {/* <span className="inline-flex items-center gap-1.5 px-3 py-1.5 bg-yellow-50 text-yellow-600 rounded-lg text-xs font-medium border border-yellow-200">
        {transaction.status}
        <Lock className="w-3 h-3" />
      </span> */}
      <span
        className={`inline-flex items-center gap-1.5 px-3 py-1.5 rounded-lg text-xs font-medium border ${
          transaction.status === "Pending"
            ? "bg-yellow-50 text-yellow-600 border-yellow-200"
            : transaction.status === "Complete"
            ? "bg-green-50 text-green-600 border-green-200"
            : "bg-red-50 text-red-600 border-red-200"
        }`}
      >
        {transaction.status}
        {transaction.status === "Pending" && (
          <AlertCircle className="w-3 h-3" />
        )}
        {transaction.status === "Complete" && <Check className="w-3 h-3" />}
        {transaction.status === "Failed" && <X className="w-3 h-3" />}
      </span>
    </td>
  </tr>
);
