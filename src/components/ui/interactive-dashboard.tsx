import React, { useState, useEffect } from 'react';
import { 
  BarChart3, TrendingUp, Users, Activity, MessageSquare, Settings, RefreshCw, 
  Clock, CheckCircle, Cpu, Wifi, Database, Zap, Target, Shield, Calendar, 
  CreditCard, PieChart, LineChart, Search, Edit3, Bell, ChevronDown, Play, 
  Pause, AlertCircle, CheckCircle2, XCircle, Info, ArrowRight, Star, 
  BarChart, PieChart as PieChartIcon, LineChart as LineChartIcon, 
  Smartphone, Globe, Cloud, Lock, Eye, EyeOff, Maximize2, Minimize2,
  Download, Share2, Copy, ExternalLink, Phone, Mail, MapPin, HardDrive
} from 'lucide-react';
import { websiteActions, contactInfo, whatsappContacts } from '@/lib/utils';
import { PieChart as RechartsPieChart, Pie, Cell, ResponsiveContainer, LineChart as RechartsLineChart, Line, XAxis, YAxis, CartesianGrid, Tooltip, Legend, Area, AreaChart as RechartsAreaChart } from 'recharts';

const InteractiveDashboard = () => {
  const [isLive, setIsLive] = useState(true);
  const [currentTime, setCurrentTime] = useState(new Date());
  const [isRefreshing, setIsRefreshing] = useState(false);
  const [selectedView, setSelectedView] = useState('overview');
  const [isFullscreen, setIsFullscreen] = useState(false);
  const [showNotifications, setShowNotifications] = useState(false);
  const [activeTab, setActiveTab] = useState('metrics');
  const [copiedAction, setCopiedAction] = useState<string | null>(null);
  const [showChart, setShowChart] = useState(false);
  const [selectedMetric, setSelectedMetric] = useState('all');
  const [dynamicStats, setDynamicStats] = useState([
    { name: 'Active Workflows', value: 12, icon: Play, color: 'blue', status: 'running', trend: '+15%', description: 'Real-time automation processes' },
    { name: 'Completed Tasks', value: 2847, icon: CheckCircle2, color: 'green', status: 'success', trend: '+23%', description: 'Tasks processed this month' },
    { name: 'Error Rate', value: 0.2, icon: AlertCircle, color: 'red', status: 'warning', trend: '-5%', description: 'System reliability metric' },
    { name: 'Uptime', value: 99.9, icon: Shield, color: 'purple', status: 'success', trend: '+0.1%', description: 'System availability' }
  ]);
  const [dynamicSystemMetrics, setDynamicSystemMetrics] = useState([
    { name: 'CPU Usage', value: 23, color: 'blue', icon: Cpu },
    { name: 'Memory', value: 67, color: 'green', icon: Database },
    { name: 'Network', value: 45, color: 'purple', icon: Wifi },
    { name: 'Storage', value: 78, color: 'orange', icon: HardDrive }
  ]);
  const [dynamicChartData, setDynamicChartData] = useState([
    { name: 'Jan', automation: 65, efficiency: 78, uptime: 99 },
    { name: 'Feb', automation: 72, efficiency: 82, uptime: 99.2 },
    { name: 'Mar', automation: 68, efficiency: 85, uptime: 99.5 },
    { name: 'Apr', automation: 75, efficiency: 88, uptime: 99.8 },
    { name: 'May', automation: 80, efficiency: 92, uptime: 99.9 },
    { name: 'Jun', automation: 85, efficiency: 95, uptime: 99.9 }
  ]);
  const dashboardRef = React.useRef<HTMLDivElement>(null);

  useEffect(() => {
    const timer = setInterval(() => {
      setCurrentTime(new Date());
    }, 1000);
    return () => clearInterval(timer);
  }, []);

  // Generate realistic dynamic values
  const generateRandomValue = (min: number, max: number, current: number, volatility: number = 0.1) => {
    const change = (Math.random() - 0.5) * volatility * (max - min);
    const newValue = current + change;
    const clampedValue = Math.max(min, Math.min(max, newValue));
    
    // Format based on the metric type
    if (min >= 0 && max <= 1) {
      // For error rates and small percentages
      return Math.round(clampedValue * 1000) / 1000;
    } else if (min >= 99 && max <= 100) {
      // For uptime percentages
      return Math.round(clampedValue * 100) / 100;
    } else if (min >= 0 && max <= 100) {
      // For system metrics like CPU, Memory, etc.
      return Math.round(clampedValue * 10) / 10;
    } else {
      // For large numbers like completed tasks
      return Math.round(clampedValue);
    }
  };

  const generateTrend = (current: number, previous: number) => {
    const change = ((current - previous) / previous) * 100;
    return change >= 0 ? `+${change.toFixed(1)}%` : `${change.toFixed(1)}%`;
  };

  // Update dynamic data every 3 seconds
  useEffect(() => {
    if (!isLive) return;

    const updateInterval = setInterval(() => {
      // Update automation stats
      setDynamicStats(prev => prev.map(stat => {
        let newValue = stat.value;
        let newTrend = stat.trend;

        switch (stat.name) {
          case 'Active Workflows':
            newValue = generateRandomValue(8, 18, stat.value, 0.15);
            newTrend = generateTrend(newValue, stat.value);
            break;
          case 'Completed Tasks':
            newValue = generateRandomValue(2800, 2900, stat.value, 0.05);
            newTrend = generateTrend(newValue, stat.value);
            break;
          case 'Error Rate':
            newValue = generateRandomValue(0.1, 0.5, stat.value, 0.2);
            newTrend = generateTrend(newValue, stat.value);
            break;
          case 'Uptime':
            newValue = generateRandomValue(99.5, 99.99, stat.value, 0.01);
            newTrend = generateTrend(newValue, stat.value);
            break;
        }
        
        // Ensure values are properly rounded for display
        if (stat.name === 'Completed Tasks') {
          newValue = Math.round(newValue);
        }

        return { ...stat, value: newValue, trend: newTrend };
      }));

      // Update system metrics
      setDynamicSystemMetrics(prev => prev.map(metric => {
        let newValue = metric.value;

        switch (metric.name) {
          case 'CPU Usage':
            newValue = generateRandomValue(15, 35, metric.value, 0.2);
            break;
          case 'Memory':
            newValue = generateRandomValue(60, 80, metric.value, 0.15);
            break;
          case 'Network':
            newValue = generateRandomValue(35, 65, metric.value, 0.25);
            break;
          case 'Storage':
            newValue = generateRandomValue(70, 85, metric.value, 0.1);
            break;
        }

        return { ...metric, value: newValue };
      }));

      // Update chart data with new month
      setDynamicChartData(prev => {
        const months = ['Jan', 'Feb', 'Mar', 'Apr', 'May', 'Jun', 'Jul', 'Aug', 'Sep', 'Oct', 'Nov', 'Dec'];
        const currentMonth = new Date().getMonth();
        const monthName = months[currentMonth];
        
        const lastData = prev[prev.length - 1];
        const newData = {
          name: monthName,
          automation: generateRandomValue(80, 95, lastData.automation, 0.1),
          efficiency: generateRandomValue(90, 98, lastData.efficiency, 0.05),
          uptime: generateRandomValue(99.8, 99.99, lastData.uptime, 0.01)
        };

        // Keep only last 6 months
        const updatedData = [...prev.slice(1), newData];
        return updatedData;
      });
    }, 3000);

    return () => clearInterval(updateInterval);
  }, [isLive]);

  const handleLiveToggle = () => {
    setIsLive(!isLive);
    websiteActions.showNotification(
      isLive ? 'System going offline...' : 'System coming online...',
      'info'
    );
  };

  const handleRefresh = () => {
    setIsRefreshing(true);
    setTimeout(() => {
      setIsRefreshing(false);
      websiteActions.showNotification('Dashboard refreshed successfully!', 'success');
    }, 1000);
  };

  const handleQuickAction = (action: string) => {
    switch (action) {
      case 'automation':
        websiteActions.openWhatsApp(contactInfo.salesPhone, 'Hello! I would like to know more about your automation and see a live demo.');
        break;
      case 'analytics':
        websiteActions.openWhatsApp(contactInfo.salesPhone, 'Hello! I would like to see your advanced analytics dashboard and reporting capabilities.');
        break;
      case 'support':
        websiteActions.openWhatsApp(contactInfo.supportPhone, 'Hello! I need technical support for my automation system.');
        break;
      case 'demo':
        websiteActions.openWhatsApp(contactInfo.salesPhone, 'Hello! I would like to schedule a personalized demo of your automation platform.');
        break;
      case 'pricing':
        websiteActions.openWhatsApp(contactInfo.salesPhone, 'Hello! I would like to discuss pricing options for your automation services.');
        break;
      case 'consultation':
        websiteActions.openWhatsApp(contactInfo.salesPhone, 'Hello! I would like to book a free consultation to discuss my automation needs.');
        break;
      default:
        break;
    }
  };

  const handleContactAction = (contact: { name: string; number: string; email?: string; linkedin?: string }, action: string) => {
    switch (action) {
      case 'whatsapp':
        websiteActions.openWhatsApp(contact.number, `Hello ${contact.name}! I would like to discuss automation.`);
        break;
      case 'phone':
        websiteActions.callPhone(contact.number);
        break;
      case 'email':
        websiteActions.sendEmail(contact.email || contactInfo.email, 'Automation Services Inquiry');
        break;
      case 'linkedin':
        if (contact.linkedin) {
          websiteActions.openExternalLink(contact.linkedin);
        }
        break;
    }
  };

  const copyToClipboard = async (text: string, action: string) => {
    const success = await websiteActions.copyToClipboard(text);
    if (success) {
      setCopiedAction(action);
      websiteActions.showNotification('Copied to clipboard!', 'success');
      setTimeout(() => setCopiedAction(null), 2000);
    }
  };

  const handleFullscreenToggle = async () => {
    try {
      if (!isFullscreen) {
        // Enter fullscreen
        if (dashboardRef.current) {
          if (dashboardRef.current.requestFullscreen) {
            await dashboardRef.current.requestFullscreen();
          } else if ((dashboardRef.current as HTMLElement & { webkitRequestFullscreen?: () => Promise<void> }).webkitRequestFullscreen) {
            await (dashboardRef.current as HTMLElement & { webkitRequestFullscreen?: () => Promise<void> }).webkitRequestFullscreen!();
          } else if ((dashboardRef.current as HTMLElement & { mozRequestFullScreen?: () => Promise<void> }).mozRequestFullScreen) {
            await (dashboardRef.current as HTMLElement & { mozRequestFullScreen?: () => Promise<void> }).mozRequestFullScreen!();
          } else if ((dashboardRef.current as HTMLElement & { msRequestFullscreen?: () => Promise<void> }).msRequestFullscreen) {
            await (dashboardRef.current as HTMLElement & { msRequestFullscreen?: () => Promise<void> }).msRequestFullscreen!();
          }
        }
      } else {
        // Exit fullscreen
        if (document.exitFullscreen) {
          await document.exitFullscreen();
        } else if ((document as Document & { webkitExitFullscreen?: () => Promise<void> }).webkitExitFullscreen) {
          await (document as Document & { webkitExitFullscreen?: () => Promise<void> }).webkitExitFullscreen!();
        } else if ((document as Document & { mozCancelFullScreen?: () => Promise<void> }).mozCancelFullScreen) {
          await (document as Document & { mozCancelFullScreen?: () => Promise<void> }).mozCancelFullScreen!();
        } else if ((document as Document & { msExitFullscreen?: () => Promise<void> }).msExitFullscreen) {
          await (document as Document & { msExitFullscreen?: () => Promise<void> }).msExitFullscreen!();
        }
      }
    } catch (error) {
      console.error('Fullscreen error:', error);
      websiteActions.showNotification('Fullscreen not supported in this browser', 'error');
    }
  };

  // Listen for fullscreen changes
  useEffect(() => {
    const handleFullscreenChange = () => {
      const isCurrentlyFullscreen = !!(
        document.fullscreenElement ||
        (document as Document & { webkitFullscreenElement?: Element }).webkitFullscreenElement ||
        (document as Document & { mozFullScreenElement?: Element }).mozFullScreenElement ||
        (document as Document & { msFullscreenElement?: Element }).msFullscreenElement
      );
      setIsFullscreen(isCurrentlyFullscreen);
    };

    document.addEventListener('fullscreenchange', handleFullscreenChange);
    document.addEventListener('webkitfullscreenchange', handleFullscreenChange);
    document.addEventListener('mozfullscreenchange', handleFullscreenChange);
    document.addEventListener('MSFullscreenChange', handleFullscreenChange);

    // Add keyboard listener for Escape key
    const handleKeyDown = (event: KeyboardEvent) => {
      if (event.key === 'Escape' && isFullscreen) {
        handleFullscreenToggle();
      }
    };
    document.addEventListener('keydown', handleKeyDown);

    return () => {
      document.removeEventListener('fullscreenchange', handleFullscreenChange);
      document.removeEventListener('webkitfullscreenchange', handleFullscreenChange);
      document.removeEventListener('mozfullscreenchange', handleFullscreenChange);
      document.removeEventListener('MSFullscreenChange', handleFullscreenChange);
      document.removeEventListener('keydown', handleKeyDown);
    };
  }, []);

  // Enhanced sample data - now using dynamic stats
  const automationStats = dynamicStats;

  const recentActivities = [
    { 
      type: 'success', 
      message: 'Workflow "Customer Support Bot" completed successfully', 
      time: '2 min ago',
      icon: CheckCircle2,
      details: 'Processed 150 customer queries'
    },
    { 
      type: 'info', 
      message: 'New automation rule created for order processing', 
      time: '5 min ago',
      icon: Settings,
      details: 'E-commerce integration activated'
    },
    { 
      type: 'warning', 
      message: 'System backup in progress', 
      time: '8 min ago',
      icon: Database,
      details: 'Scheduled maintenance'
    },
    { 
      type: 'success', 
      message: 'Performance optimization completed', 
      time: '12 min ago',
      icon: Zap,
      details: 'Response time improved by 40%'
    }
  ];

  const quickActions = [
    { 
      name: 'Start Automation', 
      icon: Play, 
      color: 'blue', 
      action: 'automation',
      description: 'Launch new workflows',
      gradient: 'from-blue-500 to-blue-600'
    },
    { 
      name: 'View Analytics', 
      icon: BarChart3, 
      color: 'green', 
      action: 'analytics',
      description: 'Real-time insights',
      gradient: 'from-green-500 to-green-600'
    },
    { 
      name: 'Get Support', 
      icon: MessageSquare, 
      color: 'purple', 
      action: 'support',
      description: '24/7 assistance',
      gradient: 'from-purple-500 to-purple-600'
    },
    { 
      name: 'Schedule Demo', 
      icon: Calendar, 
      color: 'orange', 
      action: 'demo',
      description: 'Personalized walkthrough',
      gradient: 'from-orange-500 to-orange-600'
    },
    { 
      name: 'Pricing Plans', 
      icon: CreditCard, 
      color: 'teal', 
      action: 'pricing',
      description: 'Flexible options',
      gradient: 'from-teal-500 to-teal-600'
    },
    { 
      name: 'Free Consultation', 
      icon: Users, 
      color: 'pink', 
      action: 'consultation',
      description: 'Expert guidance',
      gradient: 'from-pink-500 to-pink-600'
    }
  ];

  const systemMetrics = dynamicSystemMetrics;

  const chartData = dynamicChartData;

  return (
    <div ref={dashboardRef} className={`${isFullscreen ? 'fixed inset-0 z-50' : 'relative'} bg-gradient-to-br from-slate-50 via-blue-50 to-indigo-50 p-4 transition-all duration-500`}>
      <div className="bg-white/90 backdrop-blur-xl rounded-3xl shadow-2xl border border-white/30 w-full mx-auto overflow-hidden h-full">
        {/* Enhanced Header */}
        <div className="bg-gradient-to-r from-indigo-600 via-purple-600 to-blue-600 px-6 py-6 relative overflow-hidden">
          <div className="absolute inset-0 bg-black/10"></div>
          <div className="absolute top-0 right-0 w-32 h-32 bg-white/5 rounded-full blur-3xl"></div>
          <div className="absolute bottom-0 left-0 w-24 h-24 bg-purple-400/20 rounded-full blur-2xl"></div>
          
          <div className="relative flex flex-col sm:flex-row sm:items-center justify-between gap-4">
            <div className="flex items-center gap-4">
              <div className="w-14 h-14 bg-white/20 rounded-2xl flex items-center justify-center backdrop-blur-sm shadow-lg border border-white/30 hover:scale-105 transition-transform duration-300">
                <span className="text-white font-bold text-2xl">M</span>
              </div>
              <div className="flex-1 min-w-0">
                <h1 className="text-white font-bold text-2xl sm:text-3xl mb-1">Maninfini Control Center</h1>
                <p className="text-blue-100 text-sm flex items-center gap-2">
                  <span className="w-2 h-2 bg-green-400 rounded-full animate-pulse"></span>
                  Intelligent Automation Platform • {currentTime.toLocaleTimeString()}
                </p>
              </div>
            </div>
            
            <div className="flex items-center gap-3 flex-wrap">
              <div className="flex items-center gap-3 bg-white/10 backdrop-blur-sm rounded-2xl px-4 py-2 border border-white/20">
                <div className={`w-3 h-3 rounded-full ${isLive ? 'bg-green-400 animate-pulse' : 'bg-red-400'}`}></div>
                <span className="text-white font-medium text-sm">{isLive ? 'System Online' : 'System Offline'}</span>
              </div>
              
              <button
                onClick={handleLiveToggle}
                className={`px-4 py-2 rounded-xl text-sm font-medium transition-all duration-300 hover:scale-105 flex items-center gap-2 ${
                  isLive 
                    ? 'bg-green-500 text-white hover:bg-green-600 shadow-lg hover:shadow-xl' 
                    : 'bg-red-500 text-white hover:bg-red-600 shadow-lg hover:shadow-xl'
                }`}
              >
                {isLive && <div className="w-2 h-2 bg-white rounded-full animate-pulse"></div>}
                {isLive ? 'Live' : 'Offline'}
              </button>
              
              <button
                onClick={handleRefresh}
                className={`p-3 rounded-xl bg-white/10 hover:bg-white/20 transition-all duration-300 hover:shadow-lg border border-white/20 hover:scale-105 ${
                  isRefreshing ? 'animate-spin' : ''
                }`}
                disabled={isRefreshing}
                title="Refresh dashboard"
              >
                <RefreshCw className="w-5 h-5 text-white" />
              </button>

              <button
                onClick={handleFullscreenToggle}
                className={`p-3 rounded-xl transition-all duration-300 hover:shadow-lg border hover:scale-105 ${
                  isFullscreen 
                    ? 'bg-red-500/20 hover:bg-red-500/30 border-red-300/50' 
                    : 'bg-white/10 hover:bg-white/20 border-white/20'
                }`}
                title={isFullscreen ? "Exit fullscreen (Esc)" : "Enter fullscreen"}
              >
                {isFullscreen ? <Minimize2 className="w-5 h-5 text-white" /> : <Maximize2 className="w-5 h-5 text-white" />}
              </button>
            </div>
          </div>
        </div>

        {/* Navigation Tabs */}
        <div className="bg-white/50 backdrop-blur-sm border-b border-white/30">
          <div className="flex space-x-1 p-4">
            {[
              { id: 'metrics', label: 'Metrics', icon: BarChart3 },
              { id: 'actions', label: 'Quick Actions', icon: Zap },
              { id: 'activity', label: 'Activity', icon: Activity },
              { id: 'contacts', label: 'Team', icon: Users }
            ].map((tab) => (
              <button
                key={tab.id}
                onClick={() => setActiveTab(tab.id)}
                className={`flex items-center gap-2 px-4 py-2 rounded-xl text-sm font-medium transition-all duration-300 ${
                  activeTab === tab.id
                    ? 'bg-indigo-600 text-white shadow-lg'
                    : 'text-gray-600 hover:bg-white/50 hover:text-gray-900'
                }`}
              >
                <tab.icon className="w-4 h-4" />
                {tab.label}
              </button>
            ))}
          </div>
        </div>

        {/* Main Dashboard Content */}
        <div className="p-6 overflow-y-auto max-h-[calc(100vh-200px)]">
          {activeTab === 'metrics' && (
            <div className="space-y-6">
              {/* Enhanced Key Metrics Grid */}
              <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-8">
                {automationStats.map((stat, index) => (
                  <div key={index} className="group bg-white/70 backdrop-blur-sm rounded-2xl p-8 border border-white/40 hover:shadow-2xl transition-all duration-500 hover:scale-105 min-h-[220px] flex flex-col justify-between relative overflow-hidden">
                    <div className="absolute top-0 right-0 w-20 h-20 bg-gradient-to-br from-transparent to-white/5 rounded-full blur-xl"></div>
                    <div className="flex items-center justify-between mb-4">
                      <div className={`w-12 h-12 bg-gradient-to-br from-${stat.color}-100 to-${stat.color}-200 rounded-xl flex items-center justify-center shadow-lg`}>
                        <stat.icon className={`w-6 h-6 text-${stat.color}-600`} />
                      </div>
                      <div className={`px-3 py-1 rounded-full text-xs font-medium ${
                        stat.status === 'success' ? 'bg-green-100 text-green-700' :
                        stat.status === 'warning' ? 'bg-yellow-100 text-yellow-700' :
                        'bg-blue-100 text-blue-700'
                      }`}>
                        {stat.status === 'running' ? 'Active' : stat.status === 'success' ? 'Healthy' : 'Warning'}
                      </div>
                    </div>
                    <div className="flex-1 flex flex-col justify-center min-w-0">
                      <div className="flex items-baseline gap-3 mb-3 min-w-0">
                        <h3 className="text-2xl sm:text-3xl font-bold text-gray-900 transition-all duration-500 ease-in-out break-words flex-1">
                      {stat.name === 'Error Rate' ? stat.value.toFixed(3) : 
                       stat.name === 'Uptime' ? stat.value.toFixed(1) : 
                       Math.round(stat.value).toLocaleString()}
                      {stat.name === 'Error Rate' ? '%' : stat.name === 'Uptime' ? '%' : ''}
                    </h3>
                        <span className={`text-sm font-medium flex-shrink-0 ${
                          stat.trend.startsWith('+') ? 'text-green-600' : 'text-red-600'
                        }`}>
                          {stat.trend}
                        </span>
                      </div>
                      <p className="text-gray-600 text-sm leading-relaxed">{stat.name}</p>
                      <p className="text-gray-500 text-xs mt-1">{stat.description}</p>
                    </div>
                  </div>
                ))}
              </div>

              {/* System Performance */}
              <div className="bg-white/70 backdrop-blur-sm rounded-2xl p-6 border border-white/40">
                <h2 className="text-xl font-bold text-gray-900 mb-6 flex items-center gap-3">
                  <Activity className="w-6 h-6 text-indigo-600" />
                  System Performance
                </h2>
                <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
                  {systemMetrics.map((metric, index) => (
                    <div key={index} className="space-y-3">
                      <div className="flex items-center justify-between min-w-0">
                        <div className="flex items-center gap-2 min-w-0 flex-1">
                          <metric.icon className="w-4 h-4 text-gray-600 flex-shrink-0" />
                          <span className="text-sm font-medium text-gray-700 truncate">{metric.name}</span>
                        </div>
                        <span className="text-sm font-bold text-gray-900 transition-all duration-500 flex-shrink-0 ml-2">{metric.value.toFixed(1)}%</span>
                      </div>
                      <div className="w-full bg-gray-200 rounded-full h-2">
                        <div 
                          className={`bg-gradient-to-r from-${metric.color}-500 to-${metric.color}-600 h-2 rounded-full transition-all duration-500 ease-in-out`}
                          style={{ width: `${metric.value}%` }}
                        ></div>
                      </div>
                    </div>
                  ))}
                </div>
              </div>

              {/* Performance Chart */}
              <div className="bg-white/70 backdrop-blur-sm rounded-2xl p-6 border border-white/40">
                <div className="flex items-center justify-between mb-6">
                  <h2 className="text-xl font-bold text-gray-900 flex items-center gap-3">
                    <TrendingUp className="w-6 h-6 text-green-600" />
                    Performance Trends
                  </h2>
                  <div className="flex items-center gap-2">
                    <button
                      onClick={() => setShowChart(!showChart)}
                      className="p-2 bg-gray-100 hover:bg-gray-200 rounded-lg transition-colors duration-300"
                      title={showChart ? "Hide chart" : "Show chart"}
                    >
                      {showChart ? <EyeOff className="w-4 h-4 text-gray-600" /> : <Eye className="w-4 h-4 text-gray-600" />}
                    </button>
                    <select
                      value={selectedMetric}
                      onChange={(e) => setSelectedMetric(e.target.value)}
                      className="px-3 py-2 bg-gray-100 border border-gray-200 rounded-lg text-sm focus:outline-none focus:ring-2 focus:ring-indigo-500"
                      title="Select metric to display"
                      aria-label="Select metric to display"
                    >
                      <option value="all">All Metrics</option>
                      <option value="automation">Automation</option>
                      <option value="efficiency">Efficiency</option>
                      <option value="uptime">Uptime</option>
                    </select>
                  </div>
                </div>
                {showChart && (
                  <div className="h-64">
                    <ResponsiveContainer width="100%" height="100%">
                      <RechartsLineChart data={chartData}>
                        <CartesianGrid strokeDasharray="3 3" stroke="#e5e7eb" />
                        <XAxis dataKey="name" stroke="#6b7280" />
                        <YAxis stroke="#6b7280" />
                        <Tooltip 
                          contentStyle={{ 
                            backgroundColor: 'rgba(255, 255, 255, 0.95)', 
                            border: '1px solid #e5e7eb',
                            borderRadius: '8px'
                          }}
                        />
                        <Legend />
                        {selectedMetric === 'all' || selectedMetric === 'automation' ? (
                          <Line type="monotone" dataKey="automation" stroke="#3b82f6" strokeWidth={3} dot={{ fill: '#3b82f6', strokeWidth: 2, r: 4 }} />
                        ) : null}
                        {selectedMetric === 'all' || selectedMetric === 'efficiency' ? (
                          <Line type="monotone" dataKey="efficiency" stroke="#10b981" strokeWidth={3} dot={{ fill: '#10b981', strokeWidth: 2, r: 4 }} />
                        ) : null}
                        {selectedMetric === 'all' || selectedMetric === 'uptime' ? (
                          <Line type="monotone" dataKey="uptime" stroke="#8b5cf6" strokeWidth={3} dot={{ fill: '#8b5cf6', strokeWidth: 2, r: 4 }} />
                        ) : null}
                      </RechartsLineChart>
                    </ResponsiveContainer>
                  </div>
                )}
              </div>
            </div>
          )}

          {activeTab === 'actions' && (
            <div className="space-y-6">
              {/* Enhanced Quick Actions */}
              <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
                {quickActions.map((action, index) => (
                  <button
                    key={index}
                    onClick={() => handleQuickAction(action.action)}
                    className={`bg-gradient-to-br ${action.gradient} hover:shadow-2xl text-white rounded-2xl p-6 text-center transition-all duration-500 hover:scale-105 transform h-40 group relative overflow-hidden`}
                  >
                    <div className="absolute top-0 right-0 w-20 h-20 bg-white/10 rounded-full blur-xl"></div>
                    <div className="flex flex-col items-center justify-center gap-4 h-full relative z-10">
                      <div className="w-16 h-16 bg-white/20 rounded-2xl flex items-center justify-center group-hover:scale-110 transition-transform duration-300">
                        <action.icon className="w-8 h-8 text-white" />
                      </div>
                      <div>
                        <p className="font-bold text-lg mb-1">{action.name}</p>
                        <p className="text-white/90 text-sm">{action.description}</p>
                      </div>
                      <ArrowRight className="w-5 h-5 text-white/80 group-hover:translate-x-1 transition-transform duration-300" />
                    </div>
                  </button>
                ))}
              </div>

              {/* Contact Information */}
              <div className="bg-white/70 backdrop-blur-sm rounded-2xl p-6 border border-white/40">
                <h2 className="text-xl font-bold text-gray-900 mb-6 flex items-center gap-3">
                  <MessageSquare className="w-6 h-6 text-purple-600" />
                  Quick Contact
                </h2>
                <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
                  {whatsappContacts.map((contact, index) => (
                    <div key={index} className="bg-gradient-to-br from-gray-50 to-gray-100 rounded-xl p-4 border border-gray-200">
                      <div className="flex items-center justify-between mb-3">
                        <div>
                          <h3 className="font-semibold text-gray-900">{contact.name}</h3>
                          <p className="text-sm text-gray-600">{contact.role}</p>
                        </div>
                        <div className="w-10 h-10 bg-gradient-to-br from-blue-500 to-purple-600 rounded-full flex items-center justify-center">
                          <span className="text-white font-bold text-sm">{contact.name.charAt(0)}</span>
                        </div>
                      </div>
                      <div className="space-y-2">
                        <button
                          onClick={() => handleContactAction(contact, 'whatsapp')}
                          className="w-full bg-green-500 hover:bg-green-600 text-white text-sm py-2 px-3 rounded-lg transition-colors duration-300 flex items-center justify-center gap-2"
                        >
                          <MessageSquare className="w-4 h-4" />
                          WhatsApp
                        </button>
                        <div className="flex gap-2">
                          <button
                            onClick={() => handleContactAction(contact, 'phone')}
                            className="flex-1 bg-blue-500 hover:bg-blue-600 text-white text-xs py-2 px-2 rounded-lg transition-colors duration-300 flex items-center justify-center gap-1"
                          >
                            <Phone className="w-3 h-3" />
                            Call
                          </button>
                          {contact.linkedin && (
                            <button
                              onClick={() => handleContactAction(contact, 'linkedin')}
                              className="flex-1 bg-blue-600 hover:bg-blue-700 text-white text-xs py-2 px-2 rounded-lg transition-colors duration-300 flex items-center justify-center gap-1"
                            >
                              <ExternalLink className="w-3 h-3" />
                              LinkedIn
                            </button>
                          )}
                        </div>
                      </div>
                    </div>
                  ))}
                </div>
              </div>
            </div>
          )}

          {activeTab === 'activity' && (
            <div className="space-y-6">
              {/* Enhanced Recent Activity */}
              <div className="bg-white/70 backdrop-blur-sm rounded-2xl p-6 border border-white/40">
                <h2 className="text-xl font-bold text-gray-900 mb-6 flex items-center gap-3">
                  <Clock className="w-6 h-6 text-orange-600" />
                  Recent Activity
                </h2>
                <div className="space-y-4">
                  {recentActivities.map((activity, index) => (
                    <div key={index} className="group bg-white/50 rounded-xl border border-white/30 hover:shadow-lg transition-all duration-300 p-4">
                      <div className="flex items-start gap-4">
                        <div className={`w-10 h-10 rounded-full flex items-center justify-center ${
                          activity.type === 'success' ? 'bg-green-100' :
                          activity.type === 'warning' ? 'bg-yellow-100' :
                          'bg-blue-100'
                        }`}>
                          <activity.icon className={`w-5 h-5 ${
                            activity.type === 'success' ? 'text-green-600' :
                            activity.type === 'warning' ? 'text-yellow-600' :
                            'text-blue-600'
                          }`} />
                        </div>
                        <div className="flex-1">
                          <p className="text-gray-800 font-medium text-base">{activity.message}</p>
                          <p className="text-gray-500 text-sm mt-1">{activity.details}</p>
                          <p className="text-gray-400 text-xs mt-2">{activity.time}</p>
                        </div>
                        <div className={`px-3 py-1 rounded-full text-xs font-medium ${
                          activity.type === 'success' ? 'bg-green-100 text-green-700' :
                          activity.type === 'warning' ? 'bg-yellow-100 text-yellow-700' :
                          'bg-blue-100 text-blue-700'
                        }`}>
                          {activity.type === 'success' ? 'Success' : activity.type === 'warning' ? 'Warning' : 'Info'}
                        </div>
                      </div>
                    </div>
                  ))}
                </div>
              </div>

              {/* System Status */}
              <div className="bg-white/70 backdrop-blur-sm rounded-2xl p-6 border border-white/40">
                <h2 className="text-xl font-bold text-gray-900 mb-6 flex items-center gap-3">
                  <Shield className="w-6 h-6 text-green-600" />
                  System Status
                </h2>
                <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
                  <div className="space-y-4">
                    <div className="flex items-center justify-between p-4 bg-green-50 rounded-xl border border-green-200">
                      <div className="flex items-center gap-3">
                        <CheckCircle2 className="w-6 h-6 text-green-600" />
                        <span className="font-medium text-green-800 text-base">All Systems Operational</span>
                      </div>
                      <div className="w-3 h-3 bg-green-500 rounded-full animate-pulse"></div>
                    </div>
                    <div className="flex items-center justify-between p-4 bg-blue-50 rounded-xl border border-blue-200">
                      <div className="flex items-center gap-3">
                        <Wifi className="w-6 h-6 text-blue-600" />
                        <span className="font-medium text-blue-800 text-base">Network Connected</span>
                      </div>
                      <div className="w-3 h-3 bg-blue-500 rounded-full"></div>
                    </div>
                    <div className="flex items-center justify-between p-4 bg-purple-50 rounded-xl border border-purple-200">
                      <div className="flex items-center gap-3">
                        <Database className="w-6 h-6 text-purple-600" />
                        <span className="font-medium text-purple-800 text-base">Database Online</span>
                      </div>
                      <div className="w-3 h-3 bg-purple-500 rounded-full"></div>
                    </div>
                  </div>
                  
                  <div className="md:col-span-2">
                    <div className="bg-gradient-to-br from-indigo-500 to-purple-600 rounded-xl p-6 text-white h-full">
                      <h3 className="font-semibold mb-6 text-lg">Real-time Performance</h3>
                      <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                        <div>
                          <div className="flex justify-between mb-2">
                            <span className="text-sm">CPU Usage</span>
                            <span className="font-semibold">23%</span>
                          </div>
                          <div className="w-full bg-white/20 rounded-full h-3">
                            <div className="bg-white h-3 rounded-full transition-all duration-500" style={{ width: '23%' }}></div>
                          </div>
                        </div>
                        <div>
                          <div className="flex justify-between mb-2">
                            <span className="text-sm">Memory</span>
                            <span className="font-semibold">67%</span>
                          </div>
                          <div className="w-full bg-white/20 rounded-full h-3">
                            <div className="bg-white h-3 rounded-full transition-all duration-500" style={{ width: '67%' }}></div>
                          </div>
                        </div>
                      </div>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          )}

          {activeTab === 'contacts' && (
            <div className="space-y-6">
              {/* Team Contacts */}
              <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
                {whatsappContacts.map((contact, index) => (
                  <div key={index} className="bg-white/70 backdrop-blur-sm rounded-2xl p-6 border border-white/40 hover:shadow-xl transition-all duration-300 hover:scale-105">
                    <div className="text-center mb-6">
                      <div className="w-20 h-20 bg-gradient-to-br from-blue-500 to-purple-600 rounded-full flex items-center justify-center mx-auto mb-4">
                        <span className="text-white font-bold text-2xl">{contact.name.charAt(0)}</span>
                      </div>
                      <h3 className="text-xl font-bold text-gray-900 mb-1">{contact.name}</h3>
                      <p className="text-gray-600 font-medium">{contact.role}</p>
                    </div>
                    
                    <div className="space-y-3">
                      <button
                        onClick={() => handleContactAction(contact, 'whatsapp')}
                        className="w-full bg-green-500 hover:bg-green-600 text-white py-3 px-4 rounded-xl transition-all duration-300 flex items-center justify-center gap-2 font-medium"
                      >
                        <MessageSquare className="w-5 h-5" />
                        WhatsApp Chat
                      </button>
                      
                      <div className="grid grid-cols-2 gap-2">
                        <button
                          onClick={() => handleContactAction(contact, 'phone')}
                          className="bg-blue-500 hover:bg-blue-600 text-white py-2 px-3 rounded-lg transition-all duration-300 flex items-center justify-center gap-1 text-sm"
                        >
                          <Phone className="w-4 h-4" />
                          Call
                        </button>
                        <button
                          onClick={() => handleContactAction(contact, 'email')}
                          className="bg-gray-500 hover:bg-gray-600 text-white py-2 px-3 rounded-lg transition-all duration-300 flex items-center justify-center gap-1 text-sm"
                        >
                          <Mail className="w-4 h-4" />
                          Email
                        </button>
                      </div>
                      
                      {contact.linkedin && (
                        <button
                          onClick={() => handleContactAction(contact, 'linkedin')}
                          className="w-full bg-blue-600 hover:bg-blue-700 text-white py-2 px-3 rounded-lg transition-all duration-300 flex items-center justify-center gap-2 text-sm"
                        >
                          <ExternalLink className="w-4 h-4" />
                          LinkedIn Profile
                        </button>
                      )}
                    </div>
                  </div>
                ))}
              </div>

              {/* Company Information */}
              <div className="bg-white/70 backdrop-blur-sm rounded-2xl p-6 border border-white/40">
                <h2 className="text-xl font-bold text-gray-900 mb-6 flex items-center gap-3">
                  <Globe className="w-6 h-6 text-indigo-600" />
                  Company Information
                </h2>
                <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                  <div className="space-y-4">
                    <div className="flex items-center gap-3 p-4 bg-blue-50 rounded-xl border border-blue-200">
                      <Phone className="w-5 h-5 text-blue-600" />
                      <div>
                        <p className="font-medium text-blue-800">Main Phone</p>
                        <p className="text-blue-600">{contactInfo.mainPhone}</p>
                      </div>
                      <button
                        onClick={() => copyToClipboard(contactInfo.mainPhone, 'phone')}
                        className="ml-auto p-2 bg-blue-100 hover:bg-blue-200 rounded-lg transition-colors duration-300"
                        title="Copy phone number to clipboard"
                      >
                        <Copy className={`w-4 h-4 ${copiedAction === 'phone' ? 'text-green-600' : 'text-blue-600'}`} />
                      </button>
                    </div>
                    
                    <div className="flex items-center gap-3 p-4 bg-green-50 rounded-xl border border-green-200">
                      <Mail className="w-5 h-5 text-green-600" />
                      <div>
                        <p className="font-medium text-green-800">Email</p>
                        <p className="text-green-600">{contactInfo.email}</p>
                      </div>
                      <button
                        onClick={() => copyToClipboard(contactInfo.email, 'email')}
                        className="ml-auto p-2 bg-green-100 hover:bg-green-200 rounded-lg transition-colors duration-300"
                        title="Copy email to clipboard"
                      >
                        <Copy className={`w-4 h-4 ${copiedAction === 'email' ? 'text-green-600' : 'text-green-600'}`} />
                      </button>
                    </div>
                  </div>
                  
                  <div className="space-y-4">
                    <div className="flex items-center gap-3 p-4 bg-purple-50 rounded-xl border border-purple-200">
                      <MapPin className="w-5 h-5 text-purple-600" />
                      <div>
                        <p className="font-medium text-purple-800">Address</p>
                        <p className="text-purple-600 text-sm">{contactInfo.address}</p>
                      </div>
                      <button
                        onClick={() => websiteActions.getDirections(contactInfo.address)}
                        className="ml-auto p-2 bg-purple-100 hover:bg-purple-200 rounded-lg transition-colors duration-300"
                        title="Get directions to office"
                      >
                        <ExternalLink className="w-4 h-4 text-purple-600" />
                      </button>
                    </div>
                    
                    <div className="flex items-center gap-3 p-4 bg-orange-50 rounded-xl border border-orange-200">
                      <Clock className="w-5 h-5 text-orange-600" />
                      <div>
                        <p className="font-medium text-orange-800">Business Hours</p>
                        <p className="text-orange-600">Mon-Fri: 9AM-6PM IST</p>
                      </div>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          )}
        </div>
      </div>
    </div>
  );
};

export default InteractiveDashboard; 