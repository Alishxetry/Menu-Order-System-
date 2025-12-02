function renderLogin() {
            return `
                <div class="min-h-screen bg-gradient-to-br from-gray-900 to-gray-800 flex items-center justify-center p-8">
                    <div class="bg-white/10 backdrop-blur rounded-2xl p-8 max-w-md w-full">
                        <button onclick="setState({view: 'roleSelect'})" class="text-white mb-6 hover:text-amber-400">
                            ← Back
                        </button>
                        
                        <h2 class="text-3xl font-bold text-amber-400 mb-8 text-center">
                            ${state.currentRole === 'waiter' ? 'Waiter' : 'Owner'} Login
                        </h2>
                        
                        <div class="space-y-6">
                            <div>
                                <label class="block text-white mb-2">User ID (UID)</label>
                                <input id="loginUid" type="text" placeholder="e.g., 1001234567" 
                                    value="${state.currentRole === 'waiter' ? '1001234567' : '2000000001'}"
                                    class="w-full bg-white/20 text-white px-4 py-3 rounded-lg focus:outline-none focus:ring-2 focus:ring-amber-400">
                            </div>
                            
                            <div>
                                <label class="block text-white mb-2">Password</label>
                                <input id="loginPassword" type="password" 
                                    value="${state.currentRole === 'waiter' ? 'waiter123' : 'owner123'}"
                                    class="w-full bg-white/20 text-white px-4 py-3 rounded-lg focus:outline-none focus:ring-2 focus:ring-amber-400">
                            </div>
                            
                            <button onclick="doLogin()" class="w-full bg-amber-600 text-white py-3 rounded-lg font-semibold hover:bg-amber-700 transition-colors">
                                Login
                            </button>
                            
                            <p class="text-center text-gray-400 text-sm">
                                Demo credentials are pre-filled for testing
                            </p>
                        </div>
                    </div>
                </div>
            `;
        }